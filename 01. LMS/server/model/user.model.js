import mongoose, { model,Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new Schema({
    fullName:{
        type:String,
        require:[true,'Name must be require'],
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        require:[true,'Email must be require'],
        lowercase:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:[true,'Password must be require'],
    },
    avatar:{
        public_id:{
            type:'String',
        },
        secure_url:{
            type:'String'
        }
    },
    role:{
        type:'String',
        enum:['USER','ADMIN'],
        default:'USER'
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    subscription:{
        id:String,
        status:String
    }

},{timestamps:true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    console.log("password lock" + this.password);
    next()
});



userSchema.methods = {

    generateJWTToken:function(){

        return jwt.sign(
            {
                id:this.id, email:this.email, subscription:this.subscription, role:this.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRY
            }
        )
    },

    isPasswordCorrect:async function(password){
        
        return await bcrypt.compare(password, this.password);
    },

    generatePasswordResetToken:async function(){
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000 // 15min from now

        return resetToken;
    }

}

export const User = model('User',userSchema)