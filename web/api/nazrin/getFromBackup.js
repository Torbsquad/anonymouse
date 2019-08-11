const nazrin = require('../../../nazrin')
const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/nazrin/backup/get/:serverid')

site.get = async (req, res) => {
  let emojisInBackup = await pg.any(
    `
    SELECT hash, name FROM emoji_server_backup
      where server_id = $(server_id)
    `,
    {
      server_id: req.params.serverid,
    },
  )

  res.json(emojisInBackup)
}

module.exports = site
