'use stric'

const Conexion = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {

    /** -------------------------------------COURSES -------------------------------------*/
    createCourse: async (root, { course }) => {
       const { ops } =  await Conexion.db.collection('courses').insertOne(course)
       const [courseInserted] = ops;
        return courseInserted
    }, 

    putCourseById: async (root, { id, course }) => {
       const  { value }  = await Conexion.db.collection('courses')
        .findOneAndUpdate(
            { _id: ObjectID(id) }, 
            { $set: course },
        )
        return value;
    },

    deleteCourseById: async(root, { id }) => {
        const { deletedCount } = await Conexion.db.collection('courses').deleteOne({ _id: ObjectID(id) })
        return deletedCount ? 'Eliminado con exito' : 'Error';
    },

    deleteAllCourses: async () => {
        const deleteeee = await Conexion.db.collection('courses').deleteMany({})
        return deleteeee 
    },

    /** -------------------------------------STUDENTS------------------------------------- */
    createStudent: async (root, { student }) => {
        const { ops } =  await Conexion.db.collection('students').insertOne(student)
        const [courseInserted] = ops;
         return courseInserted
     }, 
 
     putStudentById: async (root, { id, student }) => {
        const  { value }  = await Conexion.db.collection('students')
         .findOneAndUpdate(
             { _id: ObjectID(id) }, 
             { $set: student },
         )
         return value;
     },
 
     deleteStudentById: async(root, { id }) => {
         const { deletedCount } = await Conexion.db.collection('students').deleteOne({ _id: ObjectID(id) })
         return deletedCount ? 'Eliminado con exito' : 'Error';
     },
 
     deleteAllStudents: async () => {
         const deleteeee = await Conexion.db.collection('students').deleteMany({})
         return deleteeee 
     },

     /** -------------------------------------BOTH EXTRAS -------------------------------------*/

     addPeopleToCourse: async (root, {courseID, studenID}) => {

        const course = await Conexion.db.collection('courses').findOne({ _id: ObjectID(courseID) })
        const student = await Conexion.db.collection('student').findOne({ _id: ObjectID(studenID) })

        if (!course || !student) { throw new Error('La persona o el estudiante no existe') }

        await Conexion.db.collection('courses').updateOne(
            { _id: ObjectID(courseID) },
            { $addToSet: { people: ObjectID(studenID) } }
        )
        return course
    },
} 