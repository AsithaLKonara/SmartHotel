"use client"
import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Calendar, User, Bed, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'

interface Booking {
  id: string
  userId: string
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
  totalAmount: number
  status: 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED'
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  paymentMethod?: string
  specialRequests?: string
  createdAt: string
  user: {
    id: string
    name: string
    email: string
    phone?: string
  }
  room: {
    id: string
    number: string
    type: string
    price: number
  }
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      } else {
        toast.error('Failed to fetch bookings')
      }
    } catch (error) {
      toast.error('Error fetching bookings')
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        toast.success('Booking status updated successfully')
        fetchBookings()
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to update booking status')
      }
    } catch (error) {
      toast.error('Error updating booking status')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'CHECKED_IN': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'CHECKED_OUT': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
      case 'CANCELLED': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'FAILED': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'REFUNDED': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading bookings...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Booking Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all hotel bookings and reservations</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by guest name, email, or room number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="CHECKED_IN">Checked In</option>
                <option value="CHECKED_OUT">Checked Out</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{booking.user.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bed className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">Room {booking.room.number}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">${booking.totalAmount}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center space-x-4">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.replace('_', ' ')}
                    </Badge>
                    <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                      {booking.paymentStatus}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedBooking(booking)
                      setShowDetailsModal(true)
                    }}
                  >
                    View Details
                  </Button>
                  
                  {booking.status === 'PENDING' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, 'CONFIRMED')}
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, 'CANCELLED')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}
                  
                  {booking.status === 'CONFIRMED' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateBookingStatus(booking.id, 'CHECKED_IN')}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Check In
                    </Button>
                  )}
                  
                  {booking.status === 'CHECKED_IN' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateBookingStatus(booking.id, 'CHECKED_OUT')}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      Check Out
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Booking Details</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetailsModal(false)}
              >
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Guest Information</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Name: {selectedBooking.user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email: {selectedBooking.user.email}</p>
                  {selectedBooking.user.phone && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Phone: {selectedBooking.user.phone}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Room Information</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Room: {selectedBooking.room.number}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Type: {selectedBooking.room.type}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Price: ${selectedBooking.room.price}/night</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Booking Details</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Check-in: {formatDateTime(selectedBooking.checkIn)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Check-out: {formatDateTime(selectedBooking.checkOut)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Guests: {selectedBooking.guests}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total: ${selectedBooking.totalAmount}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Status</h3>
                  <Badge className={getStatusColor(selectedBooking.status)}>
                    {selectedBooking.status.replace('_', ' ')}
                  </Badge>
                  <div className="mt-2">
                    <Badge className={getPaymentStatusColor(selectedBooking.paymentStatus)}>
                      {selectedBooking.paymentStatus}
                    </Badge>
                  </div>
                  {selectedBooking.paymentMethod && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Payment: {selectedBooking.paymentMethod}
                    </p>
                  )}
                </div>
              </div>
              
              {selectedBooking.specialRequests && (
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Special Requests</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedBooking.specialRequests}</p>
                </div>
              )}
              
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Timeline</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Created: {formatDateTime(selectedBooking.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 