module.exports = async (bot, message, args) => {
  let response_text = `${message.author} warf eine Münze!`
  let response = await message.channel.send(response_text)
  await sleep(1)
  let coin = Math.round(Math.random()) ? "Kopf" : "Zahl"
  response_text += ` ${coin}!`
  response.edit(response_text)
}
