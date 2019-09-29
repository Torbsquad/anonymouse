const loadCanvasByImage = require('./helperFunctions/loadCanvasByImage')
const applyFilterToImageData = require('./helperFunctions/applyFilterToImageData')
const getPixel = require("./helperFunctions/getPixel")
const getIndex = require("./helperFunctions/getIndex")

const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'edges2'

command.funct = async (bot, message, args) => {
  if (message.mentions.users.array().length) {
    args = message.mentions.users.first().avatarURL
  }

  const canvas = await loadCanvasByImage(args || message.author.avatarURL)
  applyFilterToImageData(canvas, filter)

  const attachment = new Discord.Attachment(canvas.toBuffer(), `user ${message.author.username}.png`)
  message.channel.send(``, attachment)
}

function filter(cxd) {
  let subPixelCount = Object.keys(cxd.data).length
  let avgs = new Array()
  let result = new Array()
  let resultF = new Array()
  for (let i = 0; i < subPixelCount; i += 4) {
    let r = cxd.data[i] ** 5
    let g = cxd.data[i + 1] ** 5
    let b = cxd.data[i + 2] ** 5
    let v = Math.sqrt(r + g + b)
    avgs.push(v)
    result.push(0)
    resultF.push(0)
  }

  let filters = []

  filters.push([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]])
  filters.push([[1, 0, -1], [2, 0, -2], [1, 0, -1]])
  filters.push([[-1, -2, -1], [0, 0, 0], [1, 2, 1]])
  filters.push([[1, 2, 1], [0, 0, 0], [-1, -2, -1]])

  for (let y = 0; y < cxd.height; y++) {
    for (let x = 0; x < cxd.width; x++) {
      for (let filter of filters) {
        var fsum = 0
        for (let subY = -1; subY <= 1; subY++) {
          for (let subX = -1; subX <= 1; subX++) {
            let v = getPixel(cxd, avgs, x + subX, y + subY)
            fsum += filter[subY + 1][subX + 1] * v
          }
        }
        let i = getIndex(cxd, x, y)
        if (fsum > 35) {
          result[i] += fsum / 4
          resultF[i] += 1
        }
      }
    }
  }

  result = result.map((r, i) => (resultF[i] > 1 ? r : 0))

  for (let y = 0; y < cxd.height; y++) {
    for (let x = 0; x < cxd.width; x++) {
      let p = getPixel(cxd, result, x, y)
      let i = (x + y * cxd.width) * 4
      cxd.data[i] = p > 3 ? 0 : cxd.data[i]
      cxd.data[i + 1] = p > 3 ? 0 : cxd.data[i + 1]
      cxd.data[i + 2] = p > 3 ? 0 : cxd.data[i + 2]
    }
  }
  return cxd
}

module.exports = command
