const axios = require("axios")
const { Script } = require('vnftjs')

const ts = new Script()
ts.interval = 10*60*1000
ts.funct = bot => {
  axios.get("https://api.vnft.cc/torb/insertUsers")
}

module.exports = ts
