import {model,Schema} from 'mongoose'

const demoPaymentSchema = new Schema({

    user_id:{
        type:String,
        require:true
    },
    user_name:{
        type:String,
        require:true
    },
    payment_id:{
        type:String,
        require:true
    }
},{timestamps:true})

export const Demopayment = model("Demopayment",demoPaymentSchema)