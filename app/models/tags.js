const mongoose= require('mongoose')


const tagsSchema = new mongoose.Schema({
    subject: {
        type:String,
        required:true
    },
    course : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
},{
    timestamps: true
})

module.exports = mongoose.model('Tag', tagsSchema)