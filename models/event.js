const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true ,
        },
        body: {
            type: String,
            required: true ,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "user",
        },
        registerUser: {
            type: [String],
            default: [],
            ref: "user",
        },
    },
    { timestamps: true }
);

const Event = mongoose.model("event", eventSchema);
module.exports = Event;
