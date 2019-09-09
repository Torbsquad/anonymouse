class Chunk {
  constructor(x, y, grid = false) {
    this.x = x
    this.y = y
    if (grid != false) {
      this.grid = grid
    } else {
      this.load()
    }
  }

  render(cx, ax, ay) {
    if (this.grid) {
      var tpY = ay + this.y * 512
      for (let y = 0; y < this.grid.length; y++) {
        var tpX = ax + this.x * 512
        for (let x = 0; x < this.grid[y].length; x++) {
          let t = idToTile[this.grid[y][x]]
          cx.drawImage(tilesets[t[0]].image, t[1], t[2], 16, 16, tpX, tpY, 32.5, 32.5)
          tpX += 32
        }
        tpY += 32
      }
    }
  }

  async load() {
    let e = await axios.get(`https://api.vnft.cc/socket/getChunk/${this.x}/${this.y}`)
    if (!e.data.error) {
      this.grid = e.data.chunk
    }
  }
}
