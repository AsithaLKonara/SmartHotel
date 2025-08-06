import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'
import { z } from 'zod'

const roomUpdateSchema = z.object({
  number: z.string().min(1, 'Room number is required').optional(),
  type: z.enum(['STANDARD', 'DELUXE', 'SUITE', 'PRESIDENTIAL']).optional(),
  capacity: z.number().min(1, 'Capacity must be at least 1').optional(),
  price: z.number().min(0, 'Price must be non-negative').optional(),
  description: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  isAvailable: z.boolean().optional(),
  floor: z.number().optional(),
  size: z.number().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const room = await prisma.room.findUnique({
      where: { id: params.id },
      include: {
        bookings: {
          where: {
            status: {
              in: ['CONFIRMED', 'CHECKED_IN']
            }
          },
          orderBy: { checkIn: 'asc' }
        }
      }
    })

    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(room)
  } catch (error) {
    console.error('Error fetching room:', error)
    return NextResponse.json(
      { error: 'Failed to fetch room' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !['SUPER_ADMIN', 'MANAGER'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = roomUpdateSchema.parse(body)

    // Check if room number already exists (if being updated)
    if (validatedData.number) {
      const existingRoom = await prisma.room.findFirst({
        where: {
          number: validatedData.number,
          id: { not: params.id }
        }
      })

      if (existingRoom) {
        return NextResponse.json(
          { error: 'Room number already exists' },
          { status: 400 }
        )
      }
    }

    const room = await prisma.room.update({
      where: { id: params.id },
      data: validatedData
    })

    return NextResponse.json(room)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating room:', error)
    return NextResponse.json(
      { error: 'Failed to update room' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if room has active bookings
    const activeBookings = await prisma.booking.findFirst({
      where: {
        roomId: params.id,
        status: {
          in: ['CONFIRMED', 'CHECKED_IN']
        }
      }
    })

    if (activeBookings) {
      return NextResponse.json(
        { error: 'Cannot delete room with active bookings' },
        { status: 400 }
      )
    }

    await prisma.room.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Room deleted successfully' })
  } catch (error) {
    console.error('Error deleting room:', error)
    return NextResponse.json(
      { error: 'Failed to delete room' },
      { status: 500 }
    )
  }
} 