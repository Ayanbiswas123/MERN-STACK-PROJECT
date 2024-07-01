import { Router } from "express";
import { changePassword, forgotPassword, getProfile, login, logout, register, resetPassword, updateUser } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const route = Router();


route.post('/register', upload.single('avatar') ,register)
route.post('/login',login)
route.get('/logout',logout)
route.get('/me', isLoggedIn ,getProfile)
//route.post('/forgot-password',forgotPassword)
//route.post('/reser-password',resetPassword)
route.post('/change-password',isLoggedIn,changePassword)
route.put('/update',isLoggedIn,upload.single('avatar') ,updateUser)


export default route;