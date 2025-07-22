// import React from "react";
// import { BarChart2, DollarSign } from "lucide-react"
// const OwnerDashboard = () => {
//   const bookings = [
//     { user: "Great Stack", room: "Double Bed", amount: "$299", status: "Completed" },
//     { user: "Great Stack", room: "Double Bed", amount: "$399", status: "Pending" },
//     { user: "Great Stack", room: "Single Bed", amount: "$199", status: "Pending" },
//     { user: "Great Stack", room: "King Bed", amount: "$499", status: "Pending" },  // Example extra booking
//     { user: "Great Stack", room: "Suite", amount: "$599", status: "Pending" },      // Example extra booking
//   ];

//   return (
//     <div className="p-4 max-w-5xl">
//       <h2 className="text-3xl font-semibold mb-2">Dashboard</h2>
//       <p className="text-gray-600 mb-6">
//         Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations.
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-8">
  
//   {/* Total Bookings Card */}
//   <div className="flex items-center justify-between bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
//     <div>
//       <p className="text-sm font-medium text-gray-500 mb-1 flex items-center">
//         <BarChart2 size={18} className="mr-2 text-blue-500" />
//         Total Bookings
//       </p>
//       <p className="text-3xl font-bold text-gray-800">{bookings.length}</p>
//     </div>
//   </div>

//   {/* Total Revenue Card */}
//   <div className="flex items-center justify-between bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
//     <div>
//       <p className="text-sm font-medium text-gray-500 mb-1 flex items-center">
//         <DollarSign size={18} className="mr-2 text-green-500" />
//         Total Revenue
//       </p>
//       <p className="text-3xl font-bold text-gray-800">$897</p>
//     </div>
//   </div>

// </div>


//       <h3 className="text-xl font-semibold mb-2">Recent Bookings</h3>

//       {/* Scrollable Recent Bookings */}
//       <div className="bg-white rounded-lg border shadow-sm max-h-40 overflow-y-auto">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-gray-100 sticky top-0">
//             <tr>
//               <th className="px-4 py-2">User Name</th>
//               <th className="px-4 py-2">Room Name</th>
//               <th className="px-4 py-2">Total Amount</th>
//               <th className="px-4 py-2">Payment Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking, index) => (
//               <tr key={index} className="border-t">
//                 <td className="px-4 py-2">{booking.user}</td>
//                 <td className="px-4 py-2">{booking.room}</td>
//                 <td className="px-4 py-2">{booking.amount}</td>
//                 <td className="px-4 py-2">
//                   {booking.status === "Completed" ? (
//                     <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
//                       Completed
//                     </span>
//                   ) : (
//                     <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
//                       Pending
//                     </span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OwnerDashboard;

import React, { useEffect, useState } from "react";
import { BarChart2, DollarSign, IndianRupee } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BOOKING_API_END_POINT } from "@/utils/constant";

const OwnerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    bookings: [],
  });

  const { user } = useSelector((state) => state.auth);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(`${BOOKING_API_END_POINT}/hotel`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setDashboardData(res.data.dashboardData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-4 max-w-5xl">
      <h2 className="text-3xl font-semibold mb-2">Dashboard</h2>
      <p className="text-gray-600 mb-6">
        Monitor your room listings, track bookings and analyze revenue—all in one place.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-8">
        {/* Total Bookings Card */}
        <div className="flex items-center justify-between bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center">
              <BarChart2 size={18} className="mr-2 text-blue-500" />
              Total Bookings
            </p>
            <p className="text-3xl font-bold text-gray-800">{dashboardData.totalBookings}</p>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="flex items-center justify-between bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center">
              <IndianRupee size={18} className="mr-2 text-green-500" />
              Total Revenue
            </p>
            <p className="text-3xl font-bold text-gray-800">₹{dashboardData.totalRevenue}</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Recent Bookings</h3>

      {/* Scrollable Recent Bookings */}
      <div className="bg-white rounded-lg border shadow-sm max-h-60 overflow-y-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Room</th>
              <th className="px-4 py-2">Total Amount</th>
              <th className="px-4 py-2">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.bookings.map((booking) => (
              <tr key={booking._id} className="border-t">
                <td className="px-4 py-2">{booking.user?.fullname || "Unknown"}</td>
                <td className="px-4 py-2">{booking.room?.type}</td>
                <td className="px-4 py-2">₹{booking.totalPrice}</td>
                <td className="px-4 py-2">
                  {booking.isPaid ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {dashboardData.bookings.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerDashboard;
