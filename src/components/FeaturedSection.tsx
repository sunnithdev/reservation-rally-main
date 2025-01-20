import { Star, Heart, Zap, Trophy, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { RestaurantListItem } from './RestaurantListItem'

const TRENDING_RESTAURANTS = [
  {
    id: 1,
    name: "Le Bernardin",
    rating: 4.9,
    reviews: 282,
    cuisine: "French Fine Dining",
    priceRange: "$$$$",
    district: "Theater District",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Daniel",
    rating: 4.8,
    reviews: 434,
    cuisine: "French",
    priceRange: "$$$$",
    district: "Upper East Side",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Atomix",
    rating: 4.9,
    reviews: 521,
    cuisine: "Contemporary Korean",
    priceRange: "$$$$",
    district: "NoMad",
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Eleven Madison Park",
    rating: 4.8,
    reviews: 612,
    cuisine: "Contemporary American",
    priceRange: "$$$$",
    district: "Flatiron",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
  }
]

const TOP_RATED = [
  {
    id: 5,
    name: "Masa",
    rating: 4.9,
    reviews: 655,
    cuisine: "Japanese Omakase",
    priceRange: "$$$$",
    district: "Columbus Circle",
    image: "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Per Se",
    rating: 4.8,
    reviews: 366,
    cuisine: "French",
    priceRange: "$$$$",
    district: "Columbus Circle",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Jean-Georges",
    rating: 4.8,
    reviews: 434,
    cuisine: "French",
    priceRange: "$$$$",
    district: "Central Park",
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Le Pavillon",
    rating: 4.8,
    reviews: 414,
    cuisine: "French",
    priceRange: "$$$$",
    district: "Midtown",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
  }
]

const NEW_ARRIVALS = [
  {
    id: 9,
    name: "Saga",
    rating: 4.7,
    reviews: 228,
    cuisine: "Contemporary American",
    priceRange: "$$$$",
    district: "Financial District",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 10,
    name: "Yoshino",
    rating: 4.8,
    reviews: 128,
    cuisine: "Japanese Omakase",
    priceRange: "$$$$",
    district: "NoHo",
    image: "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 11,
    name: "63 Clinton",
    rating: 4.8,
    reviews: 156,
    cuisine: "Contemporary American",
    priceRange: "$$$",
    district: "Lower East Side",
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 12,
    name: "Tatiana",
    rating: 4.7,
    reviews: 198,
    cuisine: "Contemporary American",
    priceRange: "$$$",
    district: "Lincoln Center",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
  }
]

export function FeaturedSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16 text-gold">
          Featured Restaurants
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Trending Section */}
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-6 h-6 text-white" />
              <h3 className="text-xl font-semibold text-white">Trending</h3>
            </div>
            <div className="space-y-4">
              {TRENDING_RESTAURANTS.map((restaurant) => (
                <RestaurantListItem key={restaurant.id} {...restaurant} />
              ))}
            </div>
            <Button variant="link" className="w-full mt-4 text-white hover:text-gold/80" asChild>
              <Link to="/restaurants?category=trending">See All</Link>
            </Button>
          </div>

          {/* Top Rated Section */}
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-6 h-6 text-white" />
              <h3 className="text-xl font-semibold text-white">Top Rated</h3>
            </div>
            <div className="space-y-4">
              {TOP_RATED.map((restaurant) => (
                <RestaurantListItem key={restaurant.id} {...restaurant} />
              ))}
            </div>
            <Button variant="link" className="w-full mt-4 text-white hover:text-gold/80" asChild>
              <Link to="/restaurants?category=top-rated">See All</Link>
            </Button>
          </div>

          {/* New Arrivals Section */}
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-white" />
              <h3 className="text-xl font-semibold text-white">New Arrivals</h3>
            </div>
            <div className="space-y-4">
              {NEW_ARRIVALS.map((restaurant) => (
                <RestaurantListItem key={restaurant.id} {...restaurant} />
              ))}
            </div>
            <Button variant="link" className="w-full mt-4 text-white hover:text-gold/80" asChild>
              <Link to="/restaurants?category=new-arrivals">See All</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
