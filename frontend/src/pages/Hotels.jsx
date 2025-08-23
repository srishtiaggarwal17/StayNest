
// import React, { useEffect, useState } from "react";
// // import { useLocation } from "react-router-dom";
// import HotelCard from "@/components/HotelCard";
// import HotelFilter from "@/components/HotelFilter";
// import axios from "axios";
// import { ROOM_API_END_POINT } from "@/utils/constant";
// import { Input } from "@/components/ui/input";
// import { motion, AnimatePresence } from "framer-motion";

// // const useQuery = () => new URLSearchParams(useLocation().search);

// const Hotels = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false);
//   // const query = useQuery();
//   // const destinationQuery = query.get("destination") || "";

//   const [rooms, setRooms] = useState([]);
//   const [filteredRooms, setFilteredRooms] = useState([]);

//   const [roomTypes, setRoomTypes] = useState([]);
//   const [priceRanges, setPriceRanges] = useState([]);
//   const [sortBy, setSortBy] = useState("");
//   // const [searchTerm, setSearchTerm] = useState(destinationQuery);

//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   // useEffect(() => {
//   //   const fetchRooms = async () => {
//   //     setIsLoading(true); 
//   //     try {
//   //       const res = await axios.get(`${ROOM_API_END_POINT}/getR`, {
//   //         withCredentials:true
//   //       });
//   //       let allRooms = res.data.rooms;
//   //       setRooms(allRooms);
//   //     } catch (err) {
//   //       console.error(err);
//   //     }
//   //     setIsLoading(false);
//   //   };
//   //   fetchRooms();
//   // }, []);
//   const fetchRooms = async (pageNum = 1) => {
//     if (pageNum === 1) setIsLoading(true);
//     else setLoadingMore(true);

//     try {
//       const res = await axios.get(
//         `${ROOM_API_END_POINT}/getRooms`,
//         { withCredentials: true }
//       );

//       const newRooms = res.data.rooms;

//       if (pageNum === 1) {
//         setRooms(newRooms);
//       } else {
//         setRooms((prev) => [...prev, ...newRooms]);
//       }

//       // check if more pages available
//       if (pageNum >= res.data.totalPages) {
//         setHasMore(false);
//       } else {
//         setHasMore(true);
//       }
//     } catch (err) {
//       console.error(err);
//     }

//     setIsLoading(false);
//     setLoadingMore(false);
//   };

//   // ✅ First load
//   useEffect(() => {
//     fetchRooms(1);
//   }, []);

//   // ✅ Infinite scroll listener
//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop + 50 >=
//         document.documentElement.scrollHeight
//       ) {
//         if (hasMore && !loadingMore) {
//           setPage((prev) => prev + 1);
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [hasMore, loadingMore]);

//   // ✅ Fetch next page when `page` changes
//   useEffect(() => {
//     if (page > 1) {
//       fetchRooms(page);
//     }
//   }, [page]);

//   useEffect(() => {
//     let filtered = [...rooms];

//     if (roomTypes.length > 0) {
//       filtered = filtered.filter((room) => roomTypes.includes(room.type));
//     }

//     if (priceRanges.length > 0) {
//       filtered = filtered.filter((room) => {
//         return priceRanges.some((range) => {
//           const [min, max] = range.split("-").map(Number);
//           return room.price >= min && room.price <= max;
//         });
//       });
//     }

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
//     <div className="max-w-7xl mx-auto p-4 mt-20">
//       {/* Top section for small screens (Map + Filters stacked) */}
//       <div className="flex flex-col gap-4 md:hidden mb-6">
//         <div className="w-full h-40 rounded-lg overflow-hidden shadow-sm border">
//           <iframe
//             title="Map"
//             src={`https://www.google.com/maps?q=${encodeURIComponent("India")}&output=embed`}
//             width="100%"
//             height="100%"
//             allowFullScreen=""
//             loading="lazy"
//             className="rounded-lg"
//           />
//         </div>
//         <HotelFilter
//           roomTypes={roomTypes}
//           setRoomTypes={setRoomTypes}
//           priceRanges={priceRanges}
//           setPriceRanges={setPriceRanges}
//           sortBy={sortBy}
//           setSortBy={setSortBy}
//         />
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Main Content */}
//         <div className="md:w-3/4">
//           <h1 className="text-3xl font-semibold mb-2">Available Rooms</h1>
//           <p className="text-gray-500 mb-8">Explore all rooms from different hotels across locations.</p>

// {/*           <Input
//             type="text"
//             placeholder="Search by hotel, address, or room type..."
//             className="mb-6"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           /> */}

//           {isLoading ? (
//           <div className="space-y-6">
//           {[...Array(2)].map((_, idx) => (
//             <div key={idx}
//               className="flex gap-6 p-4 rounded-xl bg-white shadow border border-gray-200 animate-pulse"
//             >
//               <div className="h-40 w-64 bg-gray-300 rounded-xl"></div>
//               <div className="flex flex-col justify-between flex-1 py-1">
//                 <div className="space-y-2">
//                   <div className="h-4 bg-gray-300 rounded w-20" />
//                     <div className="h-5 bg-gray-400 rounded w-3/4" />
//                     <div className="flex items-center gap-3">
//                       <div className="h-4 w-20 bg-gray-300 rounded" />
//                       <div className="h-3 w-16 bg-gray-200 rounded" />
//                     </div>
//                     <div className="h-3 bg-gray-200 rounded w-full" />
//                     <div className="h-3 bg-gray-200 rounded w-4/5" />
//                     <div className="flex gap-2 mt-3">
//                       <div className="h-6 w-24 bg-gray-200 rounded-full" />
//                       <div className="h-6 w-24 bg-gray-200 rounded-full" />
//                       <div className="h-6 w-24 bg-gray-200 rounded-full" />
//                     </div>
//                   </div>
//                   <div className="h-4 w-24 bg-gray-300 rounded mt-4" />
//                 </div>
//               </div>
//             ))}
//           </div>
//           ) : filteredRooms.length === 0 ? (
//             <span>No rooms found.</span>
//           ) : (
//             <AnimatePresence>
//               {filteredRooms.map((room) => (
//                 <motion.div
//                   key={room._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <HotelCard
//                     room={room}
//                     isAvailable={room.isAvailable}
//                     availableRooms={room.availableRooms}
//                   />
//                 </motion.div>
//               ))}
//               {loadingMore && (
//                 <div className="text-center py-6 text-gray-500">Loading more...</div>
//               )}
//             </AnimatePresence>
//           )}
//         </div>

//         {/* Sidebar for medium+ screens */}
//         <div className="hidden md:block md:w-1/4 space-y-4">
//           <div className="w-full h-40 rounded-lg overflow-hidden shadow-sm border">
//             <iframe
//               title="Map"
//               src={`https://www.google.com/maps?q=${encodeURIComponent("India")}&output=embed`}
//               width="100%"
//               height="100%"
//               allowFullScreen=""
//               loading="lazy"
//               className="rounded-lg"
//             />
//           </div>
//           <HotelFilter
//             roomTypes={roomTypes}
//             setRoomTypes={setRoomTypes}
//             priceRanges={priceRanges}
//             setPriceRanges={setPriceRanges}
//             sortBy={sortBy}
//             setSortBy={setSortBy}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hotels;

import React, { useEffect, useState } from "react";
import HotelCard from "@/components/HotelCard";
import HotelFilter from "@/components/HotelFilter";
import axios from "axios";
import { ROOM_API_END_POINT } from "@/utils/constant";
import { motion, AnimatePresence } from "framer-motion";

const Hotels = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const [roomTypes, setRoomTypes] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [sortBy, setSortBy] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; // rooms per page

  // Fetch rooms with pagination
  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${ROOM_API_END_POINT}/getR`, {
          withCredentials: true,
          params: { page, limit },
        });

        setRooms(res.data.rooms || []);
        setTotalPages(res.data.pagination?.pages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [page]);

  // Filters + sorting
  useEffect(() => {
    let filtered = [...rooms];

    if (roomTypes.length > 0) {
      filtered = filtered.filter((room) => roomTypes.includes(room.type));
    }

    if (priceRanges.length > 0) {
      filtered = filtered.filter((room) =>
        priceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return room.price >= min && room.price <= max;
        })
      );
    }

    if (sortBy === "lowToHigh") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "highToLow") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "newest")
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredRooms(filtered);
  }, [roomTypes, priceRanges, sortBy, rooms]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);


  // Skeleton Loader
  const SkeletonLoader = () => (
    <div className="space-y-6">
      {[...Array(2)].map((_, idx) => (
        <div
          key={idx}
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
  );

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      {/* Top section for small screens (Map + Filters stacked) */}
      <div className="flex flex-col gap-4 md:hidden mb-6">
        <div className="w-full h-40 rounded-lg overflow-hidden shadow-sm border">
          <iframe
            title="Map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              "India"
            )}&output=embed`}
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

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="md:w-3/4">
          <h1 className="text-3xl font-semibold mb-2">Available Rooms</h1>
          <p className="text-gray-500 mb-8">
            Explore all rooms from different hotels across locations.
          </p>

          {isLoading ? (
            <SkeletonLoader />
          ) : filteredRooms.length === 0 ? (
            <span>No rooms found.</span>
          ) : (
            <AnimatePresence>
              {filteredRooms.map((room) => (
                <motion.div
                  key={room._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <HotelCard
                    room={room}
                    isAvailable={room.isAvailable}
                    availableRooms={room.availableRooms}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden md:block md:w-1/4 space-y-4">
          <div className="w-full h-40 rounded-lg overflow-hidden shadow-sm border">
            <iframe
              title="Map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                "India"
              )}&output=embed`}
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
    </div>
  );
};

export default Hotels;

