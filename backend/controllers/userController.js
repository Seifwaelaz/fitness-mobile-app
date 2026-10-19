const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const cloudinary = require('../config/cloudinary')

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET)
}

const signupUser = async (req,res) => {
    const {email, password, name} = req.body
    try{
        const user = await User.signup(name, email, password)
        const token = createToken(user._id)
        res.status(200).json({name, email, token, profilePicture: user.profilePicture})
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }
}

const loginUser = async (req,res) => {
    const {email, password} = req.body
    try{
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.status(200).json({name: user.name ,email,token, profilePicture: user.profilePicture})
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }
}

const uploadProfilePicture = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No image was uploaded' })
    }

    try {

        const result = await new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'fitness_app/profile_pictures'
                },
                (error, result) => {

                    if (error) {
                        reject(error)
                    }

                    resolve(result)

                }
            )

            stream.end(req.file.buffer)

        })

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {   profilePicture: result.secure_url,
                profilePicturePublicId: result.public_id
            },
            { returnDocument: 'after' }
        )

        res.status(200).json({
            profilePicture: user.profilePicture
        })

    } catch (error) {

        res.status(400).json({
            error: error.message
        })

    }
}

const deleteProfilePicture = async (req, res) => {

    try {

        const user = await User.findById(req.user._id)

        if (!user.profilePicturePublicId) {
            return res.status(400).json({
                error: 'No profile picture to delete'
            })
        }

        await cloudinary.uploader.destroy(user.profilePicturePublicId)

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                profilePicture: null,
                profilePicturePublicId: null
            },
            { returnDocument: 'after' }
        )

        res.status(200).json({
            profilePicture: updatedUser.profilePicture
        })

    } catch (error) {

        res.status(400).json({
            error: error.message
        })

    }
}

module.exports = {
    signupUser,
    loginUser,
    uploadProfilePicture,
    deleteProfilePicture
}