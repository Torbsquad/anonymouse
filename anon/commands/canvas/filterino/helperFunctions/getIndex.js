function getIndex(cxd, x, y) {
  if (x < 0 || y < 0 || x >= cxd.width || y >= cxd.height) return -1
  return x + y * cxd.width
}

module.exports = getIndex
