import React from "react";
import { useNavigate } from "react-router-dom";

const roomTypes = [
  {
    name: "Single",
    image: "https://wallpaperaccess.com/full/2690578.jpg",
  },
  {
    name: "Double",
    image: "https://wallpapercave.com/wp/wp10535542.jpg",
  },
  {
    name: "Deluxe",
    image: "https://wallpapercave.com/wp/wp6957260.jpg",
  },
  {
    name: "Suite",
    image: "https://i.pinimg.com/originals/8c/84/80/8c8480c27e0fef3e2a5c8e7c345e6d0c.jpg",
  },
];

const BrowseByRoomType = () => {
  const navigate = useNavigate();
  const handleCityClick = (type) => {
    navigate(`/hotels?destination=${encodeURIComponent(type)}`);
  };
  return (
    <section className="max-w-6xl mx-auto px-4 ">
      <h2 className="text-3xl font-semibold mb-6">Browse by room type</h2>

      <div className="flex gap-6 overflow-x-auto pb-2">
        {roomTypes.map((type) => (
          <div
            key={type.name}
            className="min-w-[350px] flex-shrink-0 rounded-xl overflow-hidden shadow-sm border cursor-pointer hover:shadow-md transition"
            onClick={() => handleCityClick(type.name)}
          >
            <img
              src={type.image}
              alt={type.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-3 text-center font-medium">{type.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseByRoomType;
