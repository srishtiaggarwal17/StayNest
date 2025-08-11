import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";
import { HOTEL_API_END_POINT, ROOM_API_END_POINT } from "@/utils/constant";

const AddRoom = () => {
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState(0);
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [hotelId, setHotelId] = useState(null);
  const [maxGuests, setMaxGuests] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const amenitiesList = [
    "Free WiFi",
    "Free Breakfast",
    "Room Service",
    "Mountain View",
    "Pool Access",
  ];

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`${HOTEL_API_END_POINT}/getHotel`, {
          withCredentials: true,
        });
        setHotelId(res.data.hotel?._id);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch hotel");
      }
    };

    if (user?.role === "hotelOwner") {
      fetchHotel();
    }
  }, [user]);

  const handleAmenityChange = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  // const handleImageChange = (e) => {
  //   setImages(Array.from(e.target.files));
  // };
  const handleImageChange = (e) => {
  const selectedFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...selectedFiles]);
  };


  const handleSubmit = async () => {
    if (!hotelId) {
      return toast.error("Hotel not linked to your account");
    }

    if (!roomType || !price || !maxGuests || amenities.length === 0 || images.length === 0) {
      return toast.error("All fields are required");
    }

    const formData = new FormData();
    formData.append("hotel", hotelId);
    formData.append("type", roomType);
    formData.append("price", price);
    formData.append("maxGuests", maxGuests);
    formData.append("roomCount", roomCount);
    formData.append("amenities", JSON.stringify(amenities));

    images.forEach((image) => {
      formData.append("images", image); // backend expects "images"
    });

    try {
      const res = await axios.post(`${ROOM_API_END_POINT}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success(res.data.message || "Room created successfully");

      // Reset form
      setRoomType("");
      setPrice(0);
      setMaxGuests(1);
      setRoomCount(1);
      setAmenities([]);
      setImages([]);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Room creation failed");
    }
  };

//   return (
//     <div className="p-8 max-w-3xl ml-16">
//       <h1 className="text-3xl font-bold mb-4">Add Room</h1>

//       {hotelId ? (
//         <>
//           {/* Image Upload */}
//           <div className="mb-6">
//             <label className="font-semibold block mb-2">Room Images</label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleImageChange}
//               className="block border p-2 rounded w-full"
//             />
//             {images.length > 0 && (
//               <>
//                 <ul className="mt-2 text-sm text-gray-500 list-disc ml-5">
//                   {images.map((img, idx) => (
//                     <li key={idx}>{img.name}</li>
//                   ))}
//                 </ul>
//                 <div className="mt-4 grid grid-cols-3 gap-3 max-h-48 overflow-y-auto">
//                   {images.map((image, idx) => (
//                     <img
//                       key={idx}
//                       src={URL.createObjectURL(image)}
//                       alt={`Room ${idx}`}
//                       className="w-full h-32 object-cover rounded"
//                     />
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Room Type and Price */}
//           <div className="flex items-center space-x-4 mb-6">
//             <div className="flex-1">
//               <label className="block text-sm font-medium mb-1">Room Type</label>
//               <select
//                 className="w-full border rounded px-3 py-2"
//                 value={roomType}
//                 onChange={(e) => setRoomType(e.target.value)}
//               >
//                 <option value="">Select Room Type</option>
//                 <option value="Single">Single</option>
//                 <option value="Double">Double</option>
//                 <option value="Suite">Suite</option>
//                 <option value="Deluxe">Deluxe</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Price <span className="text-gray-400 text-xs">/night</span>
//               </label>
//               <input
//                 type="number"
//                 min="0"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 className="w-24 border rounded px-3 py-2"
//               />
//             </div>

            
//             <div>
//               <label className="block text-sm font-medium mb-1">Max Guests</label>
//               <input
//                 type="number"
//                 min="1"
//                 value={maxGuests}
//                 onChange={(e) => setMaxGuests(e.target.value)}
//                 className="w-24 border rounded px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Total Rooms</label>
//               <input
//                 type="number"
//                 min="1"
//                 value={roomCount}
//                 onChange={(e) => setRoomCount(e.target.value)}
//                 className="w-24 border rounded px-3 py-2"
//               />
//             </div>
//           </div>
          

//           {/* Amenities */}
//           <div className="mb-6">
//             <label className="block font-semibold mb-2">Amenities</label>
//             <div className="space-y-2">
//               {amenitiesList.map((item) => (
//                 <div key={item}>
//                   <label className="inline-flex items-center">
//                     <input
//                       type="checkbox"
//                       className="mr-2"
//                       checked={amenities.includes(item)}
//                       onChange={() => handleAmenityChange(item)}
//                     />
//                     {item}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//           >
//             Add Room
//           </button>
//         </>
//       ) : (
//         <p className="text-red-600">No hotel linked to your account.</p>
//       )}
//     </div>
//   );
// };

// export default AddRoom;
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Add Room</h1>

      {hotelId ? (
        <>
          {/* Image Upload */}
          <div className="mb-6">
            <label className="font-semibold block mb-2">Room Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="block border p-2 rounded w-full"
            />
            {images.length > 0 && (
              <>
                <ul className="mt-2 text-sm text-gray-500 list-disc ml-5">
                  {images.map((img, idx) => (
                    <li key={idx}>{img.name}</li>
                  ))}
                </ul>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                  {images.map((image, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(image)}
                      alt={`Room ${idx}`}
                      className="w-full h-28 sm:h-32 object-cover rounded"
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Room Type and Price */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Room Type</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="">Select Room Type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
                <option value="Deluxe">Deluxe</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Price <span className="text-gray-400 text-xs">/night</span>
              </label>
              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full md:w-24 border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Max Guests</label>
              <input
                type="number"
                min="1"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
                className="w-full md:w-24 border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Total Rooms</label>
              <input
                type="number"
                min="1"
                value={roomCount}
                onChange={(e) => setRoomCount(e.target.value)}
                className="w-full md:w-24 border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {amenitiesList.map((item) => (
                <label key={item} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={amenities.includes(item)}
                    onChange={() => handleAmenityChange(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {isLoading ? "Adding..." : "Add Room"}
          </button>
        </>
      ) : (
        <p className="text-red-600">No hotel linked to your account.</p>
      )}
    </div>
  );
};

export default AddRoom;

