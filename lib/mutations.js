'use stric'
const { ObjectID } = require('mongodb')

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
    },

    deleteCourse: async (root, { id }) => {
        let con
        let db
        try {
            db = await connectDB()
            con = await db.collection('courses').deleteOne({_id: ObjectID(id) })
            
        } catch (error) {
            console.log(error)
            
        }
        return con.deletedCount   ? `El curso con id ${id} fue eliminado exitosamente.`
        : 'No existe el curso con el id indicado';
    }

}