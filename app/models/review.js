const mongoose= require('mongoose')
const commentSchema = require('./comment')


const reviewSchema = new mongoose.Schema({
    note: {
        type:String,
        required:true
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
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User', 
    },
    comments: [commentSchema]
},{
    timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema)