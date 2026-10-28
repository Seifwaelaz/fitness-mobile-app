const mongoose = require('mongoose')
const Workout = require('../models/workoutModel')

const createWorkout = async (req, res) => {
  const { title, reps, load, sets } = req.body
  const user_id = req.user._id

  let emptyFields = []
  if (!title) {
    emptyFields.push('title')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!sets) {
    emptyFields.push('sets')
  }
  if (emptyFields.length > 0) {
    return res
      .status(404)
      .json({ error: 'Please fill all empty fields', emptyFields })
  }

  try {
    const workout = await Workout.create({ title, reps, load, sets, user_id })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getWorkouts = async (req, res) => {
  const user_id = req.user._id
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })
  res.status(200).json(workouts)
}

const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'workout ID is not found' })
  }

  const workout = await Workout.findOne({
    _id: id,
    user_id: req.user._id,
  })

  if (!workout) {
    return res.status(404).json({ error: 'workout ID is not found' })
  }

  res.status(200).json(workout)
}

const deleteWorkout = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Workout ID is not found' })
  }
  const workout = await Workout.findOneAndDelete({
    _id: id,
    user_id: req.user._id,
  })

  if (!workout) {
    return res.status(404).json({ error: 'workout ID is not found' })
  }

  res.status(200).json(workout)
}

const updateWorkout = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Workout ID is not found' })
  }
  const { title, load, reps, sets } = req.body

  const updates = {}
  if (title !== undefined) updates.title = title
  if (load !== undefined) updates.load = load
  if (reps !== undefined) updates.reps = reps
  if (sets !== undefined) updates.sets = sets

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id, user_id: req.user._id },
      updates,
      { returnDocument: 'after', runValidators: true },
    )

    if (!workout) {
      return res.status(404).json({ error: 'workout ID is not found' })
    }

    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
}
