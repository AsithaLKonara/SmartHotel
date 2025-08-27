"use client"

import { useState, useEffect } from 'react'
import { FoodOrder, OrderStatus } from '@/types/restaurant'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Clock, MapPin, User, Phone, Calendar, DollarSign } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function OrdersManagementPage() {
  const [orders, setOrders] = useState<FoodOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'ALL'>('ALL')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    fetchOrders()
  }, [selectedStatus, refreshKey])

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      if (selectedStatus !== 'ALL') {
        params.append('status', selectedStatus)
      }

      const response = await fetch(`/api/restaurant/orders?${params}`)
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to load orders')
    } finally {
      setIsLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const response = await fetch('/api/restaurant/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId,
          status: newStatus
        })
      })

      if (response.ok) {
        toast.success(`Order status updated to ${newStatus}`)
        setRefreshKey(prev => prev + 1) // Trigger refresh
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to update order status')
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      toast.error('Failed to update order status')
    }
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800'
      case 'PREPARING':
        return 'bg-orange-100 text-orange-800'
      case 'READY':
        return 'bg-green-100 text-green-800'
      case 'DELIVERED':
        return 'bg-gray-100 text-gray-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusActions = (order: FoodOrder) => {
    switch (order.status) {
      case 'PENDING':
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => updateOrderStatus(order.id, 'CONFIRMED')}
            >
              Confirm
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateOrderStatus(order.id, 'CANCELLED')}
            >
              Cancel
            </Button>
          </div>
        )
      case 'CONFIRMED':
        return (
          <Button
            size="sm"
            onClick={() => updateOrderStatus(order.id, 'PREPARING')}
          >
            Start Preparing
          </Button>
        )
      case 'PREPARING':
        return (
          <Button
            size="sm"
            onClick={() => updateOrderStatus(order.id, 'READY')}
          >
            Mark Ready
          </Button>
        )
      case 'READY':
        return (
          <Button
            size="sm"
            onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
          >
            Mark Delivered
          </Button>
        )
      default:
        return null
    }
  }

  const getOrderStats = () => {
    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'PENDING').length,
      preparing: orders.filter(o => o.status === 'PREPARING').length,
      ready: orders.filter(o => o.status === 'READY').length,
      delivered: orders.filter(o => o.status === 'DELIVERED').length,
      cancelled: orders.filter(o => o.status === 'CANCELLED').length
    }

    return stats
  }

  const stats = getOrderStats()

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600">Track and manage food orders</p>
        </div>
        <Button variant="outline" onClick={() => setRefreshKey(prev => prev + 1)}>
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.preparing}</div>
            <div className="text-sm text-gray-600">Preparing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.ready}</div>
            <div className="text-sm text-gray-600">Ready</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.delivered}</div>
            <div className="text-sm text-gray-600">Delivered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Filter by Status:</span>
            <Select value={selectedStatus} onValueChange={(value: OrderStatus | 'ALL') => setSelectedStatus(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="PREPARING">Preparing</SelectItem>
                <SelectItem value="READY">Ready</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No orders found with the selected criteria.</p>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          #{order.id.slice(-8)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">Room {order.roomNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium">
                            ${order.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center text-sm">
                            <span>
                              {item.quantity}x {item.menu.name}
                              {item.notes && (
                                <span className="text-gray-500 ml-2">({item.notes})</span>
                              )}
                            </span>
                            <span className="text-gray-600">
                              ${(item.unitPrice * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {order.specialRequests && (
                        <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                          <span className="font-medium">Special Requests:</span> {order.specialRequests}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 min-w-fit">
                      {getStatusActions(order)}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}
