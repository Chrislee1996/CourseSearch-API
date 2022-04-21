// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

const Course = require('../models/course')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /courses
router.get('/courses', (req, res, next) => {
	Course.find()
		.then((courses) => {
			return courses.map((course) => course.toObject())
		})
		.then((courses) => res.status(200).json({ courses: courses }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

router.get('/courses/mine', requireToken, (req, res, next) => {
	Course.find({owner: req.user.id})
		.populate('owner')
		.then((courses) => {
			return courses.map((course) => course.toObject())
		})
		.then((courses) => res.status(200).json({ courses: courses }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// // SHOW
// // GET /courses/5a7db6c74d55bc51bdf39793
router.get('/courses/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Course.findById(req.params.id)
		.then(handle404)
		.then((course) => res.status(200).json({ course: course.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// // CREATE
// // POST /courses
router.post('/courses', requireToken, (req, res, next) => {
	req.body.course.owner = req.user.id
	Course.create(req.body.course)
		.then((course) => {
			res.status(201).json({ course: course.toObject() })
		})
		.catch(next)
})


router.patch('/courses/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.course.owner

	Course.findById(req.params.id)
		.then(handle404)
		.then((course) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, course)

			// pass the result of Mongoose's `.update` to the next `.then`
			return course.updateOne(req.body.course)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
router.delete('/courses/:id', requireToken, (req, res, next) => {
	Course.findById(req.params.id)
		.then(handle404)
		.then((course) => {
			requireOwnership(req, course)
			course.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
