import nodemailer from 'nodemailer'
import { format } from 'date-fns'

interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

interface BookingEmailData {
  guestName: string
  guestEmail: string
  roomNumber: string
  roomType: string
  checkIn: Date
  checkOut: Date
  guests: number
  totalAmount: number
  bookingId: string
  specialRequests?: string
}

interface AdminAlertData {
  bookingId: string
  guestName: string
  roomNumber: string
  checkIn: Date
  checkOut: Date
  totalAmount: number
}

// Email transporter
let transporter: nodemailer.Transporter | null = null

export function initializeEmail() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('Email configuration not found. Email notifications will be disabled.')
    return false
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  } as EmailConfig)

  return true
}

// Verify email configuration
export async function verifyEmailConfig(): Promise<boolean> {
  if (!transporter) {
    return false
  }

  try {
    await transporter.verify()
    return true
  } catch (error) {
    console.error('Email configuration verification failed:', error)
    return false
  }
}

// Send email function
async function sendEmail(to: string, subject: string, html: string) {
  if (!transporter) {
    console.warn('Email transporter not initialized')
    return false
  }

  try {
    const info = await transporter.sendMail({
      from: `"SmartHotel" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    })

    console.log('Email sent:', info.messageId)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

// Email templates
function generateBookingConfirmationEmail(data: BookingEmailData): string {
  const checkInFormatted = format(data.checkIn, 'EEEE, MMMM do, yyyy')
  const checkOutFormatted = format(data.checkOut, 'EEEE, MMMM do, yyyy')
  const nights = Math.ceil((data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 60 * 60 * 24))

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - SmartHotel</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .total { font-weight: bold; font-size: 18px; color: #667eea; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
          <p>Thank you for choosing SmartHotel</p>
        </div>
        
        <div class="content">
          <p>Dear ${data.guestName},</p>
          
          <p>Your booking has been successfully confirmed! We're excited to welcome you to SmartHotel.</p>
          
          <div class="booking-details">
            <h3>Booking Details</h3>
            <div class="detail-row">
              <span><strong>Booking ID:</strong></span>
              <span>${data.bookingId}</span>
            </div>
            <div class="detail-row">
              <span><strong>Room:</strong></span>
              <span>${data.roomNumber} - ${data.roomType}</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-in:</strong></span>
              <span>${checkInFormatted}</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-out:</strong></span>
              <span>${checkOutFormatted}</span>
            </div>
            <div class="detail-row">
              <span><strong>Duration:</strong></span>
              <span>${nights} night${nights > 1 ? 's' : ''}</span>
            </div>
            <div class="detail-row">
              <span><strong>Guests:</strong></span>
              <span>${data.guests}</span>
            </div>
            <div class="detail-row total">
              <span><strong>Total Amount:</strong></span>
              <span>$${data.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          ${data.specialRequests ? `
            <div class="booking-details">
              <h3>Special Requests</h3>
              <p>${data.specialRequests}</p>
            </div>
          ` : ''}

          <p><strong>Important Information:</strong></p>
          <ul>
            <li>Check-in time: 3:00 PM</li>
            <li>Check-out time: 11:00 AM</li>
            <li>Please bring a valid ID and the credit card used for booking</li>
            <li>Free cancellation up to 24 hours before check-in</li>
          </ul>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/my-bookings" class="button">View My Bookings</a>
          </div>

          <p>If you have any questions or need to modify your booking, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>The SmartHotel Team</p>
        </div>
        
        <div class="footer">
          <p>SmartHotel | 123 Hotel Street, City, Country</p>
          <p>Phone: +1 (555) 123-4567 | Email: info@smarthotel.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateAdminAlertEmail(data: AdminAlertData): string {
  const checkInFormatted = format(data.checkIn, 'EEEE, MMMM do, yyyy')
  const checkOutFormatted = format(data.checkOut, 'EEEE, MMMM do, yyyy')

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Booking Alert - SmartHotel Admin</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .alert-box { background: #fef2f2; border: 1px solid #fecaca; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 New Booking Alert</h1>
          <p>SmartHotel Management System</p>
        </div>
        
        <div class="content">
          <div class="alert-box">
            <h3>New booking received!</h3>
            <p>A new booking has been made and requires your attention.</p>
          </div>
          
          <div class="booking-details">
            <h3>Booking Information</h3>
            <div class="detail-row">
              <span><strong>Booking ID:</strong></span>
              <span>${data.bookingId}</span>
            </div>
            <div class="detail-row">
              <span><strong>Guest Name:</strong></span>
              <span>${data.guestName}</span>
            </div>
            <div class="detail-row">
              <span><strong>Room:</strong></span>
              <span>${data.roomNumber}</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-in:</strong></span>
              <span>${checkInFormatted}</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-out:</strong></span>
              <span>${checkOutFormatted}</span>
            </div>
            <div class="detail-row">
              <span><strong>Total Amount:</strong></span>
              <span>$${data.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/admin/bookings" class="button">View Booking Details</a>
          </div>

          <p>Please review the booking and take any necessary actions.</p>
          
          <p>Best regards,<br>SmartHotel Management System</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateBookingStatusUpdateEmail(
  guestName: string,
  bookingId: string,
  roomNumber: string,
  status: string,
  checkIn: Date
): string {
  const checkInFormatted = format(checkIn, 'EEEE, MMMM do, yyyy')
  const statusColor = status === 'CONFIRMED' ? '#059669' : status === 'CANCELLED' ? '#dc2626' : '#d97706'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Status Update - SmartHotel</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: ${statusColor}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .status-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .status { font-size: 24px; font-weight: bold; color: ${statusColor}; }
        .button { display: inline-block; background: ${statusColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 Booking Status Update</h1>
          <p>SmartHotel</p>
        </div>
        
        <div class="content">
          <p>Dear ${guestName},</p>
          
          <p>Your booking status has been updated.</p>
          
          <div class="status-box">
            <div class="status">${status.replace('_', ' ')}</div>
            <p>Booking ID: ${bookingId}</p>
            <p>Room: ${roomNumber}</p>
            <p>Check-in: ${checkInFormatted}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/my-bookings" class="button">View My Bookings</a>
          </div>

          <p>If you have any questions, please contact us.</p>
          
          <p>Best regards,<br>The SmartHotel Team</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Public email functions
export async function sendBookingConfirmation(data: BookingEmailData): Promise<boolean> {
  const html = generateBookingConfirmationEmail(data)
  return await sendEmail(data.guestEmail, 'Booking Confirmation - SmartHotel', html)
}

export async function sendAdminBookingAlert(data: AdminAlertData): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER
  if (!adminEmail) {
    console.warn('Admin email not configured')
    return false
  }

  const html = generateAdminAlertEmail(data)
  return await sendEmail(adminEmail, 'New Booking Alert - SmartHotel', html)
}

export async function sendBookingStatusUpdate(
  guestEmail: string,
  guestName: string,
  bookingId: string,
  roomNumber: string,
  status: string,
  checkIn: Date
): Promise<boolean> {
  const html = generateBookingStatusUpdateEmail(guestName, bookingId, roomNumber, status, checkIn)
  return await sendEmail(guestEmail, `Booking ${status.replace('_', ' ')} - SmartHotel`, html)
}

// Initialize email on module load
initializeEmail() 