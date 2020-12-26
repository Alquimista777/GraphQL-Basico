'use stric'
const connectDB = require('./db')
const { ObjectID } = require('mongodb')
module.exports = {
    Query: {
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
    },
 }