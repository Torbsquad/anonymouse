const pg = require('../../../db')

const { Command } = require('vnftjs')

const dbeval = new Command()
dbeval.name = "db"
dbeval.addUserWhitelist(u => u.id == "397063436049186818")

dbeval.funct = async (bot, message, args) => {
    let ergebnis = await pg.any(args)
    ergebnis = JSON.stringify(ergebnis,null,2)
    message.channel.send("```"+ergebnis+"```")
}

module.exports = dbeval
