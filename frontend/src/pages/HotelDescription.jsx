// import React, { useEffect, useState } from "react";
// import { MapPin, Star } from "lucide-react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { BOOKING_API_END_POINT, ROOM_API_END_POINT } from "@/utils/constant";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const features = [
//   { icon: "🏠", title: "Clean & Safe Stay", desc: "A well-maintained and hygienic space just for you." },
//   { icon: "🧼", title: "Enhanced Cleaning", desc: "Follows strict cleaning standards." },
//   { icon: "📍", title: "Excellent Location", desc: "90% of guests rated the location 5 stars." },
//   { icon: "✅", title: "Smooth Check-In", desc: "100% guests gave 5-star rating for check-in." },
// ];

// const HotelDescription = () => {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [room, setRoom] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [guests, setGuests] = useState(1);
//   const [available, setAvailable] = useState(false);

//   useEffect(() => {
//     const fetchRoom = async () => {
//       try {
//         const res = await axios.get(`${ROOM_API_END_POINT}/getRooms`);
//         const found = res.data.rooms.find((r) => r._id === id);
//         setRoom(found);
//         setMainImage(found?.images[0]);
//       } catch (err) {
//         toast.error("Failed to load room details");
//       }
//     };
//     fetchRoom();
//   }, [id]);

//   const handleCheckAvailability = async () => {
//     if (!checkIn || !checkOut || !guests) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     if (new Date(checkIn) >= new Date(checkOut)) {
//       toast.error("Check-out must be after check-in");
//       return;
//     }

//     try {
//       const res = await axios.post(`${BOOKING_API_END_POINT}/check-availability`, {
//         room: room._id,
//         checkInDate: checkIn,
//         checkOutDate: checkOut,
//       });

//       if (res.data.success && res.data.isAvailable) {
//         toast.success("Room is available 🎉");
//         setAvailable(true);
//       } else {
//         toast.error("Room is not available for selected dates");
//         setAvailable(false);
//       }
//     } catch (error) {
//       toast.error("Failed to check availability");
//       console.error(error);
//     }
//   };

//   const handleBookNow = async () => {
//     if (!user) {
//       toast.error("Please log in to book a room.");
//       navigate("/login");
//       return;
//     }
//     try {
//       const res = await axios.post(`${BOOKING_API_END_POINT}/book`, {
//         room: room._id,
//         //user: user._id,
//         checkInDate: checkIn,
//         checkOutDate: checkOut,
//         guests: guests,
//        // amount: room.price, // or compute total amount if needed
//       },{withCredentials: true,});
//       if (res.data.success) {
//         toast.success("Booking successful! Redirecting to payment...");
//         // Redirect to payment page with booking ID
//         navigate(`/payment/${res.data.booking._id}`);
//       } else {
//         toast.error("Booking failed. Try again later.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("An error occurred while booking.");
//     }
//   };


//   if (!room) return <div className="text-center py-10">Loading room details…</div>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 pt-28">
//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-4xl font-bold">{room.hotel.name} <span className="text-sm">({room.type})</span></h1>
//           <div className="flex items-center gap-2 mt-2 text-orange-500">
//             <div className="flex">
//               {Array(4).fill().map((_, i) => <Star key={i} fill="orange" stroke="orange" className="w-5 h-5" />)}
//             </div>
//             <span className="text-black font-semibold">200+ reviews</span>
//           </div>
//           <div className="text-gray-600 flex items-center gap-2 mt-1">
//             <MapPin className="w-4 h-4" />
//             {room.hotel.address}
//           </div>
//         </div>
//         <div className="text-right">
//           <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">20% OFF</div>
//           <h2 className="text-xl font-bold mt-2">${room.price} <span className="text-sm">/night</span></h2>
//         </div>
//       </div>

//       {/* Image Gallery */}
//       <div className="flex gap-6 mt-8">
//         <div className="flex-1">
//           <img
//             src={mainImage}
//             alt="Main Hotel"
//             className="w-[700px] h-[350px] object-cover rounded-xl shadow-md"
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4 w-[500px]">
//           {room.images.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               alt={`Thumbnail ${i}`}
//               onClick={() => setMainImage(img)}
//               className={`w-full h-[140px] object-cover rounded-xl cursor-pointer border-2 transition-all duration-200 ${
//                 mainImage === img ? "border-orange-500" : "border-transparent"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Facilities */}
//       <div className="flex gap-4 mt-6 flex-wrap">
//         {room.amenities.map((item, i) => (
//           <span key={i} className="px-4 py-2 rounded-md bg-gray-100 text-sm">✅ {item}</span>
//         ))}
//       </div>

//       {/* Booking Form */}
//       <div className="bg-white p-6 mt-6 rounded-lg shadow flex items-center gap-4 flex-wrap">
//         <div>
//           <label className="font-medium">Check-In</label>
//           <Input type="date" className="w-full" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
//         </div>
//         <div>
//           <label className="font-medium">Check-Out</label>
//           <Input type="date" className="w-full" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
//         </div>
//         <div>
//           <label className="font-medium">Guests</label>
//           <Input type="number" className="w-full" min={1} value={guests} onChange={(e) => setGuests(e.target.value)} />
//         </div>
//         <div className="mt-6">
//           <Button
//             className="bg-blue-600 hover:bg-blue-700 text-white"
//             onClick={available ? handleBookNow : handleCheckAvailability}
//           >
//             {available ? "Book Now" : "Check Availability"}
//           </Button>
//         </div>
//       </div>

//       {/* Features */}
//       <div className="mt-8 space-y-4">
//         {features.map((f, i) => (
//           <div key={i} className="flex gap-3 items-start">
//             <div className="text-xl">{f.icon}</div>
//             <div>
//               <p className="font-semibold">{f.title}</p>
//               <p className="text-sm text-gray-500">{f.desc}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HotelDescription;















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
  { icon: "🏠", title: "Clean & Safe Stay", desc: "A well-maintained and hygienic space just for you." },
  { icon: "🧼", title: "Enhanced Cleaning", desc: "Follows strict cleaning standards." },
  { icon: "📍", title: "Excellent Location", desc: "90% of guests rated the location 5 stars." },
  { icon: "✅", title: "Smooth Check-In", desc: "100% guests gave 5-star rating for check-in." },
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
    if (!checkIn || !checkOut || !guests) {
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
      });

      if (res.data.success && res.data.isAvailable) {
        toast.success("Room is available 🎉");
        setAvailable(true);
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
        },
        { withCredentials: true }
      );

      if (!bookingRes.data.success) {
        toast.error("Booking failed. Try again later.");
        return;
      }

      toast.success("Booking created. Redirecting to payment...");

      // 2. Calculate total price
      const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
      const totalPrice = room.price * nights;

      // 3. Initiate Stripe payment
      const stripe = await stripePromise;

      const paymentRes = await axios.post(`${BOOKING_API_END_POINT}/payment`, {
        room,
        user,
        checkInDate:checkIn,
        checkOutDate:checkOut,
        guests,
        totalPrice,
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
      <div className="mt-8 space-y-4">
        {features.map((f, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="text-xl">{f.icon}</div>
            <div>
              <p className="font-semibold">{f.title}</p>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelDescription;

