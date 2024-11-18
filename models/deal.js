const {Schema} = require('mongoose');

const Deal = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User', 
  },
  description: {
    type: String, 
    required: true, 
  },
  bundle_number: {
    type: Number, 
    required: true, 
  },
  timestamp: {
    type: Date, 
    default: Date.now, 
  },
  category: {
    type: String, 
    required: false, 
  },
  joined_users: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', 
    },
  ],
},
{timestamps: true});

module.exports = Deal;
