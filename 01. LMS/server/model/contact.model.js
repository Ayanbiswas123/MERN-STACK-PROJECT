import {model,Schema} from 'mongoose'

const contactSchema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    userMessage:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }   

},{timestamps:true})


export const Contact = model('Contact',contactSchema);