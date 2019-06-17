const analyse = require("../../../js/emojiAnalysis");
const pg = require("../../db");

let reee = {};

reee.name = "/emoji/add/:emoji";

reee.get = async (req, res) => {
  let emoji = await analyse(req.params.emoji);
  if(!emoji.hash){
    res.send(`${req.params.emoji} is not valid`);
    return 0;
  }
  
  await pg.query(`
    INSERT INTO EMOJIS 
      (HASH, ANIMATED, NAME, ID, DATATYPE, URL)
      VALUES
      (
        $(hash),
        $(animated), 
        $(name),
        $(id),
        $(datatype),
        $(url)
      )
  `,emoji);

  const ergebnis = await pg.any(`
    SELECT * FROM EMOJIS
  `);

  res.json(ergebnis);
};

module.exports = reee;
