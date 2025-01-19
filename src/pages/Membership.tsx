import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle, Star, Clock, Calendar, Gift } from 'lucide-react';
import { Link } from "react-router-dom";

const MembershipPage = () => {
  const benefits = [
    { icon: <Calendar className="w-6 h-6 text-primary" />, title: "Exclusive Access", description: "Secure tables at the world's most sought-after restaurants" },
    { icon: <Clock className="w-6 h-6 text-primary" />, title: "Prime-Time Reservations", description: "Book hard-to-get slots during peak dining hours" },
    { icon: <Star className="w-6 h-6 text-primary" />, title: "Premium Experiences", description: "Unlock unique culinary events and tasting menus" },
    { icon: <Gift className="w-6 h-6 text-primary" />, title: "Special Perks", description: "Enjoy member-only benefits and surprise upgrades" },
  ];

  const features = [
    "Priority access to exclusive reservations",
    "Book tables before they're available to the public",
    "Curated selection of exceptional restaurants",
    "Access to special culinary events and experiences",
    "Efficient booking process and waitlist management",
    "Member-only offers and promotions"
  ];

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
            <Link to="/experiences" className="text-sm font-medium hover:text-primary transition-colors">Experiences</Link>
            <Link to="/membership" className="text-sm font-medium hover:text-primary transition-colors">Membership</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button asChild>
              <Link to="/signup">Sign In</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/login">For Restaurants</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Unlock Extraordinary Dining Experiences
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Join TableMaster and gain exclusive access to the world's most coveted tables and unique culinary events.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button size="lg" variant="secondary">
                Become a Member
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Membership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  {benefit.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Details */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">TableMaster Premium Membership</h2>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Premium Access</CardTitle>
                <CardDescription>$99/Year</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Join Now</Button>
              </CardFooter>
            </Card>
            <p className="text-center text-gray-600">
              Cancel anytime. No long-term commitment required.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Dining Experience?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join TableMaster today and unlock a world of exclusive culinary experiences and prime reservations.
          </p>
          <Button size="lg" variant="secondary">
            Become a Member
          </Button>
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

export default MembershipPage;

