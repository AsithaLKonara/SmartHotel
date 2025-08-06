"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles = ['SUPER_ADMIN', 'MANAGER', 'RECEPTIONIST'], 
  redirectTo = '/auth/signin' 
}: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push(redirectTo)
      return
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
      router.push('/')
      return
    }
  }, [session, status, router, allowedRoles, redirectTo])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  if (!session || (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role))) {
    return null
  }

  return <>{children}</>
} 