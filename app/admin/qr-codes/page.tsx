"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Plus, Download, QrCode, Search, Filter, Eye, Trash2, Calendar, User, Bed } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

interface QRCode {
  id: string
  bookingId: string
  code: string
  type: 'CHECK_IN' | 'ROOM_ACCESS' | 'SERVICE'
  status: 'ACTIVE' | 'USED' | 'EXPIRED'
  expiresAt: string
  createdAt: string
  booking: {
    id: string
    checkIn: string
    checkOut: string
    user: {
      name: string
      email: string
    }
    room: {
      number: string
      type: string
    }
  }
}

export default function QRCodesPage() {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [selectedQR, setSelectedQR] = useState<QRCode | null>(null)

  const { data: session } = useSession()

  useEffect(() => {
    fetchQRCodes()
  }, [])

  const fetchQRCodes = async () => {
    try {
      // Mock data - in real implementation, this would call the QR codes API
      const mockQRCodes: QRCode[] = [
        {
          id: '1',
          bookingId: 'booking-1',
          code: 'QR-CHECKIN-001',
          type: 'CHECK_IN',
          status: 'ACTIVE',
          expiresAt: '2024-12-31T23:59:59Z',
          createdAt: '2024-01-01T10:00:00Z',
          booking: {
            id: 'booking-1',
            checkIn: '2024-01-15T14:00:00Z',
            checkOut: '2024-01-17T11:00:00Z',
            user: {
              name: 'John Doe',
              email: 'john@example.com'
            },
            room: {
              number: '101',
              type: 'Deluxe'
            }
          }
        },
        {
          id: '2',
          bookingId: 'booking-2',
          code: 'QR-ROOM-002',
          type: 'ROOM_ACCESS',
          status: 'USED',
          expiresAt: '2024-12-31T23:59:59Z',
          createdAt: '2024-01-02T10:00:00Z',
          booking: {
            id: 'booking-2',
            checkIn: '2024-01-10T14:00:00Z',
            checkOut: '2024-01-12T11:00:00Z',
            user: {
              name: 'Jane Smith',
              email: 'jane@example.com'
            },
            room: {
              number: '205',
              type: 'Suite'
            }
          }
        },
        {
          id: '3',
          bookingId: 'booking-3',
          code: 'QR-SERVICE-003',
          type: 'SERVICE',
          status: 'ACTIVE',
          expiresAt: '2024-12-31T23:59:59Z',
          createdAt: '2024-01-03T10:00:00Z',
          booking: {
            id: 'booking-3',
            checkIn: '2024-01-20T14:00:00Z',
            checkOut: '2024-01-22T11:00:00Z',
            user: {
              name: 'Bob Johnson',
              email: 'bob@example.com'
            },
            room: {
              number: '301',
              type: 'Standard'
            }
          }
        }
      ]
      setQrCodes(mockQRCodes)
    } catch (error) {
      toast.error('Error fetching QR codes')
    } finally {
      setLoading(false)
    }
  }

  const generateQRCode = async (bookingId: string, type: string) => {
    try {
      // Mock API call
      toast.success('QR code generated successfully')
      setShowGenerateModal(false)
      fetchQRCodes()
    } catch (error) {
      toast.error('Error generating QR code')
    }
  }

  const downloadQRCode = async (qrCode: QRCode) => {
    try {
      // Mock download functionality
      toast.success('QR code downloaded successfully')
    } catch (error) {
      toast.error('Error downloading QR code')
    }
  }

  const deleteQRCode = async (qrCodeId: string) => {
    if (!confirm('Are you sure you want to delete this QR code?')) return

    try {
      // Mock API call
      toast.success('QR code deleted successfully')
      fetchQRCodes()
    } catch (error) {
      toast.error('Error deleting QR code')
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CHECK_IN': return 'bg-blue-100 text-blue-800'
      case 'ROOM_ACCESS': return 'bg-green-100 text-green-800'
      case 'SERVICE': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'USED': return 'bg-gray-100 text-gray-800'
      case 'EXPIRED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredQRCodes = qrCodes.filter(qr => {
    const matchesSearch = qr.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.booking.room.number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || qr.type === filterType
    const matchesStatus = filterStatus === 'all' || qr.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
          <h1 className="text-3xl font-bold">QR Code Management</h1>
          <Button onClick={() => setShowGenerateModal(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Generate QR Code
          </Button>
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
                    placeholder="Search QR codes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Types</option>
                  <option value="CHECK_IN">Check-in</option>
                  <option value="ROOM_ACCESS">Room Access</option>
                  <option value="SERVICE">Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="USED">Used</option>
                  <option value="EXPIRED">Expired</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('')
                    setFilterType('all')
                    setFilterStatus('all')
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

        {/* QR Codes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQRCodes.map((qrCode) => (
            <Card key={qrCode.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{qrCode.code}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <QrCode className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {qrCode.booking.room.number} - {qrCode.booking.room.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getTypeColor(qrCode.type)}>
                      {qrCode.type.replace('_', ' ')}
                    </Badge>
                    <Badge className={getStatusColor(qrCode.status)}>
                      {qrCode.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{qrCode.booking.user.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      {format(new Date(qrCode.booking.checkIn), 'MMM dd')} - {format(new Date(qrCode.booking.checkOut), 'MMM dd')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Room {qrCode.booking.room.number}</span>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <p className="text-xs text-gray-500">
                      Expires: {format(new Date(qrCode.expiresAt), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedQR(qrCode)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadQRCode(qrCode)}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteQRCode(qrCode.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredQRCodes.length === 0 && (
          <div className="text-center py-12">
            <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No QR codes found matching your criteria.</p>
          </div>
        )}

        {/* Generate QR Code Modal */}
        {showGenerateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Generate QR Code</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Booking</label>
                  <select className="w-full input-field">
                    <option value="">Select a booking</option>
                    <option value="booking-1">John Doe - Room 101 (Jan 15-17)</option>
                    <option value="booking-2">Jane Smith - Room 205 (Jan 10-12)</option>
                    <option value="booking-3">Bob Johnson - Room 301 (Jan 20-22)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">QR Code Type</label>
                  <select className="w-full input-field">
                    <option value="CHECK_IN">Check-in</option>
                    <option value="ROOM_ACCESS">Room Access</option>
                    <option value="SERVICE">Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Expiration</label>
                  <input
                    type="datetime-local"
                    className="w-full input-field"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Generate QR Code
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowGenerateModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* QR Code Details Modal */}
        {selectedQR && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">QR Code Details</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedQR(null)}
                >
                  <span className="sr-only">Close</span>
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">QR Code Information</h3>
                    <p><strong>Code:</strong> {selectedQR.code}</p>
                    <p><strong>Type:</strong> {selectedQR.type.replace('_', ' ')}</p>
                    <p><strong>Status:</strong> {selectedQR.status}</p>
                    <p><strong>Created:</strong> {format(new Date(selectedQR.createdAt), 'PPP')}</p>
                    <p><strong>Expires:</strong> {format(new Date(selectedQR.expiresAt), 'PPP')}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Booking Information</h3>
                    <p><strong>Guest:</strong> {selectedQR.booking.user.name}</p>
                    <p><strong>Email:</strong> {selectedQR.booking.user.email}</p>
                    <p><strong>Room:</strong> {selectedQR.booking.room.number} ({selectedQR.booking.room.type})</p>
                    <p><strong>Check-in:</strong> {format(new Date(selectedQR.booking.checkIn), 'PPP')}</p>
                    <p><strong>Check-out:</strong> {format(new Date(selectedQR.booking.checkOut), 'PPP')}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">QR Code Preview</h3>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-2">
                        <QrCode className="w-16 h-16 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedQR.code}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 