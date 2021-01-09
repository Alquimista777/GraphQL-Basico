'use stric'

require('dotenv').config()
const LOG = require('debug')('app')
const { join } = require('path');
const { readFileSync } = require('fs');
const { graphqlHTTP  } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./lib/resolves')

// App init
const app = require('express')();
const port = process.env.port || 3000;

// Definiendo el schema
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

// Routes
app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  }), (req, res) => {
    LOG('API')
  }
)

// Serve listend
app.listen(port, () => { console.log( `Server is run ${port}`) })