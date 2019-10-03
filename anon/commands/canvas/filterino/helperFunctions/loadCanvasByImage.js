const Canvas = require('canvas')

async function loadCanvasByImage(path) {
  let img = await Canvas.loadImage(path)
  let canvas = Canvas.createCanvas(img.width, img.height)
  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas
}

module.exports = loadCanvasByImage
