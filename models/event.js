const { Schema } = require("mongoose");

const Event = new Schema(
  {
    author_id: { type: Schema.Types.ObjectId, ref: "user_id" },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endDate: { type: Date, required: true },
    endTime: { type: Date, required: true },
    description: { type: String, required: true },
    rsvp: [{ type: String, enum: ["Attending", "Not Attending", "Maybe"] }],
    price: { type: Number, required: true },
    image: { type: String },
    numOfAttendees: { type: Number, required: true },
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
