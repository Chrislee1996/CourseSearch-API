const mongoose = require('mongoose')

const commentSchema = require('./comment')

const {Schema, model} = mongoose

const courseSchema = new mongoose.Schema(
	{
		courseName: {
			type: String,
			required: true,
		},
		courseInstitute: {
			type: String,
			required: true,
		},
        image: {
			type: String,
			required: true,
		},
        corseSubject: {
			type: String,
			required: true,
		},
        teacher: {
			type: String,
			required: true,
		},
        location: {
			type: String,
			required: true,
            enum:['remote', 'inPerson']
		},
        datesOffered: {
			type: String,
			required: true,
		},
        daysOfCourse: {
			type: String,
			required: true,
            enum:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
		},
        timeOfCourse: {
			type: Number,
			required: true,
		},
        credits: {
			type: Number
		},
        comments:[commentSchema],
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Course', courseSchema)
