const mongoose = require('mongoose')
const validator = require('validator')
const Comment = require('../models/comments')

mongoose.connect('mongodb://127.0.0.1:27017/user-api',{
    useNewUrlParser: true,
    useCreateIndex:true
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phone:{
        type:Number
    },
    designation:{
        type:String
    },
    address:{
        type:String
    },
    interests:{
        type:[String],
        required:true
    },

    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    }]
})
const User = mongoose.model('User', userSchema)
module.exports = User