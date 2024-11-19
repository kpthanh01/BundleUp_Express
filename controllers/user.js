const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

// const verifyToken = require('../middlewares/verifyToken'); 
// router.use(verifyToken);

const SALT_LENGTH = 12;

router.post('/signup', async (req, res) => {
    console.log(req.body)
    try {
        const userInDatabase = await User.findOne({ username: req.body.username })
        if (userInDatabase) {
            return res.json({error: 'Username already taken.'})
        }
        // const modifiedPassword = await bcrypt.hashSync(req.body.password, SALT_LENGTH)
        const user = await User.create({
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH),
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            type: req.body.type
        })
        console.log(user)
        const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET)
        res.status(201).json({ user, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

router.post('/signin', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username })
        if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
            const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid username or password.' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


router.delete("/:userId", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId)
        const user = await User.findOne({ username: req.body.username })
        if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
            const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid username or password.' })
        }
        res.status(200).json(deletedUser)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

router.put("/:userId", async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      )
      const user = await User.findOne({ username: req.body.username })
      if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
        const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } else {
        res.status(401).json({ error: 'Invalid username or password.' })
    }
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json(error)
    }
  })

module.exports = router