const { Client } = require('pg')
const connectionString = process.env.db
const client = new Client({
  connectionString,
})
client.connect()
module.exports = client
