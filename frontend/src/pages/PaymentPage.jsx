import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {BOOKING_API_END_POINT, STRIPE_PUBLISHABLE_KEY } from "@/utils/constant";
import { toast } from "sonner";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
const Payment = ({ room, user, checkInDate, checkOutDate, guests, totalPrice }) => {
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      const response = await axios.post(`${BOOKING_API_END_POINT}/payment`, {
        roomId:room._id,
        userId:user._id,
        checkInDate,
        checkOutDate,
        guests,
        totalPrice,
      },{withCredentials:true});
      if (!response.data?.url) {
        toast.error("Failed to initiate payment."); // or alert
        return;
      }
      // Redirect to Stripe Checkout
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      Pay & Book Now
    </button>
  );
};

export default Payment;

