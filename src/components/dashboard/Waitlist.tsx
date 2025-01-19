import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

type WaitlistEntry = {
  id: number;
  email: string;
  created_at: string;
};

export function Waitlist() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const restaurantId = localStorage.getItem('restaurantId'); // Assuming the restaurant ID is stored in localStorage

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const fetchWaitlist = async () => {
    if (!restaurantId) {
      setError("No restaurant ID found. Please ensure you're logged in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/waitlist/${restaurantId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch waitlist');
      }
      const data = await response.json();
      setWaitlist(data);
    } catch (err) {
      setError('Error fetching waitlist. Please try again.');
      console.error('Error fetching waitlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWaitlist = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/waitlist/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove from waitlist');
      }
      setWaitlist(waitlist.filter(entry => entry.id !== id));
      toast({
        description: "Successfully removed from the waitlist.",
      });
    } catch (err) {
      console.error('Error removing from waitlist:', err);
      toast({
        variant: "destructive",
        description: "Failed to remove from waitlist. Please try again.",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Waitlist</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading waitlist...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : waitlist.length === 0 ? (
          <p>No one is currently on the waitlist.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Joined At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {waitlist.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.email}</TableCell>
                  <TableCell>{new Date(entry.created_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button 
                      variant="destructive" 
                      onClick={() => removeFromWaitlist(entry.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

