const FilterCommand = require('../FilterCommand')
const command = new FilterCommand(filter)
command.name = 'basecolors2'

function filter(cxd) {
  let subPixelCount = Object.keys(cxd.data).length
  for (let i = 0; i < subPixelCount; i += 4) {
    let r = cxd.data[i]
    let g = cxd.data[i + 1]
    let b = cxd.data[i + 2]
    let value = r + g + b
    cxd.data[i] = (r / value) * 127 * 3
    cxd.data[i + 1] = (g / value) * 127 * 3
    cxd.data[i + 2] = (b / value) * 127 * 3
  }
  return cxd
}

module.exports = command
