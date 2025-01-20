import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";

export function SearchFilters({ onSearch }) {
  const [location, setLocation] = useState("");
  const [partySize, setPartySize] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSearch = () => {
    const filters = { location, partySize, date, time };
    onSearch(filters); // Pass filters to the parent component or API function
  };

  // Generate half-hour intervals (e.g., 7:00, 7:30, 8:00, ...)
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
    timeOptions.push(
      `${hourStr}:00`,
      `${hourStr}:30`
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
      {/* Location Input */}
      <div className="flex-1 relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-10 bg-white/20 border-white/20 text-white placeholder:text-white/70"
        />
      </div>

      {/* Party Size Selector */}
      <Select onValueChange={setPartySize}>
        <SelectTrigger className="w-full md:w-[180px] bg-white/20 border-white/20 text-white">
          <SelectValue placeholder="Party Size" />
        </SelectTrigger>
        <SelectContent>
          {[...Array(20)].map((_, i) => (
            <SelectItem key={i + 1} value={String(i + 1)}>
              {i + 1} {i === 0 ? "person" : "people"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date Input */}
      <div className="flex-1 relative">
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-white/20 border-white/20 text-white placeholder:text-white/70"
        />
      </div>

      {/* Time Selector (Half-hour intervals) */}
      <Select value={time} onValueChange={setTime}>
        <SelectTrigger className="w-full md:w-[180px] bg-white/20 border-white/20 text-white">
          <SelectValue placeholder="Time" />
        </SelectTrigger>
        <SelectContent>
          {timeOptions.map((timeOption) => (
            <SelectItem key={timeOption} value={timeOption}>
              {timeOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search Button */}
      <Button onClick={handleSearch} className="w-full md:w-auto bg-red-900 text-neutral-200 hover:bg-white/90 hover:text-red-900">
        Search
      </Button>
    </div>
  );
}
