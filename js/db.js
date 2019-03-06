const pg_promise = require('pg-promise')()
module.exports = (bot) => {
  if(process.env["DATABASE_JSON"]){
    bot.db = pg_promise(JSON.parse(process.env.DATABASE_JSON));
  }
}
