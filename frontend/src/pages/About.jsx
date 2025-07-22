import React, { useState } from "react";
import {
  Building,
  Hotel,
  Globe2,
  Smile,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import bgImage from "@/assets/bg.png";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";

const About = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${USER_API_END_POINT}/contact`, formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-200 to-indigo-700 text-white py-24 px-6 text-center shadow-md">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">About StayNest</h1>
        <p className="text-xl max-w-3xl mx-auto opacity-90">
          Where exceptional stays meet unforgettable experiences.
        </p>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6 text-blue-700">Who We Are</h2>
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            At StayNest, we curate unique hotel experiences tailored for comfort,
            convenience, and elegance. With our handpicked network of premium hotels,
            we make your travel easy, inspiring, and luxurious.
          </p>
          <p className="text-gray-600 text-md">
            We are more than just a booking platform—we are your travel partner in every journey.
          </p>
        </div>
        <div>
          <img
            src={bgImage}
            alt="Who We Are"
            className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { icon: Globe2, label: "Countries", value: "50+" },
            { icon: Hotel, label: "Hotels", value: "1,200+" },
            { icon: Smile, label: "Guest Satisfaction", value: "98%" },
            { icon: Building, label: "Years of Trust", value: "10+" },
          ].map(({ icon: Icon, label, value }, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <Icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold">{value}</h3>
              <p className="text-gray-600 mt-1 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To make world-class travel experiences accessible to all by delivering exceptional
            hospitality, seamless bookings, and reliable customer service around the globe.
          </p>
        </div>
      </section>

      {/* Contact Us */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-gray-800">
              <div className="flex items-start gap-4">
                <Mail className="text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p>support@staynest.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p>+1 (800) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p>123 Luxe Avenue, New York, NY</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Our support team is available 24/7 for any queries, issues, or feedback.
              </p>
            </div>

            <form
              className="bg-white rounded-xl shadow-lg p-8 space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Your email address"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Write your message here"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
              >
                Send Message
              </button>
              {status && (
                <p className="text-center text-sm text-green-600 font-medium mt-2">{status}</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;