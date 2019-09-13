class Player extends GameObject {
  constructor() {
    super()
    this.x = 10
    this.y = 10
    this.width = 20
    this.height = 40
    this.movingSince = 0

    this.moving = false

    this.hitboxX = 0
    this.hitboxY = 20
    this.hitboxWidth = 20
    this.hitboxHeight = 20

    this.speed = 4
  }

  logic() {
    this.moving = false
    this.moveX(this.speed * (!(inputs['ArrowLeft'] || inputs['a']) - !(inputs['ArrowRight'] || inputs['d'])))
    this.moveY(this.speed * (!(inputs['ArrowUp'] || inputs['w']) - !(inputs['ArrowDown'] || inputs['s'])))

    if (this.moving == false) {
      this.movingSince = 0
    } else if (this.movingSince == 0) {
      this.movingSince = new Date()
    }
  }

  toData() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      animFrame: this.movingSince != 0 ? Math.round((new Date() - this.movingSince) / 200) + 1 : 0,
    }
  }

  moveX(value) {
    if (value != 0) {
      this.x += value
      if (value > 0) while (this.inCollision()) this.x--
      if (value < 0) while (this.inCollision()) this.x++
    }
  }

  moveY(value) {
    if (value != 0) {
      this.y += value
      if (value > 0) while (this.inCollision()) this.y--
      if (value < 0) while (this.inCollision()) this.y++
    }
  }

  inCollision() {
    function posToTile(y, x) {
      let cx = Math.floor(x / 16)
      let cy = Math.floor(y / 16)
      let tx = x - cx * 16
      let ty = y - cy * 16
      let chunk = chunks[cx + ',' + cy]
      if (chunk && chunk.grid) {
        return idToTile[chunk.grid[ty][tx]][3]
      }
      return true
    }

    let hbx = this.x + this.hitboxX
    let hby = this.y + this.hitboxY

    let left = Math.floor(hbx / 32)
    let top = Math.floor(hby / 32)
    let right = Math.floor((hbx + this.hitboxWidth) / 32)
    let down = Math.floor((hby + this.hitboxHeight) / 32)

    let topLeft = posToTile(top, left)
    let topRight = posToTile(top, right)
    let downLeft = posToTile(down, left)
    let downRight = posToTile(down, right)

    return topLeft || topRight || downRight || downLeft
  }
}
