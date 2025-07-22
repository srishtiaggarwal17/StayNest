import {Bookings } from "../models/bookings.model.js";
import { Room } from "../models/room.model.js";
import { Hotel } from "../models/hotel.model.js"; 
import { User } from "../models/user.model.js";

export const checkAvailability = async ({checkInDate,checkOutDate,room}) => {
  try {
    const bookings=await Bookings.find({
        room,
        $or: [
        {
          checkInDate: { $lte: checkOutDate },
          checkOutDate: { $gte: checkInDate }
        }
      ]
    })
    const isAvailable=bookings.length===0
    return isAvailable;
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const checkAvailabilityApi = async (req,res) => {
  try {
    const {room,checkInDate,checkOutDate}=req.body;
    const isAvailable=await checkAvailability({checkInDate,checkOutDate,room})
    res.json({success:true,isAvailable})
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const userId = req.id;
    const userData = await User.findById(userId);

    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
    if (!isAvailable)
      return res.json({ success: false, message: "Room is not available." });

    const roomData = await Room.findById(room).populate("hotel");

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));
    const totalPrice = roomData.price * nights;

    const booking = await Bookings.create({
      user: userId,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });
  
    await sendEmail({
      to: userData.email,
      subject: `Payment Confirmation: "${roomData.hotel.name}" booked!`,
      body: ` <div style='font-family: Arial, sans-serif; line-height: 1.5;'>
                <h2>Hi ${userData.fullname},</h2>
                <p>Your booking at <strong style='color:#F84565;'>${roomData.hotel.name}</strong> is confirmed.</p> 
                <ul>
                  <li><strong>Room:</strong> ${roomData.type}</li>
                  <li><strong>Check-In:</strong> ${checkInDate}</li>
                  <li><strong>Check-Out:</strong> ${checkOutDate}</li>
                  <li><strong>Guests:</strong> ${guests}</li>
                  <li><strong>Total Price:</strong> ₹${totalPrice}</li>
                </ul>
                <p>We look forward to hosting you!</p>
                <p>Thanks for booking with us! <br/> — MovieTix Team</p>
              </div>`
    })
    res.status(201).json({ success: true, booking, message: "Booking created successfully." });
  } catch (error) {
    console.error("Booking Error: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getUserBookings = async (req, res) => {
  try {
    const user=req.id;
    const bookings = await Bookings.find({user})
      .populate("room hotel").sort({createdAt:-1})
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getHotelBookings = async (req, res) => {
  try {
    const hotel=await Hotel.findOne({owner:req.id})
    if(!hotel)
        return res.json({success:false,message:"Hotel not found."})
    const bookings = await Bookings.find({hotel:hotel._id})
      .populate("room hotel user").sort({createdAt:-1})

    const totalBookings=bookings.length;
    const totalRevenue=bookings.reduce((acc,booking)=>acc+booking.totalPrice,0)
    res.status(200).json({ success: true, dashboardData:{totalBookings,totalRevenue,bookings}});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import Stripe from "stripe";
import sendEmail from "../utils/nodemailer.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

export const createCheckoutSession = async (req, res) => {
  try {
    const { room, user, checkInDate, checkOutDate, guests, totalPrice } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Room: ${room.name}`,
              description: `Check-In: ${checkInDate}, Check-Out: ${checkOutDate}`,
            },
            unit_amount: totalPrice * 100, // convert to paisa
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/payment-cancelled`,
      metadata: {
        roomId: room._id,
        userId: user._id,
        checkInDate,
        checkOutDate,
        guests,
        totalPrice,
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error.message);
    return res.status(500).json({ error: "Something went wrong while creating checkout session" });
  }
};









export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const subject = "Welcome to Our Newsletter!";
    const message = `
      <h2>Thank you for subscribing!</h2>
      <p>You’ll now receive updates from us.</p>
    `;
    await sendEmail({ to: email, subject, body: message });
    return res.status(200).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Newsletter Error:", error);
    return res.status(500).json({ message: "Failed to subscribe" });
  }
};
