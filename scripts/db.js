const { Script } = require("vnftjs");
const pg_promise = require("pg-promise")();

const db = new Script();
db.funct = bot => {
  if (process.env["DATABASE_JSON"]) {
    bot.db = pg_promise(JSON.parse(process.env.DATABASE_JSON));
  }
};

module.exports = db;
