const FilterCommand = require('../../FilterCommand')
const command = new FilterCommand(filter)
command.name = 'cyan'

function filter(cxd) {
  let subPixelCount = Object.keys(cxd.data).length
  for (let i = 1; i < subPixelCount; i += 4) cxd.data[i] = 0
  return cxd
}

module.exports = command
