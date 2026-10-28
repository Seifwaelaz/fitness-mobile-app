require('dotenv').config()

const workoutRoutes = require('./routes/workoutRoutes')
const userRoutes = require('./routes/userRoutes')

const mongoose = require('mongoose')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/workouts', workoutRoutes)
app.use('/user', userRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log('listening on port', PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
