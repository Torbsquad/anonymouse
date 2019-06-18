const pg = require("../../db");

const { Site } = require("vnft-tools");
const site = new Site("/emoji/setup");

site.get = async (req, res) => {
  await pg.query(`
        DROP TABLE IF EXISTS EMOJIS;
        CREATE TABLE EMOJIS(
            HASH varchar(64) NOT NULL PRIMARY KEY,
            ANIMATED boolean,
            NAME varchar(64),
            ID varchar(32),
            DATATYPE varchar(3),
            URL varchar(64),
            POINTS integer DEFAULT 1
        )
    `);

  await pg.query(`
        INSERT INTO EMOJIS 
            (HASH, ANIMATED, NAME, ID, DATATYPE, URL)
            VALUES
            (
              'ff7fe00fc007c003c7c3c061cf81cfa1f9e1f1c1f0c1ec01e007e00fe00ff83f',
              false, 
              'numbernine',
              '256868979270877185',
              'png',
              'https://cdn.discordapp.com/emojis/256868979270877185.png'
            )
    `);

  const ergebnis = await pg.any(`
        SELECT * FROM EMOJIS
    `);

  res.json(ergebnis);
};

module.exports = site;
