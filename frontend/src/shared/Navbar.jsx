import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2, LogOut, CalendarCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import logo1 from "@/assets/logo1.png"
import logo2 from "@/assets/logo2.png"

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/" || location.pathname==="/about";

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
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
    <div className={`absolute top-0 left-0 w-full z-50 ${isHome ? "bg-transparent text-white" : "bg-white text-black shadow-sm"}`}>
      <div className="relative flex items-center justify-between mx-auto max-w-7xl h-20 px-6">
        {/* Logo */}
        <div>
          {/* <h1 className="text-2xl font-bold">
            Quick<span className={isHome ? "text-white" : "text-black"}>Stay</span>
          </h1> */}
          <img className="h-28 w-auto"  src={isHome ? logo1 : logo2}/>
        </div>

        {/* Nav Links */}
        <ul className="absolute left-1/2 -translate-x-1/2 flex font-medium items-center gap-8">
          <li>
            <Link to="/" className="hover:text-gray-500">Home</Link>
          </li>
          <li>
            <Link to="/hotels" className="hover:text-gray-500">Hotels</Link>
          </li>
          <li>
            <Link to="/experience" className="hover:text-gray-500">Experience</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-500">About</Link>
          </li>
        </ul>

        {/* Auth Buttons or Avatar */}
        {!user ? (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button className={`${isHome ? "bg-white text-black" : "bg-black text-white"} hover:opacity-80`} variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className={`${isHome ? "bg-black text-white" : "bg-gray-800 text-white"} hover:opacity-90`}>Signup</Button>
            </Link>
          </div>
        ) : (
          <div className="z-10">
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.image} alt="User" className="object-cover" />
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
                  <Link to="/profile" className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer">
                    <User2 className="w-4 h-4" />
                    <span>View Profile</span>
                  </Link>
                  <Link to="/bookings" className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer">
                    <CalendarCheck className="w-4 h-4" />
                    <span>My Bookings</span>
                  </Link>
                  <div onClick={logoutHandler} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
