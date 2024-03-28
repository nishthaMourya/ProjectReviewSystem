const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "event",
        },
        content: {
            type: String,
        },
        registrationRating: {
            type: Number,
        },
        eventRating: {
            type: Number,
        },
        breakfastRating: {
            type: Number,
        },
        overallRating: {
            type: Number,   
        },
        likes: {
            type: Number,
            default: 0,
        },
        reports: {
            type: Number,
            default: 0,
        },
        reported: {
            type: Boolean,
            default: false,
        },
        organizerResponse: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
);

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;
