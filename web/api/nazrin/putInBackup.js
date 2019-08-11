const nazrin = require('../../../nazrin')
const pg = require('../../../db')
const analyse = require('../../../js/emojiAnalysis')

const { Site } = require('vnft-tools')
const add = new Site('/nazrin/backup/put/:id')

add.get = async (req, res) => {
  let emoji = nazrin.emojis.find(e => e.id == req.params.id)
  let emojiData = await analyse(emoji.toString())

  await pg.query(
    `
    INSERT INTO emoji_server_backup
      ("hash","name", "server_id")
    values
    (
      $(hash),
      $(name),
      $(server_id)
    )
    `,
    {
      hash: emojiData.hash,
      name: emojiData.name,
      server_id: emoji.guild.id,
    },
  )

  res.json({ done: true })
}

module.exports = add
