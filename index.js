'use stric'

require('dotenv').config()
const cors = require('cors')
const LOG = require('debug')('app')
const { join } = require('path');
const { readFileSync } = require('fs');
const { graphqlHTTP  } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./lib/resolves')

// App init
const app = require('express')();
const port = process.env.port || 3000;
// const isDev = process.env.NODE_ENV.trim() !== 'production'
const isDev = true

// Definiendo el schema
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

// Middlewares
app.use(cors())

// Routes
app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev
  }), (req, res) => {
    res.send('QUE ONDA MI PEZ')
  }
)

// Serve listend
app.listen(port, () => { console.log( `Server is run ${port}`) })