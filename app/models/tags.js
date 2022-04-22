const mongoose= require('mongoose')


const tagsSchema = new mongoose.Schema({
    subject: {
        type:String,
        required:true
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Tag', tagsSchema)