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


// router.get('/tags/:id', (req,res,next) => {
// 	Tag.findById(req.params.id)
// 		.then(handle404)
// 		.then((tag) => res.status(200).json({ tag: tag.toObject() }))
// 		// if an error occurs, pass it to the handler
// 		.catch(next)
// })

router.get('/tags/onlinecourses',async (req,res,next) =>{
    const tag = await Tag.find({details:'Online Courses'}).populate('course')
    console.log(tag[0], 'here is our course')
    res.status(200).json({course:tag[0].details})

})

router.get('/tags/collegecourses',async (req,res,next) =>{
    const tag = await Tag.find({details:'College Courses'}).populate('course')
    console.log(tag[0], 'here is our course')
    res.status(200).json({course:tag[0]})

})

router.get('/tags/noncollegecourses',async (req,res,next) =>{
    const tag = await Tag.find({details:'Non-College Courses'}).populate('course')
    console.log(tag[0], 'here is our course')
    res.status(200).json({course:tag[0]})

})

router.get('/tags/inpersoncourses',async (req,res,next) =>{
    const tag = await Tag.find({details:'In person Courses'}).populate('course')
    console.log(tag[0], 'here is our course')
    res.status(200).json({course:tag[0]})

})

router.get('/tags/mandatoryattendence',async (req,res,next) =>{
    const tag = await Tag.find({details:'Mandatory Attendence'}).populate('course')
    console.log(tag[0], 'here is our course')
    res.status(200).json({course:tag[0]})

})

router.get('/tags/homework',async (req,res,next) =>{
    const tag = await Tag.find({details:'Lots of homework'}).populate('course')
    console.log(tag[0], 'here is our course')
    res.status(200).json({course:tag[0]})

})

router.get('/tags/testheavy',async (req,res,next) =>{
    const tag = await Tag.find({details:'Test Heavy'}).populate('course')
    console.log(tag[0], 'here is our course')
    res.status(200).json({course:tag[0]})

})


router.get('/tags/groupprojects',async (req,res,next) =>{
    const tag = await Tag.find({details:'Group Projects'}).populate('course')
    console.log(tag[0], 'here is our course')
    res.status(200).json({course:tag[0]})

})

router.get('/tags/feedback',async (req,res,next) =>{
    const tag = await Tag.find({details:'Good Feedback'}).populate('course')
    console.log(tag[0], 'here is our course')
    res.status(200).json({course:tag[0]})

})

router.get('/tags/material',async (req,res,next) =>{
    const tag = await Tag.find({details:'Cares About the Material'}).populate('course')
    console.log(tag[0], 'here is our course')
    res.status(200).json({course:tag[0]})

})

router.get('/tags/caring',async (req,res,next) =>{
    const tag = await Tag.find({details:'Caring'}).populate('course')
    console.log(tag[0], 'here is our course')
    res.status(200).json({course:tag[0]})

})

router.get('/tags/textbook',async (req,res,next) =>{
    const tag = await Tag.find({details:'Text-book Mandatory'}).populate('course')
    console.log(tag[0], 'here is our course')
    res.status(200).json({course:tag[0]})

})

router.get('/tags/toughgrader',async (req,res,next) =>{
    const tag = await Tag.find({details:'Tough Grader'}).populate('course')
    console.log(tag[0], 'here is our course')
    res.status(200).json({course:tag[0]})

})

router.get('/tags/lectureheavy',async (req,res,next) =>{
    const tag = await Tag.find({details:'Lecture Heavy'}).populate('course')
    console.log(tag[0], 'here is our course')
    res.status(200).json({course:tag[0]})

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