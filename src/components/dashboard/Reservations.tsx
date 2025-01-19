import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

type TimeSlot = {
  id?: number;
  time: string;
  price: number;
  available_date_id?: number;
};

type AvailableDate = {
  id?: number;
  date: string;
  time_slots: TimeSlot[];
};

export function Reservations() {
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
  const [newDate, setNewDate] = useState<string>("");
  const [newTimeSlots, setNewTimeSlots] = useState<TimeSlot[]>([]);
  const [newTimeSlot, setNewTimeSlot] = useState<TimeSlot>({ time: "", price: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingDate, setIsAddingDate] = useState(false);
  const [selectedDateId, setSelectedDateId] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

  const fetchAvailableDates = async () => {
    const restaurantId = localStorage.getItem("restaurantId");
    if (!restaurantId) {
      console.error("No restaurantId found in localStorage");
      toast({
        title: "Error",
        description: "No restaurant ID found. Please ensure you're logged in.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/reservations/${restaurantId}/available_dates`
      );
      if (!response.ok) throw new Error("Failed to fetch dates");
      const dates = await response.json();
      setAvailableDates(dates);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching dates:", error);
      toast({
        title: "Error",
        description: "Failed to fetch available dates. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  const handleAddDate = () => {
    if (!newDate) {
      toast({
        title: "Error",
        description: "Please select a date to add.",
        variant: "destructive",
      });
      return;
    }
    setIsAddingDate(true);
    setNewTimeSlots([]);
  };

  const handleAddTimeSlot = () => {
    if (!newTimeSlot.time || newTimeSlot.price <= 0) {
      toast({
        title: "Error",
        description: "Please provide a valid time and price.",
        variant: "destructive",
      });
      return;
    }
    setNewTimeSlots([...newTimeSlots, newTimeSlot]);
    setNewTimeSlot({ time: "", price: 0 });
  };

  const handleSubmitNewDate = async () => {
    if (newTimeSlots.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one time slot.",
        variant: "destructive",
      });
      return;
    }

    try {
      const restaurantId = localStorage.getItem("restaurantId");
      if (!restaurantId) {
        throw new Error("No restaurant ID found");
      }

      const response = await fetch("http://localhost:5000/api/reservations/available_dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurant_id: restaurantId,
          date: newDate,
          time_slots: newTimeSlots
        }),
      });
      
      if (!response.ok) throw new Error("Failed to add date and time slots");
      
      toast({
        title: "Success",
        description: "New date and time slots added successfully.",
      });
      
      setNewDate("");
      setNewTimeSlots([]);
      setIsAddingDate(false);
      fetchAvailableDates();
    } catch (error) {
      console.error("Error adding date and time slots:", error);
      toast({
        title: "Error",
        description: "Failed to add date and time slots. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDate = async (dateId: number) => {
    if (!confirm("Are you sure you want to delete this date and its time slots?")) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/reservations/available_dates/${dateId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete date");
      
      setAvailableDates((prev) => prev.filter((date) => date.id !== dateId));
      toast({
        title: "Success",
        description: "Date deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting date:", error);
      toast({
        title: "Error",
        description: "Failed to delete date. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTimeSlot = async (dateId: number, timeSlotId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/reservations/time_slots/${timeSlotId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete time slot");
      
      setAvailableDates((prev) =>
        prev.map((date) =>
          date.id === dateId
            ? { ...date, time_slots: date.time_slots.filter((slot) => slot.id !== timeSlotId) }
            : date
        )
      );
      toast({
        title: "Success",
        description: "Time slot deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting time slot:", error);
      toast({
        title: "Error",
        description: "Failed to delete time slot. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddReservation = async () => {
    if (!selectedDateId || !selectedTimeSlot) {
      toast({
        title: "Error",
        description: "Please select a date and time slot.",
        variant: "destructive",
      });
      return;
    }

    try {
      const restaurantId = localStorage.getItem("restaurantId");
      if (!restaurantId) {
        throw new Error("No restaurant ID found");
      }

      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurant_id: restaurantId,
          available_date_id: selectedDateId,
          time_slot_id: selectedTimeSlot.id,
        }),
      });
      
      if (!response.ok) throw new Error("Failed to add reservation");
      
      toast({
        title: "Success",
        description: "Reservation added successfully!",
      });
      
      setSelectedDateId(null);
      setSelectedTimeSlot(null);
      fetchAvailableDates();
    } catch (error) {
      console.error("Error adding reservation:", error);
      toast({
        title: "Error",
        description: "Failed to add reservation. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading reservations...</div>;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Restaurant Reservations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!isAddingDate ? (
            <div className="flex items-center gap-4">
              <Input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="max-w-xs"
              />
              <Button onClick={handleAddDate}>
                <Plus className="mr-2 h-4 w-4" />
                Add Date
              </Button>
            </div>
          ) : (
            <div className="space-y-4 border p-4 rounded-md">
              <h3 className="font-semibold">Adding new date: {newDate}</h3>
              <div className="flex items-center gap-4">
                <Input
                  type="time"
                  value={newTimeSlot.time}
                  onChange={(e) => setNewTimeSlot({ ...newTimeSlot, time: e.target.value })}
                  className="max-w-[150px]"
                />
                <Input
                  type="number"
                  value={newTimeSlot.price}
                  onChange={(e) => setNewTimeSlot({ ...newTimeSlot, price: +e.target.value })}
                  className="max-w-[100px]"
                  placeholder="Price"
                />
                <Button onClick={handleAddTimeSlot}>
                  Add Time Slot
                </Button>
              </div>
              {newTimeSlots.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">New Time Slots:</h4>
                  <ul className="list-disc pl-5">
                    {newTimeSlots.map((slot, index) => (
                      <li key={index}>
                        {slot.time} - ${slot.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingDate(false)}>Cancel</Button>
                <Button onClick={handleSubmitNewDate}>Submit New Date</Button>
              </div>
            </div>
          )}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Available Dates and Time Slots</h3>
            {availableDates.length === 0 ? (
              <p>No available dates found. Please add a new date.</p>
            ) : (
              <>
                {availableDates.map((date) => (
                  <div key={date.id} className="mb-4 p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{new Date(date.date).toLocaleDateString()}</h4>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteDate(date.id!)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 space-y-2">
                      {date.time_slots.map((slot) => (
                        <div key={slot.id} className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
                          <span>{slot.time} - ${slot.price.toFixed(2)}</span>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteTimeSlot(date.id!, slot.id!)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}      