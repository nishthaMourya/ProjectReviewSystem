const express = require('express');
const router = express.Router();
const {handleCreateEvent , handleGetEvent , handleCreateReview , handleDeleteEvent, handleRegisterEvent} = require('../controllers/event');

router.get("/add-new", (req, res) => {
    return res.render("addEvent", {
        user: req.user,
    });
});

router.post("/", handleCreateEvent);
router.get("/:id", handleGetEvent);
router.get("/register/:id", handleRegisterEvent);

// ------ for Reviews--------
router.post('/review/:eventId' , handleCreateReview);

router.get("/delete/:id", handleDeleteEvent);

module.exports = router;