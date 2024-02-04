// Importing the Mongoose library for MongoDB connectivity
import mongoose from "mongoose";

// Asynchronous function to connect to the MongoDB database
export const connectDB = async () => {
    try {
        // Attempting to connect to the MongoDB database using the provided URL
        const db = await mongoose.connect(process.env.MONGODB_URL);

        // Logging a success message if the connection is established
        console.log("Database Connected Successfully", db.connection.host);
    } catch (error) {
        // Logging an error message if there is an issue connecting to the database
        console.log("Error Occurred While Connecting to the Database", error);
    }
}
