module.exports = async (bot, message, args) => {
  const axios = require("axios");

  var site = await axios.get(args);
  var sitecontent = site.data;
  JSON.stringify(sitecontent)
    .split(/(.{0,1000})/)
    .filter(e => e)
    .forEach(v => message.channel.send(`\`${v}\``));
};
