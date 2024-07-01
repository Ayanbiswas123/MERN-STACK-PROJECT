import { Contact } from "../model/contact.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const contactUs = async(req,res,next) => {
    const id = req.user.id;
    //console.log(req.user.id + "aaa");

    const{message,email} = req.body;
    
    const userExist = await User.findById(id);

    if(!userExist){
        return next(new ApiError(400,"Please login for Contact"))
    }

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