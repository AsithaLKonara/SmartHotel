"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FoodMenuItem, CartItem, FoodCategory } from '@/types/restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Plus, Minus, X, Clock, MapPin } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function OrderPage() {
  const searchParams = useSearchParams()
  const [menuItems, setMenuItems] = useState<FoodMenuItem[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'ALL'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [roomInfo, setRoomInfo] = useState<{ roomNumber: string; guestId: string } | null>(null)

  // Extract room info from URL params
  useEffect(() => {
    const room = searchParams.get('room')
    const guest = searchParams.get('guest')
    const token = searchParams.get('token')

    if (room && guest) {
      setRoomInfo({ roomNumber: room, guestId: guest })
    } else if (token) {
      // TODO: Decode JWT token to get room info
      console.log('Token found:', token)
    }
  }, [searchParams])

  // Fetch menu items
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const params = new URLSearchParams()
        if (selectedCategory !== 'ALL') {
          params.append('category', selectedCategory)
        }
        if (searchQuery) {
          params.append('search', searchQuery)
        }

        const response = await fetch(`/api/restaurant/menu?${params}`)
        if (response.ok) {
          const data = await response.json()
          setMenuItems(data)
        }
      } catch (error) {
        console.error('Error fetching menu:', error)
        toast.error('Failed to load menu')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenu()
  }, [selectedCategory, searchQuery])

  const addToCart = (item: FoodMenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.menuItem.id === item.id)
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.menuItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        return [...prevCart, { menuItem: item, quantity: 1, notes: '' }]
      }
    })
    toast.success(`${item.name} added to cart`)
  }

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.menuItem.id !== itemId))
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.menuItem.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const updateNotes = (itemId: string, notes: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.menuItem.id === itemId
          ? { ...item, notes }
          : item
      )
    )
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0)
  }

  const placeOrder = async () => {
    if (!roomInfo || cart.length === 0) {
      toast.error('Please add items to cart and ensure room information is available')
      return
    }

    try {
      const orderData = {
        roomNumber: roomInfo.roomNumber,
        guestId: roomInfo.guestId,
        items: cart.map(item => ({
          menuId: item.menuItem.id,
          quantity: item.quantity,
          notes: item.notes
        }))
      }

      const response = await fetch('/api/restaurant/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })

      if (response.ok) {
        toast.success('Order placed successfully!')
        setCart([])
        // TODO: Redirect to order tracking page
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to place order')
      }
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order')
    }
  }

  const categories: (FoodCategory | 'ALL')[] = ['ALL', 'BREAKFAST', 'LUNCH', 'DINNER', 'BEVERAGES', 'DESSERTS', 'SNACKS', 'APPETIZERS', 'MAIN_COURSE', 'SIDES']

  if (!roomInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Invalid Access</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              This ordering portal is only accessible through a valid room QR code.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Room Service</h1>
              <p className="text-gray-600">Room {roomInfo.roomNumber}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </Badge>
                )}
              </div>
              <Button variant="outline" size="sm">
                Track Orders
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Menu Section */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <Input
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'ALL' ? 'All' : category.replace('_', ' ')}
                  </Button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-32 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      {item.image && (
                        <div className="h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
                          <span className="text-gray-500">Image</span>
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <Badge variant={item.available ? "default" : "secondary"}>
                          {item.available ? "Available" : "Unavailable"}
                        </Badge>
                      </div>
                      {item.description && (
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                          {item.preparationTime && (
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              {item.preparationTime}min
                            </div>
                          )}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addToCart(item)}
                          disabled={!item.available}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Your Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Your cart is empty. Add some delicious items!
                  </p>
                ) : (
                  <>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.menuItem.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm">{item.menuItem.name}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.menuItem.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">
                              ${item.menuItem.price.toFixed(2)} × {item.quantity}
                            </span>
                            <span className="font-medium">
                              ${(item.menuItem.price * item.quantity).toFixed(2)}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 mb-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <Input
                            placeholder="Special requests..."
                            value={item.notes}
                            onChange={(e) => updateNotes(item.menuItem.id, e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-lg">${getTotalAmount().toFixed(2)}</span>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={placeOrder}
                        disabled={cart.length === 0}
                      >
                        Place Order
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
