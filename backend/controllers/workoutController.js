const mongoose = require('mongoose')
const Workout = require('../models/workoutModel')
const validator = require('validator')

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
  if (load === undefined || load === null || load === '') {
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

  if (!validator.isInt(reps, { min: 1 })) {
    return res.status(400).json({ error: 'Reps has to be a positive integer' })
  }

  if (!validator.isInt(sets, { min: 1 })) {
    return res.status(400).json({ error: 'Sets has to be a positive integer' })
  }

  if (!validator.isFloat(load, { min: 0 })) {
    return res
      .status(400)
      .json({ error: 'Load has to be a non-negative number' })
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
  if (title !== undefined && title !== null && title.trim() !== '')
    updates.title = title
  if (load !== undefined && load !== null && load.trim() !== '')
    updates.load = load
  if (reps !== undefined && reps !== null && reps.trim() !== '')
    updates.reps = reps
  if (sets !== undefined && sets !== null && sets.trim() !== '')
    updates.sets = sets

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      error: 'Please fill the fields you want to update',
    })
  }

  if (updates.reps && !validator.isInt(String(reps), { min: 1 })) {
    return res.status(400).json({
      error: 'Reps has to be a positive integer',
    })
  }

  if (updates.sets && !validator.isInt(String(sets), { min: 1 })) {
    return res.status(400).json({
      error: 'Sets has to be a positive integer',
    })
  }

  if (updates.load && !validator.isFloat(String(load), { min: 0 })) {
    return res.status(400).json({
      error: 'Load has to be a non-negative number',
    })
  }

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
