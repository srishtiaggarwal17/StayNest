
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HotelCard from "@/components/HotelCard";
import HotelFilter from "@/components/HotelFilter";
import axios from "axios";
import { ROOM_API_END_POINT, BOOKING_API_END_POINT } from "@/utils/constant";
import { Input } from "@/components/ui/input";

const useQuery = () => new URLSearchParams(useLocation().search);

const Hotels = () => {
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

        {filteredRooms.length === 0 ? (
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

      <div className="w-1/4">
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

