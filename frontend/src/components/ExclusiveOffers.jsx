import OfferCard from "@/components/OfferCard";
import bgImage from "@/assets/bg.png";
import { useNavigate } from "react-router-dom";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


const destinations = [
  {
    city: "Adventure",
    country: "Explore wild stays",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    isFullWidth: true,
  },
  {
    city: "Mississauga",
    country: "Canada",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Mississauga.jpg",
  },
  {
    city: "Bangkok",
    country: "Thailand",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Bangkok_at_night.jpg",
  },
  {
    city: "London",
    country: "United Kingdom",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/London_Big_Ben.jpg",
  },
  {
    city: "Varanasi",
    country: "India",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Varanasi_Ghat.jpg",
  },
  {
    city: "Solang",
    country: "India",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Solang_valley.jpg",
  },
];

const ExclusiveOffers = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="px-6 py-10 relative">
      <h2 className="text-2xl font-bold mb-6">Explore stays in trending destinations</h2>

      {/* Scroll Buttons */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full hover:bg-gray-100"
        onClick={() => scroll("left")}
      >
        <ChevronLeft />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full hover:bg-gray-100"
        onClick={() => scroll("right")}
      >
        <ChevronRight />
      </button>

      {/* Scrollable Destinations */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {destinations.map((dest, index) => (
          <div
            key={index}
            onClick={() => navigate(`/hotels?city=${encodeURIComponent(dest.city)}`)}
            className={`flex-shrink-0 cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ${
              dest.isFullWidth ? "w-[400px]" : "w-[250px]"
            }`}
          >
            <img
              src={dest.image}
              alt={dest.city}
              className="h-40 w-full object-cover"
            />
            <div className="p-3 bg-white">
              <p className="font-semibold text-lg">{dest.city}</p>
              <p className="text-sm text-gray-500">{dest.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;


