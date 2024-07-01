import { Review } from "../model/review.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";


export const userReview = async(req,res,next) => {
    console.log(req.user);
    const id = req.user.id;
    console.log(id);

    if(!id){
        return next(new ApiError(400,"Login for Send Review"));
    }

    const userExist = await User.findById(id);

    if(!userExist){
        return next(new ApiError(400,"User Not Exist"));
    }
    const userImageUrl = userExist.avatar?.secure_url || "";
    const userName = userExist?.fullName || "";

    const {message,rating}  = req.body;
    console.log(rating);

    const createReview = await Review.create({
        userId:id,
        userName,
        userImageUrl,
        userMessage:message,
        rating
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
    const start = req.query.startlimit || 6;
    //const end = req.query.endlimit || 12;
    const end = 6;
    console.log(start,end);
    const reviews = await Review.find().skip(start).limit(end);
    //console.log(reviews);

    if (!reviews) {
        return next(new ApiError(400, "No review Available"))
    }

    res.status(200).json({
        success: true,  
        message: "All review are Display",
        reviews
    })
}