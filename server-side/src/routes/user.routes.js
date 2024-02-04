// Importing the Router from the Express library
import { Router } from "express";

// Importing user authentication controller functions
import { userLogin, userLogout, userSignup, userVerifyLogin } from "../controllers/user.controller.js";
import { verifyJWT } from "../middilewares/verifyJWT.middileware.js";

// Creating a new instance of the Router
export const userRouter = Router();

// Route to handle user signup, using the userSignup controller function
userRouter.route("/signup").post(userSignup);

// Route to handle user login, using the userLogin controller function
userRouter.route("/login").post(userLogin);

// Route to handle user verification , using the userVerify controller function 
userRouter.route("/verify").get(verifyJWT, userVerifyLogin);

// Route to handle user Logout , using the userLogout controller function
userRouter.route("/logout").get(verifyJWT,userLogout);