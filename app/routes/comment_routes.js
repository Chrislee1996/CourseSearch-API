// import our dependecies, middleware and models 
const express = require('express')
const passport = require('passport')
const Review = require('../models/review')
const Course = require('../models/course')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')
const router = express.Router()


/******************** ROUTES *******************/
// router.post('/comments/:reviewId', (req, res, next) => {
//     const comment = req.body.comment
//     const reviewId = req.params.reviewId
//     Review.findById(reviewId)
//         .then(handle404)
//             .then((review) => {
//                 review.comments.push(comment)
//                 return review.save()
//             })
//             .then(review => res.status(201).json({ review: review }))
//             // catch errors and send to the handler
//             .catch(next)
//         })

router.post('/comments/:courseId/:reviewId', (req, res, next) => {
    const review = req.body.review
    const comment = req.body.comment
    const courseId = req.params.courseId
    Course.findById(courseId)
        .then(handle404)
            .then((course) => {
                reviews = course.reviews
                console.log(reviews[0].comments,'here is our course reviews comments')
                reviews[0].comments.push(comment)
                return course.save()
            })
            .then(course => res.status(201).json({ course: course }))
            // catch errors and send to the handler
            .catch(next)
        })


router.delete('/comments/:reviewId/:commentId', requireToken,(req, res, next) => {
    const commentId = req.params.commentId
    const reviewId = req.params.reviewId
    // find the product in the db
    Review.findById(reviewId)

        // if product not found throw 404
        .then(handle404)
        .then(review => {
            const theComment = review.comments.id(commentId)
            // requireOwnership(req, review)
            // call remove on the review we got on the line above requireOwnership
            theComment.remove()
            // return the saved product
            return review.save()
        })
        // send 204 no content
        .then(() => res.sendStatus(204))
        .catch(next)
})


module.exports = router