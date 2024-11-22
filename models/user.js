const { Schema } = require('mongoose')

const User = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    joinedEvents: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'event_id', 
      },
    ],
    type: {
        type: String,
        required: true,
        enum: ["Individual", "Vendor"]
    },
  })
  
module.exports = User