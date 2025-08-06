"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Plus, Edit, Trash2, Building2, MapPin, Phone, Mail, Users, Bed, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'

interface Hotel {
  id: string
  name: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  website?: string
  description?: string
  totalRooms: number
  availableRooms: number
  totalBookings: number
  isActive: boolean
  createdAt: string
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    description: '',
  })

  const { data: session } = useSession()

  useEffect(() => {
    fetchHotels()
  }, [])

  const fetchHotels = async () => {
    try {
      // For now, we'll use mock data since we haven't implemented the hotels API yet
      const mockHotels: Hotel[] = [
        {
          id: '1',
          name: 'SmartHotel Downtown',
          address: '123 Main Street',
          city: 'New York',
          country: 'USA',
          phone: '+1 (555) 123-4567',
          email: 'downtown@smarthotel.com',
          website: 'https://downtown.smarthotel.com',
          description: 'Luxury hotel in the heart of downtown',
          totalRooms: 150,
          availableRooms: 45,
          totalBookings: 105,
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
        },
        {
          id: '2',
          name: 'SmartHotel Beach Resort',
          address: '456 Ocean Drive',
          city: 'Miami',
          country: 'USA',
          phone: '+1 (555) 987-6543',
          email: 'beach@smarthotel.com',
          website: 'https://beach.smarthotel.com',
          description: 'Beachfront resort with stunning ocean views',
          totalRooms: 200,
          availableRooms: 78,
          totalBookings: 122,
          isActive: true,
          createdAt: '2024-02-01T00:00:00Z',
        },
        {
          id: '3',
          name: 'SmartHotel Business Center',
          address: '789 Corporate Plaza',
          city: 'Chicago',
          country: 'USA',
          phone: '+1 (555) 456-7890',
          email: 'business@smarthotel.com',
          website: 'https://business.smarthotel.com',
          description: 'Business-focused hotel with conference facilities',
          totalRooms: 100,
          availableRooms: 23,
          totalBookings: 77,
          isActive: true,
          createdAt: '2024-03-01T00:00:00Z',
        },
      ]
      setHotels(mockHotels)
    } catch (error) {
      toast.error('Error fetching hotels')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Mock API call - in real implementation, this would call the hotels API
      if (editingHotel) {
        toast.success('Hotel updated successfully')
      } else {
        toast.success('Hotel created successfully')
      }
      setShowCreateModal(false)
      setEditingHotel(null)
      resetForm()
      fetchHotels()
    } catch (error) {
      toast.error('Error saving hotel')
    }
  }

  const handleDelete = async (hotelId: string) => {
    if (!confirm('Are you sure you want to delete this hotel?')) return

    try {
      // Mock API call
      toast.success('Hotel deleted successfully')
      fetchHotels()
    } catch (error) {
      toast.error('Error deleting hotel')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      city: '',
      country: '',
      phone: '',
      email: '',
      website: '',
      description: '',
    })
  }

  const handleEdit = (hotel: Hotel) => {
    setEditingHotel(hotel)
    setFormData({
      name: hotel.name,
      address: hotel.address,
      city: hotel.city,
      country: hotel.country,
      phone: hotel.phone,
      email: hotel.email,
      website: hotel.website || '',
      description: hotel.description || '',
    })
    setShowCreateModal(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
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
          <h1 className="text-3xl font-bold">Hotel Management</h1>
          <Button onClick={() => setShowCreateModal(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Hotel
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="w-8 h-8 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Hotels</p>
                  <p className="text-2xl font-bold">{hotels.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Bed className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Rooms</p>
                  <p className="text-2xl font-bold">{hotels.reduce((sum, hotel) => sum + hotel.totalRooms, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Bookings</p>
                  <p className="text-2xl font-bold">{hotels.reduce((sum, hotel) => sum + hotel.totalBookings, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Active Hotels</p>
                  <p className="text-2xl font-bold">{hotels.filter(hotel => hotel.isActive).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{hotel.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {hotel.city}, {hotel.country}
                      </span>
                    </div>
                  </div>
                  <Badge className={hotel.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {hotel.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{hotel.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{hotel.email}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                    <div>
                      <p className="text-sm font-medium">Total Rooms</p>
                      <p className="text-lg font-bold text-primary-600">{hotel.totalRooms}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Available</p>
                      <p className="text-lg font-bold text-green-600">{hotel.availableRooms}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Bookings</p>
                      <p className="text-lg font-bold text-blue-600">{hotel.totalBookings}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Occupancy</p>
                      <p className="text-lg font-bold text-purple-600">
                        {Math.round(((hotel.totalRooms - hotel.availableRooms) / hotel.totalRooms) * 100)}%
                      </p>
                    </div>
                  </div>
                  
                  {hotel.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 pt-2 border-t">
                      {hotel.description}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(hotel)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(hotel.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create/Edit Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Hotel Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full input-field"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="w-full input-field"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full input-field"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="w-full input-field"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full input-field"
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingHotel ? 'Update Hotel' : 'Add Hotel'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateModal(false)
                      setEditingHotel(null)
                      resetForm()
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 