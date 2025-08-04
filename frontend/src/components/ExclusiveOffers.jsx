import { CheckCircle, BedDouble, MapPin, ShieldCheck } from "lucide-react";

const highlights = [
  {
    icon: BedDouble,
    title: "Curated Stays",
    desc: "Top-rated rooms with verified amenities and comfort.",
  },
  {
    icon: MapPin,
    title: "Perfect Locations",
    desc: "Stay close to attractions, transit, and the heart of the city.",
  },
  {
    icon: ShieldCheck,
    title: "Customer Support",
    desc: "Backed by secure payments and 24/7 customer support.",
  },
  {
    icon: CheckCircle,
    title: "No Hidden Fees",
    desc: "Transparent pricing. What you see is what you pay.",
  },
];

export default function ExclusiveOffers() {
  return (
    <section className="bg-white py-2 px-4">
      <div className="max-w-6xl mx-auto text-center">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex flex-col items-start border rounded-lg p-4 hover:shadow-sm transition">
              <item.icon className="text-blue-600 w-6 h-6 mb-3" />
              <h4 className="font-semibold text-lg mb-1 text-gray-800">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
