"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Plus, Edit, Trash2, CheckCircle, Clock, AlertTriangle, User, Calendar, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

interface Task {
  id: string
  title: string
  description?: string
  type: string
  priority: string
  status: string
  assignedTo?: string
  createdBy?: string
  dueDate?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
  staff?: {
    id: string
    name: string
    email: string
  }
  user?: {
    id: string
    name: string
    email: string
  }
}

interface Staff {
  id: string
  name: string
  email: string
  position: string
  department: string
}

export default function TasksPage() {
  const { data: session } = useSession()
  const [tasks, setTasks] = useState<Task[]>([])
  const [staff, setStaff] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'HOUSEKEEPING',
    priority: 'MEDIUM',
    assignedTo: '',
    dueDate: '',
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [tasksResponse, staffResponse] = await Promise.all([
        fetch('/api/tasks'),
        fetch('/api/staff')
      ])

      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json()
        setTasks(tasksData)
      }

      if (staffResponse.ok) {
        const staffData = await staffResponse.json()
        setStaff(staffData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingTask ? `/api/tasks/${editingTask.id}` : '/api/tasks'
      const method = editingTask ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(editingTask ? 'Task updated successfully' : 'Task created successfully')
        setShowCreateModal(false)
        setEditingTask(null)
        resetForm()
        fetchData()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save task')
      }
    } catch (error) {
      console.error('Error saving task:', error)
      toast.error('Failed to save task')
    }
  }

  const handleDelete = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Task deleted successfully')
        fetchData()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to delete task')
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      toast.error('Failed to delete task')
    }
  }

  const handleStatusUpdate = async (taskId: string, status: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status,
          completedAt: status === 'COMPLETED' ? new Date().toISOString() : null
        }),
      })

      if (response.ok) {
        toast.success('Task status updated successfully')
        fetchData()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to update task')
      }
    } catch (error) {
      console.error('Error updating task:', error)
      toast.error('Failed to update task')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'HOUSEKEEPING',
      priority: 'MEDIUM',
      assignedTo: '',
      dueDate: '',
    })
  }

  const openEditModal = (task: Task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description || '',
      type: task.type,
      priority: task.priority,
      assignedTo: task.assignedTo || '',
      dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '',
    })
    setShowCreateModal(true)
  }

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      const statusMatch = filter === 'all' || task.status === filter
      const typeMatch = filterType === 'all' || task.type === filterType
      const priorityMatch = filterPriority === 'all' || task.priority === filterPriority
      return statusMatch && typeMatch && priorityMatch
    })
  }

  const getStatusColor = (status: string) => {
    const colors = {
      'PENDING': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'IN_PROGRESS': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'COMPLETED': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'CANCELLED': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    }
    return colors[status as keyof typeof colors] || colors['PENDING']
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      'LOW': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      'MEDIUM': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'HIGH': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    }
    return colors[priority as keyof typeof colors] || colors['MEDIUM']
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      'HOUSEKEEPING': '🧹',
      'MAINTENANCE': '🔧',
      'ROOM_SERVICE': '🍽️',
      'CONCIERGE': '🎫',
      'OTHER': '📋',
    }
    return icons[type as keyof typeof icons] || '📋'
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Task Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Assign and manage hotel tasks for staff
              </p>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="all">All Types</option>
                  <option value="HOUSEKEEPING">Housekeeping</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="ROOM_SERVICE">Room Service</option>
                  <option value="CONCIERGE">Concierge</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="all">All Priorities</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilter('all')
                    setFilterType('all')
                    setFilterPriority('all')
                  }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredTasks().map((task) => (
            <Card key={task.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getTypeIcon(task.type)}</span>
                    <div>
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <p className="text-sm text-gray-500">{task.type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditModal(task)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(task.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {task.description && (
                  <p className="text-gray-600 mb-4">{task.description}</p>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(task.status)}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>

                  {task.assignedTo && task.staff && (
                    <div className="flex items-center text-sm">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      <span>Assigned to: {task.staff.name}</span>
                    </div>
                  )}

                  {task.dueDate && (
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span>Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                    </div>
                  )}

                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Created: {format(new Date(task.createdAt), 'MMM d, yyyy')}</span>
                  </div>

                  {task.completedAt && (
                    <div className="flex items-center text-sm text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>Completed: {format(new Date(task.completedAt), 'MMM d, yyyy')}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-2">
                  {task.status === 'PENDING' && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(task.id, 'IN_PROGRESS')}
                      className="flex-1"
                    >
                      Start
                    </Button>
                  )}
                  {task.status === 'IN_PROGRESS' && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(task.id, 'COMPLETED')}
                      className="flex-1"
                    >
                      Complete
                    </Button>
                  )}
                  {task.status !== 'COMPLETED' && task.status !== 'CANCELLED' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(task.id, 'CANCELLED')}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {getFilteredTasks().length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {filter !== 'all' || filterType !== 'all' || filterPriority !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Create your first task to get started'
                }
              </p>
              {filter === 'all' && filterType === 'all' && filterPriority === 'all' && (
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Task
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Create/Edit Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="HOUSEKEEPING">Housekeeping</option>
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="ROOM_SERVICE">Room Service</option>
                    <option value="CONCIERGE">Concierge</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Assign To</label>
                  <select
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Unassigned</option>
                    {staff.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name} - {member.position}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingTask ? 'Update Task' : 'Create Task'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateModal(false)
                      setEditingTask(null)
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