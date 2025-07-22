const OfferCard = ({ image, discount, title, description, expires }) => {
  return (
    <div className="rounded-xl overflow-hidden relative w-full max-w-sm shadow-lg">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />

      {/* Content */}
      <div className="absolute bottom-0 text-white p-5 space-y-2 z-10">
        <span className="bg-white text-black text-xs font-semibold px-2 py-1 rounded-md">
          {discount}
        </span>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-200">{description}</p>
        <p className="text-xs text-gray-300">Expires {expires}</p>
        <button className="text-sm font-medium mt-2 inline-flex items-center">
          View Offers →
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
