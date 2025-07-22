import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { STRIPE_PUBLISHABLE_KEY } from "@/utils/constant";

// Load Stripe with your public key (from .env)
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const Payment = ({ room, user, checkInDate, checkOutDate, guests, totalPrice }) => {
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      const response = await axios.post("http://localhost:4000/api/v1/booking/payment", {
        room:room.hotel.name,
        user,
        checkInDate,
        checkOutDate,
        guests,
        totalPrice,
      },{withCredentials:true});

      // Redirect to Stripe Checkout
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
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

