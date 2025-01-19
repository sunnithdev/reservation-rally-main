import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface Booking {
  id: string;
  email: string,
  customer_name: string;
  booking_date: string;
  booking_time: string;
  party_size: number;
  special_requests?: string;
}

export function RestaurantBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const restaurantId = localStorage.getItem('restaurantId');
      if (!restaurantId) {
        setError('No restaurant ID found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://table-master-backend.onrender.com/api/bookings/restaurant-bookings?restaurantId=${restaurantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError('Error fetching bookings. Please try again later.');
        toast({
          title: "Error",
          description: "Failed to load bookings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [toast]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Restaurant Bookings</CardTitle>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : bookings.length === 0 ? (
            <div className="text-center text-muted-foreground">No bookings found for this restaurant.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer email</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Party Size</TableHead>
                  <TableHead>Special Requests</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      <User className="inline-block mr-2 h-4 w-4" />
                      {booking.email}
                    </TableCell>
                    <TableCell>
                      <Calendar className="inline-block mr-2 h-4 w-4" />
                      {formatDate(booking.booking_date)}
                    </TableCell>
                    <TableCell>
                      <Clock className="inline-block mr-2 h-4 w-4" />
                      {formatTime(booking.booking_time)}
                    </TableCell>
                    <TableCell>{booking.party_size}</TableCell>
                    <TableCell>{booking.special_requests || 'None'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}