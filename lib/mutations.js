'use stric'

const connectDB = require('./db')


module.exports = {
    createCourse: async (root, { input }) => {
        const defaults = {
            teacher: '',
            topic: ''
        }
        const newCourse = Object.assign(defaults, input)
        let course
        let con
        try {
            con = await connectDB()
            course = await con.collection('courses').insertOne(newCourse)
            console.log('course.insertedId._id', course.insertedId)
            newCourse._id = course.insertedId
        } catch (error) {
            console.log(error)
            
        }
        return newCourse
    }
}