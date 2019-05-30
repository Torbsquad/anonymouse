const { Command } = require("vnftjs");
const got = require("got");

const youtube = new Command();
youtube.name = "yt";
youtube.addAlias("youtube");

youtube.funct = async (bot, message, args) => {
  var search = args;
  var url = encodeURI(`https://www.youtube.com/results?search_query=${search}`);
  var youtube_video_id = /"\/watch\?v=(.*?)"/.exec(JSON.parse(await got(url)).body)[1];
  message.reply(`https://www.youtube.com/watch?v=${youtube_video_id}`);
};

module.exports = youtube;
