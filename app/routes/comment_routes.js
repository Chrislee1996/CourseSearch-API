// import our dependecies, middleware and models 
const express = require('express')
const passport = require('passport')
const Review = require('../models/review')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')
const review = require('../models/review')

const router = express.Router()


/******************** ROUTES *******************/


router.post('/comments/:reviewId', (req, res, next) => {
    // get our review from req.body
    const comment = req.body.comment
    // get our reviewId from req.params.id
    const reviewId = req.params.reviewId
    Review.findById(reviewId)
        // handle what happens if no review is found
        .then(handle404)
        .then(review => {
            review.comments.push(comment)
            return review.save()
        })
        .then(review => res.status(201).json({ review: review }))
        // catch errors and send to the handler
        .catch(next)
})


router.patch('/comments/:reviewId/:commentId', requireToken, removeBlanks, (req, res, next) => {
    const commentId = req.params.commentId
    const reviewId = req.params.reviewId

    Review.findById(reviewId)
        .then(handle404)
        .then(review => {
            const theComment = review.comments.id(commentId)
            // requireOwnership(req, review)
            theComment.set(req.body.comment)

            return review.save()
        })
        .then(() => res.sendStatus(204))
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