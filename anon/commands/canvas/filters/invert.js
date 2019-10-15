const FilterCommand = require('../FilterCommand')
const command = new FilterCommand(filter)
command.name = 'invert'

function filter(cxd) {
  let subPixelCount = Object.keys(cxd.data).length
  for (let i = 0; i < subPixelCount; i += 4) {
    let r = cxd.data[i]
    let g = cxd.data[i + 1]
    let b = cxd.data[i + 2]
    cxd.data[i] = 255 - r
    cxd.data[i + 1] = 255 - g
    cxd.data[i + 2] = 255 - b
  }
  return cxd
}

module.exports = command
