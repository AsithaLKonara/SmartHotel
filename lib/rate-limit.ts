import { NextRequest, NextResponse } from 'next/server'

interface RateLimitConfig {
  interval: number // Time window in milliseconds
  limit: number // Maximum requests per interval
}

class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map()

  constructor(private config: RateLimitConfig) {}

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const record = this.requests.get(identifier)

    if (!record || now > record.resetTime) {
      // First request or reset time passed
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.config.interval
      })
      return true
    }

    if (record.count >= this.config.limit) {
      return false
    }

    record.count++
    return true
  }

  getRemaining(identifier: string): number {
    const record = this.requests.get(identifier)
    if (!record) return this.config.limit
    return Math.max(0, this.config.limit - record.count)
  }

  getResetTime(identifier: string): number {
    const record = this.requests.get(identifier)
    return record?.resetTime || Date.now() + this.config.interval
  }
}

// Create rate limiters for different endpoints
const authLimiter = new RateLimiter({ interval: 15 * 60 * 1000, limit: 5 }) // 5 attempts per 15 minutes
const bookingLimiter = new RateLimiter({ interval: 60 * 1000, limit: 10 }) // 10 requests per minute
const apiLimiter = new RateLimiter({ interval: 60 * 1000, limit: 100 }) // 100 requests per minute

export function getClientIdentifier(req: NextRequest): string {
  // Use IP address as identifier
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : req.ip || 'unknown'
  return ip
}

export function rateLimit(
  req: NextRequest,
  type: 'auth' | 'booking' | 'api' = 'api'
): { allowed: boolean; remaining: number; resetTime: number } {
  const identifier = getClientIdentifier(req)
  let limiter: RateLimiter

  switch (type) {
    case 'auth':
      limiter = authLimiter
      break
    case 'booking':
      limiter = bookingLimiter
      break
    default:
      limiter = apiLimiter
  }

  const allowed = limiter.isAllowed(identifier)
  const remaining = limiter.getRemaining(identifier)
  const resetTime = limiter.getResetTime(identifier)

  return { allowed, remaining, resetTime }
}

export function createRateLimitResponse(
  remaining: number,
  resetTime: number
): NextResponse {
  const resetDate = new Date(resetTime).toISOString()
  
  return NextResponse.json(
    { 
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      resetTime: resetDate
    },
    { 
      status: 429,
      headers: {
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetDate,
        'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString()
      }
    }
  )
} 