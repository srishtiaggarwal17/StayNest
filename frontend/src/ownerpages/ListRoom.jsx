// import React, { useState } from "react";

// const ListRoom = () => {
//   const [rooms, setRooms] = useState([
//     {
//       name: "Double Bed",
//       facility: "Room Service, Mountain View, Pool Access",
//       price: 399,
//       active: true,
//     },
//     {
//       name: "Double Bed",
//       facility: "Room Service, Mountain View, Pool Access",
//       price: 299,
//       active: true,
//     },
//     {
//       name: "Double Bed",
//       facility: "Free WiFi, Free Breakfast, Room Service",
//       price: 249,
//       active: true,
//     },
//     {
//       name: "Single Bed",
//       facility: "Free WiFi, Room Service, Pool Access",
//       price: 199,
//       active: true,
//     },
//   ]);

//   const toggleRoom = (index) => {
//     const updatedRooms = [...rooms];
//     updatedRooms[index].active = !updatedRooms[index].active;
//     setRooms(updatedRooms);
//   };

//   return (
//     <div className="p-8 ml-16 max-w-5xl">
//       <h1 className="text-3xl font-bold mb-2">Room Listings</h1>
//       <p className="text-gray-500 mb-6">
//         View, edit, or manage all listed rooms. Keep the information
//         up-to-date to provide the best experience for users.
//       </p>

//       <h2 className="font-semibold text-lg mb-2">All Rooms</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border rounded">
//           <thead>
//             <tr className="bg-gray-100 text-left text-sm font-semibold">
//               <th className="py-3 px-4">Name</th>
//               <th className="py-3 px-4">Facility</th>
//               <th className="py-3 px-4">Price / night</th>
//               <th className="py-3 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rooms.map((room, index) => (
//               <tr
//                 key={index}
//                 className="border-t text-sm hover:bg-gray-50 transition"
//               >
//                 <td className="py-3 px-4">{room.name}</td>
//                 <td className="py-3 px-4">{room.facility}</td>
//                 <td className="py-3 px-4">{room.price}</td>
//                 <td className="py-3 px-4">
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={room.active}
//                       onChange={() => toggleRoom(index)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative transition">
//                       <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
//                     </div>
//                   </label>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };
// export default ListRoom;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { ROOM_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${ROOM_API_END_POINT}/owner`, {
        withCredentials: true,
      });
      setRooms(res.data.rooms);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch rooms");
    }
  };

  const toggleRoom = async (roomId) => {
    try {
      await axios.get(`${ROOM_API_END_POINT}/toggle-availability`, {
        params: { roomId },
        withCredentials: true,
      });
      toast.success("Availability updated");
      fetchRooms(); // refresh the updated data
    } catch (error) {
      console.error(error);
      toast.error("Failed to toggle availability");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="p-8 ml-16 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Room Listings</h1>
      <p className="text-gray-500 mb-6">
        View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.
      </p>

      <h2 className="font-semibold text-lg mb-2">All Rooms</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Facility</th>
              <th className="py-3 px-4">Price / night</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr
                key={room._id}
                className="border-t text-sm hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">{room.type}</td>
                <td className="py-3 px-4">{room.amenities.join(", ")}</td>
                <td className="py-3 px-4">₹{room.price}</td>
                <td className="py-3 px-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={room.isAvailable}
                      onChange={() => toggleRoom(room._id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative transition">
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                    </div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
