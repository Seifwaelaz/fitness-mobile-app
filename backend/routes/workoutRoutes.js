const {createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const express = require('express')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getWorkouts)
router.post('/', createWorkout)
router.get('/:id', getWorkout)
router.patch('/:id', updateWorkout)
router.delete('/:id', deleteWorkout)

module.exports = router