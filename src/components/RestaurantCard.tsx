import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RestaurantCardProps {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
  priceRange: string;
}

export function RestaurantCard({ id, name, cuisine, rating, image, priceRange }: RestaurantCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <Card className="restaurant-card overflow-hidden cursor-pointer group">
      <div onClick={handleCardClick}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="flex items-center gap-1 shadow-lg">
              <Star className="w-4 h-4" />
              {rating}
            </Badge>
          </div>
        </div>
        <CardContent className="pt-4">
          <h3 className="font-serif text-xl font-semibold mb-1 group-hover:text-primary transition-colors">{name}</h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>{cuisine}</span>
            <span>{priceRange}</span>
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between items-center border-t bg-muted/10">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-1" />
          <span>Available tonight</span>
        </div>
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            // onBook();
          }} 
          variant="default"
          className="shadow-sm hover:shadow-md transition-shadow"
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}