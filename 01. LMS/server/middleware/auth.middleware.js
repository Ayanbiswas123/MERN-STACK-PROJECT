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
    //console.log(req.user);
    //console.log(req.user.subscription.status);

    const subscription = req.user.subscription;
    const currentUserRoll = req.user.role;
    //console.log(currentUserRoll);

    if(currentUserRoll !== 'ADMIN' && subscription.status !== 'active'){
        return next(new ApiError(403,'Please Subscribe to access this route!'))
    }

    next();
}
export {
    isLoggedIn,
    authorizedRoles,
    authorizedSubscriber
}