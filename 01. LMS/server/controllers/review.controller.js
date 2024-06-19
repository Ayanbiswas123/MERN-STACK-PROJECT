import { Review } from "../model/review.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";


export const userReview = async(req,res,next) => {
    const {id} = req.user?.id;

    if(!id){
        return next(new ApiError(400,"Login for Send Review"));
    }

    const userExist = await User.findById(id);

    if(!userExist){
        return next(new ApiError(400,"User Not Exist"));
    }
    const userImageUrl = userExist.avatar?.secure_url || "";

    const {message,ratting}  = req.body;

    const createReview = await Review.create({
        userId:id,
        userImageUrl,
        userMessage:message,
        ratting
    })

    if(!createReview){
        return next(new ApiError(400,"Failed to send review"));
    }
    
    await createReview.save();

    

    res.status(200).json({
        success:true,
        message:"Review send Succesfully",
        data:createReview
    })
}

export const getAllReview = async (req, res) => {
    const reviews = await Review.find({});

    if (!reviews) {
        return next(new ApiError(400, "No review Available"))
    }

    res.status(200).json({
        success: true,  
        message: "All review are Display",
        reviews
    })
}