const { Command } = require("vnftjs")

const status = new Command()
status.name = "setStatus"

const translation = {
    "red": "dnd",
    "green": "online",
    "yellow": "away"
}

status.funct = (bot, message, args) => {
    if( translation[args] ){
        args = translation[args]
    }
    bot.user.setStatus(args)
}

module.exports = status
