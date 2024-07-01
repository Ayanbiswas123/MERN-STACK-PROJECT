import dotenv from "dotenv"
dotenv.config({
    path:'./.env'
})
import connectDB from "./db/DBindex.js";
import { app } from "./app.js";
import Razorpay from 'razorpay';


const PORT = process.env.PORT || 5001

/*  create a Razorpay Configuration or instance like Cloudinary Condiguration to connect Correct 
    Razorpay account for payment request from the user
*/
export const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET
})

connectDB()
.then(() =>{
    app.listen(PORT, (req,res) =>{
        console.log(`Server is running at http://localhost:${PORT}`);
    })
})
.catch((err) =>{
    console.log("MONGO db Connection failed !!!",err);
})







