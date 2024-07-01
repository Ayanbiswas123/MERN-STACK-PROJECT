import {Demopayment} from '../model/payment.model.demo.js'
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const buySubscription = async(req,res,next) =>{
    const {id} = req.user;

    const user = await User.findById(id);

    if(!user){
        return next(new ApiError(400,'Unauthenticate please login For purchese a course'))
    }

    if(user.role === 'ADMIN'){
        return next(new ApiError(400,'Admim cannot purchese a subscription'));

    }

    const {pay} = req.body;
    console.log(pay);

    if(!pay){
        return next(new ApiError(400,'payment failed please try again'))
    }
     user.subscription.id = pay;
     user.subscription.status = 'payment Success';

    await user.save();

    res.status(200).json({
        success:true,
        message:"Subscribe Succesfully",
        Subscription_Ststus: user.subscription
    })
}   



const verifySubscription = async(req,res,next) =>{
    const {id} = req.user;

    const user = await User.findById(id);

    if(!user){
        return next(new ApiError(400,'Unauthenticate, please login'))
    }

    const subscriptionId = user.subscription.id;

    if(subscriptionId !== 'payment'){
        return next(new ApiError(400,'No payment done'))
    }

   await Demopayment.create({
    user_id:    user.id,
    user_name:  user.fullName,
    //payment_id: user.subscription.id
    payment_id: process.env.COURSE_ID
   })

   user.subscription.status = 'active';
   user.subscription.id =process.env.COURSE_ID;
   await user.save();

   user.password = undefined;
   res.status(200).json({
    success:true,
    message:'Payment verified succesfully',
    user
   })
}


const cancelSubscription = async(req,res,next) =>{
    const {id} = req.user;
    const user = await User.findById(id);

    if(!user){
        return next(new ApiError(400,'Unauthenticate, please login'))
    }

    if(user.role === 'ADMIN'){
        return next(new ApiError(400,'Admim cannot purchese a subscription'));

    }

    const subscriptionId = user.subscription.id;

    user.subscription.status = 'deactivate';
    user.subscription.id = '';

    await user.save();

    res.status(200).json({
        success:true,
        message:'Subscription cancle succesfully',
        user
       })
}


const allPayments = async (req, res, next) => {
    try {
        const { count } = req.query;
        const paymentCount = count || 10;

        // Fetch payments from the Demopayment model
        const payments = await Demopayment.find().limit(paymentCount);

        res.status(200).json({
            success: true,
            message: 'All payments',
            AllPayments: payments
        });
    } catch (error) {
        next(error);
    }
}


export{
    buySubscription,
    verifySubscription,
    cancelSubscription,
    allPayments,
}
