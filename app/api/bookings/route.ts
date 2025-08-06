import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'
import { z } from 'zod'

const bookingSchema = z.object({
  roomId: z.string().min(1, 'Room ID is required'),
  checkIn: z.string().datetime(),
  checkOut: z.string().datetime(),
  guests: z.number().min(1, 'At least 1 guest required'),
  totalAmount: z.number().min(0, 'Total amount must be non-negative'),
  paymentMethod: z.string().optional(),
  specialRequests: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    
    const status = searchParams.get('status')
    const userId = searchParams.get('userId')
    const roomId = searchParams.get('roomId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: any = {}

    // Filter by user role
    if (session?.user.role === 'GUEST') {
      where.userId = session.user.id
    } else if (userId) {
      where.userId = userId
    }

    if (status && status !== 'all') {
      where.status = status
    }

    if (roomId) {
      where.roomId = roomId
    }

    if (startDate || endDate) {
      where.OR = []
      if (startDate) {
        where.OR.push({
          checkIn: { gte: new Date(startDate) }
        })
      }
      if (endDate) {
        where.OR.push({
          checkOut: { lte: new Date(endDate) }
        })
      }
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          }
        },
        room: {
          select: {
            id: true,
            number: true,
            type: true,
            price: true,
          }
        },
        invoice: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = bookingSchema.parse(body)

    // Check if room exists and is available
    const room = await prisma.room.findUnique({
      where: { id: validatedData.roomId }
    })

    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      )
    }

    if (!room.isAvailable) {
      return NextResponse.json(
        { error: 'Room is not available' },
        { status: 400 }
      )
    }

    // Check for booking conflicts
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        roomId: validatedData.roomId,
        status: {
          in: ['CONFIRMED', 'CHECKED_IN']
        },
        OR: [
          {
            checkIn: { lt: new Date(validatedData.checkOut) },
            checkOut: { gt: new Date(validatedData.checkIn) }
          }
        ]
      }
    })

    if (conflictingBooking) {
      return NextResponse.json(
        { error: 'Room is not available for the selected dates' },
        { status: 400 }
      )
    }

    // Calculate total amount if not provided
    let totalAmount = validatedData.totalAmount
    if (!totalAmount) {
      const checkIn = new Date(validatedData.checkIn)
      const checkOut = new Date(validatedData.checkOut)
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      totalAmount = room.price * nights
    }

    const booking = await prisma.booking.create({
      data: {
        ...validatedData,
        userId: session.user.id,
        totalAmount,
        checkIn: new Date(validatedData.checkIn),
        checkOut: new Date(validatedData.checkOut),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        room: {
          select: {
            id: true,
            number: true,
            type: true,
            price: true,
          }
        },
      }
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
} 