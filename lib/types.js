'use stric'

const Conexion = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
    Course: {
        people: async ({ people }) => {
            ids = people ? people.map(id => ObjectID(id)).length > 0 : []
            let peopleData = ids.length ? await Conexion.db.collection('student')
                .find({ _id: { $in: ids } })
                .toArray()
                : []
            return peopleData
        }
    },
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