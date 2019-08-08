const nazrin = require('../../../nazrin')

const { Site } = require('vnft-tools')
const site = new Site('/nazrin/serverEmojis/:id')
const emojiproperties = ["animated", "id", "name", "url"]

site.get = async (req, res) => {
    try{
        let server = nazrin.guilds.find(g=>g.id==req.params.id)
        let emojis = server.emojis.map(e=>emojiproperties.map(p=>e[p]))
        res.json(emojis)
    }
    catch(err){
        res.json(err)
    }
}

module.exports = site
