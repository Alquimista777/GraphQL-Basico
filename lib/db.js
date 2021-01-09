'use stric'

const { MongoClient } = require('mongodb')
class Conexion {

    constructor() {
        this.mongoConnection()
    }
  
    mongoConnection() {
        MongoClient.connect( process.env.CONECTION_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(client => {
            this.db = client.db('code-rockDB')
            console.log('Connected to Database')
        }).catch(err => console.log('Error para conectar Database',err))

    }
}

module.exports = new Conexion()
