const mongoose = require('mongoose')
const reviewSchema = require('./review')
const likeSchema = require('./like')



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
		},
        courseLink: {
            type: String,
            required:true,
        },
        courseSubject: {
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
            enum:['Remote', 'In Person']
		},
        startDate: {
			type: Date,
		},
		endDate: {
			type: Date,
		},
        daysOfCourse: {
			type: String,
			required:true
		},
        startTime: {
			type: String,
			required:true
		},
		endTime: {
			type: String,
			required:true
		},
        credits: {
			type: Boolean,
			required:true
		},
        tags: [ {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        }],
		reviews: [reviewSchema],
		likes: [likeSchema],
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
		toObject: {virtuals: true},
		toJSON: {virtuals: true}
	}
)

courseSchema.virtual('offerCredits').get(function() {
	if (this.credits === true) {
		return 'College credits offered'
	} else if (this.credits === false) {
		return 'Does not offer college credit'
	}
})



module.exports = mongoose.model('Course', courseSchema)
