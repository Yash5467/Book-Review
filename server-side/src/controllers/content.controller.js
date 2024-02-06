import { Comment } from "../models/comment.models.js";
import { Review } from "../models/review.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const addReview=asyncHandler(async(req,res)=>{
    const {userId,userName,userAvatar,description,rating,bookId}=req.body;
    if(!userId || !userName || !userAvatar || !description || !rating || !bookId) throw new ApiError(401,"Fields Are Required");

    const review=await Review.create({
        userId,
        userName,
        userAvatar,
        description,
        rating,
        bookId
    });

    if(!review) throw new ApiError(500,"Server Error");

    res.status(201).json(new ApiResponse(201,review,"Review Added"));
});


export const getBookReview=asyncHandler(async(req,res)=>{
    const {bookId}=req.body;

     if(!bookId) throw new ApiError(401,"BookId Required");


     const reviews=await Review.find({
        bookId
     });

     res.status(200).json(new ApiResponse(200,reviews,"Data Recived"));
});


export const removeBookReview=asyncHandler(async(req,res)=>{
    const {reviewId}=req.params;

    if(!reviewId) throw new ApiError(401,"Id Required");

    const review=await Review.deleteOne({
        _id:reviewId
    });


    res.status(200).json(new ApiResponse(200,review,"Review Deleted Succesfully"));
});


export const updateBookReview=asyncHandler(async(req,res)=>{
    const {description,rating,reviewId}=req.body;

    if(!description || !rating || !reviewId) throw new ApiError(201,"Data Required");

    const updatedReview=await Review.findByIdAndUpdate(reviewId,{
        description:description,
        rating:rating,
        
    },{new:true});

    res.status(201).json(new ApiResponse(201,updatedReview));
})


export const addComment=asyncHandler(async(req,res)=>{
    const {userId,userName,reviewId,comment,avatar}=req.body;

    if(!userId || !userName || !reviewId || !comment || !avatar) throw new ApiError(401,"Data Required");

    const userComment=await Comment.create({
        userId,
        userName,
        avatar,
        reviewId,
        comment
    });

    if(!userComment) throw new ApiError(500,"Server Busy");

    res.status(201).json(new ApiResponse(201,userComment,"Comment Added"));
});


export const  getComments=asyncHandler(async(req,res)=>{
    const {reviewId}=req.body;

    if(!reviewId) throw new ApiError(401,"Id required");

    const commentData=await Comment.find({
        reviewId:reviewId
    });

    if(!commentData) throw new ApiError(500,"Server Busy");

     res.status(200).json(new ApiResponse(200,commentData));

});


export const removeComment=asyncHandler(async(req,res)=>{
    const {commentId}=req.params;
    if(!commentId) throw new ApiError(401,"Id Required");

    const removedComment=await Comment.findByIdAndDelete(commentId);

    if(!removedComment) throw new ApiError(500,"Server Busy");

    res.status(200).json(new ApiResponse(200,removedComment,"Comment Removed"));
});



export const updateComment=asyncHandler(async(req,res)=>{
    const {commentId,comment}=req.body;

    if(!commentId || !comment) throw new ApiError(401,"Fields are required");

    const updatedComment=await Comment.findByIdAndUpdate(commentId,{
        comment:comment
    },{new:true});

    if(!updatedComment) throw new ApiError(500,"Server Busy");

    res.status(200).json(new ApiResponse(201,updatedComment,"Comment Updated"));
});