import {model,Schema} from 'mongoose'

const paymentSchema = new Schema({

    razerpay_payment_id:{
        type:String,
        require:true
    },
    razerpay_subscription_id:{
        type:String,
        require:true
    },
    razerpay_signature:{
        type:String,
        require:true
    }
},{timestamps:true})

export const Payment = model("Payment",paymentSchema)