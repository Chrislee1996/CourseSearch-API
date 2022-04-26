const mongoose= require('mongoose')
const commentSchema = require('./comment')
const { Schema, model} = mongoose


const reviewSchema = new mongoose.Schema({
    note: {
        type:String,
    },
    courseRating: {
        type: Number,
        min:0,
        max:10,
        default:5
    },
    professorRating: {
        type: Number,
        min:0,
        max:10,
        default:5
    },
    owner: {
        type: Schema.Types.ObjectID,
        ref: 'User', 
    },
    comments: [commentSchema]
},{
    timestamps: true
})

module.exports = reviewSchema