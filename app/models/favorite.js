const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User', 
    },
    course: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Course', 
        required:true,
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Favorite', favoriteSchema)