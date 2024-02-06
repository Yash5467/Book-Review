import mongoose from "mongoose";


const commentSchema=new mongoose.Schema({
    
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    reviewId:{
      type:mongoose.Types.ObjectId,
      required:true
    },
    comment:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }

});


export const Comment=mongoose.model("Comment",commentSchema);