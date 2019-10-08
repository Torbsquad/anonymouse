function getPixel(cxd, data, x, y) {
  if (x < 0 || y < 0 || x >= cxd.width || y >= cxd.height) return 0
  let i = x + y * cxd.width
  return data[i]
}

module.exports = getPixel
