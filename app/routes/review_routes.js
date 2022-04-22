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
router.delete('/delete/:courseId/:reviewId', (req, res, next) => {
    // Review.findById(req.params.id)
    //   .then(handle404)
    //   .then((review) => {
    //     // throw an error if current user doesn't own `favorite`
    //     // requireOwnership(req, comment)
    //     // delete the example ONLY IF the above didn't throw
    //     review.deleteOne()
    //   })
    //   // send back 204 and no content if the deletion succeeded
    //   .then(() => res.sendStatus(204))
    //   // if an error occurs, pass it to the handler
    //   .catch(next)
	const reviewId = req.params.reviewId
    const courseId = req.params.courseId

    Course.updateOne({_id: courseId}, {$pull: {reviews:reviewId}},
    function(err, course) {
    console.log('review:', course)
	})
  })


module.exports = router