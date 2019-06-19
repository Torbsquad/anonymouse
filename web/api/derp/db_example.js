const pg = require('../../db')

const { Site } = require('vnft-tools')
const db_example = new Site('/db_example')

db_example.get = async (req, res) => {
  await pg.query(`
        DROP TABLE IF EXISTS BEPIS;
        CREATE TABLE BEPIS(
            ID SERIAL NOT NULL PRIMARY KEY,
            NAME TEXT NOT NULL,
            NUMBER INT NOT NULL
        )
    `)

  await pg.query(`
        INSERT INTO BEPIS 
            (NAME, NUMBER)
            VALUES
            ('Jeff', 3)
    `)

  const ergebnis = await pg.any(`
        SELECT * FROM BEPIS
    `)

  res.json(ergebnis)
}

module.exports = db_example
