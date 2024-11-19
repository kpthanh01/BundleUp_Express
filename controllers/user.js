const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

// const verifyToken = require('../middlewares/verify-token'); 
// router.use(verifyToken);

const SALT_LENGTH = 12;

router.get('/sign-token', (req, res) => {
    const user = {
        _id: 1,
        username: "test",
        passsword: "test"
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET)
    res.json({ token })
})

router.post('/signup', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username })
        if (userInDatabase) {
            return res.json({error: 'Username already taken.'})
        }
        const modifiedPassword = await bcrypt.hashSync(req.body.password, SALT_LENGTH)
        const user = await User.create({
            username: req.body.username,
            hashedPassword: modifiedPassword,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            type: req.body.type
        })
        const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET)
        res.status(201).json({ user, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

router.post('/signin', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.findOne({ username: req.body.username })
        const password = await bcrypt.compareSync(req.body.password, user.hashedPassword)
        if (user && password) {
            const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET)
            res.status(200).json({ token })
        } else {
            res.status(401).json({ error: 'Invalid username or password.' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)
      if (!user) {
        res.status(404);
        throw new Error('Profile not found.');
      }
      res.json({ user });
    } catch (error) {
      if (res.statusCode === 404) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  })


router.delete("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        const deletedUser = await User.findByIdAndDelete(req.params.userId)
        if (user) {
            res.status(200).json(deletedUser)
        } else {
            res.status(401).json({ error: 'Invalid username or password.' })
        }
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
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json(error)
    }
  })

module.exports = router