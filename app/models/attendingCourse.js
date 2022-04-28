const mongoose = require('mongoose')

const attendingCourseSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User', 
        required:true
    },
    course: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Course', 
        required:true,
    },
},{
    timestamps: true
})

module.exports = mongoose.model('AttendingCourse', attendingCourseSchema)