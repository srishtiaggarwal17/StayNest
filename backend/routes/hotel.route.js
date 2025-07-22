// routes/hotel.routes.js
import express from "express";
import {checkIfHotelExists, getHotel, registerHotel,} from "../controllers/hotel.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/", isAuthenticated,registerHotel);
router.get("/check", isAuthenticated,checkIfHotelExists);
router.get("/getHotel", isAuthenticated,getHotel);

export default router;