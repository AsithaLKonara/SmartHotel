"use client"

import { useState, useEffect } from 'react'
import { FoodMenuItem, FoodCategory } from '@/types/restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<FoodMenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'ALL'>('ALL')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<FoodMenuItem | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '' as FoodCategory,
    image: '',
    preparationTime: '',
    available: true
  })

  const categories: FoodCategory[] = ['BREAKFAST', 'LUNCH', 'DINNER', 'BEVERAGES', 'DESSERTS', 'SNACKS', 'APPETIZERS', 'MAIN_COURSE', 'SIDES']

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      setIsLoading(true)
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
      console.error('Error fetching menu items:', error)
      toast.error('Failed to load menu items')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'BREAKFAST',
      image: '',
      preparationTime: '',
      available: true
    })
    setEditingItem(null)
  }

  const openCreateDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (item: FoodMenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description || '',
      price: item.price.toString(),
      category: item.category,
      image: item.image || '',
      preparationTime: item.preparationTime?.toString() || '',
      available: item.available
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const url = editingItem 
        ? `/api/restaurant/menu/${editingItem.id}`
        : '/api/restaurant/menu'
      
      const method = editingItem ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          preparationTime: formData.preparationTime ? parseInt(formData.preparationTime) : null
        })
      })

      if (response.ok) {
        toast.success(editingItem ? 'Menu item updated successfully!' : 'Menu item created successfully!')
        setIsDialogOpen(false)
        resetForm()
        fetchMenuItems()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save menu item')
      }
    } catch (error) {
      console.error('Error saving menu item:', error)
      toast.error('Failed to save menu item')
    }
  }

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) {
      return
    }

    try {
      const response = await fetch(`/api/restaurant/menu/${itemId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Menu item deleted successfully!')
        fetchMenuItems()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to delete menu item')
      }
    } catch (error) {
      console.error('Error deleting menu item:', error)
      toast.error('Failed to delete menu item')
    }
  }

  const toggleAvailability = async (item: FoodMenuItem) => {
    try {
      const response = await fetch(`/api/restaurant/menu/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          available: !item.available
        })
      })

      if (response.ok) {
        toast.success(`Menu item ${item.available ? 'unavailable' : 'available'} successfully!`)
        fetchMenuItems()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to update availability')
      }
    } catch (error) {
      console.error('Error updating availability:', error)
      toast.error('Failed to update availability')
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600">Manage your restaurant menu items</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Menu Item
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={(value: FoodCategory | 'ALL') => setSelectedCategory(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={fetchMenuItems}>
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Grid */}
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
                
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                  {item.preparationTime && (
                    <span className="text-gray-500 text-sm">{item.preparationTime} min</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{item.category.replace('_', ' ')}</Badge>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAvailability(item)}
                    >
                      {item.available ? 'Make Unavailable' : 'Make Available'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value: FoodCategory) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preparationTime">Prep Time (min)</Label>
                <Input
                  id="preparationTime"
                  type="number"
                  min="0"
                  value={formData.preparationTime}
                  onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="available"
                checked={formData.available}
                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="available">Available</Label>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingItem ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
