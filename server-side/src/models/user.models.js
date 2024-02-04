// Importing necessary modules and libraries
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Creating a user schema with required fields
const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/delqudclq/image/upload/v1706372688/se4mvch0ecdd4yewszka.png"
    },
    refreshToken: {
        type: String,
        default: undefined
    }
});

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
    // If the password is not modified, proceed to the next middleware
    if (!this.isModified("password")) next();

    // Hashing the password using bcrypt
    this.password = await bcrypt.hash(this.password, 9);

    // Proceed to the next middleware
    next();
});

// Method to check if the provided password matches the stored password
userSchema.methods.isPasswordCorrect = function ({ password }) {
    return bcrypt.compare(password, this.password);
};

// Method to generate an access token for the user
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

// Method to generate a refresh token for the user
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        id: this._id
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

// Exporting the User model
export const User = mongoose.model("User", userSchema);
