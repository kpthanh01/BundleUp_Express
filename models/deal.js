const { Schema } = require('mongoose');

const Deal = new Schema({
  author: {
    type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
},
  { timestamps: true });

module.exports = Deal;
