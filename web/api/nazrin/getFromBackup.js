const nazrin = require('../../../nazrin')
const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/nazrin/backup/get/:serverid')

site.get = async (req, res) => {
  let emojisInBackup = await pg.any(`
      SELECT emojis2.hash, emojis2.name, emojis2.url FROM emoji_server_backup
      LEFT JOIN emojis2 ON emoji_server_backup.hash = emojis2.hash 
      where server_id = $(server_id)
    `, { server_id: req.params.serverid }
  )

  res.json(emojisInBackup)
}

module.exports = site
