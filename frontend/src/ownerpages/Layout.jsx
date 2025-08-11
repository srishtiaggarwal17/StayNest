// import React, { useState, useEffect } from "react";
// import OwnerSidebar from "./OwnerSidebar";
// import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
// import { useSelector } from "react-redux";
// import HotelReg from "./HotelReg";
// import axios from "axios";
// import { HOTEL_API_END_POINT } from "@/utils/constant";

// const Layout = () => {
//   const { user } = useSelector((store) => store.auth);
//   const [hasHotel, setHasHotel] = useState(true); // assume has hotel by default
//   const [showHotelPopup, setShowHotelPopup] = useState(false);

//   useEffect(() => {
//     const checkHotel = async () => {
//       try {
//         const res = await axios.get(`${HOTEL_API_END_POINT}/check`, { withCredentials: true });
//         setHasHotel(res.data.hasHotel);
//         if (user?.role === "hotelOwner" && !res.data.hasHotel) {
//           setShowHotelPopup(true);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     if (user?.role === "hotelOwner") checkHotel();
//   }, [user]);

//   return (
//     <div className="flex flex-col h-screen relative">
//       <Navbar />
//       <div className="flex h-full">
//         <OwnerSidebar />
//         <div className="flex-1 p-4 pt-10 md:px-10 h-full overflow-auto">
//           <Outlet />
//         </div>
//       </div>

//       {user?.role === "hotelOwner" && !hasHotel && showHotelPopup && (
//         <HotelReg onClose={() => setShowHotelPopup(false)} />
//       )}
//     </div>
//   );
// };

// export default Layout;


import React, { useState, useEffect } from "react";
import OwnerSidebar from "./OwnerSidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import HotelReg from "./HotelReg";
import axios from "axios";
import { HOTEL_API_END_POINT } from "@/utils/constant";
import { Menu, X } from "lucide-react";

const Layout = () => {
  const { user } = useSelector((store) => store.auth);
  const [hasHotel, setHasHotel] = useState(true);
  const [showHotelPopup, setShowHotelPopup] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkHotel = async () => {
      try {
        const res = await axios.get(`${HOTEL_API_END_POINT}/check`, {
          withCredentials: true,
        });
        setHasHotel(res.data.hasHotel);
        if (user?.role === "hotelOwner" && !res.data.hasHotel) {
          setShowHotelPopup(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.role === "hotelOwner") checkHotel();
  }, [user]);

  return (
    <div className="flex flex-col h-screen relative">
      {/* Navbar receives setter to toggle mobile sidebar */}
      <Navbar setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 h-full">
        {/* Desktop sidebar (fixed) */}
        <aside className="hidden md:block w-64 bg-white border-r p-5">
          <OwnerSidebar />
        </aside>

        {/* Main */}
        <main className="flex-1 p-4 md:px-10 h-full overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile slide-in sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Panel (on the right) */}
          <div className="w-64 bg-white p-5 relative">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>

            {/* Sidebar links (pass onLinkClick so clicking a link closes the drawer) */}
            <OwnerSidebar onLinkClick={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Hotel registration popup (unchanged) */}
      {user?.role === "hotelOwner" && !hasHotel && showHotelPopup && (
        <HotelReg onClose={() => setShowHotelPopup(false)} />
      )}
    </div>
  );
};

export default Layout;
