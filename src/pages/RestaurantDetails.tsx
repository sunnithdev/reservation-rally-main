import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Clock, ChefHat, DollarSign, MapPin, Utensils, Calendar, ArrowLeft } from "lucide-react"
import { useToast } from "../hooks/use-toast"
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RestaurantDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [restaurant, setRestaurant] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [email, setEmail] = useState<string>("")

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`https://table-master-backend.onrender.com/api/restaurants/${id}`)
        if (!response.ok) {
          throw new Error("Restaurant not found")
        }

        const data = await response.json()
        setRestaurant(data)
      } catch (err: any) {
        setError(err.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchRestaurantDetails()
    }
  }, [id])

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedSlot(null)
  }

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot)
  }

  const handleBooking = ({
    restaurantId,
    restaurantName,
    selectedDate,
    selectedSlot,
    selectedTimeSlotPrice,
  }: {
    restaurantId: string
    restaurantName: string
    selectedDate: string
    selectedSlot: string
    selectedTimeSlotPrice: number
  }) => {
    localStorage.setItem(
      "bookingDetails",
      JSON.stringify({
        restaurantId,
        restaurantName,
        selectedDate,
        selectedSlot,
        selectedTimeSlotPrice,
        timestamp: new Date().toISOString(),
      }),
    )
    navigate(`/checkout/${restaurantId}`)
  }

  const handleJoinWaitlist = async () => {
    if (!email) {
      toast({
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("https://table-master-backend.onrender.com/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          restaurantId: id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to join waitlist")
      }

      toast({
        description: "You have successfully joined the waitlist. We'll notify you when slots are available.",
      })
      setEmail("")
    } catch (error) {
      console.error("Error joining waitlist:", error)
      toast({
        description: "Failed to join the waitlist. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 max-w-md text-center">
            <CardContent>
              <h1 className="text-3xl font-semibold mb-4">Loading...</h1>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="p-6 max-w-md text-center">
            <CardContent>
              <h1 className="text-3xl font-semibold mb-4">404 - Restaurant Not Found</h1>
              <p>{error || "The restaurant you're looking for is not available or has been removed."}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const availableTimeSlots = selectedDate
    ? restaurant.available_dates.find((d: any) => d.date === selectedDate)?.time_slots || []
    : []

  const selectedTimeSlotPrice = selectedSlot
    ? availableTimeSlots.find((slot: any) => slot.time === selectedSlot)?.price
    : null

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden"
      >
        <Button
          variant="ghost"
          className="absolute top-4 left-4 z-10 text-white hover:bg-white/20"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <img
          src={restaurant.images[0] || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-12 text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                {restaurant.michelin && (
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    <ChefHat className="w-4 h-4 mr-1" />
                    Michelin Starred
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                  <Star className="w-4 h-4 mr-1" />
                  {restaurant.rating}
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{restaurant.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {restaurant.address}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {restaurant.priceRange}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="md:col-span-1 lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{restaurant.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {restaurant.images.slice(1).map((image: string, index: number) => (
                <motion.img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${restaurant.name} interior ${index + 1}`}
                  className="rounded-lg object-cover w-full h-48"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.features.map((feature: string) => (
                      <Badge key={feature} variant="outline">
                        <Utensils className="w-3 h-3 mr-1" />
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Booking */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="md:col-span-1"
          >
            <Card className="md:sticky md:top-4">
              <CardHeader>
                <CardTitle>Make a Reservation</CardTitle>
              </CardHeader>
              <CardContent>
                {restaurant.available_dates.length === 0 ? (
                  <div className="space-y-4">
                    <p>No slots available currently.</p>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                        Join the waitlist
                      </label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <Button className="w-full" onClick={handleJoinWaitlist}>
                      Join Waitlist
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Available Dates</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {restaurant.available_dates.map((date: any) => (
                          <Button
                            key={date.date}
                            variant={selectedDate === date.date ? "default" : "outline"}
                            className="w-full"
                            onClick={() => handleDateSelect(date.date)}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            {date.date}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Available Time Slots</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {availableTimeSlots.map((slot: any) => (
                          <Button
                            key={slot.time}
                            variant={selectedSlot === slot.time ? "default" : "outline"}
                            className="w-full"
                            onClick={() => handleSlotSelect(slot.time)}
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            {slot.time} - ${slot.price}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {selectedSlot && selectedTimeSlotPrice && (
                      <div className="text-lg font-semibold mt-4">
                        <span>Total Price: </span>
                        <DollarSign className="inline-block w-5 h-5" />
                        {selectedTimeSlotPrice}
                      </div>
                    )}

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() =>
                        handleBooking({
                          restaurantId: id as string,
                          restaurantName: restaurant.name,
                          selectedDate: selectedDate!,
                          selectedSlot: selectedSlot!,
                          selectedTimeSlotPrice: selectedTimeSlotPrice!,
                        })
                      }
                      disabled={!selectedSlot}
                    >
                      <Clock className="mr-2" />
                      Book Now
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      Premium members get priority access to exclusive time slots
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

