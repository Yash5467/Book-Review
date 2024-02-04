// Importing the Router from the Express library
import { Router } from "express";

// Importing user authentication controller functions
import { userLogin, userSignup } from "../controllers/user.controller.js";

// Creating a new instance of the Router
export const userRouter = Router();

// Route to handle user signup, using the userSignup controller function
userRouter.route("/signup").post(userSignup);

// Route to handle user login, using the userLogin controller function
userRouter.route("/login").post(userLogin);
