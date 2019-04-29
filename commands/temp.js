const axios = require("axios");

module.exports = async (bot, message, args) => {
  let city = args;
  let apiKey = process.env.open_weather_map_token;
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&units=metric&appid=${apiKey}`;

  try {
    wetter = await axios.get(apiUrl);
    message.reply(`Es ist in ${city} ${wetter.data.main.temp}°C`);
  } catch (err) {
    message.reply(err.message);
  }
};
