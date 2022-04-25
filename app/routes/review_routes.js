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



router.post('/reviews/:courseId', (req, res, next) => {
    const review = req.body.review
    const courseId = req.params.courseId
    Course.findById(courseId)
        .then(handle404)
            .then((course) => {
                course.reviews.push(review)
                return course.save()
            })
            .then(course => res.status(201).json({ course: course }))
            // catch errors and send to the handler
            .catch(next)
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
router.delete('/delete/review/:courseId/:reviewId', requireToken, (req, res, next) => {
	const reviewId = req.params.reviewId
    const courseId = req.params.courseId
    Course.updateOne({_id: courseId}, {$pull: {reviews:reviewId}})
	.then(() => res.sendStatus(204))
    .catch(next)
  })


module.exports = router


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