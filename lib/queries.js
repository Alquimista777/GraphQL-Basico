const Conexion = require('./db')
const { ObjectID, ObjectId } = require('mongodb')
// const  errorHandler = require('./errorHandler')

module.exports = {
    // Courses
    getAllCourses: async () => await Conexion.db.collection('courses').find().toArray(),
    getCourseById: async (id) => await Conexion.db.collection('courses').findOne({ _id: ObjectID(id) }),
    
    // Students
    getPeople: async () => await Conexion.db.collection('students').find().toArray(),
    getStudentById: async (id) => await Conexion.db.collection('students').findOne({ _id: ObjectID(id) }),

    // Search
    searchItems: async (root, { keyword }) => {
        const course = await Conexion.db.collection('courses')
        .find({ $text: { $search: keyword } })
        .toArray()

        const people = await Conexion.db.collection('students')
        .find({ $text: { $search: keyword } })
        .toArray()
        console.log('KEYWORD', course, people);

        return [...course, ...people] 
    }

}