// import mongoose from "mongoose";

// const bookingSchema=new mongoose.Schema({
//     user:{type:String,ref:"User",required:true},
//     room:{type:String,ref:"Room",required:true},
//     hotel:{type:String,ref:"Hotel",required:true},
//     checkInDate:{type:Date,required:true},
//     checkOutDate:{type:Date,required:true},
//     totalPrice:{type:Number,required:true},
//     guests:{type:Number,required:true},
//     rooms: {type: Number,required: true,default: 1},
//     status:{type:String,
//         enum:["pending","confirmed","cancelled"],
//         default:"pending"
//     },
//     paymentMethod:{
//         type:String,
//         required:true,
//         default:"Pay at Hotel"
//     },
//     stripeSessionId: {
//       type: String,
//     },
//     isPaid:{type:Boolean,default:false}
// },{timestamps:true})

// export const Bookings=mongoose.model("Bookings",bookingSchema)
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // ✅ Often query bookings by user
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      index: true, // ✅ Queries like "bookings for a room"
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true, // ✅ Queries like "all bookings in a hotel"
    },
    checkInDate: {
      type: Date,
      required: true,
      index: true, // ✅ Needed for date-range queries
    },
    checkOutDate: {
      type: Date,
      required: true,
      index: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
      index: true, // ✅ Common filter
    },
    paymentMethod: {
      type: String,
      enum: ["Pay at Hotel", "Stripe"],
      required: true,
      default: "Pay at Hotel",
    },
    stripeSessionId: {
      type: String,
    },
    isPaid: {
      type: Boolean,
      default: false,
      index: true, // ✅ Useful for filtering paid/unpaid
    },
  },
  { timestamps: true }
);

// ✅ Compound index to prevent overlapping bookings for the same room
bookingSchema.index(
  { room: 1, checkInDate: 1, checkOutDate: 1 },
  { unique: false }
);

// ✅ Compound index for searching hotel bookings within a date range
bookingSchema.index({ hotel: 1, checkInDate: 1, checkOutDate: 1 });

export const Bookings = mongoose.model("Bookings", bookingSchema);
