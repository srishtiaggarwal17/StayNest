// import React from "react";
// import OwnerSidebar from "./OwnerSidebar";
// import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";


// const Layout=()=>{
//     return(
//         <div className="flex flex-col h-screen">
//             <Navbar/>
//             <div className="flex h-full">
//                 <OwnerSidebar/>
//                 <div className="flex-1 p-4 pt-10 md:px-10 h-full">
//                     <Outlet/>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Layout

import React, { useState, useEffect } from "react";
import OwnerSidebar from "./OwnerSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import HotelReg from "./HotelReg";
import axios from "axios";
import { HOTEL_API_END_POINT } from "@/utils/constant";

const Layout = () => {
  const { user } = useSelector((store) => store.auth);
  const [hasHotel, setHasHotel] = useState(true); // assume has hotel by default
  const [showHotelPopup, setShowHotelPopup] = useState(false);

  useEffect(() => {
    const checkHotel = async () => {
      try {
        const res = await axios.get(`${HOTEL_API_END_POINT}/check`, { withCredentials: true });
        setHasHotel(res.data.hasHotel);
        if (user?.role === "hotelOwner" && !res.data.hasHotel) {
          setShowHotelPopup(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (user?.role === "hotelOwner") checkHotel();
  }, [user]);

  return (
    <div className="flex flex-col h-screen relative">
      <Navbar />
      <div className="flex h-full">
        <OwnerSidebar />
        <div className="flex-1 p-4 pt-10 md:px-10 h-full overflow-auto">
          <Outlet />
        </div>
      </div>

      {user?.role === "hotelOwner" && !hasHotel && showHotelPopup && (
        <HotelReg onClose={() => setShowHotelPopup(false)} />
      )}
    </div>
  );
};

export default Layout;

