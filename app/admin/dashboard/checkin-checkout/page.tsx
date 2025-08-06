"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Calendar, Users, CheckCircle, XCircle, Clock, ArrowRight, ArrowLeft, User, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format, addDays, subDays, isToday, isTomorrow, isYesterday } from 'date-fns'
import toast from 'react-hot-toast'

interface Booking {
  id: string
  checkIn: string
  checkOut: string
  status: string
  guests: number
  specialRequests?: string
  room: {
    id: string
    number: string
    type: string
    floor: number
  }
  user: {
    id: string
    name: string
    email: string
    phone?: string
  }
  invoice?: {
    id: string
    total: number
    status: string
  }
}

export default function CheckInCheckOutPage() {
  const { data: session } = useSession()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [processingBooking, setProcessingBooking] = useState<string | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [selectedDate])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const startDate = format(selectedDate, 'yyyy-MM-dd')
      const endDate = format(addDays(selectedDate, 1), 'yyyy-MM-dd')
      
      const response = await fetch(`/api/bookings?startDate=${startDate}&endDate=${endDate}`)
      
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      } else {
        toast.error('Failed to fetch bookings')
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast.error('Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      setProcessingBooking(bookingId)
      
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast.success(`Booking ${newStatus.toLowerCase().replace('_', ' ')} successfully`)
        fetchBookings() // Refresh data
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to update booking')
      }
    } catch (error) {
      console.error('Error updating booking:', error)
      toast.error('Failed to update booking')
    } finally {
      setProcessingBooking(null)
    }
  }

  const getCheckIns = () => {
    return bookings.filter(booking => {
      const checkIn = new Date(booking.checkIn)
      const checkInDate = format(checkIn, 'yyyy-MM-dd')
      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd')
      return checkInDate === selectedDateStr && booking.status !== 'CHECKED_IN'
    })
  }

  const getCheckOuts = () => {
    return bookings.filter(booking => {
      const checkOut = new Date(booking.checkOut)
      const checkOutDate = format(checkOut, 'yyyy-MM-dd')
      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd')
      return checkOutDate === selectedDateStr && booking.status === 'CHECKED_IN'
    })
  }

  const getCurrentGuests = () => {
    return bookings.filter(booking => booking.status === 'CHECKED_IN')
  }

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    if (isYesterday(date)) return 'Yesterday'
    return format(date, 'EEEE, MMMM d')
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'PENDING': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'CONFIRMED': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'CHECKED_IN': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'CHECKED_OUT': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      'CANCELLED': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    }

    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || statusColors['PENDING']}>
        {status.replace('_', ' ')}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusColors = {
      'PENDING': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'PAID': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'FAILED': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'REFUNDED': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    }

    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || statusColors['PENDING']}>
        {status}
      </Badge>
    )
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
            Check-in & Check-out Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage guest arrivals and departures for {getDateLabel(selectedDate)}
          </p>
        </div>

        {/* Date Navigation */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setSelectedDate(subDays(selectedDate, 1))}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Day
              </Button>
              
              <div className="text-center">
                <h2 className="text-xl font-semibold">
                  {getDateLabel(selectedDate)}
                </h2>
                <p className="text-sm text-gray-500">
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setSelectedDate(addDays(selectedDate, 1))}
              >
                Next Day
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Check-ins */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2 text-green-600" />
                  Check-ins ({getCheckIns().length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getCheckIns().length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No check-ins scheduled</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getCheckIns().map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">Room {booking.room.number}</h3>
                            <p className="text-sm text-gray-600">{booking.room.type}</p>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center text-sm">
                            <User className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{booking.user.name}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            <span>Check-in: {format(new Date(booking.checkIn), 'h:mm a')}</span>
                          </div>
                          {booking.user.phone && (
                            <div className="flex items-center text-sm">
                              <Phone className="w-4 h-4 mr-2 text-gray-500" />
                              <span>{booking.user.phone}</span>
                            </div>
                          )}
                        </div>

                        {booking.specialRequests && (
                          <div className="mb-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                            <strong>Special Requests:</strong> {booking.specialRequests}
                          </div>
                        )}

                        {booking.invoice && (
                          <div className="mb-3">
                            {getPaymentStatusBadge(booking.invoice.status)}
                            <div className="text-sm text-gray-600 mt-1">
                              Total: ${booking.invoice.total.toFixed(2)}
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(booking.id, 'CHECKED_IN')}
                            disabled={processingBooking === booking.id}
                            className="flex-1"
                          >
                            {processingBooking === booking.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Check In
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Check-outs */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ArrowLeft className="w-5 h-5 mr-2 text-red-600" />
                  Check-outs ({getCheckOuts().length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getCheckOuts().length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No check-outs scheduled</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getCheckOuts().map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">Room {booking.room.number}</h3>
                            <p className="text-sm text-gray-600">{booking.room.type}</p>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center text-sm">
                            <User className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{booking.user.name}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            <span>Check-out: {format(new Date(booking.checkOut), 'h:mm a')}</span>
                          </div>
                          {booking.user.phone && (
                            <div className="flex items-center text-sm">
                              <Phone className="w-4 h-4 mr-2 text-gray-500" />
                              <span>{booking.user.phone}</span>
                            </div>
                          )}
                        </div>

                        {booking.invoice && (
                          <div className="mb-3">
                            {getPaymentStatusBadge(booking.invoice.status)}
                            <div className="text-sm text-gray-600 mt-1">
                              Total: ${booking.invoice.total.toFixed(2)}
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(booking.id, 'CHECKED_OUT')}
                            disabled={processingBooking === booking.id}
                            className="flex-1"
                          >
                            {processingBooking === booking.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 mr-1" />
                                Check Out
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Current Guests */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Current Guests ({getCurrentGuests().length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getCurrentGuests().length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No guests currently checked in</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getCurrentGuests().map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">Room {booking.room.number}</h3>
                            <p className="text-sm text-gray-600">{booking.room.type}</p>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center text-sm">
                            <User className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{booking.user.name}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                            <span>Until {format(new Date(booking.checkOut), 'MMM d')}</span>
                          </div>
                          {booking.user.phone && (
                            <div className="flex items-center text-sm">
                              <Phone className="w-4 h-4 mr-2 text-gray-500" />
                              <span>{booking.user.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center text-sm">
                            <Mail className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{booking.user.email}</span>
                          </div>
                        </div>

                        {booking.invoice && (
                          <div className="mb-3">
                            {getPaymentStatusBadge(booking.invoice.status)}
                            <div className="text-sm text-gray-600 mt-1">
                              Total: ${booking.invoice.total.toFixed(2)}
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(booking.id, 'CHECKED_OUT')}
                            disabled={processingBooking === booking.id}
                            className="flex-1"
                          >
                            {processingBooking === booking.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 mr-1" />
                                Check Out
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Daily Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{getCheckIns().length}</div>
                  <div className="text-sm text-gray-600">Check-ins</div>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{getCheckOuts().length}</div>
                  <div className="text-sm text-gray-600">Check-outs</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{getCurrentGuests().length}</div>
                  <div className="text-sm text-gray-600">Current Guests</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">
                    {getCheckIns().length + getCheckOuts().length}
                  </div>
                  <div className="text-sm text-gray-600">Total Actions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 