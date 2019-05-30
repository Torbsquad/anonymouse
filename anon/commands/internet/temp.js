const { Command } = require("vnftjs");

const got = require("got");
const temp = new Command();
temp.name = "temp";
temp.funct = async (bot, message, args) => {
  let city = args;
  let apiKey = process.env.open_weather_map_token;
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&units=metric&appid=${apiKey}`;

  try {
    wetter = JSON.parse((await got(apiUrl))).body;
    message.reply(`Es ist in ${city} ${wetter.main.temp}°C`);
  } catch (err) {
    message.reply(err.message);
  }
};

module.exports = temp;
