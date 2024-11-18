const mongoose = require("mongoose");
const EventSchema = require("./event");

// Add models with the imported Schemas below
const Event = mongoose.model("Event", EventSchema);

module.exports = {};
