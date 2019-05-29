const { Command } = require("vnftjs");
const axios = require("axios");

const youtube = new Command();
youtube.name = "yt";
youtube.addAlias("youtube");

youtube.funct = async (bot, message, args) => {
  var search = args;
  var url = encodeURI(`https://www.youtube.com/results?search_query=${search}`);
  var youtube_video_id = /"\/watch\?v=(.*?)"/.exec((await axios.get(url)).data)[1];
  message.reply(`https://www.youtube.com/watch?v=${youtube_video_id}`);
};

module.exports = youtube;
