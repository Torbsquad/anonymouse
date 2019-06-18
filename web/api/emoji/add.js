const pg = require("../../db");
const analyse = require("../../../js/emojiAnalysis");

const { Site } = require("vnft-tools");
const add = new Site("/emoji/add/:emoji");

add.get = async (req, res) => {
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
    ON CONFLICT (HASH)
    DO UPDATE SET POINTS = EMOJIS.POINTS + 1
  `,emoji);

  const ergebnis = await pg.any(`
    SELECT * FROM EMOJIS
  `);

  res.json(ergebnis);
};

module.exports = add;
