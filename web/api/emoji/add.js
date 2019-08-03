const pg = require('../../../db')
const analyse = require('../../../js/emojiAnalysis')

const { Site } = require('vnft-tools')
const add = new Site('/emoji/add/:emoji')

add.get = async (req, res) => {
  let emoji = await analyse(req.params.emoji)
  if (!emoji.hash) {
    res.send(`${req.params.emoji} is not valid`)
    return 0
  }

  await pg.query(
    `
    INSERT INTO EMOJIS2 
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
    DO UPDATE SET POINTS = EMOJIS2.POINTS + 1
    `,
    emoji,
  )

  res.json({done: true})
}

module.exports = add
