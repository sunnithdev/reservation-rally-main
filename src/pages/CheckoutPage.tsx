
export interface BookingDetails {
  restaurantId: string;
  restaurantName: string;
  selectedDate: string;
  selectedSlot: string;
  selectedTimeSlotPrice: number;
  timestamp: string;
}

export interface CheckoutData {
  email: string;
  bookingDetails: BookingDetails;
}

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { loadStripe } from '@stripe/stripe-js'
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Clock, Calendar, DollarSign, User } from 'lucide-react'
import { supabase } from '@/contexts/AuthContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_TEST_KEY)

export default function CheckoutPage() {
  const { restaurantId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
      if (session?.user) {
        setEmail(session.user.email || '')
      }
    }

    const details = localStorage.getItem('bookingDetails')
    if (details) {
      setBookingDetails(JSON.parse(details))
    }

    checkAuth()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }

  const handleEmailSubmit = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      })
      return
    }
    localStorage.setItem('guestEmail', email)
    await handlePayment(email)
  }

  const handleLoginSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/checkout/${restaurantId}`
        }
      })
      
      if (error) throw error
    } catch (error) {
      console.error('Error with auth:', error)
      toast({
        title: "Authentication failed",
        description: "Please try again or continue as a guest",
        variant: "destructive",
      })
    }
  }

  const handlePayment = async (userEmail: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('https://table-master-backend.onrender.com/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          bookingDetails
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create checkout session')
      }
  
      const { sessionId } = await response.json()
  
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe not initialized')
      }
  
      const { error } = await stripe.redirectToCheckout({ sessionId })
  
      if (error) {
        throw error
      }
    } catch (err: any) {
      console.error('Payment error:', err)
      toast({
        title: "Payment failed",
        description: `${err.message}. Please try again or contact support.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!bookingDetails) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-center">No booking details found. Please make a reservation first.</p>
          <Button className="w-full mt-4" onClick={() => navigate(`/restaurant/${restaurantId}`)}>
            Go back to restaurant
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Booking Confirmation</CardTitle>
          <CardDescription>Review your booking details and proceed to payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 p-4 bg-secondary/10 rounded-lg">
            <h3 className="font-bold text-lg">Booking Details</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">Restaurant:</span> {bookingDetails.restaurantName}
              </p>
              <p className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="font-medium">Date:</span> {formatDate(bookingDetails.selectedDate)}
              </p>
              <p className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium">Time:</span> {formatTime(bookingDetails.selectedSlot)}
              </p>
              <p className="flex items-center text-lg font-bold">
                <DollarSign className="w-5 h-5 mr-2" />
                <span>Price:</span> ${bookingDetails.selectedTimeSlotPrice.toFixed(2)}
              </p>
            </div>
          </div>

          {!isLoggedIn && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Continue as guest</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={handleEmailSubmit} className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Continue to Payment"}
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <Button
                onClick={handleLoginSignup}
                variant="outline"
                className="w-full"
              >
                Login/Sign up with Google
              </Button>
            </div>
          )}

          {isLoggedIn && (
            <Button
              onClick={() => handlePayment(email)}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : `Proceed to Payment ($${bookingDetails.selectedTimeSlotPrice.toFixed(2)})`}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
