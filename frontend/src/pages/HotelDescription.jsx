import React, { useEffect, useState } from "react";
import { MapPin, Star } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BOOKING_API_END_POINT, ROOM_API_END_POINT, STRIPE_PUBLISHABLE_KEY } from "@/utils/constant";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

const features = [
  {
    icon: <Wifi className="w-5 h-5" />,
    title: "Free Wi-Fi",
    desc: "Stay connected with complimentary high-speed Wi-Fi.",
  },
  {
    icon: <Headphones className="w-5 h-5" />,
    title: "24x7 Customer Support",
    desc: "We're always here to help you with your queries.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Flexible Check-in/out",
    desc: "Plan your stay with peace of mind and convenience.",
  },
  {
    icon: <BadgeCheck className="w-5 h-5" />,
    title: "Verified Properties",
    desc: "Every listing is quality checked and verified.",
  },
];

const HotelDescription = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms,setRooms]=useState(1);
  const [available, setAvailable] = useState(false);

  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`${ROOM_API_END_POINT}/getRooms`);
        const found = res.data.rooms.find((r) => r._id === id);
        setRoom(found);
        setMainImage(found?.images[0]);
      } catch (err) {
        toast.error("Failed to load room details");
      }
    };
    fetchRoom();
  }, [id]);
 
  const handleCheckAvailability = async () => {
  if (!checkIn || !checkOut || !guests || !rooms) {
    toast.error("Please fill in all fields");
    return;
  }
  if (new Date(checkIn) >= new Date(checkOut)) {
    toast.error("Check-out must be after check-in");
    return;
  }
  try {
    const res = await axios.post(`${BOOKING_API_END_POINT}/check-availability`, {
      room: room._id,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      rooms, // ensure number
    });
    if (res.data.success && res.data.isAvailable) {
      toast.success("Rooms are available 🎉");
      setAvailable(true);
    } else if (res.data.success && res.data.availableRooms > 0) {
      toast.error(`Only ${res.data.availableRooms} room(s) available`);
      setAvailable(false);
    } else {
      toast.error("Room is not available for selected dates");
      setAvailable(false);
    }
  } catch (error) {
    toast.error("Failed to check availability");
    console.error(error);
  }
};



  const handleBookNow = async () => {
    if (!user) {
      toast.error("Please log in to book a room.");
      navigate("/login");
      return;
    }

    try {
      // 1. Create Booking in DB
      const bookingRes = await axios.post(
        `${BOOKING_API_END_POINT}/book`,
        {
          room: room._id,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          guests: guests,
          rooms
        },
        { withCredentials: true }
      );

      if (!bookingRes.data.success) {
        toast.error("Booking failed. Try again later.");
        return;
      }
      const bookingId = bookingRes?.data?.booking?._id;
      toast.success("Booking created. Redirecting to payment...");

      // 2. Calculate total price
      const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
      const totalPrice = room.price * nights * rooms;

      // 3. Initiate Stripe payment
      const stripe = await stripePromise;

      const paymentRes = await axios.post(`${BOOKING_API_END_POINT}/payment`, {
        bookingId 
      },{ withCredentials: true });

      window.location.href = paymentRes.data.url; // Stripe Checkout
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during booking or payment.");
    }
  };

  if (!room) return <div className="text-center py-10">Loading room details…</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pt-28">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">{room.hotel.name} <span className="text-sm">({room.type})</span></h1>
          <div className="flex items-center gap-2 mt-2 text-orange-500">
            <div className="flex">
              {Array(4).fill().map((_, i) => <Star key={i} fill="orange" stroke="orange" className="w-5 h-5" />)}
            </div>
            <span className="text-black font-semibold">200+ reviews</span>
          </div>
          <div className="text-gray-600 flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4" />
            {room.hotel.address}
          </div>
        </div>
        <div className="text-right">
          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">20% OFF</div>
          <h2 className="text-xl font-bold mt-2">₹{room.price} <span className="text-sm">/night</span></h2>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="flex gap-6 mt-8">
        <div className="flex-1">
          <img
            src={mainImage}
            alt="Main Hotel"
            className="w-[700px] h-[350px] object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 w-[500px]">
          {room.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumbnail ${i}`}
              onClick={() => setMainImage(img)}
              className={`w-full h-[140px] object-cover rounded-xl cursor-pointer border-2 transition-all duration-200 ${
                mainImage === img ? "border-orange-500" : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Facilities */}
      <div className="flex gap-4 mt-6 flex-wrap">
        {room.amenities.map((item, i) => (
          <span key={i} className="px-4 py-2 rounded-md bg-gray-100 text-sm">✅ {item}</span>
        ))}
      </div>

      {/* Booking Form */}
      <div className="bg-white p-6 mt-6 rounded-lg shadow flex items-center gap-4 flex-wrap">
        <div>
          <label className="font-medium">Check-In</label>
          <Input type="date" className="w-full" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </div>
        <div>
          <label className="font-medium">Check-Out</label>
          <Input type="date" className="w-full" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </div>
        <div>
          <label className="font-medium">Guests</label>
          <Input type="number" className="w-full" min={1} value={guests} onChange={(e) => setGuests(e.target.value)} />
        </div>
        <div>
          <label className="font-medium">Rooms</label>
          <Input type="number" className="w-full" min={1} value={rooms} onChange={(e) => setRooms(Number(e.target.value))} />
        </div>
        <div className="mt-6">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={available ? handleBookNow : handleCheckAvailability}
          >
            {available ? "Book Now" : "Check Availability"}
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="mt-10 max-w-6xl mx-auto flex flex-wrap gap-8">
    {/* Features on the left (70%) */}
      <div className="w-full md:w-[65%] space-y-5 divide-y divide-gray-200">
        {features.map((f, i) => (
          <div key={i} className="flex gap-4 pt-1 first:pt-0">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                {f.icon}
              </div>
            </div>
          <div>
          <h3 className="font-semibold text-base">{f.title}</h3>
          <p className="text-sm text-gray-600">{f.desc}</p>
        </div>
      </div>
     ))}
    </div>
    {/* Map on the right (30%) */}
    <div className="w-full md:w-[30%]">
      <h2 className="text-lg font-semibold mb-2">Explore the area</h2>
      <div className="rounded-lg overflow-hidden border border-gray-300 shadow-sm">
        <iframe
          width="100%"
          height="180"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            room.hotel.address
          )}&output=embed`}
          className="w-full"
        ></iframe>
        <div className="p-2 bg-white border-t text-xs">
          <div>{room.hotel.address}</div>
          <a
            className="text-blue-600 underline mt-1 block"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            room.hotel.address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in a map
          </a>
        </div>
      </div>
    </div>
 </div>
    </div>
  );
};

export default HotelDescription;
