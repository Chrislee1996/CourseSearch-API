// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

const Course = require('../models/course')
const Tag = require('../models/tags')
const AttendingCourse = require('../models/attendingCourse')
// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /courses
router.get('/courses', (req, res, next) => {
	Course.find()
	.populate('owner')
	.populate('tags')
		.then((courses) => {
			return courses.map((course) => course.toObject())
		})
		.then((courses) => res.status(200).json({ courses: courses }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// router.get('/courses/collegecourses', (req,res,next) => {
// 	Course.find({credits:true})
// 		.then((college)=> {
// 			return college.map((college) => college.toObject())
// 		})	
// 		.then((college) => res.status(200).json( {college: college}))
// 		.catch(next)
// })

// router.get('/courses/noncollegecourses', (req,res,next) => {
// 	Course.find({credits:false})
// 		.then((notcollege)=> {
// 			return notcollege.map((notcollege) => notcollege.toObject())
// 		})	
// 		.then((notcollege) => res.status(200).json( {notcollege: notcollege}))
// 		.catch(next)
// })

router.get('/courses/computerprogramming', (req,res,next) => {
	Course.find({courseSubject:'Programming'})
		.then((programming)=> {
			return programming.map((programming) => programming.toObject())
		})	
		.then((programming) => res.status(200).json( {programming: programming}))
		.catch(next)
})

router.get('/courses/art', (req,res,next) => {
	Course.find({courseSubject:'Art'})
		.then((art)=> {
			return art.map((art) => art.toObject())
		})	
		.then((art) => res.status(200).json( {art: art}))
		.catch(next)
})

router.get('/courses/business', (req,res,next) => {
	Course.find({courseSubject:'Business'})
		.then((business)=> {
			return business.map((business) => business.toObject())
		})	
		.then((business) => res.status(200).json( {business: business}))
		.catch(next)
})

router.get('/courses/dataanalysis', (req,res,next) => {
	Course.find({courseSubject:'Data Analysis'})
		.then((data)=> {
			return data.map((data) => data.toObject())
		})	
		.then((data) => res.status(200).json( {data: data}))
		.catch(next)
})

router.get('/courses/design', (req,res,next) => {
	Course.find({courseSubject:'Design'})
		.then((design)=> {
			return design.map((design) => design.toObject())
		})	
		.then((design) => res.status(200).json( {design: design}))
		.catch(next)
})

router.get('/courses/education', (req,res,next) => {
	Course.find({courseSubject:'Education'})
		.then((education)=> {
			return education.map((education) => education.toObject())
		})	
		.then((education) => res.status(200).json( {education: education}))
		.catch(next)
})

router.get('/courses/engineering', (req,res,next) => {
	Course.find({courseSubject:'Engineering'})
		.then((engineering)=> {
			return engineering.map((engineering) => engineering.toObject())
		})	
		.then((engineering) => res.status(200).json( {engineering: engineering}))
		.catch(next)
})

router.get('/courses/healthcare', (req,res,next) => {
	Course.find({courseSubject:'Healthcare'})
		.then((healthcare)=> {
			return healthcare.map((healthcare) => healthcare.toObject())
		})	
		.then((healthcare) => res.status(200).json( {healthcare: healthcare}))
		.catch(next)
})

router.get('/courses/history', (req,res,next) => {
	Course.find({courseSubject:'History'})
		.then((history)=> {
			return history.map((history) => history.toObject())
		})	
		.then((history) => res.status(200).json( {history: history}))
		.catch(next)
})

router.get('/courses/language', (req,res,next) => {
	Course.find({courseSubject:'Language'})
		.then((language)=> {
			return language.map((language) => language.toObject())
		})	
		.then((language) => res.status(200).json( {language: language}))
		.catch(next)
})

router.get('/courses/law', (req,res,next) => {
	Course.find({courseSubject:'Law'})
		.then((law)=> {
			return law.map((law) => law.toObject())
		})	
		.then((law) => res.status(200).json( {law: law}))
		.catch(next)
})

router.get('/courses/literature', (req,res,next) => {
	Course.find({courseSubject:'Literature'})
		.then((literature)=> {
			return literature.map((literature) => literature.toObject())
		})	
		.then((literature) => res.status(200).json( {literature: literature}))
		.catch(next)
})

router.get('/courses/math', (req,res,next) => {
	Course.find({courseSubject:'Math'})
		.then((math)=> {
			return math.map((math) => math.toObject())
		})	
		.then((math) => res.status(200).json( {math: math}))
		.catch(next)
})

router.get('/courses/science', (req,res,next) => {
	Course.find({courseSubject:'Science'})
		.then((science)=> {
			return science.map((science) => science.toObject())
		})	
		.then((science) => res.status(200).json( {science: science}))
		.catch(next)
})

router.get('/courses/socialscience', (req,res,next) => {
	Course.find({courseSubject:'Social Science'})
		.then((social)=> {
			return social.map((social) => social.toObject())
		})	
		.then((social) => res.status(200).json( {social: social}))
		.catch(next)
})

router.get('/courses/mine', requireToken, (req, res, next) => {
	Course.find({owner: req.user.id})
		.populate('owner')
		.then((courses) => {
			return courses.map((course) => course.toObject())
		})
		.then((courses) => res.status(200).json({ courses: courses }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// // SHOW
// // GET /courses/5a7db6c74d55bc51bdf39793
router.get('/courses/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Course.findById(req.params.id)
		.populate('owner')
		.populate('tags')
		.then(handle404)
		.then((course) => res.status(200).json({ course: course.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})



// // CREATE
// // POST /courses
router.post('/courses', requireToken,  (req, res, next) => {
	req.body.course.owner = req.user.id
	Course.create(req.body.course)
		.then((course) => {
			res.status(201).json({ course: course.toObject() })
		})
		.catch(next)
})


router.patch('/courses/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.course.owner

	Course.findById(req.params.id)
		.then(handle404)
		.then((course) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, course)

			// pass the result of Mongoose's `.update` to the next `.then`
			return course.updateOne(req.body.course)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})



// DESTROY
router.delete('/courses/:id', requireToken, (req, res, next) => {
	Course.findById(req.params.id)
		.then(handle404)
		.then((course) => {
			requireOwnership(req, course)
			course.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})


// User courses added to their profile
router.get('/attendingcourses', (req,res,next) => {
	AttendingCourse.find({})
	.populate('course')
	.populate('owner')
	.then((attendingcourses)=> {
		return attendingcourses.map((attendingcourse)=> attendingcourse.toObject())
	})
	.then((attendingcourses)=> res.status(200).json({attendingcourses:attendingcourses}))
	.catch(next)
})

router.post('/attendingcourses', requireToken, (req,res,next)=> {
	req.body.attendingcourse.owner = req.user.id
	AttendingCourse.create(req.body.attendingcourse)
	.then((attendingcourse)=> {
		res.status(201).json({attendingcourse:attendingcourse.toObject()})
	})
	.catch(next)
})

router.delete('/attendingcourses/:id', requireToken, (req,res,next)=> {
	AttendingCourse.findById(req.params.id)
		.then(handle404)
		.then((attendingcourse)=> {
			requireOwnership(req,attendingcourse)
			attendingcourse.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
