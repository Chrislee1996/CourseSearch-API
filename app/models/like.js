const mongoose= require('mongoose')


const likeSchema = new mongoose.Schema({
    like: {
        type:String, 
        required:true,
        enum:['like', 'dislike']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User', 
        required:true
    },
},{
    timestamps: true
})

module.exports = likeSchema