import React from "react";

const HotelFilter = ({
  roomTypes,
  setRoomTypes,
  priceRanges,
  setPriceRanges,
  sortBy,
  setSortBy,
}) => {
  const handleRoomTypeChange = (type) => {
    setRoomTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handlePriceChange = (range) => {
    setPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const clearFilters = () => {
    setRoomTypes([]);
    setPriceRanges([]);
    setSortBy("");
  };

  return (
    <div className="border rounded-lg p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">FILTERS</h3>
        <button className="text-sm text-gray-600" onClick={clearFilters}>
          CLEAR
        </button>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-sm mb-2">Popular filters</h4>
        {["Single", "Double", "Suite", "Deluxe"].map(
          (label, idx) => (
            <div className="flex items-center gap-2 mb-1" key={idx}>
              <input
                type="checkbox"
                id={label}
                className="cursor-pointer"
                checked={roomTypes.includes(label)}
                onChange={() => handleRoomTypeChange(label)}
              />
              <label htmlFor={label} className="text-sm cursor-pointer">
                {label}
              </label>
            </div>
          )
        )}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-sm mb-2">Price Range</h4>
        {["0-500", "500-1000", "1000-2000", "2000-3000"].map((range, idx) => (
          <div className="flex items-center gap-2 mb-1" key={idx}>
            <input
              type="checkbox"
              id={`price-${idx}`}
              className="cursor-pointer"
              checked={priceRanges.includes(range)}
              onChange={() => handlePriceChange(range)}
            />
            <label htmlFor={`price-${idx}`} className="text-sm cursor-pointer">
              ₹{range.replace("-", " to ₹")}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-2">
        <h4 className="font-semibold text-sm mb-2">Sort By</h4>
        {[
          { label: "Price Low to High", value: "lowToHigh" },
          { label: "Price High to Low", value: "highToLow" },
          { label: "Newest First", value: "newest" },
        ].map((option, idx) => (
          <div className="flex items-center gap-2 mb-1" key={idx}>
            <input
              type="radio"
              name="sort"
              id={`sort-${idx}`}
              className="cursor-pointer"
              checked={sortBy === option.value}
              onChange={() => handleSortChange(option.value)}
            />
            <label htmlFor={`sort-${idx}`} className="text-sm cursor-pointer">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelFilter;


