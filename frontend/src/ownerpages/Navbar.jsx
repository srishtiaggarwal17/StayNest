import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut,Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import logo2 from "@/assets/logo2.png"

const Navbar = ({ setSidebarOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

//   return (
//     <div className="bg-white shadow-md w-full h-16 flex items-center justify-between px-6 z-50">
//       {/* Left: Logo */}
//       <Link to="/">
// {/*         <h1 className="text-xl font-bold text-black">
//           Stay<span className="text-blue-600">Nest</span>
//         </h1> */}
//         <div>
//           <img className="h-28 w-auto"  src={logo2}/>
//         </div>
//       </Link>

//       {/* Right: Auth/Avatar */}
//       {!user ? (
//         <div className="flex items-center gap-2">
//           <Link to="/login">
//             <Button variant="outline">Login</Button>
//           </Link>
//           <Link to="/signup">
//             <Button className="bg-black text-white">Signup</Button>
//           </Link>
//         </div>
//       ) : (
//         <Popover>
//           <PopoverTrigger asChild>
//             <Avatar className="cursor-pointer">
//               <AvatarImage src={user.image} alt={user.fullname} className="object-cover" />
//               <AvatarFallback>{user.fullname?.[0]}</AvatarFallback>
//             </Avatar>
//           </PopoverTrigger>
//           <PopoverContent className="z-50 w-60 bg-white rounded-lg shadow p-4 space-y-4 text-black">
//             <div className="flex items-center gap-4">
//               <Avatar>
//                 <AvatarImage src={user.image} alt="User" />
//                 <AvatarFallback>{user.fullname?.[0]}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <h4 className="font-semibold">{user.fullname}</h4>
//                 <p className="text-sm text-gray-500">{user.email}</p>
//               </div>
//             </div>

//             <div
//               onClick={logoutHandler}
//               className="flex items-center gap-2 text-sm px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
//             >
//               <LogOut className="w-4 h-4" />
//               <span>Logout</span>
//             </div>
//           </PopoverContent>
//         </Popover>
//       )}
//     </div>
//   );
// };

// export default Navbar;
   return (
    <header className="bg-white shadow-md w-full h-16 flex items-center justify-between px-4 sm:px-6 z-50">
      {/* Left: mobile hamburger + logo */}
      <div className="flex items-center gap-3">
        {/* Hamburger (only on mobile) */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setSidebarOpen && setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <Link to="/" className="inline-block">
          <img className="h-28 w-auto" src={logo2} alt="StayNest" />
        </Link>
      </div>

      {/* Right: auth / avatar */}
      <div className="flex items-center gap-3">
        {!user ? (
          <>
            <Link to="/login">
              <Button variant="outline" className="hidden sm:inline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="hidden sm:inline bg-black text-white">Signup</Button>
            </Link>

            {/* On very small screens show text-only buttons in dropdown? Keep simple for now */}
          </>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.image} alt={user.fullname} className="object-cover" />
                <AvatarFallback>{user.fullname?.[0]}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="z-50 w-60 bg-white rounded-lg shadow p-4 space-y-4 text-black">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={user.image} alt="User" />
                  <AvatarFallback>{user.fullname?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{user.fullname}</h4>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div
                onClick={logoutHandler}
                className="flex items-center gap-2 text-sm px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
};

export default Navbar;
