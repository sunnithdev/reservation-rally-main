import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { Loader } from "lucide-react";
const Bookings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<any>(null);


  const handleLogout = () => {
    localStorage.clear(); // Clear user from localStorage
    setUser(null); // Reset user state
    navigate("/"); // Redirect to the homepage after logout
  };

  useEffect(() => {
    // Fetch the user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("customer") || "{}");
    if (storedUser && storedUser.user) {
      setUser(storedUser.user.user_metadata.full_name);
      setUserEmail(storedUser.user.email);
    } else {
      toast({
        title: "User not found",
        description: "Please sign in to view your bookings.",
        variant: "destructive",
      });
      navigate("/user-auth"); // Redirect to login if user is not found
    }
  }, [navigate, toast]);

  useEffect(() => {
    if (user) {
      // Simulate an API call to fetch the bookings for the user based on email
      const fetchBookings = async () => {
        setLoading(true);
        try {
          // Replace this with your actual API call to fetch bookings by user email
          const response = await fetch(`https://table-master-backend.onrender.com/api/bookings/user?email=${userEmail}`);
          const data = await response.json();
          setBookings(data);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load bookings.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchBookings();
    }
  }, [user, toast]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold font-serif">
            TableMaster
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/restaurants" className="text-sm font-medium hover:text-primary transition-colors">
              Restaurants
            </Link>
            <Link to="/membership" className="text-sm font-medium hover:text-primary transition-colors">
              Membership
            </Link>
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

      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-center mb-8">
            Your Bookings
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-96">
              <Loader />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center text-lg text-gray-600">
              You have no bookings at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {booking.restaurant}
                  </h3>
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>Restaurant name:</strong> {booking.restaurant_name}
                    </p>
                    <p>
                      <strong>Date:</strong> {booking.booking_date}
                    </p>
                    <p>
                      <strong>Time:</strong> {booking.booking_time}
                    </p>
                    <p>
                      <strong>Status:</strong> {booking.status}
                    </p>
                  </div>
                  <Button variant="outline" className="mt-4">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        {/* Footer code */}
      </footer>
    </div>
  );
};

export default Bookings;
