import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import {ApiResponse} from '../utils/ApiResponse.js'
// Importing the necessary modules and dependencies
const options={
  httpOnly:true,
  secure:true
}
// Cookie Options 

export const userSignup=asyncHandler(async(req,res)=>{
     // Destructuring the required fields from the request body
  const { fullName, email, password } = req.body;

  // Check if any of the required fields are missing, throw an error if so
  if (!fullName || !email || !password) throw new ApiError(401, "Fields Are Required");

  // Checking if a user with the provided email already exists
  const userCheck = await User.findOne({
    email: email
  });

  // If a user with the provided email already exists, throw an error
  if (userCheck) throw new ApiError(401, "User With Email Already Exists");

  // Creating a new user with the provided information, excluding password and refreshToken from the response
  const user = await User.create({
    fullName: fullName,
    email: email,
    password: password
  }).select("-password -refreshToken");

  // If there's an issue while creating the user, throw an error
  if (!user) throw new ApiError(500, "Error While Creating User");

  // Respond with a success status and a JSON containing the user details (excluding password and refreshToken)
  res.status(201).json(new ApiResponse(201, user, "User Registered"));

});


export const userLogin=asyncHandler(async(req,res)=>{
// Destructuring email and password from the request body
const { email, password } = req.body;

// Check if email or password is missing, throw an error if so
if (!email || !password) throw new ApiError(401, "Fields Are Required");

// Find a user in the database with the provided email
const user = await User.findOne({
  email: email
});

// If no user is found with the provided email, throw an error
if (!user) throw new ApiError(401, "Invalid Email Id");

// Verify if the provided password matches the user's stored password
const passwordVerification = await user.isPasswordCorrect({ password: password });

// If password verification fails, throw an error
if (!passwordVerification) throw new ApiError(401, "Invalid Password");

// Generate a new refresh token and access token for the authenticated user
const refreshToken = user.generateRefreshToken();
const accessToken = user.generateAccessToken();

// Set cookies with refresh token and access token, and respond with a success status
res.status(200)
  .cookie("refreshToken", refreshToken, options)
  .cookie("accessToken", accessToken, options)
  .json(new ApiResponse(200, {
    email: user.email,
    fullName: user.fullName
  }));


});