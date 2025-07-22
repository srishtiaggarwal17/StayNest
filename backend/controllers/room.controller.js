import { Room } from "../models/room.model.js";
import { Hotel } from "../models/hotel.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js"; // ensure this is imported
import { Bookings } from "../models/bookings.model.js";

// Create a new room
export const createRoom = async (req, res) => {
  try {
    const { hotel, type, price, amenities,maxGuests } = req.body;

    // Ensure hotel exists
    const hotelExists = await Hotel.findById(hotel);
    if (!hotelExists) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    // ✅ Upload each image individually
    const uploadImages = await Promise.all(
      req.files.map(async (file) => {
        const fileUri = getDataUri(file); // use each file
        const result = await cloudinary.uploader.upload(fileUri.content, {
          folder: "hotel-booking/rooms",
        });
        return result.secure_url;
      })
    );

    const newRoom = await Room.create({
      hotel: hotelExists._id,
      type,
      price: +price,
      maxGuests,
      amenities: JSON.parse(amenities),
      images: uploadImages,
    });

    res.json({
      success: true,
      room: newRoom,
      message: "Room created successfully",
    });
  } catch (error) {
    console.error("Error in createRoom:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({isAvailable:true}).populate({
        path:'hotel',
        populate:{
            path:'owner',
            select:'image'
        }
    }).sort({createdAt:-1})
    res.json({success:true,rooms})
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get a room by ID
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData=await Hotel.findOne({owner:req.id})
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate("hotel");

    res.status(200).json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.query;

    const roomData = await Room.findById(roomId);
    if (!roomData) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();

    res.status(200).json({
      success: true,
      message: "Room availability updated",
    });
  } catch (error) {
    console.error("toggleRoomAvailability error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getAvailableRooms = async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;

    if (!checkIn || !checkOut) {
      return res.status(400).json({ message: "Missing check-in/check-out dates" });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Step 1: Find all bookings that overlap
    const overlappingBookings = await Bookings.find({
      $or: [
        {
          checkInDate: { $lt: checkOutDate },
          checkOutDate: { $gt: checkInDate },
        }
      ]
    });

    const bookedRoomIds = overlappingBookings.map((b) => b.room.toString());

    // Step 2: Get rooms that are NOT in the bookedRoomIds
    const availableRooms = await Room.find({
      _id: { $nin: bookedRoomIds },
    }).populate("hotel");

    res.json({ success: true, rooms: availableRooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
