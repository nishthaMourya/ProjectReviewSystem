const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["USER", "ORGANIZER"],
            default: "USER",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
