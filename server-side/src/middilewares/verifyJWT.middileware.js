// Importing the User model from the specified file path.
import { User } from "../models/user.models.js";

// Importing the ApiError class from the specified file path.
import { ApiError } from "../utils/ApiError.js";

// Importing the asyncHandler function from the specified file path.
import { asyncHandler } from "../utils/asyncHandler.js";

// Importing the jwt library for JSON Web Token operations.
import jwt from 'jsonwebtoken'

// Middleware function for verifying JWT (JSON Web Token)
export const verifyJWT = asyncHandler(async (req, res, next) => {

    // Extracting the accessToken from the cookies in the request.
    const { accessToken } = req.cookies;
    
    //Checking Token is Availabel or not 
   if(!accessToken) throw new ApiError(401,"Unauthorized Access");
    // Decrypting the user information from the accessToken using the secret key.
    const decryptUser = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // Finding the user in the database based on the decrypted user's id,
    // and excluding the password and refreshToken fields.
    const userVerification = await User.findById(decryptUser.id).select("-password -refreshToken");

    // If no user is found, throw an ApiError with a 400 status and "Unauthorized Access" message.
    if (!userVerification) throw new ApiError(400, "Unauthorized Access");

    // Setting the authenticated user information in the request object.
    req.user = userVerification;

    // Passing control to the next middleware or route handler.
    next();
});
