const FilterCommand = require('../FilterCommand')
const command = new FilterCommand(filter)
command.name = 'minimax'

const getIndex = require('../helperFunctions/getIndex')

function filter(cxd, arg = 5) {
  var pixelsize = arg
  for (let y = 0; y < cxd.height; y += pixelsize) {
    for (let x = 0; x < cxd.height; x += pixelsize) {
      var mr = 0
      var mg = 0
      var mb = 0
      for (let sy = 0; sy < pixelsize; sy++) {
        for (let sx = 0; sx < pixelsize; sx++) {
          let i = getIndex(cxd, x + sx, y + sy) * 4
          let r = cxd.data[i]
          if (mr < r) mr = r
          let g = cxd.data[i + 1]
          if (mg < g) mg = g
          let b = cxd.data[i + 2]
          if (mb < b) mb = b
        }
      }
      for (let sy = 0; sy < pixelsize; sy++) {
        for (let sx = 0; sx < pixelsize; sx++) {
          let i = getIndex(cxd, x + sx, y + sy) * 4
          cxd.data[i] = mr
          cxd.data[i + 1] = mg
          cxd.data[i + 2] = mb
        }
      }
    }
  }
  return cxd
}

module.exports = command
