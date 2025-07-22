import React, { useEffect, useState } from "react";
import { MapPin, Users } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BOOKING_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const MyBookings = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${BOOKING_API_END_POINT}/user`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setBookings(res.data.bookings);
        } else {
          toast.error("Failed to fetch bookings.");
        }
      } catch (error) {
        toast.error("Error fetching bookings.");
      }
    };

    fetchBookings();
  }, []);

  const handlePayment = async (booking) => {
    try {
      const res = await axios.post(
        `${BOOKING_API_END_POINT}/payment`,
        {
          room: {
            _id: booking.room._id,
            name: booking.room.type || "Room",
          },
          user: {
            _id: user._id,
          },
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          guests: booking.guests,
          totalPrice: booking.room.price,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.url) {
        window.location.href = res.data.url; // Redirect to Stripe
      } else {
        toast.error("Failed to initiate payment.");
      }
    } catch (error) {
      toast.error("Payment session error.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pt-28">
      <h1 className="text-3xl font-bold mb-4">My Bookings</h1>
      <p className="text-gray-600 mb-6">
        Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks.
      </p>

      <div className="w-full grid grid-cols-12 text-left font-medium text-gray-700 border-b pb-3 mb-4">
        <div className="col-span-6">Hotels</div>
        <div className="col-span-4">Date & Timings</div>
        <div className="col-span-2">Payment</div>
      </div>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="w-full grid grid-cols-12 items-start gap-4 border-b py-4"
        >
          <div className="col-span-6 flex items-center gap-4">
            <img
              src={booking.room.images?.[0] || "/default.jpg"}
              alt={booking.hotel.name}
              className="w-[100px] h-[90px] object-cover rounded-lg"
            />
            <div>
              <h2 className="font-semibold">{booking.hotel.name}</h2>
              <p className="text-sm text-gray-500">({booking.room.type || "Room"})</p>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <MapPin size={14} />
                {booking.hotel.address}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <Users size={14} />
                Guests: {booking.guests}
              </p>
              <p className="text-sm font-semibold mt-1">
                Total: ₹{booking.room.price}
              </p>
            </div>
          </div>

          <div className="col-span-4 text-sm text-gray-700">
            <p>
              Check-In:{" "}
              <span className="font-medium">
                {new Date(booking.checkInDate).toDateString()}
              </span>
            </p>
            <p>
              Check-Out:{" "}
              <span className="font-medium">
                {new Date(booking.checkOutDate).toDateString()}
              </span>
            </p>
          </div>

          <div className="col-span-2">
            {booking.isPaid ? (
              <p className="flex items-center gap-2 text-green-600 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-600"></span>
                Paid
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-2 text-red-600 text-sm">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  Unpaid
                </p>
                <Button
                  variant="outline"
                  className="w-fit text-xs px-4 py-2"
                  onClick={() => handlePayment(booking)}
                >
                  Pay Now
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
