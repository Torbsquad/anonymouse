const axios = require("axios")

module.exports = (bot, message, args) => {
		var meow = await axios.get("http://aws.random.cat/meow")
		message.reply(meow.data.file)
}
