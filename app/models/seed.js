const mongoose= require('mongoose')
const Course = require('./course')

const db = require('../../config/db')
const Tag = require('./tags')


// const startCourses= [
//     // {courseName: "Chemistry 101", courseInstitute: "J. P. Wynne High School", image: "https://uconn-today-universityofconn.netdna-ssl.com/wp-content/uploads/2014/02/BreakingBadChemistry.jpg",  courseLink: "https://www.chemistryviews.org/details/ezine/5416791/The_Chemistry_of_Breaking_Bad.html", courseSubject: "Science", teacher: "Mr Walter White", location: "In Person", startDate: "05/30/2012", endDate:"06/30/2012", daysOfCourse: "Monday Tuesday Wednesday", startTime: "12:00 ", endTime: "14:00 ", credits:false, tags:[], owner:'6261c9a305b426af2b145b72'},
//     // {courseName: "CIS 111 Computer Science Programming and Concepts", courseInstitute: "Montgomery County Community College", image: "",  courseLink: "https://www.mc3.edu/courses/outline/CIS%20111.pdf", courseSubject: "Programming", teacher: "Rahmlow, P", location: "Remote", startDate: "06/06/2022", endDate:"08/18/2022", daysOfCourse: "Varies", startTime: "12:00 ", endTime: "00:00 ", credits:true, tags:[], owner:'6261c9a305b426af2b145b72' , recommended: 0},
//     // {courseName: "CIS/EDU 120 Teaching with Technology in Middle Years and Secondary Education", courseInstitute: "Montgomery County Community College", image: "",  courseLink: "https://www.mc3.edu/courses/outline/EDU%20120.pdf", courseSubject: "Education", teacher: "Sultanik, M", location: "Remote", startDate: "06/06/2022", endDate:"08/18/2022", daysOfCourse: "Monday Tuesday Wednesday Thursday Friday Saturday", startTime: "12:00 ", endTime: "00:00 ", credits:true, tags:[], owner:'6261c9a305b426af2b145b72' },
//     // {courseName: "MAT 100A Intermediate Algebra", courseInstitute: "Montgomery County Community College", image: "",  courseLink: "https://www.mc3.edu/courses/outline/MAT%20100A.pdf", courseSubject: "Math", teacher: "Gutshall, E", location: "Remote", startDate: "07/07/2022", endDate:"08/17/2022", daysOfCourse: "Monday Tuesday Wednesday Thursday", startTime: "8:00 ", endTime: "10:00 ", credits:true, tags:[], owner:'6261c9a305b426af2b145b72' },
//     // {courseName: "GER 101 Elementary German", courseInstitute: "Montgomery County Community College", image: "",  courseLink: "https://www.mc3.edu/courses/outline/GER%20101.pdf", courseSubject: "Language", teacher: "Marx-Abend, P", location: "Remote", startDate: "05/16/2022", endDate:"06/28/2022", daysOfCourse: "Varies", startTime: "08:30 ", endTime: "10:30 ", credits:true, tags:[], owner:'6261c9a305b426af2b145b72' },
//     // {courseName: "Data Structure and Algorithms", courseInstitute: "Udemy", image: "https://s.udemycdn.com/meta/default-meta-image-v2.png",  courseLink: "https://www.udemy.com/course/introduction-to-data-structures-algorithms-in-java/", courseSubject: "Programming", teacher: "Varies", location: "Remote", startTime: "12:00", endTime: "00:00", startDate: "", endDate:"", daysOfCourse: "Self-taught", timeOfCourse: "Self-taught", credits:false,  tags:[], owner:'6261c9a305b426af2b145b72'  },
//     // {courseName: "Statistics and Data Analysis", courseInstitute: "Udemy", image: "https://s.udemycdn.com/meta/default-meta-image-v2.png",  courseLink: "http://localhost:3000/courses/6266a94a241bfffcd79ad4eb", courseSubject: "Data Analysis", teacher: "Varies", location: "Remote", startTime: "12:00", endTime: "00:00", startDate: "", endDate:"", daysOfCourse: "Self-taught", timeOfCourse: "Self-taught", credits:false,  tags:[] , owner: '6261c9a305b426af2b145b72' },
//     // {courseName: "Introduction to Programming", courseInstitute: "Drexel University", image: "https://www.usnews.com/dims4/USNEWS/ec7c0f0/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2Fcd%2Ff35e75d608aaf118054bf4c91d82af%2Fcollege-photo_12760.jpg",  courseLink: "https://www.online.drexel.edu/legacycode/drexelv3/templates/detailview.aspx?crn=33598", courseSubject: "Programming", teacher: "John Zlotek", location: "In Person", startDate: "3/28/2022", endDate:"06/11/2022", daysOfCourse: "Monday Wednesday Friday", startTime: "15:00" ,endTime: "16:15", credits: true, tags:[], owner: '6261c9a305b426af2b145b72' },
//     // {courseName: "American Art", courseInstitute: "University of Pennsylvania ", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UPenn_shield_with_banner.svg/1200px-UPenn_shield_with_banner.svg.png",  courseLink: "https://summer.sas.upenn.edu/courses/american-art/2022b", courseSubject: "Art", teacher: "Carolyn Trench", location: "In Person", startDate: "6/30/2022", endDate: "8/5/2022", daysOfCourse: "Monday Wednesday Friday", startTime: "15:15" ,endTime: "17:45" ,credits: true, tags:[], owner: '6261c9a305b426af2b145b72'},
//     // {courseName: "Human Biology", courseInstitute: "Edx", image: "https://cdn.pixabay.com/photo/2018/07/15/10/44/dna-3539309__480.jpg",  courseLink: "https://www.edx.org/learn/human-biology", courseSubject: "Science", teacher: "Varies", location: "Remote",startTime: "12:00", endTime: "00:00", daysOfCourse: "Self-taught", timeOfCourse: "Self-taught" ,credits: false, tags:[], owner: '6261c9a305b426af2b145b72' },
//     // {courseName: "Accounting for Professionals", courseInstitute: "Drexel University", image: "https://www.usnews.com/dims4/USNEWS/ec7c0f0/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2Fcd%2Ff35e75d608aaf118054bf4c91d82af%2Fcollege-photo_12760.jpg",  courseLink: "https://www.online.drexel.edu/legacycode/drexelv3/templates/detailview.aspx?crn=40828", courseSubject: "Business", teacher: "Mary Howard", location: "In Person", startDate: "6/21/2022" ,endDate: "9/3/2022", daysOfCourse: "Monday Wednesday Friday", startTime: "8:00" ,endTime: "9:15" ,credits: true, tags:[], owner: '6261c9a305b426af2b145b72' , },
//     // {courseName: "Virtual Reality for Artists", courseInstitute: "University of Pennsylvania", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UPenn_shield_with_banner.svg/1200px-UPenn_shield_with_banner.svg.png",  courseLink: "https://summer.sas.upenn.edu/courses/virtual-reality-artists/2022b", courseSubject: "Design", teacher: "Gregory Vershbow", location: "Remote", startDate: "05/23/2022", endDate: "06/29/2022", daysOfCourse: "Monday Wednesday Friday", startTime: "17:00", endTime: "19:30" ,credits: true, tags:[], owner: '6261c9a305b426af2b145b72' , recommended: 0},
//     // {courseName: "Graduate School prep Course", courseInstitute: "Edx", image: "https://olc-wordpress-assets.s3.amazonaws.com/uploads/2018/07/IMPLEMENTING-OPEN-EDUCATIONAL-RESOURCES.jpg",  courseLink: "https://www.edx.org/learn/graduate-school-preparation", courseSubject: "Education", teacher: "Varies", location: "Remote", daysOfCourse: "Self-taught", timeOfCourse: "Self-taught" ,credits: false, startTime: "12:00", endTime: "00:00", tags:[], owner: '6261c9a305b426af2b145b72' },
//     // {courseName: "Intro to Renewable Energy", courseInstitute: "Drexel University", image: "https://www.animationcareerreview.com/files/images/articles/wric2x5gksto.jpg",  courseLink: "https://www.online.drexel.edu/legacycode/drexelv3/templates/detailview.aspx?crn=31421", courseSubject: "Engineering", teacher: "Kevin Scoles", location: "In Person", startDate: "3/28/2022", endDate: "6/11/2022", daysOfCourse: "Tuesdays Thursdays", startTime: "12:15" ,endTime: "14:30" ,credits: true, tags:[], owner: '6261c9a305b426af2b145b72'},
//     // {courseName: "Health and Wellness", courseInstitute: "Udemy", image: "https://cdn.medifind.com/wp/2020/08/31184653/00_3_8-Major-Problems-with-the-US-Healthcare-System-Today_hero.png",  courseLink: "https://www.udemy.com/course/health-and-wellness-coaching-certification-cpd-accredited/", courseSubject: "Healthcare", teacher: "Varies", location: "Remote", daysOfCourse: "Self-taught", timeOfCourse: "Self-taught" ,credits: false, startTime: "12:00", endTime: "00:00", tags:[], owner: '6261c9a305b426af2b145b72' },
//     // {courseName: "World Film history", courseInstitute: "University of Pennsylvania", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UPenn_shield_with_banner.svg/1200px-UPenn_shield_with_banner.svg.png",  courseLink: "https://summer.sas.upenn.edu/courses/world-film-history-1945/2022b", courseSubject: "History", teacher: "Joseph Coppola", location: "In Person", startDate: "5/23/2022", endDate: "6/29/2022", daysOfCourse: "Monday Wednesday", startTime: "12:00" ,endTime: "15:50" ,credits: true, tags:[], owner: '6261c9a305b426af2b145b72'},
//     // {courseName: "Basic Spanish", courseInstitute: "Edx", image: "https://dp4g669tqdae4.cloudfront.net/content/uploads/2019/09/12161658/Espanol.-Translation-Spanish.-Language-hand-drawn-doodles-and-lettering.-1087621188_7013x4954.jpg",  courseLink: "https://www.edx.org/professional-certificate/upvalenciax-basic-spanish", courseSubject: "Language", teacher: "Varies", location: "Remote", daysOfCourse: "Self-taught", timeOfCourse: "Self-taught" ,credits: false, startTime: "12:00", endTime: "00:00", tags:[], owner: '6261c9a305b426af2b145b72' },
//     // {courseName: "Law and Society", courseInstitute: "University of Pennsylvania", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UPenn_shield_with_banner.svg/1200px-UPenn_shield_with_banner.svg.png",  courseLink:  "https://summer.sas.upenn.edu/courses/law-and-society/2022b-0", courseSubject: "Law", teacher: "Hocine Fetni", location: "In Person", startDate: "6/30/2022" ,endDate: "8/5/22", daysOfCourse: "Monday Wednesday", startTime: "17:15", endTime: "21:05" ,credits: true, tags:[], owner: '6261c9a305b426af2b145b72' },
//     // {courseName: "Ancient Masterpieces of World Literature", courseInstitute: "Edx", image: "https://images.immediate.co.uk/production/volatile/sites/7/2018/01/GettyImages-142083925-2-894e5fc.jpg?quality=90&resize=620%2C413",  courseLink: "https://www.edx.org/course/ancient-masterpieces-of-world-literature", courseSubject: "Literature", teacher: "Varies", location: "Remote", daysOfCourse: "Self-taught", timeOfCourse: "Self-taught" ,credits: false, startTime: "12:00", endTime: "00:00", tags:[], owner: '6261c9a305b426af2b145b72' },
//     // {courseName: "Intro to Linear Algebra", courseInstitute: "Edx", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Linear_subspaces_with_shading.svg/1200px-Linear_subspaces_with_shading.svg.png",  courseLink: "https://www.edx.org/professional-certificate/gtx-introductory-linear-algebra", courseSubject: "Math", teacher: "Varies", location: "Remote", daysOfCourse: "Self-taught", timeOfCourse: "Self-taught" ,credits: false, startTime: "00:00", endTime: "00:00", tags:[], owner: '6261c9a305b426af2b145b72' },
//     // {courseName: "Human Anatomy: Musculoskeletal System", courseInstitute: "University of Pennsylvania", image: "https://cdn.britannica.com/68/140268-050-35135B56/view-human-muscular-system.jpg?w=400&h=300&c=crop",  courseLink: "https://summer.sas.upenn.edu/courses/human-anatomy-musculoskeletal-system/2022b", courseSubject: "Science", teacher: "James Spencer White", location: "Remote", startDate: "5/23/2022", eneDate: "8/5/2022", daysOfCourse: "Varues", timeOfCourse: "Varies" ,credits: true, startTime: "12:00" ,endTime: "15:50" ,tags:[], owner: '6261c9a305b426af2b145b72'},
//     // {courseName: "Introductory Mechanics", courseInstitute: "Edx", image: "https://cdn1.byjus.com/wp-content/uploads/2018/11/physics/wp-content/uploads/2016/08/3.png",  courseLink: "https://www.edx.org/xseries/mitx-introductory-mechanics", courseSubject: "Science", teacher: "Varies", location: "Remote", datesOffered: "Self-Taught", timeOfCourse: "Self-taught" ,credits: false, startTime: "12:00" ,endTime: "15:50", daysOfCourse: "Self-taught", tags:[], owner: '6261c9a305b426af2b145b72'},
//     // {courseName: "Child Psychology", courseInstitute: "Udemy", image: "https://149752912.v2.pressablecdn.com/wp-content/uploads/2016/06/career-in-child-psychology.jpg",  courseLink: "https://www.udemy.com/course/child-psychology/", courseSubject: "Social Science", teacher: "Varies", location: "Remote", datesOffered: "Self-Taught", timeOfCourse: "Self-taught" ,credits: false, startTime: "12:00" ,endTime: "15:50", daysOfCourse: "Self-taught", tags:[], owner: '6261c9a305b426af2b145b72'},
// ]

const startTags = [
    {
        _id:"626dfee47dc35753c08973fc",
        details: "Mandatory Attendence"
    },
    {
        _id:"626dfee47dc35753c08973fd",
        details: "Lots of homework"
    },
    {
        _id:"626dfee47dc35753c08973fe",
        details: "Test Heavy"
    },
    {
        _id:"626dfee47dc35753c08973ff",
        details: "Group Projects"
    },
    {
        _id:"626dfee47dc35753c0897400",
        details: "Good Feedback"
    },
    {
        _id:"626dfee47dc35753c0897401",
        details: "Cares About the Material"
    },
    {
        _id:"626dfee47dc35753c0897402",
        details: "Caring"
    },
    {
        _id:"626dfee47dc35753c0897403",
        details: "Text-book Mandatory"
    },
    {
        _id:"626dfee47dc35753c0897404",
        details: "Tough Grader"
    },
    {
        _id:"626dfee47dc35753c0897405",
        details: "Offers Extra Credit"
    },
    {
        id:"626dfee47dc35753c0897406",
        details: "Lots of Reading"
    },
    {
        _id:"626dfee47dc35753c0897407",
        details: "Lecture Heavy"
    }
]

// mongoose.connect(db, {
// 	useNewUrlParser: true,
// })
//     .then(() => {
//         Course.remove()
//             .then(deletedCourse => {
//                 console.log('deleted tags', deletedCourse)
//                 // we'll use console logs to check if it's working or if there are errors
//                 Course.create(startCourses)
//                     .then(newCourse => {
//                         mongoose.connection.close()
//                     })
//                     .catch(err => {
//                         console.log(err)
//                         mongoose.connection.close()
//                     })
//             })
//             .catch(error => {
//                 console.log(error)
//                 mongoose.connection.close()
//             })
//     })
//     // then at the end, we close our connection to the db
//     .catch(error => {
//         console.log(error)
//         mongoose.connection.close()
//     })


// Seed for tags

    mongoose.connect(db, {
        useNewUrlParser: true,
    })
        .then(() => {
            Tag.deleteMany({owner:null})
                .then(deletedTag => {
                    // we'll use console logs to check if it's working or if there are errors
                    Tag.create(startTags)
                        .then(newTag => {
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