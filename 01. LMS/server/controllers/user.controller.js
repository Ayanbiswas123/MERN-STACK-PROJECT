import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

//for only modify from server not client
const cookieOption = {
    maxAge:7*24*60*100, // 7 days
    httpOnly:true,
    secure:true

}
const register = async(req,res,next) =>{

    const {fullName,email,password} = req.body;

    if(!fullName || !email || !password){
        return next(new ApiError(400,'All field are require'))
    }

    const userExist = await User.findOne({email});

    if(userExist){
        return next(new ApiError(400,'User Exist'))
    }

    

    //TODO file upload
    const avatarLocalPath = req.file?.path
    //console.log(avatarLocalPath);

    if (!avatarLocalPath) {
        return next(new ApiError(400,'Avatar File require'))
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    //console.log(avatar.url);

    if (!avatar) {
        return next(new ApiError(400,'Avatar File require aa'))
    }


    const user = await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:avatar.url || 'https://res.cloudinary.com/dgp1hjcc2/image/upload/v1714616428/imhmoqubqd6bc5kjtxql.png'
        }
    })

    if(!user){
        return next(new ApiError(400,'User Registration failed'))
    }
    await user.save();

    user.password = undefined;

    const token = await user.generateJWTToken();

    res.cookie('token',token, cookieOption)

    res.status(200).json({
        success:true,
        message:'User register successfully',
        user
    })

}

const login = async (req, res,next) => {
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { email, password } = req.body
   // console.log(email);  

    if (!password && !email) {
        return next(new ApiError(400, "email or password is required"))
    }


    const user = await User.findOne({
        email
    })
    //console.log(user.password);

    if (!user) {
        return next(new ApiError(400, "email dose not match"))
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        return next(new ApiError(400, "password dose not match"))
    }

    console.log(isPasswordValid);

    user.password = undefined;
    const token = await user.generateJWTToken();

    res.cookie('token',token, cookieOption)

    res.status(200).json({
        success:true,
        message:'User loggedin Succesfully',
        user
    })
    
    

}

const logout = (req,res) =>{
    res.cookie('token', null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:'User logged out successfully'
    })
}

const getProfile = async(req,res,next) =>{

    try {
        const userId = req.user.id;
        // console.log(userId);
        const user = await User.findById(userId).select('-password');
    
        res.status(200).json({
            success:true,
            message:'User details',
            user
        })
    } catch (error) {
        return next(new ApiError(400, "Failed to fetch user profile"))
    }
}

//not work right now
const forgotPassword = async(req,res) =>{

    const {email} = req.body;

    if(!email){
        return next(new ApiError(400,'Email is require'))
    }

    const user = await User.findOne({email});

    if(!user){
        return next(new ApiError(400,'Email not register'))
    }

    const resetToken = await user.generatePasswordResetToken();

    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}`

    try {
        await sendEmail(email, subject, message);
        res.status(200).json({
            success:true,
            message:`Reset password token has been sent to ${email}`
        })

    } catch (error) {

        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;

        await user.save()
        return next(new ApiError(400,e.message))
    }
}

//not work right now
const resetPassword = async(req,res) =>{

}


const changePassword = async(req,res) =>{

    const {oldPassword, newPassword} = req.body;

    const { id } = req.user;

    if(!oldPassword || !newPassword){
        return next(new ApiError(400, "All field are required"))
    }

    const user = await User.findById(id)

    if(!user){
        return next(new ApiError(400, "User not Exist"))
    }

    const isPasswordValid = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordValid){
        return next(new ApiError(400, "Invalid password"))
    }

    user.password = newPassword;
    await user.save()

    user.password = undefined;
    res.status(200).json({
        success:true,
        message:"Passwor changed successfully"
    })
}


const updateUser = async(req, res, next) => {
    const { fullName } = req.body;
    //console.log(fullName);
    const id = req.user.id;
    // console.log(id);

    try {
        const userExist = await User.findById(id);

        if (!userExist) {
            return next(new ApiError(400, 'User does not exist'));
        }

        if (fullName) {
            userExist.fullName = fullName;
        }
        console.log(req.file);
        if (req.file) {
            // To destroy old image
            if (userExist.avatar && userExist.avatar.secure_url) {
                await deleteFromCloudinary(userExist.avatar.secure_url);
            }

            // File upload
            const avatarLocalPath = req.file?.path;

            const avatar = await uploadOnCloudinary(avatarLocalPath);

            if (avatar) {
                userExist.avatar.secure_url = avatar.url;
            }
        }

        await userExist.save();

        res.status(200).json({
            success: true,
            message: 'User profile updated successfully'
        });
    } catch (error) {
        return next(new ApiError(500, 'Internal Server Error'));
    }
};


export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser
}