const { Command } = require('vnftjs')
const { sleep } = require('vnft-tools')

const command = new Command()
command.name = 'coinflip'
command.funct = async (bot, message, args) => {
  let flipText = `${message.author} warf eine Münze!`
  let response = await message.channel.send(flipText)
  await sleep(1)
  let coin = Math.round(Math.random()) ? 'Kopf' : 'Zahl'
  flipText += ` ${coin}!`
  response.edit(flipText)
}

module.exports = command
