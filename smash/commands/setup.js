const SmashScreen = require("../class/SmashScreen");
const Player = require("../class/Player");
const { Command } = require("vnftjs");
const stages = require("../stages");

const setup = new Command();
setup.name = "tsetup";
setup.funct = async (bot, message, args) => {
  let status = { status: "new" };
  if (args != "force") {
    try {
      status = JSON.parse(message.channel.topic);
    } catch (err) {
      status = { status: "new" };
    }
  }

  if (status.status != "new" && status.status != "ended") {
    message.reply("there is currently a tournament running `.tsetup force` to force renew");
  } else {
    status.status = "joinable";
    status.attendees = [];
    await message.channel.setTopic(JSON.stringify(status));
    message.reply("tournament is now joinable - `.join` to join");
  }
};

const join = new Command();
join.name = "join";
join.funct = async (bot, message, args) => {
  let status = {};
  try {
    status = JSON.parse(message.channel.topic);

    if (status.status != "joinable") {
      message.reply("tournament is currently not joinable - `.tsetup` to set up the tournament");
      return;
    }
    if (status.attendees.includes(message.author.id)) {
      message.reply("you are already an attendee");
      return;
    }
    status.attendees.push(message.author.id);
    message.reply("You are now an attendee");
    await message.channel.setTopic(JSON.stringify(status));
  } catch (err) {
    message.channel.send("no tournament set");
  }
};

const start = new Command();
start.name = "start";
start.funct = async (bot, message, args) => {
  let status = {};
  try {
    status = JSON.parse(message.channel.topic);

    if (status.status != "joinable") {
      message.reply("tournament is currently not joinable - `.tsetup` to set up the tournament");
      return;
    }
    if (status.attendees.length < 2) {
      message.reply("tournament requires at least 2 players");
      return;
    }
    status.status = "started";

    status.attendees = shuffleArray(status.attendees);
    status.matches = [];
    for (let i = 0; i < status.attendees.length; i += 2) {
      let p1 = status.attendees[i];
      if (i + 1 != status.attendees.length) {
        let p2 = status.attendees[i + 1];
        status.matches.push([p1, p2]);
      } else {
        status.matches.push(p1);
      }
    }

    await message.channel.setTopic(JSON.stringify(status));
    await message.reply("tournament started");

    nextMatch(bot, message.channel);
  } catch (err) {
    console.log(err);
    message.channel.send("no tournament set");
  }
};

const next = new Command();
next.name = "next";
next.funct = async (bot, message, args) => {
  nextMatch(bot, message.channel);
};

const strike = new Command();
strike.name = "strike";
strike.funct = async (bot, message, args) => {
  try {
    status = JSON.parse(message.channel.topic);
    let match = status.matches.find(m => [m[0], m[1]].includes(message.author.id));
    match[4] += args;
    await message.channel.setTopic(JSON.stringify(status));
  } catch (err) {
    console.log(err);
    return;
  }
  nextMatch(bot, message.channel);
};

const won = new Command();
won.name = "won";
won.funct = async (bot, message, args) => {
  try {
    status = JSON.parse(message.channel.topic);

    let match = status.matches.find(m => [m[0], m[1]].includes(message.author.id));
    if (match) {
      if (match[0] == message.author.id) {
        match[2]++;
      } else {
        match[3]++;
      }

      if (match[3] >= 2) {
        message.channel.send(`${bot.users.find(u => u.id == match[1])} has won`);
        match = match[1];
      }
      if (match[2] >= 2) {
        message.channel.send(`${bot.users.find(u => u.id == match[0])} has won`);
        match = match[0];
      }

      await message.channel.setTopic(JSON.stringify(status));
    }
  } catch (err) {
    return;
  }
  nextMatch(bot, message.channel);
};

const lost = new Command();
lost.name = "lost";
lost.funct = async (bot, message, args) => {
  try {
    status = JSON.parse(message.channel.topic);

    let match = status.matches.find(m => [m[0], m[1]].includes(message.author.id));
    if (match) {
      if (match[0] == message.author.id) {
        match[3]++;
      } else {
        match[2]++;
      }

      if (match[3] >= 2) {
        message.channel.send(`${bot.users.find(u => u.id == match[1])} has won`);
        match = match[1];
      }
      if (match[2] >= 2) {
        message.channel.send(`${bot.users.find(u => u.id == match[0])} has won`);
        match = match[0];
      }

      await message.channel.setTopic(JSON.stringify(status));
    }
  } catch (err) {
    return;
  }
  nextMatch(bot, message.channel);
};

module.exports = [setup, join, start, next, won, lost, strike];

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

async function nextMatch(bot, channel) {
  let status = {};
  try {
    status = JSON.parse(channel.topic);
  } catch (err) {
    return;
  }

  if (status.status != "started" || !status.matches) {
    return;
  }

  let match = status.matches.find(e => Array.isArray(e));

  console.log(match);
  if (!match) {
    status.attendees = status.matches;
    if (status.attendees.length > 1) {
      status.matches = [];
      for (let i = 0; i < status.attendees.length; i += 2) {
        let p1 = status.attendees[i];
        if (i + 1 != status.attendees.length) {
          let p2 = status.attendees[i + 1];
          status.matches.push([p1, p2, 0, 0]);
        } else {
          status.matches.push(p1);
        }
      }
    }
  }

  let screen = new SmashScreen();

  let player1 = new Player(bot.users.find(u => u.id == match[0]));
  let player2 = new Player(bot.users.find(u => u.id == match[1]));

  player1.score = match[2];
  player2.score = match[3];

  screen.addPlayer(player1);
  screen.addPlayer(player2);

  for (let strike of match[4].split("")) {
    screen.addStrike(strike);
  }

  screen.addStages(stages.starters);
  if (player1.score != 0 || player2.score != 0) {
    screen.addStages(stages.counterpicks);
  }

  channel.send("", await screen.draw());
}
