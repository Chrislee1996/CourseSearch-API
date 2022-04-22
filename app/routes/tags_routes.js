// import our dependecies, middleware and models 
const express = require('express')
const passport = require('passport')
const Course = require('../models/course')
const Tag = require('../models/tags')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router()


/******************** ROUTES *******************/


router.post('/tag/:courseId', requireToken, removeBlanks, (req, res, next) => {
    const tag = req.body.tag
    const courseId = req.params.courseId

    Course.findById(courseId)
        .then(course => {
            Tag.create(tag)
                .then((tag) => {
                    course.tags.push(tag)
                    course.save()
                    res.status(201).json({ tag: tag.toObject() })
                })
        })
})

router.delete('/tag/:id', requireToken,(req, res, next) => {
    Tag.findById(req.params.id)
    .then(handle404)
    .then((tag) => {
      // throw an error if current user doesn't own `favorite`
      // requireOwnership(req, comment)
      // delete the example ONLY IF the above didn't throw
      tag.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
    // const tagId = req.params.tagId
    // const courseId = req.params.courseId

    // Course.updateOne({_id: courseId}, {$pull: {tags:tagId}},
    // function(err, course) {
    //     console.log('course:', course)
    // })
})


module.exports = router