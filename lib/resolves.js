'use stric'

const types = require('./types')
const mutations = require('./mutations')
const queries = require('./queries')


module.exports = {
    Query: queries,
    Mutation: mutations,
    ...types
 }

 /** CONSULTAS */
 /** DIRECTIVAS  */

//  query getPeopleData($opcion: Boolean!, $avatar: Boolean!){
//     getPeople {
//       _id
//       name
//       ... on Monitor@include(if: $opcion) {
//        phone
//       }
//       ... on Student @skip(if: $avatar) {
//            avatar
//       }
//     }
//   }
