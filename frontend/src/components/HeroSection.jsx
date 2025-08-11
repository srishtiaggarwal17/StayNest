

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Search } from "lucide-react";
import bgImage from "@/assets/bg.png";

const HeroSection = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);

  const handleSearch = () => {
    const params = new URLSearchParams({
      destination,
      checkIn,
      checkOut,
      guests,
      rooms
    }).toString();

    navigate(`/hotels?${params}`);
  };

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center text-white"
      style={{ backgroundImage: `url(https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?cs=srgb&dl=architecture-building-chairs-2034335.jpg&fm=jpg)` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      <div className="relative z-20 h-full flex flex-col justify-center items-start text-left px-6 md:px-20 max-w-5xl">
        <span className="bg-blue-400 text-white text-sm px-4 py-1 rounded-full mb-4">
          The Ultimate Hotel Experience
        </span>
        <h1 className="relative z-20 h-full flex flex-col justify-center items-start text-left px-4 sm:px-6 md:px-20 max-w-5xl">
          Discover Your Perfect <br />
          Gateway Destination
        </h1>
        <p className="text-base md:text-lg text-gray-300 mb-10 max-w-xl">
          Unparalleled luxury and comfort await at the world’s most exclusive hotels and resorts.
          Start your journey today.
        </p>

        <div className="bg-white text-black p-4 md:p-6 rounded-xl shadow-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 w-full max-w-5xl items-end">
          <div className="flex flex-col gap-1">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <CalendarIcon className="w-4 h-4 mr-2" /> Destination
            </label>
            <Input
              placeholder="Type here"
              className="text-sm"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <CalendarIcon className="w-4 h-4 mr-2" /> Check in
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none bg-white"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <CalendarIcon className="w-4 h-4 mr-2" /> Check out
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none bg-white"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Guests</label>
            <Input
              type="number"
              min={1}
              placeholder="0"
              className="text-sm"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Rooms</label>
            <Input
              type="number"
              min={1}
              placeholder="0"
              className="text-sm"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
            />
          </div>
          <div className="flex">
            <Button className="bg-black text-white w-full hover:bg-gray-800" onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" /> Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
