const { Script } = require('vnftjs')
const axios = require('axios')

const script = new Script()
script.interval = 60 * 60 * 1000
script.funct = bot => {
  axios.get('https://api.vnft.cc/twitter/fetch_followers')
}

module.exports = script
