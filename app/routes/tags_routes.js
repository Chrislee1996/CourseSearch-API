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


router.post('/:courseId', requireToken, removeBlanks, (req, res, next) => {
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

router.delete('/delete/:courseId/:tagId', requireToken,(req, res, next) => {
    const tagId = req.params.tagId
    const courseId = req.params.courseId

    Course.updateOne({_id: courseId}, {$pull: {tags:tagId}},
    function(err, course) {
        console.log('course', course)
    })
})


module.exports = router