import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'
import { z } from 'zod'
import { logAction, AUDIT_ACTIONS } from '@/lib/audit'

const staffSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  position: z.string().min(1, 'Position is required'),
  department: z.string().min(1, 'Department is required'),
  hireDate: z.string().datetime(),
  salary: z.number().positive('Salary must be positive'),
  isActive: z.boolean().default(true),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const department = searchParams.get('department')
    const isActive = searchParams.get('isActive')

    let whereClause: any = {}

    if (department && department !== 'all') {
      whereClause.department = department
    }

    if (isActive !== null) {
      whereClause.isActive = isActive === 'true'
    }

    const staff = await prisma.staff.findMany({
      where: whereClause,
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(staff)
  } catch (error) {
    console.error('Error fetching staff:', error)
    return NextResponse.json(
      { error: 'Failed to fetch staff' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !['SUPER_ADMIN', 'MANAGER'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = staffSchema.parse(body)

    // Check if employee ID already exists
    const existingEmployee = await prisma.staff.findUnique({
      where: { employeeId: validatedData.employeeId }
    })

    if (existingEmployee) {
      return NextResponse.json(
        { error: 'Employee ID already exists' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingEmail = await prisma.staff.findUnique({
      where: { email: validatedData.email }
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    const staff = await prisma.staff.create({
      data: {
        employeeId: validatedData.employeeId,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        position: validatedData.position,
        department: validatedData.department,
        hireDate: new Date(validatedData.hireDate),
        salary: validatedData.salary,
        isActive: validatedData.isActive,
      }
    })

    // Log the action
    await logAction(
      request,
      session.user.id,
      AUDIT_ACTIONS.STAFF_CREATE,
      'Staff',
      staff.id,
      {
        employeeId: validatedData.employeeId,
        name: validatedData.name,
        position: validatedData.position,
        department: validatedData.department,
      }
    )

    return NextResponse.json(staff, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating staff:', error)
    return NextResponse.json(
      { error: 'Failed to create staff' },
      { status: 500 }
    )
  }
} 