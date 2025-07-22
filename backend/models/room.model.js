import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  type: {
    type: String,
    enum: ["Single", "Double", "Deluxe", "Suite"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amenities: {
    type:Array,
    required:true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  maxGuests: { 
    type: Number, 
    required: true 
  },
  images: [{
    type: String,
  }]
}, { timestamps: true });

export const Room = mongoose.model("Room", roomSchema);