const nazrin = require('../../../nazrin')
console.log(nazrin)

const { Site } = require('vnft-tools')
const site = new Site('/reee')

site.get = async (req, res) => {
    res.send("Hello!")
    console.log(nazrin)
}

module.exports = site
