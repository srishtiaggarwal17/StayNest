// import React from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { User2, LogOut, CalendarCheck } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constant";
// import { setUser } from "@/redux/authSlice";
// import { toast } from "sonner";
// import logo1 from "@/assets/logo1.png"
// import logo2 from "@/assets/logo2.png"

// const Navbar = () => {
//   const { user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isHome = location.pathname === "/" || location.pathname==="/about";

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message || "Logout failed. Try again.");
//     }
//   };

//   return (
//     <div className={`absolute top-0 left-0 w-full z-50 ${isHome ? "bg-transparent text-white" : "bg-white text-black shadow-sm"}`}>
//       <div className="relative flex items-center justify-between mx-auto max-w-7xl h-20 px-6">
//         {/* Logo */}
//         <div>
//           {/* <h1 className="text-2xl font-bold">
//             Quick<span className={isHome ? "text-white" : "text-black"}>Stay</span>
//           </h1> */}
//           <img className="h-28 w-auto"  src={isHome ? logo1 : logo2}/>
//         </div>

//         {/* Nav Links */}
// {/*         <ul className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-2 rounded-full backdrop-blur-md transition ${
//           isHome? "bg-white/20 text-white border border-white/30"
//           : " text-black "}`}>
//           <li>
//             <Link to="/" className="hover:text-gray-500">Home</Link>
//           </li>
//           <li>
//             <Link to="/hotels" className="hover:text-gray-500">Hotels</Link>
//           </li>
//           <li>
//             <Link to="/experience" className="hover:text-gray-500">Experience</Link>
//           </li>
//           <li>
//             <Link to="/about" className="hover:text-gray-500">About</Link>
//           </li>
//         </ul> */}
//           <ul
//           className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-1.3 px-6 py-2 rounded-full backdrop-blur-md transition ${
//           isHome
//           ? "bg-white/20 text-white border border-white/30"
//           : "bg-black/5 text-black border border-black/10"}`}
//         >
//           {[
//             { path: "/", label: "Home" },
//             { path: "/hotels", label: "Hotels" },
//             { path: "/experience", label: "Experience" },
//             { path: "/about", label: "About" },
//           ].map((item) => (
//           <li key={item.path}>
//             <Link to={item.path}
//               className={`px-2.5 py-1 rounded-full transition-all duration-300 ease-in-out 
//               ${
//               isHome
//               ? "hover:bg-white/30 hover:text-white"
//               : "hover:bg-black/10 hover:text-black"
//               }
//               hover:shadow-md hover:scale-105`}
//             >
//               {item.label}
//             </Link>
//           </li>
//         ))}
//       </ul>

//         {/* Auth Buttons or Avatar */}
//         {!user ? (
//           <div className="flex items-center gap-2">
//             <Link to="/login">
//               <Button className={`${ "bg-white text-black" } hover:opacity-80`} variant="outline">Login</Button>
//             </Link>
//             <Link to="/signup">
//               <Button className={`${isHome ? "bg-black text-white" : "bg-gray-800 text-white"} hover:opacity-90`}>Signup</Button>
//             </Link>
//           </div>
//         ) : (
//           <div className="z-10">
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Avatar className="cursor-pointer">
//                   <AvatarImage src={user.image} alt="User" className="object-cover" />
//                   <AvatarFallback>{user.fullname[0]}</AvatarFallback>
//                 </Avatar>
//               </PopoverTrigger>
//               <PopoverContent className="z-50 w-64 bg-white rounded-lg shadow-md p-4 space-y-4 text-black">
//                 <div className="flex items-center gap-4">
//                   <Avatar>
//                     <AvatarImage src={user.image} alt="User" />
//                     <AvatarFallback>{user.fullname[0]}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h4 className="font-semibold text-base">{user.fullname}</h4>
//                     <p className="text-sm text-gray-500">{user.email}</p>
//                   </div>
//                 </div>
//                 <div className="space-y-2 text-sm text-gray-700">
//                   <Link to="/profile" className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer">
//                     <User2 className="w-4 h-4" />
//                     <span>View Profile</span>
//                   </Link>
//                   <Link to="/bookings" className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer">
//                     <CalendarCheck className="w-4 h-4" />
//                     <span>My Bookings</span>
//                   </Link>
//                   <div onClick={logoutHandler} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer">
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {User2,LogOut,CalendarCheck,Menu,X,Home,Building2,Globe2,Info,Search} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import logo1 from "@/assets/logo1.png";
import logo2 from "@/assets/logo2.png";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location.pathname === "/" || location.pathname === "/about";

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed. Try again.");
    }
  };

  return (
    <div
      className={`absolute top-0 left-0 w-full z-50 ${
        isHome ? "bg-transparent text-white" : "bg-white text-black shadow-sm"
      }`}
    >
      <div className="relative flex items-center justify-between mx-auto max-w-7xl h-20 px-6">
        {/* Logo */}
        <div>
          <img className="h-28 w-auto" src={isHome ? logo1 : logo2} />
        </div>

        {/* Desktop Navigation */}
        <ul
          className={`hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1.3 px-6 py-2 rounded-full backdrop-blur-md transition ${
            isHome
              ? "bg-white/20 text-white border border-white/30"
              : "bg-black/5 text-black border border-black/10"
          }`}
        >
          {[
            { path: "/", label: "Home" },
            { path: "/hotels", label: "Hotels" },
            { path: "/browse", label: "Browse" },
            { path: "/experience", label: "Experience" },
            { path: "/about", label: "About" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`px-2.5 py-1 rounded-full transition-all duration-300 ease-in-out ${
                  isHome
                    ? "hover:bg-white/30 hover:text-white"
                    : "hover:bg-black/10 hover:text-black"
                } hover:shadow-md hover:scale-105`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/login">
                <Button
                  className={`${
                    isHome ? "bg-white text-black" : "bg-black text-white"
                  } hover:opacity-80`}
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  className={`${
                    isHome ? "bg-black text-white" : "bg-gray-800 text-white"
                  } hover:opacity-90`}
                >
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user.image}
                    alt="User"
                    className="object-cover"
                  />
                  <AvatarFallback>{user.fullname[0]}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="z-50 w-64 bg-white rounded-lg shadow-md p-4 space-y-4 text-black">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.image} alt="User" />
                    <AvatarFallback>{user.fullname[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-base">{user.fullname}</h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <User2 className="w-4 h-4" />
                    <span>View Profile</span>
                  </Link>
                  <Link
                    to="/bookings"
                    className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>My Bookings</span>
                  </Link>
                  <div
                    onClick={logoutHandler}
                    className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-black/10"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}

        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-white text-black shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2 px-4 py-6">
            {[
              { path: "/", label: "Home", icon: <Home size={18} /> },
              { path: "/hotels", label: "Hotels", icon: <Building2 size={18} /> },
              { path: "/browse", label: "Browse", icon: <Search size={18} /> },
              { path: "/experience", label: "Experience", icon: <Globe2 size={18} /> },
              { path: "/about", label: "About", icon: <Info size={18} /> },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="px-4 pb-6 border-t border-gray-200 mt-auto">
            {!user ? (
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-black text-white hover:bg-black/90">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gray-800 text-white hover:bg-gray-700">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/profile" onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-3"
                >
                  <User2 size={18} /> Profile
                </Link>
                <Link
                  to="/bookings" onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-3"
                >
                  <CalendarCheck size={18} /> My Bookings
                </Link>
                <button
                  onClick={logoutHandler}
                  className="px-3 py-2 rounded-lg text-left hover:bg-gray-100 flex items-center gap-3"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
