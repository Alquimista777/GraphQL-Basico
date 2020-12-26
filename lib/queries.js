
'use stric'
const { ObjectID } = require('mongodb')
const connectDB = require('./db')

module.exports =  {
    getCourses: async () => {
        let con
        let courses = []
        try {
            db = await connectDB();
            courses = await db.collection('courses').find().toArray()
           console.log('courses', courses)
        } catch (error) {
           console.log(error)
        }
        return courses
    },
    getCourse: async (root, { id }) => {
       let course
       try {
           db = await connectDB();
           course = await db.collection('courses').findOne({ _id: ObjectID(id)})
          console.log('course', courss)
       } catch (error) {
          console.log(error)
       }
       return course
    }
   }