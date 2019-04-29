const { Command } = require("vnft-commandhandler");

const colors = new Command();
colors.name = "colors";
colors.funct = colorsCommand;

const colours = new Command();
colours.name = "colours";
colours.funct = colorsCommand;

function colorsCommand(bot, message, args) {
  var response = `__ColorResolvable:__
    Hexadezimalausdrücke als Zahl oder Wort
    → (\`#123ABC\`, \`0x123ABC\`, \`123ABC\`, ...)

    eigentlich auch Ganzzahl selbst,.... eigentlich

    RGB-Liste also [R,G,B]
    → (\`[255,0,255]\`, \`[123, 234, 45]\`)

    Oder einer dieser Farben: *(in .color wird klein geschriebenes groß)*
    → \`DEFAULT\`, \`AQUA\`, \`GREEN\`, \`BLUE\`, \`PURPLE\`, \`LUMINOUS_VIVID_PINK\`, \`GOLD\`, \`ORANGE\`, \`RED\`, \`GREY\`, \`DARKER_GREY\`, \`NAVY\`, \`DARK_AQUA\`, \`DARK_GREEN\`, \`DARK_BLUE\`, \`DARK_PURPLE\`, \`DARK_VIVID_PINK\`, \`DARK_GOLD\`, \`DARK_ORANGE\`, \`DARK_RED\`, \`DARK_GREY\`, \`LIGHT_GREY\`, \`DARK_NAVY\`, \`RANDOM\``;
  message.channel.send(response.replace(/\n\t+/g, "\n"));

  message.channel.send("https://discord.js.org/#/docs/main/stable/typedef/ColorResolvable");
}

module.exports = [colors, colours];
