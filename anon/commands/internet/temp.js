const { Command } = require('vnftjs')

const { get } = require('axios')
const command = new Command()
command.name = 'temp'
command.funct = async (bot, message, args) => {
  let city = args
  let apiKey = process.env.open_weather_map_token
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&units=metric&appid=${apiKey}`

  try {
    const wetterSite = await get(apiUrl)
    wetter = wetterSite.data
    message.reply(`Es ist in ${city} ${wetter.main.temp}°C`)
  } catch (err) {
    message.reply(err.message)
  }
}

module.exports = command
