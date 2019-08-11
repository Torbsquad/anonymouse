const pg = require('../../../db')
const analyse = require('../../../js/emojiAnalysis')

const { Site } = require('vnft-tools')
const add = new Site('/nazrin/backup/:hash/:name/:serverid')

add.get = async (req, res) => {
  await pg.query(
    `
    INSERT INTO emoji_server_backup
        ("hash", "name", "server_id")
    values
        (
         $(hash),
         $(name),
         $(server_id)
        )
    `,
    {
      hash: req.params.hash,
      name: req.params.name,
      server_id: req.params.serverid,
    },
  )

  res.json({ done: true })
}

module.exports = add
