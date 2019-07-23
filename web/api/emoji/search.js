const pg = require('../../../db')
const { Site } = require('vnft-tools')

const search = new Site('/emoji/search/:search/:page')
search.get = async (req, res) => {
  let query = `
    SELECT * FROM EMOJIS 
      WHERE EMOJIS.HASH IN 
        (
        SELECT EMOJIS.HASH FROM EMOJIS
          LEFT JOIN EMOJI_ALIAS ON EMOJIS.HASH = EMOJI_ALIAS.HASH
          WHERE LOWER(EMOJIS.NAME) like LOWER($(search))
            OR EMOJI_ALIAS.name like LOWER($(search))
        )
      ORDER BY points desc
      OFFSET $(offset) LIMIT $(limit)
    `

  let options = {
    offset: Number(req.params.page) * 100,
    limit: 100,
    search: `%${req.params.search}%`,
  }

  res.json(await pg.any(query, options))
}

module.exports = search
