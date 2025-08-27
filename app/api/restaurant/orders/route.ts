import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { CreateOrderRequest, UpdateOrderStatusRequest } from '@/types/restaurant'

// GET /api/restaurant/orders - Get all orders with filters
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const roomNumber = searchParams.get('roomNumber')
    const guestId = searchParams.get('guestId')

    const where: any = {}

    if (status) {
      where.status = status
    }

    if (roomNumber) {
      where.roomNumber = roomNumber
    }

    if (guestId) {
      where.guestId = guestId
    }

    // If user is not admin, only show their own orders
    if (session.user.role === 'GUEST') {
      where.guestId = session.user.id
    }

    const orders = await prisma.foodOrder.findMany({
      where,
      include: {
        items: {
          include: {
            menu: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST /api/restaurant/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json()
    const { roomNumber, guestId, bookingId, items, specialRequests } = body

    if (!roomNumber || !guestId || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate total amount and validate items
    let totalAmount = 0
    const orderItems = []

    for (const item of items) {
      const menuItem = await prisma.foodMenu.findUnique({
        where: { id: item.menuId }
      })

      if (!menuItem) {
        return NextResponse.json(
          { error: `Menu item ${item.menuId} not found` },
          { status: 400 }
        )
      }

      if (!menuItem.available) {
        return NextResponse.json(
          { error: `Menu item ${menuItem.name} is not available` },
          { status: 400 }
        )
      }

      totalAmount += menuItem.price * item.quantity
      orderItems.push({
        menuId: item.menuId,
        quantity: item.quantity,
        unitPrice: menuItem.price,
        notes: item.notes
      })
    }

    // Create order with items
    const order = await prisma.foodOrder.create({
      data: {
        roomNumber,
        guestId,
        bookingId,
        totalAmount,
        specialRequests,
        items: {
          create: orderItems
        }
      },
      include: {
        items: {
          include: {
            menu: true
          }
        }
      }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

// PATCH /api/restaurant/orders - Update order status
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !['SUPER_ADMIN', 'MANAGER', 'RECEPTIONIST'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body: UpdateOrderStatusRequest = await request.json()
    const { orderId, status, deliveryTime } = body

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const order = await prisma.foodOrder.update({
      where: { id: orderId },
      data: {
        status,
        deliveryTime: deliveryTime ? new Date(deliveryTime) : null
      },
      include: {
        items: {
          include: {
            menu: true
          }
        }
      }
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
