require('dotenv').config()

const express = require('express')
const router = require('./src/routes/router')
const cors = require('cors')

const PORT = process.env.PORT || process.env.PORT_NUMBER

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1', router)
app.use('/uploads', express.static('uploads'))

app.listen(PORT, () => {
  console.log(`WaysBeans API | server is running on port: ${PORT}`)
})
