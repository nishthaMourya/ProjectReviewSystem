// require necessary modules
const express = require("express");  
const path = require("path"); 
const dotenv = require("dotenv");  
const cookieParser = require("cookie-parser"); 

// models
const Event = require("./models/event"); 

const userRoutes = require("./routes/user"); 
const eventRoutes = require('./routes/event');

// Middleware for authentication
// const protectRoute = require("./middleware/protectRoute");

// mongoDB Connection
const connectToMongoDB = require("./db/connectToMongoDB");

// Express application instance
const app = express();  
const PORT = process.env.PORT || 8000;

dotenv.config(); 

// Set up view engine and views directory
app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", path.resolve("./views")); // Set the views directory

// Middleware for parsing URL-encoded request bodies
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Middleware for parsing cookies

// Routes
app.use("/user", userRoutes);
app.use('/event',eventRoutes);

// Route for rendering the home page
app.get("/", async (req, res) => {
    // Retrieve all events from the database
    const allEvents = await Event.find({});

    // Render the home page and pass user and events data to the view
    return res.render("home", {
        user: req.user, // Pass the user object to the view
        events: allEvents, // Pass the events array to the view
    });
});

app.listen(PORT, () =>{
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});
