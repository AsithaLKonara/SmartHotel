"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Calendar, Users, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navigation from '@/components/navigation'
import { formatPrice } from '@/lib/utils'

export default function BookingPage() {
  const searchParams = useSearchParams()
  const selectedRoomId = searchParams.get('room')
  
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomId: selectedRoomId || '',
    guestDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      specialRequests: ''
    },
    paymentMethod: 'card'
  })

  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [nights, setNights] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    if (selectedRoomId) {
      const room = rooms.find(r => r.id.toString() === selectedRoomId)
      setSelectedRoom(room)
    }
  }, [selectedRoomId])

  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn)
      const checkOut = new Date(bookingData.checkOut)
      const diffTime = checkOut.getTime() - checkIn.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setNights(diffDays)
      
      if (selectedRoom && diffDays > 0) {
        setTotalAmount(selectedRoom.price * diffDays)
      }
    }
  }, [bookingData.checkIn, bookingData.checkOut, selectedRoom])

  const handleInputChange = (field: string, value: any) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGuestDetailsChange = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      guestDetails: {
        ...prev.guestDetails,
        [field]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Handle final booking submission
      console.log('Booking submitted:', bookingData)
      // Here you would typically send the data to your API
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return bookingData.checkIn && bookingData.checkOut && bookingData.guests > 0
      case 2:
        return bookingData.guestDetails.firstName && 
               bookingData.guestDetails.lastName && 
               bookingData.guestDetails.email
      case 3:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Header */}
      <section className="pt-20 pb-8 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-serif font-bold">Book Your Stay</h1>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber ? 'bg-white text-primary-600' : 'bg-white/20 text-white'
                }`}>
                  {step > stepNumber ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{stepNumber}</span>
                  )}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-white' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Dates and Guests */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Select Dates & Guests</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Check-in Date</label>
                        <input
                          type="date"
                          value={bookingData.checkIn}
                          onChange={(e) => handleInputChange('checkIn', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Check-out Date</label>
                        <input
                          type="date"
                          value={bookingData.checkOut}
                          onChange={(e) => handleInputChange('checkOut', e.target.value)}
                          min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                          className="input-field"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Guests</label>
                      <select
                        value={bookingData.guests}
                        onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                        className="input-field"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>

                    {!selectedRoomId && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Select Room Type</label>
                        <select
                          value={bookingData.roomId}
                          onChange={(e) => handleInputChange('roomId', e.target.value)}
                          className="input-field"
                          required
                        >
                          <option value="">Choose a room...</option>
                          {rooms.map(room => (
                            <option key={room.id} value={room.id}>
                              {room.name} - {formatPrice(room.price)}/night
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Guest Details */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Guest Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          value={bookingData.guestDetails.firstName}
                          onChange={(e) => handleGuestDetailsChange('firstName', e.target.value)}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          value={bookingData.guestDetails.lastName}
                          onChange={(e) => handleGuestDetailsChange('lastName', e.target.value)}
                          className="input-field"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={bookingData.guestDetails.email}
                          onChange={(e) => handleGuestDetailsChange('email', e.target.value)}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          value={bookingData.guestDetails.phone}
                          onChange={(e) => handleGuestDetailsChange('phone', e.target.value)}
                          className="input-field"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <textarea
                        value={bookingData.guestDetails.address}
                        onChange={(e) => handleGuestDetailsChange('address', e.target.value)}
                        className="input-field"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Special Requests</label>
                      <textarea
                        value={bookingData.guestDetails.specialRequests}
                        onChange={(e) => handleGuestDetailsChange('specialRequests', e.target.value)}
                        className="input-field"
                        rows={3}
                        placeholder="Any special requests or preferences..."
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          value="card"
                          checked={bookingData.paymentMethod === 'card'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        />
                        <label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                          <CreditCard className="w-5 h-5" />
                          <span>Credit/Debit Card</span>
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <input
                          type="radio"
                          id="payLater"
                          name="paymentMethod"
                          value="payLater"
                          checked={bookingData.paymentMethod === 'payLater'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        />
                        <label htmlFor="payLater" className="cursor-pointer">
                          Pay at Hotel
                        </label>
                      </div>
                    </div>

                    {bookingData.paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="input-field"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="input-field"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">CVV</label>
                            <input
                              type="text"
                              placeholder="123"
                              className="input-field"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                    >
                      Previous
                    </Button>
                  )}
                  <div className="ml-auto">
                    {step < 3 ? (
                      <Button
                        type="submit"
                        disabled={!isStepValid()}
                        className="btn-primary"
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="btn-luxury"
                      >
                        Confirm Booking
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
              
              {selectedRoom && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{selectedRoom.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedRoom.type}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Check-in:</span>
                      <span>{bookingData.checkIn || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-out:</span>
                      <span>{bookingData.checkOut || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nights:</span>
                      <span>{nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests:</span>
                      <span>{bookingData.guests}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span>{formatPrice(totalAmount)}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Includes taxes and fees
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const rooms = [
  {
    id: 1,
    name: "Deluxe Suite",
    type: "Suite",
    price: 299,
    image: "/images/room-deluxe.jpg"
  },
  {
    id: 2,
    name: "Executive Room",
    type: "Deluxe",
    price: 199,
    image: "/images/room-executive.jpg"
  },
  {
    id: 3,
    name: "Presidential Suite",
    type: "Presidential",
    price: 599,
    image: "/images/room-presidential.jpg"
  },
  {
    id: 4,
    name: "Standard Room",
    type: "Standard",
    price: 129,
    image: "/images/room-standard.jpg"
  }
] 