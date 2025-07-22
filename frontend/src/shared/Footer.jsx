import React, { useState } from "react";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { BOOKING_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import logo from "@/assets/logo.png"

const Footer = () => {
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
    <footer className="bg-gray-100 text-gray-800 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + About */}
        <div>
          <img className="h-20 w-auto object-contain" src={logo}/>
          <p className="mt-3 text-sm leading-relaxed">
            StayNest helps you find and book the best hotels across the globe.
            Experience comfort, luxury, and convenience — all in one platform.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Explore</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/hotels" className="hover:text-blue-500">Browse Hotels</Link></li>
            <li><Link to="/bookings" className="hover:text-blue-500">My Bookings</Link></li>
            <li><Link to="/experience" className="hover:text-blue-500">Experiences</Link></li>
            <li><Link to="/about" className="hover:text-blue-500">About Us</Link></li>
          </ul>
        </div>

        {/* Host & Connect */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Host & Connect</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-blue-500">Login</Link></li>
            <li><Link to="/signup" className="hover:text-blue-500">Signup</Link></li>
            <li className="mt-3 flex gap-3">
              <a href="#" className="hover:text-blue-600" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-400" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="hover:text-blue-700" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="mailto:support@quickstay.com" className="hover:text-red-500" aria-label="Email"><Mail size={20} /></a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Subscribe to Newsletter</h2>
          <p className="text-sm mb-2">Stay updated with the latest deals & updates</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
          {subscribed && (
            <p className="text-green-600 text-sm mt-2">Thanks for subscribing!</p>
          )}
        </div>
      </div>

      <div className="text-center py-4 text-sm border-t text-gray-600">
        © {new Date().getFullYear()} QuickStay. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
