import {model,Schema} from 'mongoose'

const courseSchema = new Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    thumbnail:{
        public_id:{
            type:String,
            //required:true
        },
        secure_url:{
            type:String,
            //required:true
        }
    },
    lectures:[
        {
            title:String,
            description:String,
            lecture:{
                public_id:{
                    type:String
                },
                secure_url:{
                    type:String
                }
            }
        }
    ],
    numberOfLectures:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String,
    }   

},{timestamps:true})


export const Course = model('Course',courseSchema);