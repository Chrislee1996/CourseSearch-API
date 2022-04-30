// import our dependecies, middleware and models 
const express = require('express')
const passport = require('passport')
const Course = require('../models/course')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router()


/******************** ROUTES *******************/



router.post('/like/:courseId', (req, res, next) => {
    const like = req.body.like
    const courseId = req.params.courseId
	// req.body.like.owner = req.user._id
    Course.findById(courseId)
        .then(handle404)
            .then((course) => {
                course.likes.push(req.body.like)
                return course.save()
            })
		// if that succeeded, return 204 and no JSON
		// .then(() => res.sendStatus(204))
        .then(course => res.status(201).json({ course: course }))
		// if an error occurs, pass it to the handler
		.catch(next)
})



module.exports = router