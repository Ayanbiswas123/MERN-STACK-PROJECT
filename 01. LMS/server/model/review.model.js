import { model,Schema } from "mongoose";

const reviewSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    userName:{
        type:String,
        require:true
    },
    userImageUrl:{
        type:String,
    },
    userMessage:{
        type:String,
        require:true
    },
    rating:{
        type:String,
        default:'0'
    }
})

export const Review = model("Review",reviewSchema);