import { model,Schema } from "mongoose";

const reviewSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    userImageUrl:{
        type:String,
    },
    userMessage:{
        type:String,
        require:true
    },
    ratting:{
        type:Number,
        default:0
    }
})

export const Review = model("Review",reviewSchema);