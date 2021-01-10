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
    createPerson: async (root, { input }) => {
        const { ops } =  await Conexion.db.collection('students').insertOne(input)
        const [courseInserted] = ops;
         return courseInserted
     }, 
 
     putPersonById: async (root, { id, input }) => {
        const  { value }  = await Conexion.db.collection('students')
         .findOneAndUpdate(
             { _id: ObjectID(id) }, 
             { $set: input },
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

     addPeopleToCourse: async (root, {courseID, personID}) => {
        const course = await Conexion.db.collection('courses').findOne({ _id: ObjectID(courseID) })
        const student = await Conexion.db.collection('students').findOne({ _id: ObjectID(personID) })

        if (!course || !student) { throw new Error('La persona o el estudiante no existe') }
        await Conexion.db.collection('courses').updateOne(
            { _id: ObjectID(courseID) },
            { $addToSet: { people: ObjectID(personID) } }
        )
        return course
    },
} 