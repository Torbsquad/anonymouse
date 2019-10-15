const FilterCommand = require('../FilterCommand')
const command = new FilterCommand(filter)
command.name = 'saturate'

function filter(cxd) {
  let subPixelCount = Object.keys(cxd.data).length
  for (let i = 0; i < subPixelCount; i += 4) {
    let r = cxd.data[i]
    let g = cxd.data[i + 1]
    let b = cxd.data[i + 2]
    cxd.data[i] = r * 2 - 127
    cxd.data[i + 1] = g * 2 - 127
    cxd.data[i + 2] = b * 2 - 127
  }
  return cxd
}

module.exports = command
