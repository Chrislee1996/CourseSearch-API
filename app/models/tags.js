const mongoose= require('mongoose')


const tagsSchema = new mongoose.Schema({
    details: {
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