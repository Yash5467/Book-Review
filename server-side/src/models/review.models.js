import mongoose, { Mongoose } from "mongoose";


const reviewSchema=new mongoose.Schema({
    userId:{
        type:  mongoose.Types.ObjectId,
        required:true
    },
    bookId:{
    type:String,
    required:true
    },
    userName:{
        type:String,
        required:true
    },
    userAvatar:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
});



export const Review=mongoose.model("Review",reviewSchema);