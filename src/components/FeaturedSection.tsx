import { Star, Heart, Zap, Trophy, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { RestaurantListItem } from './RestaurantListItem'

const TRENDING_RESTAURANTS = [
  {
    id: 14,
    name: "Alo",
    reviews: 624,
    rating: 4.8,
    district: "Toronto",
    cuisine: "French",
    priceRange: "$$$$",
    image: "https://resizer.otstatic.com/v2/photos/wide-huge/4/64183382.jpg"
  },
  {
    id: 2,
    name: "Edulis",
    rating: 4.7,
    reviews: 212,
    cuisine: "Seasonal Canadian", 
    district: "Toronto",
    priceRange: "$$$",
    image: "https://madamemarie.co/wp-content/uploads/2019/07/IMG_2275-e1562365974577-768x1024.jpg"
  },
  {
    id: 25,
    name: "Le Bernardin",
    rating: 4.9,
    reviews: 282,
    cuisine: "French Fine Dining",
    priceRange: "$$$$",
    district: "Theater District",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 26,
    name: "Daniel",
    rating: 4.8,
    reviews: 434,
    cuisine: "French",
    priceRange: "$$$$",
    district: "Upper East Side",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
  }
];

const TOP_RATED = [
  {
    id: 29,
    name: "Don Alfonso 1890",
    reviews: 434,
    rating: 4.9,
    cuisine: "Italian",
    priceRange: "$$$$",
    district: "Toronto",
    image: "https://canadas100best.com/wp-content/uploads/2023/05/DonAlfonso1890-2023-feat.jpg"
  },
  {
    id: 30,
    name: "Sushi Masaki Saito",
    rating: 4.9,    
    reviews: 282,
    cuisine: "Japanese",
    priceRange: "$$$$",
    district: "Toronto",
    image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/toronto/Sushi-Masaki-Saito_Capture_68D3E157-5056-A36F-23505D0BBC82265D-68d3ddd25056a36_68d3ea7c-5056-a36f-236113b5548f533f.png"
  },
  {
    id: 31,
    name: "Masa",
    rating: 4.9,
    reviews: 655,
    cuisine: "Japanese Omakase",
    priceRange: "$$$$",
    district: "Columbus Circle",
    image: "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 32,
    name: "Per Se",
    rating: 4.8,
    reviews: 366,
    cuisine: "French",
    priceRange: "$$$$",
    district: "Columbus Circle",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
  }
];

const NEW_ARRIVALS = [
  {
    id: 3,
    name: "Canoe",
    rating: 4.6,    
    reviews: 655,
    cuisine: "Contemporary Canadian",
    district: "Toronto",
    priceRange: "$$$$",
    image: "https://cdn.oliverbonacininetwork.com/uploads/sites/23/2021/01/Canoe-Reno-500x600-1.jpg"
  },
  {
    id: 4,
    name: "Quetzal",    
    reviews: 397,
    rating: 4.5,
    district: "Toronto",
    cuisine: "Mexican",
    priceRange: "$$$",
    image: "https://api.flavournetwork.ca/wp-content/uploads/2023/03/quetzalresto-feature-image.jpg"
  },
  {
    id: 27,
    name: "Saga",
    rating: 4.7,
    reviews: 228,
    cuisine: "Contemporary American",
    priceRange: "$$$$",
    district: "Financial District",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 28,
    name: "Yoshino",
    rating: 4.8,
    reviews: 128,
    cuisine: "Japanese Omakase",
    priceRange: "$$$$",
    district: "NoHo",
    image: "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?q=80&w=2070&auto=format&fit=crop"
  }
];


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
