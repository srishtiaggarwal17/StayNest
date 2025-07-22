import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import hotelRoute from "./routes/hotel.route.js";
import roomRoute from "./routes/room.route.js";
import bookingRoute from "./routes/bookings.route.js";

dotenv.config({});

const app=express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

const PORT=process.env.PORT||4000;
//apis
app.use("/api/v1/user",userRoute);
app.use("/api/v1/hotels",hotelRoute);
app.use("/api/v1/room",roomRoute);
app.use("/api/v1/booking",bookingRoute);


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});


