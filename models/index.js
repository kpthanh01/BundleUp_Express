const mongoose = require("mongoose");
const commentSchema = require('./comment')
const EventSchema = require("./event");

// Add models with the imported Schemas below
const Comment = mongoose.model('Comments', commentSchema)
const Event = mongoose.model("Event", EventSchema);

module.exports = {
  Event,
  Comment
}
