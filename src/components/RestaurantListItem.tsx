import { Star, Heart } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface RestaurantListItemProps {
  id: number
  name: string
  rating: number
  reviews: number
  cuisine: string
  priceRange: string
  district: string
  image: string
}

export function RestaurantListItem({
  id,
  name,
  rating,
  reviews,
  cuisine,
  priceRange,
  district,
  image
}: RestaurantListItemProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="flex items-start gap-4 p-2 rounded-lg hover:bg-gray-800/50 transition-colors group">
      <Link to={`/restaurant/${id}`} className="shrink-0">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-16 h-16 object-cover rounded-lg"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/restaurants/${id}`} className="block">
          <h4 className="font-medium text-white truncate group-hover:text-gold transition-colors">
            {name}
          </h4>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span>{rating}</span>
            <span className="text-gray-500">({reviews})</span>
            <span>•</span>
            <span className='text-xs'>{cuisine}</span>
            <span>•</span>
            <span>{priceRange}</span>
          </div>
          <p className="text-sm text-gray-500 truncate">{district}</p>
        </Link>
      </div>
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="shrink-0 p-1 rounded-full hover:bg-gray-700 transition-colors"
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
          }`}
        />
        <span className="sr-only">
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </span>
      </button>
    </div>
  )
}
