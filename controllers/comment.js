const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verify-token')
const { Comment } = require('../models')

router.use(verifyToken);
// Add all the CRUD features bellow
router.get('/', async (req, res) => {
  try {
    const allComments = await Comment.find({})
    res.status(200).json(allComments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:commentId', async (req, res) => {
  try {
    const findComment = await Comment.findById(req.params.commentId)
    if (!findComment) {
      res.status(404)
      throw new Error('Comment not found')
    }
    res.status(200).json(findComment)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message }
      )
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

router.post('/', async (req, res) => {
  try {
    const createComment = await Comment.create(req.body)
    res.status(201).json(createComment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:commentId', async (req, res) => {
  try {
    const updateComment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true })
    if (!updateComment) {
      res.status(404)
      throw new Error('Comment not found')
    }
    res.status(200).json(updateComment)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message }
      )
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

router.delete('/:commentId', async (req, res) => {
  try {
    const deleteComment = await Comment.findByIdAndDelete(req.params.commentId)
    if (!deleteComment) {
      res.status(404)
      throw new Error('Commment not found')
    }
    res.status(200).json(deleteComment)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message }
      )
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

module.exports = router