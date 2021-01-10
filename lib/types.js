'use stric'

const Conexion = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
    // Resolver tipos anidados
    // 1. Colocamos el nombre del tipo a resolver
    Course: {
        // Recibimos como parametro el argumento que tiene Courses. para este caso solo people
        people: async ({ people }) => {
            if (people) {
                ids = people.length > 0 ? people.map(id => ObjectID(id)) : []
            let peopleData = ids.length > 0 ? await Conexion.db.collection('students')
                .find({ _id: { $in: ids } })
                .toArray()
                : []
            return peopleData
            }
        }
    },
    Person: {
        __resolveType: (person, context, info) => person.phone ? 'Monitor' : 'Student'
    }
    // GlobalSearch : {
    //     __resolveType: (item, context, info) => {
    //         if(item.title) {
    //             return 'Course'
    //         }

    //         if (item.name) {
    //             return 'Student'
    //         }

    //     }
    // }
}