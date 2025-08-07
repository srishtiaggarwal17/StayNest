import express from "express";
import { checkAvailabilityApi, checkMultipleAvailability, createBooking, createCheckoutSession, getHotelBookings, getUserBookings, subscribeNewsletter} from "../controllers/bookings.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router=express.Router()

router.post('/check-availability',checkAvailabilityApi)
router.post("/check-multiple-availability",checkMultipleAvailability);
router.post('/book',isAuthenticated,createBooking)
router.get('/user',isAuthenticated,getUserBookings)
router.get('/hotel',isAuthenticated,getHotelBookings)
router.post('/payment',isAuthenticated,createCheckoutSession)
router.post("/subscribe",subscribeNewsletter);

export default router
