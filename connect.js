const { Pool } = require('pg')
const pool = new Pool({
    user: process.env.anonpguser,
    host: process.env.anonpghost,
    database: process.env.anonpgdatabase,
    password: process.env.anonpgpassword,
    port: process.env.anonpgport,
    ssl: { rejectUnauthorized: false }
})

module.exports = pool
