const mongoose = require("mongoose");
const CommentSchema = require('./comment')
const EventSchema = require("./event");
const UserSchema = require('./user')
const DealSchema = require('./deal')

// Add models with the imported Schemas below
const Comment = mongoose.model('Comment', CommentSchema)
const Event = mongoose.model("Event", EventSchema);
const User = mongoose.model("User", UserSchema);
const Deal = mongoose.model("Deal", DealSchema);

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      delete returnedObject.hashedPassword
  }
})

module.exports = {
  Event,
  Comment,
  User,
  Deal
}
