const nazrin = require('../../../nazrin')

const { Site } = require('vnft-tools')
const site = new Site('/emoji/add/:emoji')

site.get = async (req, res) => {
    console.log(nazrin)
    res.send(nazrin.user.avatarURL)
}

module.exports = site
