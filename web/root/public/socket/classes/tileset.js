class Tileset {
  constructor(path) {
    this.image = new Image()
    this.loaded = false
    this.image.onload = () => this.loaded = true
    this.image.src = path
  }
}
