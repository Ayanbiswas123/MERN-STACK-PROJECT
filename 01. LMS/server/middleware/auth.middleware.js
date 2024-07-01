import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'

const isLoggedIn = async(req,res,next) => {
    const {token} = req.cookies;
    //console.log(token);

    if(!token){
        return next(new ApiError(401, "Unauthenticated, please Login"))
    }

    const userDetails = jwt.verify(token,process.env.JWT_SECRET);
    //console.log("from auth");
    //console.log(userDetails);
    req.user = userDetails;
    //console.log(userDetails);
    next();
}

const authorizedRoles = (...roles) => async(req,res,next) =>{
    const currentUserRoll = req.user.role;
    if(!roles.includes(currentUserRoll)){
        return next(new ApiError(400,'You do not have Permission to access this route'))
    }
    next();
}

const authorizedSubscriber = async(req,res,next) =>{

    const userCurrentStatus = await User.findById(req.user.id)

    const subscription = userCurrentStatus.subscription?.status;

    const currentUserRoll = req.user.role;

    if(currentUserRoll !== 'ADMIN' && subscription !== 'active'){
        return next(new ApiError(403,'Please Subscribe to access this route!'))
    }

    next();
}
export {
    isLoggedIn,
    authorizedRoles,
    authorizedSubscriber
}