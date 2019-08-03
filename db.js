const postgres = require('pg-promise')()(process.env.db + '?ssl=true')
module.exports = postgres
