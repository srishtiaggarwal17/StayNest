// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import { USER_API_END_POINT } from "@/utils/constant";
// import axios from "axios";
// import { setUser } from "@/redux/authSlice";

// const Profile = () => {
//   const { user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();

//   const [showUpdate, setShowUpdate] = useState(false);
//   const [fullname, setFullname] = useState(user.fullname || "");
//   const [email, setEmail] = useState(user.email || "");
//   const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
//   const [role, setRole] = useState(user.role || "user");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("fullname", fullname);
//       formData.append("email", email);
//       formData.append("phoneNumber", phoneNumber);
//       formData.append("role", role);
//       if (file) formData.append("file", file);

//       const res = await axios.post(`${USER_API_END_POINT}/profile`, formData, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         toast.success("Profile updated successfully!");
//         setShowUpdate(false);
//       } else {
//         toast.error("Failed to update profile.");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message || "Error updating profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 px-4">
//       <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

//       <div className="bg-white rounded-xl shadow-md p-6 flex gap-6 items-center">
//         <img
//           src={user.image}
//           alt="Profile"
//           className="w-28 h-28 rounded-full object-cover border"
//         />
//         <div>
//           <p className="text-lg font-semibold">{user.fullname}</p>
//           <p className="text-gray-600">{user.email}</p>
//           <p className="text-gray-600">📞 {user.phoneNumber}</p>
//           <p className="text-gray-600">Role: {user.role}</p>
//         </div>
//       </div>

//       <div className="mt-6 text-center">
//         <Button onClick={() => setShowUpdate(!showUpdate)}>
//           {showUpdate ? "Cancel" : "Update Profile"}
//         </Button>
//       </div>

//       {showUpdate && (
//         <form
//           onSubmit={handleUpdate}
//           className="mt-6 bg-white shadow-md rounded-xl p-6 space-y-4"
//         >
//           <div>
//             <Label htmlFor="fullname">Full Name</Label>
//             <Input
//               id="fullname"
//               value={fullname}
//               onChange={(e) => setFullname(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="phone">Phone Number</Label>
//             <Input
//               id="phone"
//               type="text"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//           </div>
//           <div>
//             <Label htmlFor="role">Role</Label>
//             <select
//               id="role"
//               className="border px-4 py-2 rounded-md w-full"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <option value="user">User</option>
//               <option value="owner">Owner</option>
//             </select>
//           </div>
//           <div>
//             <Label htmlFor="image">Profile Image</Label>
//             <Input
//               id="image"
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//           </div>
//           <Button type="submit" disabled={loading}>
//             {loading ? "Updating..." : "Update"}
//           </Button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Profile;





// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@radix-ui/react-label";
// import { Button } from "@/components/ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { USER_API_END_POINT } from "@/utils/constant";
// import { toast } from "sonner";
// import axios from "axios";
// import { setLoading, setUser } from "@/redux/authSlice";
// import { Loader2 } from "lucide-react";

// const Profile = () => {
//   const { user, loading } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();

//   const [editMode, setEditMode] = useState(false);
//   const [input, setInput] = useState({
//     fullname: user?.fullname || "",
//     email: user?.email || "",
//     phoneNumber: user?.phoneNumber || "",
//     role: user?.role || "user",
//     file: null,
//   });

//   const changeHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const fileHandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("role", input.role);
//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${USER_API_END_POINT}/profile`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         toast.success(res.data.message);
//         dispatch(setUser(res.data.user));
//         setEditMode(false);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.message || "Error updating profile");
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-28 p-6 border rounded-md shadow">
//       <h1 className="text-2xl font-bold mb-6">My Profile</h1>

//       {!editMode ? (
//         <div>
//           <img
//             src={user?.image}
//             alt="profile"
//             className="w-32 h-32 rounded-full object-cover mb-4"
//           />
//           <p><strong>Full Name:</strong> {user?.fullname}</p>
//           <p><strong>Email:</strong> {user?.email}</p>
//           <p><strong>Phone:</strong> {user?.phoneNumber}</p>
//           <p><strong>Role:</strong> {user?.role}</p>
//           <Button className="mt-4" onClick={() => setEditMode(true)}>Update Profile</Button>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label>Full Name</Label>
//             <Input
//               type="text"
//               name="fullname"
//               value={input.fullname}
//               onChange={changeHandler}
//               required
//             />
//           </div>
//           <div>
//             <Label>Email</Label>
//             <Input
//               type="email"
//               name="email"
//               value={input.email}
//               onChange={changeHandler}
//               required
//             />
//           </div>
//           <div>
//             <Label>Phone Number</Label>
//             <Input
//               type="tel"
//               name="phoneNumber"
//               value={input.phoneNumber}
//               onChange={changeHandler}
//               required
//             />
//           </div>
//           <div>
//             <Label>Role</Label>
//             <select
//               name="role"
//               value={input.role}
//               onChange={changeHandler}
//               className="border p-2 rounded-md w-full"
//             >
//               <option value="user">User</option>
//               <option value="hotelOwner">Hotel Owner</option>
//             </select>
//           </div>
//           <div>
//             <Label>Profile Image</Label>
//             <Input type="file" accept="image/*" onChange={fileHandler} />
//           </div>
//           <div className="flex gap-4">
//             {loading ? (
//               <Button disabled>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
//               </Button>
//             ) : (
//               <>
//                 <Button type="submit">Save Changes</Button>
//                 <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
//                   Cancel
//                 </Button>
//               </>
//             )}
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Profile;



import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    role: user?.role || "user",
    file: null,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        setEditMode(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Error updating profile");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-28 p-6 border rounded-md shadow">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {/* Image + Info side by side */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <img
          src={user?.image}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="space-y-2">
          <p><strong>Full Name:</strong> {user?.fullname}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.phoneNumber}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
      </div>

      <Button className="mt-6" onClick={() => setEditMode(!editMode)}>
        {editMode ? "Close Update Form" : "Update Profile"}
      </Button>

      {editMode && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Role</Label>
            <select
              name="role"
              value={input.role}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            >
              <option value="user">User</option>
              <option value="hotelOwner">Hotel Owner</option>
            </select>
          </div>
          <div>
            <Label>Profile Image</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
