import React from "react";
import { motion } from "framer-motion";
import {
  Hotel,
  MapPin,
  ThumbsUp,
  Clock3,
  ShieldCheck,
  Globe,
} from "lucide-react";

const experiences = [
  {
    icon: <Hotel size={32} />,
    title: "Handpicked Hotels",
    description:
      "Only the top-rated, best-reviewed hotels curated just for you.",
  },
  {
    icon: <MapPin size={32} />,
    title: "Explore Destinations",
    description:
      "Travel anywhere from iconic landmarks to hidden gems.",
  },
  {
    icon: <ThumbsUp size={32} />,
    title: "Trusted by Thousands",
    description:
      "Over 100K+ bookings and 5-star reviews from our users.",
  },
  {
    icon: <Clock3 size={32} />,
    title: "24/7 Customer Support",
    description:
      "Always here to help you — before, during, or after your trip.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Secure Payments",
    description:
      "Your transactions are encrypted and protected end-to-end.",
  },
  {
    icon: <Globe size={32} />,
    title: "Global Reach",
    description:
      "Book from anywhere in the world with ease.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Experience = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20">
      {/* Background blur bubble */}
      <div className="absolute -top-40 -left-20 w-[400px] h-[400px] bg-blue-200 dark:bg-blue-400 rounded-full blur-[150px] opacity-40 z-0" />
      <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] bg-purple-300 dark:bg-purple-600 rounded-full blur-[150px] opacity-30 z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Why Choose Us?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're not just another booking site — we're your travel partner.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {experiences.map((item, i) => (
            <motion.div
              key={i}
              className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              custom={i}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full mb-4 shadow group-hover:scale-110 transition">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;