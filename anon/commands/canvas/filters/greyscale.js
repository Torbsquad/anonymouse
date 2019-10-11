const loadCanvasByImage = require('../helperFunctions/loadCanvasByImage')
const applyFilterToImageData = require('../helperFunctions/applyFilterToImageData')

const Discord = require('discord.js')
const FilterCommand = require('../FilterCommand')

const command = new FilterCommand(filter)
command.name = 'greyscale'

function filter(cxd) {
  let subPixelCount = Object.keys(cxd.data).length
  for (let i = 0; i < subPixelCount; i += 4) {
    let r = cxd.data[i]
    let g = cxd.data[i + 1]
    let b = cxd.data[i + 2]
    cxd.data[i] = (r + g + b) / 3
    cxd.data[i + 1] = (r + g + b) / 3
    cxd.data[i + 2] = (r + g + b) / 3
  }
  return cxd
}

module.exports = command
