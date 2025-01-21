import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Star, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

interface RestaurantCardProps {
  id: number
  name: string
  rating: number
  cuisine: string
  priceRange: string
  district: string
  image: string
}

export function RestaurantCard({
  id,
  name,
  cuisine,
  rating,
  image,
  priceRange,
  district,
}: RestaurantCardProps) {
  return (
    <Card className="restaurant-card overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="font-sans text-lg font-semibold text-primary mb-1">{name}</h3>
              <Badge className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className="text-xs font-medium">{rating}</span>
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{cuisine}</p>
            <p className="text-sm text-muted-foreground mb-2">{district}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-primary">{priceRange}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors"
            asChild
          >
            <Link to={`/restaurant/${id}`}>
              View Details
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

