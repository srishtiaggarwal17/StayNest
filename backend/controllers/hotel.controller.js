import { Hotel } from "../models/hotel.model.js";
import { User } from "../models/user.model.js";

// CREATE HOTEL
export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.id; 

    if (!name || !address || !contact || !city) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }
    const hotel=await Hotel.findOne({owner})
    if(hotel){
        return res.status(400).json({
            message:"Hotel Already registered",
            success:false
        })
    }

    await Hotel.create({name,address,contact,city,owner,});
    await User.findByIdAndUpdate(owner,{role:"hotelOwner"})

    return res.status(201).json({
      message: "Hotel created successfully.",
      success: true,
    });

  } catch (error) {
    console.error("Create hotel error:", error);
  }
};

// CHECK IF HOTEL EXISTS
export const checkIfHotelExists = async (req, res) => {
  try {
    const owner = req.id; // coming from isAuthenticated middleware

    const hotel = await Hotel.findOne({ owner });

    return res.status(200).json({
      hasHotel: !!hotel, // true or false
      success: true,
    });
  } catch (error) {
    console.error("Check hotel error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};



export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.id });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      hotel,
    });
  } catch (error) {
    console.error("Get hotel error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

