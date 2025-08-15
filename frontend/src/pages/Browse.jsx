import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HotelCard from "@/components/HotelCard";
import axios from "axios";
import { ROOM_API_END_POINT, BOOKING_API_END_POINT } from "@/utils/constant";
import { Input } from "@/components/ui/input";

const useQuery = () => new URLSearchParams(useLocation().search);

const Browse = () => {
  const [isLoading, setIsLoading] = useState(false);

  const query = useQuery();
  const destinationQuery = query.get("destination") || "";
  const checkIn = query.get("checkIn");
  const checkOut = query.get("checkOut");
  const guests = query.get("guests") ? parseInt(query.get("guests")) : null;
  const roomNos = query.get("rooms") ? parseInt(query.get("rooms")) : null;

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
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

        if (checkIn && checkOut) {
          const roomIds = allRooms.map((room) => room._id);

          const { data } = await axios.post(
            `${BOOKING_API_END_POINT}/check-multiple-availability`,
            {
              roomIds,
              checkInDate: checkIn,
              checkOutDate: checkOut,
              rooms: roomNos || 1,
            }
          );

          const availabilityMap = data.availability;

          const resultRooms = allRooms.map((room) => {
            const availability =
              availabilityMap[room._id] || {
                isAvailable: false,
                availableRooms: 0,
              };

            return {
              ...room,
              isAvailable: availability.isAvailable,
              availableRooms: availability.availableRooms,
            };
          });

          // Optional filter by guests
          const filteredByGuests = resultRooms.filter((room) => {
            if (guests && room.maxGuests < guests) return false;
            return true;
          });

          setRooms(filteredByGuests);
          setFilteredRooms(filteredByGuests);
        } else {
          // No dates: filter only by guest count
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

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="md:w-3/4">
          <h1 className="text-3xl font-semibold mb-2">
            Search Results ({filteredRooms.length})
          </h1>

          <p className="text-gray-600 text-sm mb-4">
            {checkIn && `Check-in: ${checkIn}`}{" "}
            {checkOut && `| Check-out: ${checkOut}`}{" "}
            {guests && `| Guests: ${guests}`}{" "}
            {roomNos && `| Rooms: ${roomNos}`}
          </p>

          {/* Search Bar */}
          <Input
            type="text"
            placeholder="Search by hotel, address, or room type..."
            className="mb-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Filters Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Input
              type="date"
              value={checkIn || ""}
              onChange={(e) =>
                (window.location.search = `?destination=${searchTerm}&checkIn=${
                  e.target.value
                }&checkOut=${checkOut || ""}&guests=${guests || ""}&rooms=${
                  roomNos || ""
                }`)
              }
              className="w-full"
              placeholder="Check-in"
            />
            <Input
              type="date"
              value={checkOut || ""}
              onChange={(e) =>
                (window.location.search = `?destination=${searchTerm}&checkIn=${
                  checkIn || ""
                }&checkOut=${e.target.value}&guests=${guests || ""}&rooms=${
                  roomNos || ""
                }`)
              }
              className="w-full"
              placeholder="Check-out"
            />
            <Input
              type="number"
              min="1"
              value={guests || ""}
              onChange={(e) =>
                (window.location.search = `?destination=${searchTerm}&checkIn=${
                  checkIn || ""
                }&checkOut=${checkOut || ""}&guests=${
                  e.target.value
                }&rooms=${roomNos || ""}`)
              }
              className="w-full"
              placeholder="Guests"
            />
            <Input
              type="number"
              min="1"
              value={roomNos || ""}
              onChange={(e) =>
                (window.location.search = `?destination=${searchTerm}&checkIn=${
                  checkIn || ""
                }&checkOut=${checkOut || ""}&guests=${guests || ""}&rooms=${
                  e.target.value
                }`)
              }
              className="w-full"
              placeholder="Rooms"
            />
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="space-y-6" />
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
      </div>
    </div>
  );
};

export default Browse;
