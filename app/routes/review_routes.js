// import our dependecies, middleware and models 
const express = require('express')
const passport = require('passport')
const Course = require('../models/course')
const Review = require('../models/review')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router()


/******************** ROUTES *******************/

router.get('/reviews', (req, res, next) => {
	Review.find()
		.then((reviews) => {
			return reviews.map((review) => review.toObject())
		})
		.then((reviews) => res.status(200).json({ reviews: reviews }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

router.get('/reviews/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Review.findById(req.params.id)
        .populate('owner')
		.then(handle404)
		.then((review) => res.status(200).json({ review: review.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})


router.post('/:courseId', requireToken, removeBlanks, (req, res, next) => {
    const review = req.body.review
    const courseId = req.params.courseId
    Course.findById(courseId)
        .then(course => {
            Review.create(review)
                .then((review) => {
                    course.reviews.push(review)
                    course.save()
                    res.status(201).json({ review: review.toObject() })
                })
        })
})

router.patch('/reviews/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.review.owner
	Review.findById(req.params.id)
		.then(handle404)
		.then((review) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			// requireOwnership(req, review)
			// pass the result of Mongoose's `.update` to the next `.then`
			return review.updateOne(req.body.review)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})


// DESTROY
// DELETE /favorites/<id>
router.delete('/reviews/:id', (req, res, next) => {
    Review.findById(req.params.id)
      .then(handle404)
      .then((review) => {
        // throw an error if current user doesn't own `favorite`
        // requireOwnership(req, comment)
        // delete the example ONLY IF the above didn't throw
        review.deleteOne()
      })
      // send back 204 and no content if the deletion succeeded
      .then(() => res.sendStatus(204))
      // if an error occurs, pass it to the handler
      .catch(next)
  })


module.exports = router