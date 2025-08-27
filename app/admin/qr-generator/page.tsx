"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Copy, QrCode } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function QRGeneratorPage() {
  const [roomNumber, setRoomNumber] = useState('101')
  const [guestId, setGuestId] = useState('guest123')
  const [bookingId, setBookingId] = useState('')
  const [generatedURL, setGeneratedURL] = useState('')

  const generateOrderingURL = () => {
    if (!roomNumber || !guestId) {
      toast.error('Please fill in room number and guest ID')
      return
    }

    const baseURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const params = new URLSearchParams({
      room: roomNumber,
      guest: guestId
    })
    
    if (bookingId) {
      params.append('booking', bookingId)
    }

    const url = `${baseURL}/order?${params.toString()}`
    setGeneratedURL(url)
    toast.success('Ordering URL generated!')
  }

  const copyToClipboard = async () => {
    if (!generatedURL) {
      toast.error('No URL to copy')
      return
    }

    try {
      await navigator.clipboard.writeText(generatedURL)
      toast.success('URL copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy URL')
    }
  }

  const openOrderingPage = () => {
    if (generatedURL) {
      window.open(generatedURL, '_blank')
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">QR Code Generator</h1>
          <p className="text-gray-600">Generate ordering URLs for hotel rooms</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Generate Ordering URL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="roomNumber">Room Number *</Label>
                <Input
                  id="roomNumber"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  placeholder="e.g., 101"
                />
              </div>
              <div>
                <Label htmlFor="guestId">Guest ID *</Label>
                <Input
                  id="guestId"
                  value={guestId}
                  onChange={(e) => setGuestId(e.target.value)}
                  placeholder="e.g., guest123"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bookingId">Booking ID (Optional)</Label>
              <Input
                id="bookingId"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                placeholder="e.g., booking456"
              />
            </div>

            <Button onClick={generateOrderingURL} className="w-full">
              Generate Ordering URL
            </Button>

            {generatedURL && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Label className="text-sm font-medium text-gray-700">Generated URL:</Label>
                  <div className="mt-2 p-3 bg-white border rounded text-sm break-all">
                    {generatedURL}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={copyToClipboard} className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy URL
                  </Button>
                  <Button variant="outline" onClick={openOrderingPage} className="flex-1">
                    Open Ordering Page
                  </Button>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Test Instructions:</strong>
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    1. Copy the URL above<br />
                    2. Open in a new tab<br />
                    3. Test the ordering system
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong>1. Generate URL:</strong> Enter room number and guest ID to create a unique ordering link.
              </p>
              <p>
                <strong>2. Share with Guests:</strong> Print this URL as a QR code or send it directly to guests.
              </p>
              <p>
                <strong>3. Guest Experience:</strong> Guests scan/click the link to access the room-specific ordering portal.
              </p>
              <p>
                <strong>4. Order Management:</strong> Orders appear in the admin dashboard for kitchen staff to process.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
