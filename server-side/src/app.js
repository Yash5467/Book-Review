// Importing required modules and libraries
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Importing user router from the routes directory
import { userRouter } from './routes/user.routes.js';
import { contentRouter } from './routes/content.routes.js';

// Creating an instance of the Express application
const app = express();

// Configuring environment variables using dotenv
dotenv.config();

// Setting up Cross-Origin Resource Sharing (CORS) middleware
app.use(cors({
    origin: process.env.CLIENT_ENDPOINT,
    credentials:true // Allowing requests from the specified client endpoint
}));

// Using cookie-parser middleware to handle cookies in the request
app.use(cookieParser());

// Parsing incoming URL-encoded and JSON data in the request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mounting the user router under the "/user" endpoint
app.use("/user", userRouter);

// Mouting the content router under the "/content" endpoint
app.use("/content",contentRouter);

// Exporting the configured Express application
export {
    app
};
