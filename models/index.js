const mongoose = require('mongoose')
const commentSchema = require('./comment')

// Add models with the imported Schemas below
const Comment = mongoose.model('Comments', commentSchema)

module.exports = {
  Comment
}