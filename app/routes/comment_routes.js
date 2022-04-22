// import our dependecies, middleware and models 
const express = require('express')
const passport = require('passport')
const Review = require('../models/review')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router()


/******************** ROUTES *******************/


router.post('/comments/:courseId', (req, res, next) => {
    // get our review from req.body
    const comment = req.body.comment
    // get our reviewId from req.params.id
    const courseId = req.params.courseId
    Course.findById(courseId)
        // handle what happens if no review is found
        .then(handle404)
        .then(course => {
            course.comments.push(comment)
            return course.save()
        })
        .then(course => res.status(201).json({ course: course }))
        // catch errors and send to the handler
        .catch(next)
})


router.patch('/comments/:courseId/:commentId', requireToken, removeBlanks, (req, res, next) => {
    const commentId = req.params.commentId
    const courseId = req.params.courseId

    Course.findById(courseId)
        .then(handle404)
        .then(course => {
            const theComment = course.comments.id(commentId)
            console.log('this is the original comment', theComment)
            requireOwnership(req, course)
            theComment.set(req.body.comment)

            return course.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)

})

router.delete('/comments/:courseId/:commentId', requireToken,(req, res, next) => {
    const commentId = req.params.commentId
    const courseId = req.params.courseId
    // find the product in the db
    Course.findById(courseId)

        // if product not found throw 404
        .then(handle404)
        .then(course => {
            const theComment = course.comments.id(commentId)
            requireOwnership(req, course)
            // call remove on the review we got on the line above requireOwnership
            theComment.remove()
            // return the saved product
            return course.save()
        })
        // send 204 no content
        .then(() => res.sendStatus(204))
        .catch(next)
})


module.exports = router