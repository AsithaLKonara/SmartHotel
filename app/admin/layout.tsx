"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { 
  LayoutDashboard, 
  Bed, 
  Calendar, 
  Users, 
  Settings, 
  FileText, 
  Package, 
  ClipboardList,
  BarChart3,
  Image as ImageIcon,
  LogOut,
  Menu,
  X,
  Building2,
  CheckSquare,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  QrCode
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import ProtectedRoute from '@/components/protected-route'
import toast from 'react-hot-toast'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'MANAGER', 'RECEPTIONIST'] },
  { name: 'Hotels', href: '/admin/hotels', icon: Building2, roles: ['SUPER_ADMIN'] },
  { name: 'Rooms', href: '/admin/rooms', icon: Bed, roles: ['SUPER_ADMIN', 'MANAGER', 'RECEPTIONIST'] },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar, roles: ['SUPER_ADMIN', 'MANAGER', 'RECEPTIONIST'] },
  { name: 'Calendar View', href: '/admin/calendar', icon: Calendar, roles: ['SUPER_ADMIN', 'MANAGER'] },
  { name: 'Check-in/Check-out', href: '/admin/dashboard/checkin-checkout', icon: ArrowRight, roles: ['SUPER_ADMIN', 'MANAGER', 'RECEPTIONIST'] },
  { name: 'Tasks', href: '/admin/tasks', icon: CheckSquare, roles: ['SUPER_ADMIN', 'MANAGER'] },
  { name: 'QR Codes', href: '/admin/qr-codes', icon: QrCode, roles: ['SUPER_ADMIN', 'MANAGER', 'RECEPTIONIST'] },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, roles: ['SUPER_ADMIN', 'MANAGER'] },
  { name: 'Guests', href: '/admin/guests', icon: Users, roles: ['SUPER_ADMIN', 'MANAGER', 'RECEPTIONIST'] },
  { name: 'Staff', href: '/admin/staff', icon: Users, roles: ['SUPER_ADMIN', 'MANAGER'] },
  { name: 'Housekeeping', href: '/admin/housekeeping', icon: ClipboardList, roles: ['SUPER_ADMIN', 'MANAGER'] },
  { name: 'Inventory', href: '/admin/inventory', icon: Package, roles: ['SUPER_ADMIN', 'MANAGER'] },
  { name: 'Billing', href: '/admin/billing', icon: FileText, roles: ['SUPER_ADMIN', 'MANAGER'] },
  { name: 'Reports', href: '/admin/reports', icon: BarChart3, roles: ['SUPER_ADMIN', 'MANAGER'] },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon, roles: ['SUPER_ADMIN', 'MANAGER'] },
  { name: 'Settings', href: '/admin/settings', icon: Settings, roles: ['SUPER_ADMIN'] },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' })
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter(item => 
    session?.user?.role && item.roles.includes(session.user.role)
  )

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white dark:bg-gray-800">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold">SmartHotel</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={cn(
        "hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300",
        sidebarCollapsed ? "lg:w-16" : "lg:w-64"
      )}>
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-primary-600" />
              {!sidebarCollapsed && <span className="text-xl font-bold">SmartHotel</span>}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  )}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <item.icon className={cn("h-5 w-5", sidebarCollapsed ? "mx-auto" : "mr-3")} />
                  {!sidebarCollapsed && item.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20",
                sidebarCollapsed && "justify-center"
              )}
              onClick={handleLogout}
              title={sidebarCollapsed ? "Logout" : undefined}
            >
              <LogOut className={cn("h-5 w-5", sidebarCollapsed ? "mx-auto" : "mr-3")} />
              {!sidebarCollapsed && "Logout"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn("transition-all duration-300", sidebarCollapsed ? "lg:pl-16" : "lg:pl-64")}>
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Profile dropdown would go here */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {session?.user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-sm font-medium">{session?.user?.name || 'Admin User'}</span>
                  <p className="text-xs text-gray-500 capitalize">{session?.user?.role?.toLowerCase().replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
    </ProtectedRoute>
  )
} 