import React from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HotelCard = ({room}) => {
    const navigate=useNavigate()
  return (
    <div className="flex gap-4 mb-10 border-b pb-6">
      <img
        src={room.images[0] || "https://via.placeholder.com/300x200?text=No+Image"}
        alt="hotel"
        className="w-[300px] h-[200px] object-cover rounded-xl"
        onClick={() => navigate(`/description/${room._id}`)}
      />
      <div>
        <p className="text-sm text-gray-500">{room.hotel.city}</p>
        <h2 className="text-2xl font-semibold">{room.hotel.name}</h2>
        <p className="text-orange-500 font-semibold mt-1">⭐⭐⭐⭐ {room.type}</p>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          {room.hotel.address}
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {room.amenities.slice(0, 4).map((a, i) => (
            <span key={i} className="bg-gray-100 px-3 py-1 rounded-md text-sm">
              {a}
            </span>
          ))}
        </div>
        <p className="text-xl font-bold mt-4 text-gray-800">₹{room.price}<span className="text-sm font-normal">/night</span></p>
      </div>
    </div>
  );
};
export default HotelCard;



