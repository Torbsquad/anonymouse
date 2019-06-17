const pg = require("../../db");
let all = {};

all.name = "/emoji/all";
all.get = async (req, res) => {
  res.json(await pg.any("SELECT * FROM EMOJIS"));
};

module.exports = all;
