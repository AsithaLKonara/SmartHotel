"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'

interface Room {
  id: string
  number: string
  type: string
  price: number
  capacity: number
  description: string
  amenities: string[]
  status: string
  isAvailable: boolean
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)

  const { data: session } = useSession()

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/rooms')
      if (response.ok) {
        const data = await response.json()
        setRooms(data)
      } else {
        toast.error('Failed to fetch rooms')
      }
    } catch (error) {
      toast.error('Error fetching rooms')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (roomId: string) => {
    if (!confirm('Are you sure you want to delete this room?')) return

    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Room deleted successfully')
        fetchRooms()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to delete room')
      }
    } catch (error) {
      toast.error('Error deleting room')
    }
  }

  const handleStatusToggle = async (roomId: string, currentStatus: string) => {
    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: currentStatus === 'AVAILABLE' ? 'MAINTENANCE' : 'AVAILABLE',
        }),
      })

      if (response.ok) {
        toast.success('Room status updated successfully')
        fetchRooms()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to update room status')
      }
    } catch (error) {
      toast.error('Error updating room status')
    }
  }

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || room.type === filterType
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus
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
          <h1 className="text-3xl font-bold">Room Management</h1>
          <Button onClick={() => setShowCreateModal(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Room
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
                    placeholder="Search rooms..."
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
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                  <option value="Presidential">Presidential</option>
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
                  <option value="AVAILABLE">Available</option>
                  <option value="OCCUPIED">Occupied</option>
                  <option value="MAINTENANCE">Maintenance</option>
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

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Room {room.number}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300">{room.type}</p>
                  </div>
                  <Badge className={room.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 
                                   room.status === 'OCCUPIED' ? 'bg-red-100 text-red-800' : 
                                   'bg-yellow-100 text-yellow-800'}>
                    {room.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Price:</span>
                    <span className="font-semibold">${room.price}/night</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Capacity:</span>
                    <span>{room.capacity} guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Amenities:</span>
                    <span className="text-sm">{room.amenities.slice(0, 2).join(', ')}...</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingRoom(room)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusToggle(room.id, room.status)}
                    className="flex-1"
                  >
                    {room.status === 'AVAILABLE' ? 'Set Maintenance' : 'Set Available'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(room.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No rooms found matching your criteria.</p>
          </div>
        )}

        {/* Create/Edit Modal would go here */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Room</h2>
              {/* Form would go here */}
              <div className="flex gap-2 mt-6">
                <Button onClick={() => setShowCreateModal(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1">Save Room</Button>
              </div>
            </div>
          </div>
        )}

        {editingRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Room {editingRoom.number}</h2>
              {/* Form would go here */}
              <div className="flex gap-2 mt-6">
                <Button onClick={() => setEditingRoom(null)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1">Update Room</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 