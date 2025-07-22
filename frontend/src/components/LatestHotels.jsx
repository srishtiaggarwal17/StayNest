import React, { useEffect, useState } from "react";
import LatestHotelCard from "./LatestHotelCard";
import axios from "axios";
import { ROOM_API_END_POINT } from "@/utils/constant";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LatestHotels = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${ROOM_API_END_POINT}/getRooms`);
      setRooms(res.data.rooms || []);
    } catch (err) {
      console.error("Failed to load rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <section className="px-6 md:px-20 py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Destination</h2>

      {loading ? (
        <p className="text-center">Loading rooms...</p>
      ) : rooms.length === 0 ? (
        <p className="text-center text-gray-500">No rooms available.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {rooms.slice(0, 4).map((room, idx) => (
            <LatestHotelCard
              key={room._id}
              name={room.hotel.name}
              image={room.images?.[0]}
              location={room.hotel?.city || "Unknown"}
              price={room.price}
              rating={4.5} // You can later fetch actual ratings
              roomId={room._id}
            />
          ))}
        </div>
      )}

      <Button  onClick={() => navigate("/hotels")}
      variant="outline"
      className="mt-10 mx-auto block  text-black px-4 py-2 rounded">
        View All
      </Button>
    </section>
  );
};

export default LatestHotels;
