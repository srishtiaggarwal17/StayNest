import { useNavigate } from "react-router-dom";

const trendingCities = [
  {
    name: "Delhi",
    image: "https://cdn.pixabay.com/photo/2020/02/02/17/24/travel-4813658_1280.jpg",
  },
  {
    name: "Bengaluru",
    image: "https://www.tripsavvy.com/thmb/QS7YoZPIIgBNklph1Cjeq3mDgUk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-536116268-5b5d74e846e0fb0050adcf3b.jpg",
  },
  {
    name: "Mumbai",
    image: "https://www.mistay.in/travel-blog/content/images/2021/07/Roam-around-the-top-7-historical-monuments-of-Mumbai--Taj-Mahal-Palace-I-MiStay.jpeg",
  },
  {
    name: "Chennai",
    image: "https://iantiark.sirv.com/ER/bg/Chennai-bg.jpg?q=75&progressive=true",
  },
  {
    name: "Kolkata",
    image: "https://www.tripsavvy.com/thmb/cQai8rVBJxpRDh2JGXxoEhjGwGw=/1250x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-515828728-5b923ad9c9e77c0050daf70a.jpg",
  },
];

export default function TrendingDestinations() {
  const navigate = useNavigate();

  const handleCityClick = (city) => {
    navigate(`/browse?destination=${encodeURIComponent(city)}`);
  };

  return (
    <section className="py-10">
      <div className="mb-6 max-w-6xl mx-auto px-2">
        <h2 className="text-3xl font-bold">
          Trending destinations
        </h2>
        <p className="text-gray-800 mt-1">
          Explore the most popular cities people are booking right now!
        </p>
      </div>

      {/* First row: 2 cities */}
      <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
        {trendingCities.slice(0, 2).map((city) => (
          <div
            key={city.name}
            className="relative rounded-xl overflow-hidden cursor-pointer shadow-md"
            onClick={() => handleCityClick(city.name)}
          >
            {/* Image */}
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-64 object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 z-0" />

            {/* City Name */}
            <div className="absolute top-3 left-3 text-black text-xl font-bold z-10 bg-white/70 px-2 py-1 rounded">
              {city.name} 🇮🇳
            </div>
          </div>
        ))}
      </div>

      {/* Second row: 3 cities */}
      <div className="grid grid-cols-3 gap-4 mt-4 max-w-6xl mx-auto">
        {trendingCities.slice(2).map((city) => (
          <div
            key={city.name}
            className="relative rounded-xl overflow-hidden cursor-pointer shadow-md"
            onClick={() => handleCityClick(city.name)}
          >
            {/* Image */}
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-52 object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 z-0" />

            {/* City Name */}
            <div className="absolute top-3 left-3 text-black text-xl font-bold z-10 bg-white/70 px-2 py-1 rounded">
              {city.name} 🇮🇳
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



