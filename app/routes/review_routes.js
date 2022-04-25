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

router.patch('/reviews/:courseId/:reviewId', requireToken, removeBlanks, (req, res, next) => {
    const reviewId = req.params.reviewId
    const courseId = req.params.courseId

    Course.findById(courseId)
        .then(handle404)
        .then(course => {
            const theReview = course.reviews.id(reviewId)
            // requireOwnership(req, course)
            theReview.set(req.body.review)

            return course.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)

})

// 	delete req.body.review.owner
// 	Review.findById(req.params.id)
// 		.then(handle404)
// 		.then((review) => {
// 			// pass the `req` object and the Mongoose record to `requireOwnership`
// 			// it will throw an error if the current user isn't the owner
// 			// requireOwnership(req, review)
// 			// pass the result of Mongoose's `.update` to the next `.then`
// 			return review.updateOne(req.body.review)
// 		})
// 		// if that succeeded, return 204 and no JSON
// 		.then(() => res.sendStatus(204))
// 		// if an error occurs, pass it to the handler
// 		.catch(next)
// })


// DESTROY
// DELETE /favorites/<id>
router.delete('/reviews/:courseId/:reviewId', requireToken, (req, res, next) => {
        // saving both ids to variables for easy ref later
        const reviewId = req.params.reviewId
        const courseId = req.params.courseId
        // find the product in the db
        Course.findById(courseId)
            // if product not found throw 404
            .then(handle404)
            .then(course => {
                // get the specific subdocument by its id
                const theReview = course.reviews.id(reviewId)
                // requireOwnership(req, course)
                // call remove on the review we got on the line above requireOwnership
                theReview.remove()
                // return the saved product
                return course.save()
            })
            // send 204 no content
            .then(() => res.sendStatus(204))
            .catch(next)

  })


module.exports = router

	// const reviewId = req.params.reviewId
    // const courseId = req.params.courseId
    // Course.updateOne({_id: courseId}, {$pull: {reviews:reviewId}})
	// .then(() => res.sendStatus(204))
    // .catch(next)