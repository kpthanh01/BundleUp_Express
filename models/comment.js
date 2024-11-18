const { Schema } = require("mongoose");

const Comment = new Schema({
  author_id: {type: Schema.Types.ObjectId, required: true},
  content: {type: String, required: true},
  event_id: {type: Schema.Types.ObjectId, required: true},
  deal_id: {type: Schema.Types.ObjectId, required: true},
  rating: {type: Number, required: true},
},
{timestamps: true})

module.exports = Comment