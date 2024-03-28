const Event = require("../models/event");
const Review = require("../models/review");

const handleCreateEvent = async (req, res) => {
    const { title, body } = req.body;
    try {
        const event = await Event.create({
            title,
            body,
            createdBy: req.user._id,
        });
        console.log('Created Event ID:', event._id);
        return res.redirect(`/event/${event.createdBy}`);
    } catch (error) {
        console.error('Error creating event:', error);
        return res.render("addEvent", { user: req.user, error: "All fields are mandatory" });
    }
};

const handleGetEvent = async (req, res) => {
    const event = await Event.findById(req.params.id).populate("createdBy");
    const reviews = await Review.find({ eventId: req.params.id }).populate("createdBy");
    return res.render("event", {
        user: req.user,
        event,
        reviews,
    });
};

const handleCreateReview = async (req, res) => {
    try {
        await Review.create({
            eventId: req.params.eventId,
            content: req.body.content,
            registrationRating: req.body.registrationRating,
            eventRating: req.body.eventRating,
            breakfastRating: req.body.breakfastRating,
            overallRating: req.body.overallRating,
            createdBy: req.user._id,
        });
        return res.status(201).redirect(`/event/${req.params.eventId}`);
    } catch (error) {
        return res.status(400).redirect(`/event/${req.params.eventId}`);
    }
};

const handleDeleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        return res.redirect("/");
    } catch (error) {
        console.log(error);
    }
};

const handleRegisterEvent = async (req, res) => {
    try {
        const id = req.params.id;

        const event = await Event.findById(id);

        const index = event.registerUser.findIndex((id) => id === String(req.user._id));

        if (index === -1) {
            event.registerUser.push(String(req.user._id));
            const updatedEvent = await Event.findByIdAndUpdate(id, event, { new: true });
            return res.status(201).redirect(`/event/${id}`);
        } else {
            return res.send("Already Registered");
        }

    } catch (error) {
        console.log(error);
        return res.status(400).redirect('/');
    }
};


module.exports = {
    handleCreateEvent,
    handleGetEvent,
    handleCreateReview,
    handleDeleteEvent,
    handleRegisterEvent,
};
