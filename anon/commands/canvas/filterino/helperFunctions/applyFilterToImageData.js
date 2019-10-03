function applyFilterToImageData(canvas, funct, ...args) {
  const ctx = canvas.getContext('2d')
  const cxd = ctx.getImageData(0, 0, canvas.width, canvas.height)
  ctx.putImageData(funct(cxd, ...args), 0, 0)
}

module.exports = applyFilterToImageData
