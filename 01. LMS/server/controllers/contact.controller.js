import { Contact } from "../model/contact.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const contactUs = async(req,res,next) => {
    console.log(req.user);
    const id = req?.user?.id || 11;
    //console.log(req.user.id + "aaa");

    const{message,email} = req.body;

    const userSendingMessage = await Contact.create({
        userId:id,
        userMessage:message,
        email
    })

    if(!userSendingMessage){
        return next(new ApiError(400,"Message faild to send Try again"))
    }

    await userSendingMessage.save()

    
    res.status(200).json({
        success:true,
        message:"Message send succesfully"
    })
};

export const getAllcontact = async (req, res) => {

    
    const reviews = await Contact.find();
    //console.log(reviews);

    if (!reviews) {
        return next(new ApiError(400, "No data Available"))
    }

    res.status(200).json({
        success: true,  
        message: "All data are Display",
        reviews
    })
}