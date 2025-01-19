import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
// import RestaurantDetails from "./pages/RestaurantDetails";
import AllRestaurants from "./pages/AllRestaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CheckoutPage from "./pages/CheckoutPage";
import Success from "./pages/Success";
import Cancelled from "./pages/Cancelled";
import MembershipPage from "./pages/Membership";
import UserAuthPage from "./pages/UserAuthPage";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/restaurants" element={<AllRestaurants />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/booking/success" element={<Success />} />
            <Route path="/booking/cancelled" element={<Cancelled />} />
            <Route path="/user-auth" element={<UserAuthPage />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;