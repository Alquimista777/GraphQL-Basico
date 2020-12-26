'use stric'
const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const courses = [
    {
        _id: 'myId1',
        topic: 'mi topic',
        title: 'mi title',
        teacher: 'mi Profesor',
        desription: 'una description',
      },
      {
        _id: 'myId2',
        topic: 'mi topic',
        title: 'mi titulo2',
        teacher: 'mi Profesor',
        desription: 'una description',
      },
      {
        _id: 'myId3',
        topic: 'mi topic',
        title: 'mi titulo3',
        teacher: 'mi Profesor',
        desription: 'una description',
      }
]

module.exports = getCourses;

module.exports = {
   Query: {
    getCourses: () => courses,
    getCourse: (root, args) => {
        return courses.find(c => c._id === args.id)
    }
   },
}