import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import morgan from "morgan";
import userRoute from './route/user.routes.js'
import courseRoutes from './route/course.routes.js'
import paymentRoutes from './route/payment.routes.js'
import errorMiddleware from "./middleware/error.middleware.js";
import { contactUs } from "./controllers/contact.controller.js";
import { isLoggedIn } from "./middleware/auth.middleware.js";
import { getAllReview, userReview } from "./controllers/review.controller.js";

const app = express();

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
//morgan use to display user access url in the console
app.use(morgan('dev'))


//user router
app.use('/api/v1/user',userRoute)
app.use('/api/v1/courses',courseRoutes)
app.use('/api/v1/payments',paymentRoutes)


app.post('/api/v1/contact',isLoggedIn,contactUs)

app.post('/api/v1/addreview',isLoggedIn,userReview)

app.get('/api/v1/allreview',getAllReview)


app.use('/ping',(req,res) =>{
    res.send("/pong")
})


//route 3 module

app.use('*',(req,res) =>{
    res.status(404).send('OOPS!! 404 Page not found')
})


//if any error throw from server then this midelware handle this
app.use(errorMiddleware)
export {app}