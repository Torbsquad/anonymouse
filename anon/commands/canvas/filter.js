const Canvas = require('canvas')
const loadCanvasByImage = require("./canvasByImage")
const Discord = require('discord.js')
const { Command } = require('vnftjs')

const command = new Command()
command.name = 'filter'

command.funct = async (bot, message, args) => {
  const userImg = await Canvas.loadImage(message.author.avatarURL)

  const canvas = Canvas.createCanvas(userImg.width, userImg.height)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(userImg, 0, 0, canvas.width, canvas.height)

  let cxd = ctx.getImageData(0, 0, canvas.width, canvas.height)
  ctx.putImageData(filter(cxd), 0, 0)

  const attachment = new Discord.Attachment(canvas.toBuffer(), `user ${message.author.username}.png`)
  message.channel.send(``, attachment)
}

function filter(cxd) {
  let subPixelCount = Object.keys(cxd.data).length
  let avgs = new Array()
  let result = new Array()
  for (let i = 0; i < subPixelCount; i += 4) {
    let r = cxd.data[i] ** 2
    let g = cxd.data[i + 1] ** 2
    let b = cxd.data[i + 2] ** 2
    let v = Math.sqrt(r + g + b)
    avgs.push(v)
    result.push(0)
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
        if (fsum > 0) {
          result[i] += fsum / 4
        }
      }
    }
  }

  for (let y = 0; y < cxd.height; y++) {
    for (let x = 0; x < cxd.width; x++) {
      let p = getPixel(cxd, result, x, y)
      cxd.data[(x + y * cxd.width) * 4] = p
      cxd.data[(x + y * cxd.width) * 4 + 1] = p
      cxd.data[(x + y * cxd.width) * 4 + 2] = p
    }
  }
  return cxd
}

function getPixel(cxd, data, x, y) {
  if (x < 0 || y < 0 || x >= cxd.width || y >= cxd.height) return 0
  let i = x + y * cxd.width
  return data[i]
}

function getIndex(cxd, x, y) {
  if (x < 0 || y < 0 || x >= cxd.width || y >= cxd.height) return -1
  return x + y * cxd.width
}

module.exports = command
