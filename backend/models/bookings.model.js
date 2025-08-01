import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
    user:{type:String,ref:"User",required:true},
    room:{type:String,ref:"Room",required:true},
    hotel:{type:String,ref:"Hotel",required:true},
    checkInDate:{type:Date,required:true},
    checkOutDate:{type:Date,required:true},
    totalPrice:{type:Number,required:true},
    guests:{type:Number,required:true},
    rooms: {type: Number,required: true,default: 1},
    status:{type:String,
        enum:["pending","confirmed","cancelled"],
        default:"pending"
    },
    paymentMethod:{
        type:String,
        required:true,
        default:"Pay at Hotel"
    },
    stripeSessionId: {
      type: String,
    },
    isPaid:{type:Boolean,default:false}
},{timestamps:true})

export const Bookings=mongoose.model("Bookings",bookingSchema)
