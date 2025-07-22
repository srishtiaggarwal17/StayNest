import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BOOKING_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      `${BOOKING_API_END_POINT}/subscribe`,
      { email }, // pass data directly
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    if (res.status === 200) {
      setSubscribed(true);
      setEmail("");
    }
    alert(res.data.message);
  } catch (err) {
    console.error("Subscribe Error:", err);
    alert(err?.response?.data?.message || "Failed to subscribe");
  }
};

  return (
    <div className="w-full py-20 px-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl px-8 py-12 text-white shadow-lg">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Inspired</h2>
          <p className="text-gray-300 text-lg mb-8">
            Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration.
          </p>
        </div>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-96 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-white/30"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="bg-white text-black hover:bg-gray-200 transition-all duration-200"
          >
            Subscribe <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        {subscribed && (
          <p className="text-green-400 mt-4 text-center animate-pulse font-medium">
            🎉 Thanks for subscribing!
          </p>
        )}

        <p className="text-sm text-gray-500 mt-6 text-center">
          By subscribing, you agree to our{" "}
          <span className="underline cursor-pointer hover:text-white">
            Privacy Policy
          </span>{" "}
          and consent to receive updates.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;

