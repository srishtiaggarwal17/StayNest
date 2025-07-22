import express from "express";
import {createRoom,getAllRooms,toggleRoomAvailability,getOwnerRooms, getAvailableRooms} from "../controllers/room.controller.js";
import upload from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/", upload.array("images",4),isAuthenticated,createRoom);
router.get("/getRooms", getAllRooms);
router.get("/owner", isAuthenticated,getOwnerRooms);
router.get('/toggle-availability',isAuthenticated,toggleRoomAvailability)
router.get("/availableRooms", getAvailableRooms); 
export default router;