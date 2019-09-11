const { Script } = require('vnftjs')

const script = new Script()

script.funct = client => {
  client.user.setStatus('idle')
}

module.exports = script
