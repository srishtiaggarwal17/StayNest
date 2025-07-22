// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import HotelCard from "@/components/HotelCard";
// import HotelFilter from "@/components/HotelFilter";
// import axios from "axios";
// import { ROOM_API_END_POINT, BOOKING_API_END_POINT } from "@/utils/constant";
// import { Input } from "@/components/ui/input";

// const useQuery = () => new URLSearchParams(useLocation().search);

// const Hotels = () => {
//   const query = useQuery();
//   const destinationQuery = query.get("destination") || "";
//   const checkIn = query.get("checkIn");
//   const checkOut = query.get("checkOut");
//   const guests = query.get("guests");

//   const [rooms, setRooms] = useState([]);
//   const [filteredRooms, setFilteredRooms] = useState([]);

//   const [roomTypes, setRoomTypes] = useState([]);
//   const [priceRanges, setPriceRanges] = useState([]);
//   const [sortBy, setSortBy] = useState("");
//   const [searchTerm, setSearchTerm] = useState(destinationQuery);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const res = await axios.get(`${ROOM_API_END_POINT}/getRooms`);
//         let allRooms = res.data.rooms;

//         // Step 1: Search filter (before availability filtering)
//         if (searchTerm.trim() !== "") {
//           const lowerSearch = searchTerm.toLowerCase();
//           allRooms = allRooms.filter((room) => {
//             const hotelName = room.hotel?.name?.toLowerCase() || "";
//             const address = room.hotel?.address?.toLowerCase() || "";
//             const type = room.type?.toLowerCase() || "";
//             const city = room.hotel?.city?.toLowerCase() || "";
//             return (
//               hotelName.includes(lowerSearch) ||
//               address.includes(lowerSearch) ||
//               type.includes(lowerSearch) ||
//               city.includes(lowerSearch)
//             );
//           });
//         }

//         // Step 2: Check availability
//         const availableRooms = [];

//         if (checkIn && checkOut) {
//           const checkAvailabilityPromises = allRooms.map(async (room) => {
//             try {
//               const { data } = await axios.post(
//                 `${BOOKING_API_END_POINT}/check-availability`,
//                 {
//                   room: room._id,
//                   checkInDate: checkIn,
//                   checkOutDate: checkOut,
//                 }
//               );
//               if (data.isAvailable) {
//                 return room;
//               }
//               return null;
//             } catch (err) {
//               console.error("Availability check failed:", err);
//               return null;
//             }
//           });

//           const results = await Promise.all(checkAvailabilityPromises);
//           availableRooms.push(...results.filter((room) => room !== null));
//         } else {
//           availableRooms.push(...allRooms); // no date filter
//         }

//         setRooms(availableRooms);
//         setFilteredRooms(availableRooms);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchRooms();
//   }, [searchTerm, checkIn, checkOut]);

//   useEffect(() => {
//     let filtered = [...rooms];

//     // Room type filter
//     if (roomTypes.length > 0) {
//       filtered = filtered.filter((room) => roomTypes.includes(room.type));
//     }

//     // Price range filter
//     if (priceRanges.length > 0) {
//       filtered = filtered.filter((room) => {
//         return priceRanges.some((range) => {
//           const [min, max] = range.split("-").map(Number);
//           return room.price >= min && room.price <= max;
//         });
//       });
//     }

//     // Sorting
//     if (sortBy === "lowToHigh") {
//       filtered.sort((a, b) => a.price - b.price);
//     } else if (sortBy === "highToLow") {
//       filtered.sort((a, b) => b.price - a.price);
//     } else if (sortBy === "newest") {
//       filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     }

//     setFilteredRooms(filtered);
//   }, [roomTypes, priceRanges, sortBy, rooms]);

//   return (
//     <div className="max-w-7xl mx-auto p-6 mt-16 flex gap-6">
//       <div className="w-3/4">
//         <h1 className="text-4xl font-semibold mb-2">Available Rooms</h1>
//         <p className="text-gray-500 mb-2">
//           Explore all rooms from different hotels across locations.
//         </p>

//         <p className="text-gray-600 text-sm mb-4">
//           {checkIn && `Check-in: ${checkIn}`}{" "}
//           {checkOut && `| Check-out: ${checkOut}`}{" "}
//           {guests && `| Guests: ${guests}`}
//         </p>

//         <Input
//           type="text"
//           placeholder="Search by hotel, address, or room type..."
//           className="mb-6"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         {filteredRooms.length === 0 ? (
//           <span>No rooms found.</span>
//         ) : (
//           filteredRooms.map((room) => <HotelCard key={room._id} room={room} />)
//         )}
//       </div>

//       <div className="w-1/4">
//         <HotelFilter
//           roomTypes={roomTypes}
//           setRoomTypes={setRoomTypes}
//           priceRanges={priceRanges}
//           setPriceRanges={setPriceRanges}
//           sortBy={sortBy}
//           setSortBy={setSortBy}
//         />
//       </div>
//     </div>
//   );
// };

// export default Hotels;









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

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const [roomTypes, setRoomTypes] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState(destinationQuery);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${ROOM_API_END_POINT}/getRooms`);
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

        const availableRooms = [];

        if (checkIn && checkOut) {
          const checkAvailabilityPromises = allRooms.map(async (room) => {
            try {
              const { data } = await axios.post(
                `${BOOKING_API_END_POINT}/check-availability`,
                {
                  room: room._id,
                  checkInDate: checkIn,
                  checkOutDate: checkOut,
                }
              );
              if (data.isAvailable) {
                return room;
              }
              return null;
            } catch (err) {
              console.error("Availability check failed:", err);
              return null;
            }
          });

          const results = await Promise.all(checkAvailabilityPromises);
          const filteredAvailableRooms = results.filter((room) => {
            if (!room) return false;
            if (guests !== null) {
              return room.maxGuests >= guests;
            }
            return true;
          });

          availableRooms.push(...filteredAvailableRooms);
        } else {
          // If no check-in/check-out provided, still filter by guests
          const filteredByGuests = guests
            ? allRooms.filter((room) => room.maxGuests >= guests)
            : allRooms;

          availableRooms.push(...filteredByGuests);
        }

        setRooms(availableRooms);
        setFilteredRooms(availableRooms);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRooms();
  }, [searchTerm, checkIn, checkOut, guests]);

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
          {guests && `| Guests: ${guests}`}
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
          filteredRooms.map((room) => <HotelCard key={room._id} room={room} />)
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
