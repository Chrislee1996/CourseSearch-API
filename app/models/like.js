const mongoose= require('mongoose')


const likeSchema = new mongoose.Schema({
    like: {
        type:String, 
    },
    owner: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User', 
    },
},{
    timestamps: true
})

module.exports = likeSchema