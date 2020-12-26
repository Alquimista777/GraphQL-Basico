'use stric'

require('dotenv').config()
const { join } = require('path')
const express = require('express')
const { readFileSync } = require('fs')
const { makeExecutableSchema } = require('graphql-tools')
const { graphqlHTTP } = require('express-graphql')
const resolvers = require('./lib/resolves');

const app = express()
const port = process.env.port || 3000

// Definiendo el schema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
  )
const schema = makeExecutableSchema({ typeDefs, resolvers })
  

// // Ejecutar
// graphql(schema, '{ hello, saludo }', resolves).then(console.log)

app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
})
)

app.listen(port, () => { console.log(`Server is run ${port}`) })
