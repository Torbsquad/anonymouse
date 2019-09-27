function applyFilterToImageData(canvas, funct){
  const ctx = canvas.getContext('2d')
  const cxd = ctx.getImageData(0, 0, canvas.width, canvas.height)
  ctx.putImageData(funct(cxd), 0, 0)
}

module.exports = applyFilterToImageData
