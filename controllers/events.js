const express = require("express");
const verifyToken = require("../middlewares/verify-token.js");
const router = express.Router();
const { Event } = require("../models");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find({})
      .populate("eventTitle")
      .sort({ startDateTime: "descending" });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate(
      "eventTitle"
    );
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Protected Routes

router.use(verifyToken);

router.post("/", async (req, res) => {
  try {
    // req.body.author = req.user._id;
    const event = await Event.create(req.body);
    // event._doc.author = req.user;
    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});



router.put("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    // if (!event.author.equals(req.user._id)) {
    //   return res.status(403).send(`You're not allowed to do that!`);
    // }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      req.body,
      { new: true }
    );

    // updatedEvent._doc.author = req.user;

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    // if (!event.author.equals(req.user._id)) {
    //   return res.status(403).send(`You're not allowed to do that!`);
    // }

    const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
    res.status(200).json(deletedEvent);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
