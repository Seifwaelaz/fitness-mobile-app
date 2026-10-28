const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: 'Reps must be a whole number.',
      },
    },
    load: {
      type: Number,
      required: true,
      min: 0,
    },
    sets: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: 'Sets must be a whole number.',
      },
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Workout', workoutSchema)
