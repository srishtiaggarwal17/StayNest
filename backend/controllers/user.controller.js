import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";



export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    const file = req.file;

    if (!fullname || !email || !phoneNumber || !password || !role || !file) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    const fileUri = getDataUri(file); // Should return a { content: 'data:image/...base64...' }
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      folder: "hotel-booking/users",
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      image: cloudResponse.secure_url,
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};



export const login=async(req,res)=>{
    try{
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        };
        // let user=await user.findOne({email});
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or Password",
                success:false
            })
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect email or Password",
                success:false
            })
        };
        //check role is correct or not
        if(role!=user.role){
            return res.status(400).json({
                message:"Account doesn't exist with current role.",
                success:false
            })
        };
        const tokenData={
            userId:user._id
        }
        const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            image:user.image
        }

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success:true
        })
    }
    catch(error){
        console.log(error)
    }
}

export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .clearCookie("token", {
                httpOnly: true,
                sameSite: "lax",       // or "none" if using cross-origin with credentials
                secure: false          // true in production (HTTPS)
            })
            .json({
                message: "Logged out successfully",
                success: true
            });
    } catch (error) {
        console.log(error);
    }
};


export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, role } = req.body;
    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false
      });
    }

    // Optional image upload
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "hotel-booking/users"
      });
      user.image = cloudResponse.secure_url;
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (role) user.role = role;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        image: user.image
      },
      success: true
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error during profile update.",
      success: false
    });
  }
};





// controllers/contactController.js

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    return res.status(200).json({ message: "Message received successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ message: "Server error, please try again later." });
  }
};

