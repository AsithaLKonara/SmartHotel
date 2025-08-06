"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Calendar, ChevronLeft, ChevronRight, Users, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import toast from 'react-hot-toast'

interface Booking {
  id: string
  checkIn: string
  checkOut: string
  status: string
  guests: number
  room: {
    id: string
    number: string
    type: string
  }
  user: {
    name: string
    email: string
  }
}

interface Room {
  id: string
  number: string
  type: string
  status: string
}

export default function CalendarPage() {
  const { data: session } = useSession()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [rooms, setRooms] = useState<Room[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [currentDate])

  const fetchData = async () => {
    try {
      const [roomsResponse, bookingsResponse] = await Promise.all([
        fetch('/api/rooms'),
        fetch(`/api/bookings?startDate=${startOfMonth(currentDate).toISOString()}&endDate=${endOfMonth(currentDate).toISOString()}`)
      ])

      if (roomsResponse.ok) {
        const roomsData = await roomsResponse.json()
        setRooms(roomsData)
      }

      if (bookingsResponse.ok) {
        const bookingsData = await bookingsResponse.json()
        setBookings(bookingsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load calendar data')
    } finally {
      setLoading(false)
    }
  }

  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate)
    const end = endOfMonth(currentDate)
    return eachDayOfInterval({ start, end })
  }

  const getBookingsForRoomAndDate = (roomId: string, date: Date) => {
    return bookings.filter(booking => {
      const checkIn = new Date(booking.checkIn)
      const checkOut = new Date(booking.checkOut)
      return booking.room.id === roomId && 
             date >= checkIn && 
             date < checkOut
    })
  }

  const getBookingStatus = (bookings: Booking[]) => {
    if (bookings.length === 0) return 'available'
    
    const activeBooking = bookings.find(b => 
      ['PENDING', 'CONFIRMED', 'CHECKED_IN'].includes(b.status)
    )
    
    if (activeBooking) {
      if (activeBooking.status === 'CHECKED_IN') return 'occupied'
      if (activeBooking.status === 'CONFIRMED') return 'confirmed'
      return 'pending'
    }
    
    return 'available'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'occupied': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4" />
      case 'occupied': return <Users className="w-4 h-4" />
      case 'confirmed': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      default: return <XCircle className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available'
      case 'occupied': return 'Occupied'
      case 'confirmed': return 'Confirmed'
      case 'pending': return 'Pending'
      default: return 'Unknown'
    }
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  }

  const handleRoomClick = (roomId: string) => {
    setSelectedRoom(roomId)
  }

  const getBookingsForSelectedDate = () => {
    if (!selectedDate) return []
    
    return bookings.filter(booking => {
      const checkIn = new Date(booking.checkIn)
      const checkOut = new Date(booking.checkOut)
      return selectedDate >= checkIn && selectedDate < checkOut
    })
  }

  const getBookingsForSelectedRoom = () => {
    if (!selectedRoom) return []
    
    return bookings.filter(booking => booking.room.id === selectedRoom)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Room Availability Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View room availability and bookings across all dates
          </p>
        </div>

        {/* Calendar Navigation */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <h2 className="text-xl font-semibold">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              
              <Button
                variant="outline"
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Room Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-2 font-medium">Room</th>
                        {getDaysInMonth().map((day) => (
                          <th key={day.toISOString()} className="text-center p-2 font-medium min-w-[60px]">
                            <div className="text-sm">{format(day, 'd')}</div>
                            <div className="text-xs text-gray-500">{format(day, 'EEE')}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.map((room) => (
                        <tr key={room.id} className="border-t">
                          <td className="p-2">
                            <div className="font-medium">Room {room.number}</div>
                            <div className="text-sm text-gray-500">{room.type}</div>
                          </td>
                          {getDaysInMonth().map((day) => {
                            const dayBookings = getBookingsForRoomAndDate(room.id, day)
                            const status = getBookingStatus(dayBookings)
                            
                            return (
                              <td key={day.toISOString()} className="p-1">
                                <div
                                  className={`p-2 rounded cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(status)}`}
                                  onClick={() => handleDateClick(day)}
                                >
                                  <div className="flex items-center justify-center">
                                    {getStatusIcon(status)}
                                  </div>
                                </div>
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 rounded"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-100 rounded"></div>
                  <span className="text-sm">Confirmed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-100 rounded"></div>
                  <span className="text-sm">Pending</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-100 rounded"></div>
                  <span className="text-sm">Occupied</span>
                </div>
              </CardContent>
            </Card>

            {/* Selected Date Info */}
            {selectedDate && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getBookingsForSelectedDate().map((booking) => (
                      <div key={booking.id} className="p-3 border rounded-lg">
                        <div className="font-medium">Room {booking.room.number}</div>
                        <div className="text-sm text-gray-600">
                          {booking.user.name} - {booking.guests} guests
                        </div>
                        <Badge className="mt-1">
                          {booking.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    ))}
                    {getBookingsForSelectedDate().length === 0 && (
                      <p className="text-gray-500 text-sm">No bookings for this date</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Room Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Rooms:</span>
                    <span className="font-medium">{rooms.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Available Today:</span>
                    <span className="font-medium text-green-600">
                      {rooms.filter(room => room.status === 'AVAILABLE').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Occupied Today:</span>
                    <span className="font-medium text-red-600">
                      {rooms.filter(room => room.status === 'OCCUPIED').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Maintenance:</span>
                    <span className="font-medium text-yellow-600">
                      {rooms.filter(room => room.status === 'MAINTENANCE').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 