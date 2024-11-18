const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
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
    joinedEvents: {
        type: Array,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
  })

  userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword
    }
})
  
module.exports = mongoose.model('User', userSchema)