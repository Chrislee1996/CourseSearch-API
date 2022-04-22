const mongoose= require('mongoose')
const Course = require('./course')

const db = require('../../config/db')


const startCourses= [
    {courseName: "Chemistry 101", courseInstitute: "J. P. Wynne High School", image: "https://uconn-today-universityofconn.netdna-ssl.com/wp-content/uploads/2014/02/BreakingBadChemistry.jpg",  courseLink: "https://www.chemistryviews.org/details/ezine/5416791/The_Chemistry_of_Breaking_Bad.html", courseSubject: "Chemistry", teacher: "Mr Walter White", location: "inPerson", datesOffered: "05/30/2012", daysOfCourse: "Monday Tuesday Wednesday", timeOfCourse: "12:00 PM - 2:00 PM"},
    {courseName: "Data Structure and Algorithms", courseInstitute: "Udemy", image: "https://s.udemycdn.com/meta/default-meta-image-v2.png",  courseLink: "https://www.udemy.com/course/introduction-to-data-structures-algorithms-in-java/", courseSubject: "Comp Sci", teacher: "Varies", location: "remote", datesOffered: "05/30/2012", daysOfCourse: "Self-taught", timeOfCourse: "Self-taught"},
    {courseName: "Introduction to Programming", courseInstitute: "Drexel University", image: "https://www.usnews.com/dims4/USNEWS/ec7c0f0/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2Fcd%2Ff35e75d608aaf118054bf4c91d82af%2Fcollege-photo_12760.jpg",  courseLink: "https://www.online.drexel.edu/legacycode/drexelv3/templates/detailview.aspx?crn=33598", courseSubject: "Computing and informatics", teacher: "John Zlotek", location: "inPerson", datesOffered: "3/28/2022-6/11/22", daysOfCourse: "Monday Wednesday Friday", timeOfCourse: "3:00 PM - 4:00 PM",credits: 3},
]

mongoose.connect(db, {
	useNewUrlParser: true,
})
    .then(() => {
        Course.remove({})
            .then(deletedCourse => {
                console.log('deleted courses', deletedCourse)
                // we'll use console logs to check if it's working or if there are errors
                Course.create(startCourses)
                    .then(newCourse => {
                        mongoose.connection.close()
                    })
                    .catch(err => {
                        console.log(err)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    // then at the end, we close our connection to the db
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })