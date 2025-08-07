
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HotelCard from "@/components/HotelCard";
import HotelFilter from "@/components/HotelFilter";
import axios from "axios";
import { ROOM_API_END_POINT, BOOKING_API_END_POINT } from "@/utils/constant";
import { Input } from "@/components/ui/input";

const useQuery = () => new URLSearchParams(useLocation().search);

const Hotels = () => {
  const [isLoading, setIsLoading] = useState(false);
  const query = useQuery();
  const destinationQuery = query.get("destination") || "";
  const checkIn = query.get("checkIn");
  const checkOut = query.get("checkOut");
  const guests = query.get("guests") ? parseInt(query.get("guests")) : null;
  const roomNos = query.get("rooms") ? parseInt(query.get("rooms")) : null;

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const [roomTypes, setRoomTypes] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState(destinationQuery);

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true); 
      try {
        const res = await axios.get(`${ROOM_API_END_POINT}/getRooms`, {
          params: {
            searchTerm,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            guests,
            roomNos,
          },
        });
        let allRooms = res.data.rooms;

        // Step 1: Search filter
        if (searchTerm.trim() !== "") {
          const lowerSearch = searchTerm.toLowerCase();
          allRooms = allRooms.filter((room) => {
            const hotelName = room.hotel?.name?.toLowerCase() || "";
            const address = room.hotel?.address?.toLowerCase() || "";
            const type = room.type?.toLowerCase() || "";
            const city = room.hotel?.city?.toLowerCase() || "";
            return (
              hotelName.includes(lowerSearch) ||
              address.includes(lowerSearch) ||
              type.includes(lowerSearch) ||
              city.includes(lowerSearch)
            );
          });
        }

        // Step 2: Check availability if dates are provided
        if (checkIn && checkOut) {
          const availabilityChecks = allRooms.map(async (room) => {
            try {
              const { data } = await axios.post(
                `${BOOKING_API_END_POINT}/check-availability`,
                {
                  room: room._id,
                  checkInDate: checkIn,
                  checkOutDate: checkOut,
                  rooms: roomNos || 1,
                }
              );

              return {
                ...room,
                availableRooms: data.availableRooms,
                isAvailable: data.isAvailable,
              };
            } catch (err) {
              console.error("Availability check failed:", err);
              return { ...room, availableRooms: 0, isAvailable: false };
            }
          });
          const resultRooms = await Promise.all(availabilityChecks);
          // const roomIds = allRooms.map((room) => room._id);
          // const { data } = await axios.post(`${BOOKING_API_END_POINT}/check-multiple-availability`, {
          //   roomIds,
          //   checkInDate: checkIn,
          //   checkOutDate: checkOut,
          //   rooms: roomNos || 1,
          // });
          // const availabilityMap = data.availability;
          // const resultRooms = allRooms.map((room) => {
          //   const availability = availabilityMap[room._id] || { isAvailable: false, availableRooms: 0 };
          //   return {
          //     ...room,
          //     isAvailable: availability.isAvailable,
          //     availableRooms: availability.availableRooms,
          //   };
          // });

          // Optional filter by guests or room count
          const filteredByGuests = resultRooms.filter((room) => {
            if (guests && room.maxGuests < guests) return false;
            return true;
          });

          setRooms(filteredByGuests);
          setFilteredRooms(filteredByGuests);
        } else {
          // No dates: show rooms filtered only by guest count
          const filtered = guests
            ? allRooms.filter((room) => room.maxGuests >= guests)
            : allRooms;

          const enrichedRooms = filtered.map((room) => ({
            ...room,
            isAvailable: true,
            availableRooms: room.roomCount,
          }));

          setRooms(enrichedRooms);
          setFilteredRooms(enrichedRooms);
        }
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };

    fetchRooms();
  }, [searchTerm, checkIn, checkOut, guests, roomNos]);

  useEffect(() => {
    let filtered = [...rooms];

    if (roomTypes.length > 0) {
      filtered = filtered.filter((room) => roomTypes.includes(room.type));
    }

    if (priceRanges.length > 0) {
      filtered = filtered.filter((room) => {
        return priceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return room.price >= min && room.price <= max;
        });
      });
    }

    if (sortBy === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredRooms(filtered);
  }, [roomTypes, priceRanges, sortBy, rooms]);

  return (
    <div className="max-w-7xl mx-auto p-6 mt-16 flex gap-6">
      <div className="w-3/4">
        <h1 className="text-4xl font-semibold mb-2">Available Rooms</h1>
        <p className="text-gray-500 mb-2">
          Explore all rooms from different hotels across locations.
        </p>

        <p className="text-gray-600 text-sm mb-4">
          {checkIn && `Check-in: ${checkIn}`}{" "}
          {checkOut && `| Check-out: ${checkOut}`}{" "}
          {guests && `| Guests: ${guests}`}{" "}
          {roomNos && `| Rooms: ${roomNos}`}
        </p>

        <Input
          type="text"
          placeholder="Search by hotel, address, or room type..."
          className="mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isLoading ? (
          <div className="space-y-6">
          {[...Array(2)].map((_, idx) => (
            <div key={idx}
              className="flex gap-6 p-4 rounded-xl bg-white shadow border border-gray-200 animate-pulse"
            >
              <div className="h-40 w-64 bg-gray-300 rounded-xl"></div>
              <div className="flex flex-col justify-between flex-1 py-1">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-20" />
                    <div className="h-5 bg-gray-400 rounded w-3/4" />
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-20 bg-gray-300 rounded" />
                      <div className="h-3 w-16 bg-gray-200 rounded" />
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                    <div className="flex gap-2 mt-3">
                      <div className="h-6 w-24 bg-gray-200 rounded-full" />
                      <div className="h-6 w-24 bg-gray-200 rounded-full" />
                      <div className="h-6 w-24 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                  <div className="h-4 w-24 bg-gray-300 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
          ) : filteredRooms.length === 0 ? (
            <span>No rooms found.</span>
          ) : (
            filteredRooms.map((room) => (
             <HotelCard
              key={room._id}
              room={room}
              isAvailable={room.isAvailable}
              availableRooms={room.availableRooms}
            />
          ))
        )}
      </div>

{/*       <div className="w-1/4">
        <HotelFilter
          roomTypes={roomTypes}
          setRoomTypes={setRoomTypes}
          priceRanges={priceRanges}
          setPriceRanges={setPriceRanges}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div> */}
      <div className="w-1/4 space-y-4">
        <div className="w-full h-40 rounded-lg overflow-hidden shadow-sm border">
          <iframe
            title="Map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(searchTerm || "India")}&output=embed`}
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg"
          />
        </div>
        <HotelFilter
          roomTypes={roomTypes}
          setRoomTypes={setRoomTypes}
          priceRanges={priceRanges}
          setPriceRanges={setPriceRanges}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
    </div>
  );
};

export default Hotels;

