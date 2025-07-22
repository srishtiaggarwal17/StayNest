import express from "express"
import {login,register,updateProfile,logout, submitContactForm} from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload  from "../middlewares/multer.js";

const router=express.Router();
router.route("/register").post(upload.single("file"),register)
router.route("/login").post(login)
router.route("/profile").post(isAuthenticated,upload.single("file"),updateProfile)
router.route("/logout").get(logout)
router.post("/contact", submitContactForm);

export default router;