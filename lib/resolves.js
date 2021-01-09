'use stric'

const types = require('./types')
const mutations = require('./mutations')
const queries = require('./queries')


module.exports = {
    Query: queries,
    Mutation: mutations,
    // ...types
 }