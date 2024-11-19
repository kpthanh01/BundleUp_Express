const { Schema } = require("mongoose");

const Event = new Schema(
  {
    author_id: { type: Schema.Types.ObjectId, ref: "user_id" },
    eventTitle: { type: String, required: true },
    location: { type: String, required: true },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    description: { type: String, required: true },
    isAttending: [{ type: Schema.Types.ObjectId, ref: "user_id" }],
    price: { type: Number },
    image: { type: String },
    numOfAttendees: { type: Number },
    category: {
      type: String,
      enum: [
        "Comedy",
        "Crafts",
        "Dance",
        "Drinks",
        "Games",
        "Fitness/Workouts",
        "Parties",
        "Home/Garden",
        "Social Issues",
        "Sports",
        "Theater",
      ],
    },
    attendeeLimit: { type: Number, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "comment_id" }],
  },
  { timestamps: true }
);

module.exports = Event;
