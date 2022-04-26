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
router.post('/comments/:courseId/:reviewId', (req, res, next) => {
    const comment = req.body.comment
    const courseId = req.params.courseId
    const reviewId = req.params.reviewId
    Course.findById(courseId)
        .then(handle404)
            .then((course) => {
                // console.log(course.reviews.id(reviewId).comments,'course reviews')
                reviews = course.reviews
                course.reviews.id(reviewId).comments.push(comment)
                return course.save()
            })
            .then(course => res.status(201).json({ course: course }))
            // catch errors and send to the handler
            .catch(next)
        })


router.delete('/comments/:courseId/:reviewId/:commentId', requireToken,(req, res, next) => {
    const courseId = req.params.courseId
    const commentId = req.params.commentId
    const reviewId = req.params.reviewId
    Course.findById(courseId)
        // if product not found throw 404
        .then(handle404)
        .then(course => {
            const theReview = course.reviews.id(reviewId)
            console.log(theReview)
            const theComment = theReview.comments.id(commentId)
            console.log(theComment,'here is theComment on line 42')
            // requireOwnership(req, review)
            theComment.remove()
            // return the saved product
            return course.save()
        })
        // send 204 no content
        .then(() => res.sendStatus(204))    
        .catch(next)
})


module.exports = router