'use stric'

const { MongoClient, Db } = require('mongodb')
const {
    DB_USER,
    DB_PASSWD,
    DB_HOST,
    DB_NAME
} = process.env

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}`
let connection

async function connectDB () {
    if (connection) return connection

    let client
    try {
        client = await MongoClient.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        connection = client.db(DB_NAME)
        console.error ('Db is run =====>')

    }
    catch(error) {
        console.error ('Db failed  =====> ',mongoUrl,  error)
        procces.exit(1)
    }

    return connection
}

module.exports = connectDB
