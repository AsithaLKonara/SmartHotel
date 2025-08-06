"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Search, Filter, Eye, Edit, Trash2, Calendar, User, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

interface Booking {
  id: string
  checkIn: string
  checkOut: string
  guests: number
  totalAmount: number
  status: string
  paymentStatus: string
  specialRequests?: string
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
  room: {
    id: string
    number: string
    type: string
  }
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const { data: session } = useSession()

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

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast.success('Booking status updated successfully')
        fetchBookings()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to update booking status')
      }
    } catch (error) {
      toast.error('Error updating booking status')
    }
  }

  const handleDelete = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Booking deleted successfully')
        fetchBookings()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to delete booking')
      }
    } catch (error) {
      toast.error('Error deleting booking')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800'
      case 'CHECKED_IN': return 'bg-green-100 text-green-800'
      case 'CHECKED_OUT': return 'bg-gray-100 text-gray-800'
      case 'CANCELLED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'PAID': return 'bg-green-100 text-green-800'
      case 'FAILED': return 'bg-red-100 text-red-800'
      case 'REFUNDED': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus
    const matchesPaymentStatus = filterPaymentStatus === 'all' || booking.paymentStatus === filterPaymentStatus
    return matchesSearch && matchesStatus && matchesPaymentStatus
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Booking Management</h1>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="CHECKED_IN">Checked In</option>
                  <option value="CHECKED_OUT">Checked Out</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Payment Status</label>
                <select
                  value={filterPaymentStatus}
                  onChange={(e) => setFilterPaymentStatus(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Payment Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                  <option value="FAILED">Failed</option>
                  <option value="REFUNDED">Refunded</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('')
                    setFilterStatus('all')
                    setFilterPaymentStatus('all')
                  }}
                  className="w-full"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">Booking #{booking.id.slice(-8)}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {booking.user.name} - {booking.user.email}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                          {booking.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Check-in</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {format(new Date(booking.checkIn), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Check-out</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Guests</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Room:</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {booking.room.number} ({booking.room.type})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium">${booking.totalAmount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 lg:flex-col">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    {booking.status === 'PENDING' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}
                      >
                        Confirm
                      </Button>
                    )}
                    {booking.status === 'CONFIRMED' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(booking.id, 'CHECKED_IN')}
                      >
                        Check In
                      </Button>
                    )}
                    {booking.status === 'CHECKED_IN' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(booking.id, 'CHECKED_OUT')}
                      >
                        Check Out
                      </Button>
                    )}
                    {['PENDING', 'CONFIRMED'].includes(booking.status) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    )}
                    {booking.status === 'CANCELLED' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(booking.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No bookings found matching your criteria.</p>
          </div>
        )}

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Booking Details</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedBooking(null)}
                >
                  <span className="sr-only">Close</span>
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Guest Information</h3>
                    <p><strong>Name:</strong> {selectedBooking.user.name}</p>
                    <p><strong>Email:</strong> {selectedBooking.user.email}</p>
                    <p><strong>Guests:</strong> {selectedBooking.guests}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Room Information</h3>
                    <p><strong>Room:</strong> {selectedBooking.room.number}</p>
                    <p><strong>Type:</strong> {selectedBooking.room.type}</p>
                    <p><strong>Total Amount:</strong> ${selectedBooking.totalAmount}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Dates</h3>
                    <p><strong>Check-in:</strong> {format(new Date(selectedBooking.checkIn), 'PPP')}</p>
                    <p><strong>Check-out:</strong> {format(new Date(selectedBooking.checkOut), 'PPP')}</p>
                    <p><strong>Booked on:</strong> {format(new Date(selectedBooking.createdAt), 'PPP')}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Status</h3>
                    <Badge className={getStatusColor(selectedBooking.status)}>
                      {selectedBooking.status}
                    </Badge>
                    <br />
                    <Badge className={getPaymentStatusColor(selectedBooking.paymentStatus)}>
                      {selectedBooking.paymentStatus}
                    </Badge>
                  </div>
                </div>
                
                {selectedBooking.specialRequests && (
                  <div>
                    <h3 className="font-semibold mb-2">Special Requests</h3>
                    <p className="text-gray-600 dark:text-gray-300">{selectedBooking.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 