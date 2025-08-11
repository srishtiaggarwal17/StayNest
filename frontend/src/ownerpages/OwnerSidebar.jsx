// import React from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import { BarChart2, PlusCircle, List } from "lucide-react";

// const OwnerSidebar = () => {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="w-64 bg-white border-r p-5">
//         <nav className="space-y-4">
//           <NavLink
//             to="/owner"
//              end
//             className={({ isActive }) =>
//               `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
//                 isActive ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-600"
//               }`
//             }
//           >
//             <BarChart2 size={20} />
//             <span>Dashboard</span>
//           </NavLink>

//           <NavLink
//             to="/owner/add-room"
//             className={({ isActive }) =>
//               `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
//                 isActive ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-600"
//               }`
//             }
//           >
//             <PlusCircle size={20} />
//             <span>Add Room</span>
//           </NavLink>

//           <NavLink
//             to="/owner/list-room"
//             className={({ isActive }) =>
//               `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
//                 isActive ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-600"
//               }`
//             }
//           >
//             <List size={20} />
//             <span>List Room</span>
//           </NavLink>
//         </nav>
//       </div>

      
//     </div>
//   );
// };

// export default OwnerSidebar;


import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart2, PlusCircle, List } from "lucide-react";

const navLinkClasses = ({ isActive }) =>
  `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
    isActive ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-600"
  }`;

const OwnerSidebar = ({ onLinkClick }) => {
  return (
    <nav className="space-y-4">
      <NavLink to="/owner" end className={navLinkClasses} onClick={onLinkClick}>
        <BarChart2 size={20} />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/owner/add-room"
        className={navLinkClasses}
        onClick={onLinkClick}
      >
        <PlusCircle size={20} />
        <span>Add Room</span>
      </NavLink>

      <NavLink
        to="/owner/list-room"
        className={navLinkClasses}
        onClick={onLinkClick}
      >
        <List size={20} />
        <span>List Room</span>
      </NavLink>
    </nav>
  );
};

export default OwnerSidebar;
