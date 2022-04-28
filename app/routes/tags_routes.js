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

router.get('/tags', (req,res,next) => {
    Tag.find()
        .then((tags) => {
            return tags.map((tags)=> tags.toObject())
        })
        .then((tags) => res.status(200).json({ tags: tags }))
		// if an error occurs, pass it to the handler
		.catch(next)
})


router.get('/tags/:tagId', (req,res,next)=> {
    Course.find({tags: req.params.tagId})
        .populate('tags')
        .then(handle404)
        .then((courses)=> res.status(200).json({ courses: courses }))
        .catch(next)
})



router.post('/tags/:courseId', requireToken, removeBlanks, (req, res, next) => {
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


router.delete('/delete/:courseId/:tagId', requireToken, (req, res, next) => {
    const tagId = req.params.tagId
    const courseId = req.params.courseId
    // const tag = await Tag.findOne({tagId})
    // await tag.remove()
    // await Course.updateMany({'tagId': tag.courses}, {$pull: {tags:tag._id}})
    Course.updateOne({_id: courseId}, {$pull: {tags:tagId}})
    .then(() => res.sendStatus(204))
    .catch(next)
})


module.exports = router