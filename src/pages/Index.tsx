import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SearchFilters } from "@/components/SearchFilters";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, ChefHat, Gift, Utensils, Users, Calendar, Award, ArrowRight, CircleUser } from 'lucide-react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const FEATURED_RESTAURANTS = [
  {
    id: 1,
    name: "Le Bernardin",
    cuisine: "French Fine Dining",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    priceRange: "$$$$",
    michelin: true,
    exclusive: true,
  },
  {
    id: 2,
    name: "Masa",
    cuisine: "Japanese Omakase",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?q=80&w=2070&auto=format&fit=crop",
    priceRange: "$$$$",
    michelin: true,
    exclusive: true,
  },
  {
    id: 3,
    name: "Eleven Madison Park",
    cuisine: "Contemporary American",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    priceRange: "$$$$",
    michelin: true,
    exclusive: false,
  },
  {
    id: 4,
    name: "Atomix",
    cuisine: "Contemporary Korean",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=2070&auto=format&fit=crop",
    priceRange: "$$$$",
    michelin: true,
    exclusive: true,
  },
];

const KEY_FEATURES = [
  {
    icon: <Calendar className="w-6 h-6 text-primary" />,
    title: "Exclusive Access",
    description: "Secure tables at the world's most sought-after restaurants",
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Prime-Time Reservations",
    description: "Book hard-to-get slots during peak dining hours",
  },
  {
    icon: <Star className="w-6 h-6 text-primary" />,
    title: "Premium Experiences",
    description: "Unlock unique culinary events and tasting menus",
  },
  {
    icon: <Award className="w-6 h-6 text-primary" />,
    title: "Curated Selection",
    description: "Choose from a handpicked list of exceptional restaurants",
  },
];

const Index = () => {
  const { toast } = useToast();
  const [restaurants] = useState(FEATURED_RESTAURANTS);
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (filters) => {
    console.log("Filters submitted:", filters);
    const queryParams = new URLSearchParams(filters).toString();
    navigate(`/restaurants?${queryParams}`);
  };

  const handleBooking = () => {
    toast({
      title: "Premium Access Required",
      description: "Join TableMaster Premium to unlock exclusive restaurant reservations.",
    });
  };

  useEffect(() => {
    const customer = localStorage.getItem("customer");
    if (customer) {
      const customerData = JSON.parse(customer);
      setUser(customerData.user.user_metadata.full_name); // Get the name from user_metadata
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear user from localStorage
    setUser(null); // Reset user state
    navigate("/"); // Redirect to the homepage after logout
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold font-serif">
            TableMaster
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/restaurants" className="text-sm font-medium hover:text-primary transition-colors">Restaurants</Link>
            {/* <Link to="/experiences" className="text-sm font-medium hover:text-primary transition-colors">Experiences</Link> */}
            <Link to="/membership" className="text-sm font-medium hover:text-primary transition-colors">Membership</Link>
          </nav>
          <div className="flex items-center space-x-4">
          {/* Show user info and dropdown if logged in */}
          {user ? (
            <div className="flex gap">
              <Button asChild>
                <Link to="bookings" className="text-sm font-semibold" >{user}</Link>
              </Button>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
            </div>
          ) : (
            <>
              <Button asChild>
                <Link to="user-auth">Sign In</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/signup">For Restaurants</Link>
              </Button>
            </>
          )}
        </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Your Gateway to Extraordinary Dining
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Unlock access to the world's most coveted tables and curated culinary experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button size="lg" className="mr-4" asChild>
                <Link to="/restaurants">Discover Restaurants</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/membership">Join TableMaster</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Featured Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <RestaurantCard
                  id={restaurant.id}
                  name={restaurant.name}
                  cuisine={restaurant.cuisine}
                  rating={restaurant.rating}
                  image={restaurant.image}
                  priceRange={restaurant.priceRange}
                  // michelin={restaurant.michelin}
                  // exclusive={restaurant.exclusive}
                />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/restaurants" className="inline-flex items-center">
                View All Restaurants
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">The TableMaster Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {KEY_FEATURES.map((feature, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Elevate Your Dining Experience</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join TableMaster Premium for priority access, exclusive benefits, and personalized concierge service.
          </p>
          <Button size="lg" variant="secondary">
            Become a Member
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">What Our Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "TableMaster has transformed my dining experiences. I've had the pleasure of enjoying meals at restaurants I never thought I'd be able to access.", author: "Sarah T., Food Enthusiast" },
              { quote: "As a busy executive, TableMaster saves me time and ensures I always have access to the best tables for client meetings and special occasions.", author: "Michael R., CEO" },
              { quote: "The curated experiences and personalized service from TableMaster have elevated our restaurant's offerings and attracted a discerning clientele.", author: "Chef Antonio, Michelin-starred Restaurant Owner" }
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <p className="italic mb-6 text-gray-600">{`"${testimonial.quote}"`}</p>
                <p className="font-semibold text-primary">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-lg font-bold mb-4">TableMaster</h3>
              <p className="text-sm text-gray-400">Elevating dining experiences through exclusive access and curated culinary journeys.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/restaurants" className="hover:text-primary transition-colors">Restaurants</Link></li>
                <li><Link to="/experiences" className="hover:text-primary transition-colors">Experiences</Link></li>
                <li><Link to="/membership" className="hover:text-primary transition-colors">Membership</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} TableMaster. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

