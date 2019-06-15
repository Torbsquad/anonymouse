const postgres = require("pg-promise")()(process.env.DATABASE_URL + "?ssl=true");

module.exports = postgres;
