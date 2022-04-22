const mongoose= require('mongoose')


const reviewSchema = new mongoose.Schema({
    note: {
        type:String,
        required:true
    },
    rating: {
        type: Number,
        min:0,
        max:10,
        default:5
    },
    owner: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User', 
    },
},{
    timestamps: true
})

module.exports = reviewSchema