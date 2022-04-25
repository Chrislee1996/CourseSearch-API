const mongoose = require('mongoose')

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
		},
        startTime: {
			type: String,
		},
		endTime: {
			type: String,
		},
        credits: {
			type: Boolean,
			required:true
		},
        tags: [ {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tags'
        }],
		reviews: [ {
			type: mongoose.Schema.Types.ObjectId,
            ref: 'Reviews'
		}],
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
		return 'Does not offere college credit'
	}
})

courseSchema.virtual('courseStartDate').get(function() {
	if (this.startDate === "") {
		return 'Self-taught'
	} else {
		return this.startDate
	}
})

courseSchema.virtual('courseEndDate').get(function() {
	if (this.startDate === "") {
		return 'Self-taught'
	} else {
		return this.endDate
	}
})


module.exports = mongoose.model('Course', courseSchema)
