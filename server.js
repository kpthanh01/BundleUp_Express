const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const db = require('./db')

// Import the controllers below
const commentRouter = require('./controllers/comment')

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(bodyParser.json())

// Add the Routers below
app.use('/comments', commentRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})