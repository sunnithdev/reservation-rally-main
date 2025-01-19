import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SearchFilters } from "@/components/SearchFilters";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from 'lucide-react';

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const location = useLocation();
  const navigate = useNavigate();



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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filters = {
      location: params.get("location") || "",
      partySize: parseInt(params.get("partySize") || "0"),
      date: params.get("date") || "",
      time: params.get("time") || "",
    };
    fetchRestaurants(filters);
  }, [location]);

  const fetchRestaurants = async (filters: { location: string; partySize: number; date: string; time: string }) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://table-master-backend.onrender.com/api/restaurants?location=${filters.location}&party_size=${filters.partySize}&available_dates=${filters.date}&time=${filters.time}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
      }

      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (filters: { location: string; partySize: number; date: string; time: string }) => {
    fetchRestaurants(filters);
  };

  return (
    <div className="min-h-screen bg-white">

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

      {/* Hero Section with Search Bar */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-gradient-to-r from-primary/90 to-primary text-white overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury dining experience"
            className="w-full h-full object-cover opacity-20"
          />
        </motion.div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1 
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover Extraordinary Dining
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Explore our curated selection of exceptional restaurants and secure your reservation.
          </motion.p>
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <SearchFilters onSearch={onSearch} />
          </motion.div>
        </div>
      </section>

      {/* All Restaurants List Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center md:text-left">Explore Our Restaurants</h2>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
            <p className="text-xl mt-4 text-gray-600">Discovering culinary delights...</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {restaurants.length > 0 ? (
              restaurants.map((restaurant, index) => (
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
                    image={restaurant.images[0]}
                    priceRange={restaurant.priceRange}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-xl text-gray-600">No restaurants found matching your search criteria.</p>
                <Button className="mt-4">Reset Search</Button>
              </div>
            )}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default AllRestaurants;

