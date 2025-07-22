import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LatestHotelCard = ({ name, image, location, price, rating, roomId }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
        onClick={() => navigate(`/description/${roomId}`)}
      />
      <div className="p-4 space-y-2">
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-sm text-gray-500">{location}</div>
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <Star className="w-4 h-4 fill-yellow-500" />
          {rating} / 5
        </div>
        <div className="flex items-center justify-between">
          <div className="text-base font-bold">₹{price} / night</div>
          <Button variant="outline" onClick={() => navigate(`/description/${roomId}`)}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LatestHotelCard;

