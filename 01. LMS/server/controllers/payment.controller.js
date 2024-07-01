import { Payment } from "../model/payment.model.js";
import {Demopayment} from '../model/payment.model.demo.js'
import { User } from "../model/user.model.js";
import { razorpay } from "../server.js";
import { ApiError } from "../utils/ApiError.js";
//import razorpay from "";

const getRazorpatApiKey = async(req,res,next) =>{
    res.status(200).json({
        success:true,
        message:"Razorpay API Key",
        key:process.env.RAZORPAY_KEY_ID
    })
}

//for test purpose
const aa = async(req,res) =>{
    res.status(200).json({
        success:true,
        message:"Razorpay API Key",
    })
}


// const buySubscription = async(req,res,next) =>{
//     const {id} = req.user;

//     const user = await User.findById(id);

//     if(!user){
//         return next(new ApiError(400,'Unauthenticate please login For purchese a course'))
//     }

//     if(user.role === 'ADMIN'){
//         return next(new ApiError(400,'Admim cannot purchese a subscription'));

//     }

//     /*  to create a subscription id on Razorpay Platform
//         and open Razorpay payment getway for payment
//         and if payment succesfully then rezorpay return a subscription ID & subscription STATUS 
//     */
//     const subscription = await  razorpay.subscription.create({
//         plan_id:process.env.RAZORPAY_PLAN_ID,
//         customer_notify:1
//     })

//     user.subscription.id = subscription.id;
//     user.subscription.status = subscription.status;

//     await user.save();

//     res.status(200).json({
//         success:true,
//         message:"Subscribe Succesfully",
//         subscription_id:subscription.id,
//     })
// }



// const verifySubscription = async(req,res,next) =>{
//     const {id} = req.user;

//     //this data came from Razorpay website through the post request
//     const {razerpay_payment_id,razerpay_subscription_id,razerpay_signature} = req.body;

//     const user = await User.findById(id);

//     if(!user){
//         return next(new ApiError(400,'Unauthenticate, please login'))
//     }

//     const subscriptionId = user.subscription.id;

//     const generatedSignature = crypto
//         .createHmac('sha256',process.env.RAZORPAY_SECRET)
//         .update(`${razerpay_payment_id} | ${razerpay_subscription_id}`)
//         .digest('hex')

//    if(generatedSignature != razerpay_signature){
//     return next(new ApiError(500,'Payment not Verified, please try again'))
//    }

//    await Payment.create({
//     razerpay_payment_id,
//     razerpay_subscription_id,
//     razerpay_signature
//    })

//    user.subscription.status = 'active';
//    await user.save();

//    res.status(200).json({
//     success:true,
//     message:'Payment verified succesfully'
//    })
// }


// const cancelSubscription = async(req,res,next) =>{
//     const {id} = req.user;
//     const user = await User.findById(id);

//     if(!user){
//         return next(new ApiError(400,'Unauthenticate, please login'))
//     }

//     if(user.role === 'ADMIN'){
//         return next(new ApiError(400,'Admim cannot purchese a subscription'));

//     }

//     const subscriptionId = user.subscription.id;

//     //To cancel the subscriotion from Razorpay Getway

//     const subscription = await razorpay.subscriptions.cancel({
//         subscriptionId
//     })

//     user.subscription.status = subscription.status;

//     await user.save();
// }


// const allPayments = async(req,res,next) =>{
//     const {count} = req.query;
//     const subscription = await razorpay.subscriptions.all({
//         count: count || 10,
//     });

//     res.status(200).json({
//         success:true,
//         message:'All payments',
//         subscription
//     })
    
// }

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
    getRazorpatApiKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    allPayments,
    aa
}
