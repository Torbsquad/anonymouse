class Grid {
  constructor(grid) {
    this.characters =
      '⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿⡀⡁⡂⡃⡄⡅⡆⡇⡈⡉⡊⡋⡌⡍⡎⡏⡐⡑⡒⡓⡔⡕⡖⡗⡘⡙⡚⡛⡜⡝⡞⡟⡠⡡⡢⡣⡤⡥⡦⡧⡨⡩⡪⡫⡬⡭⡮⡯⡰⡱⡲⡳⡴⡵⡶⡷⡸⡹⡺⡻⡼⡽⡾⡿⢀⢁⢂⢃⢄⢅⢆⢇⢈⢉⢊⢋⢌⢍⢎⢏⢐⢑⢒⢓⢔⢕⢖⢗⢘⢙⢚⢛⢜⢝⢞⢟⢠⢡⢢⢣⢤⢥⢦⢧⢨⢩⢪⢫⢬⢭⢮⢯⢰⢱⢲⢳⢴⢵⢶⢷⢸⢹⢺⢻⢼⢽⢾⢿⣀⣁⣂⣃⣄⣅⣆⣇⣈⣉⣊⣋⣌⣍⣎⣏⣐⣑⣒⣓⣔⣕⣖⣗⣘⣙⣚⣛⣜⣝⣞⣟⣠⣡⣢⣣⣤⣥⣦⣧⣨⣩⣪⣫⣬⣭⣮⣯⣰⣱⣲⣳⣴⣵⣶⣷⣸⣹⣺⣻⣼⣽⣾⣿'
    this.grid = grid
  }

  getTile(x, y) {
    if (this.grid.length <= y || this.grid[y].length <= x) return 0
    return this.grid[y][x]
  }

  getCharacter(x, y) {
    let index =
      this.getTile(x, y) * 1 +
      this.getTile(x, y + 1) * 2 +
      this.getTile(x, y + 2) * 4 +
      this.getTile(x + 1, y) * 8 +
      this.getTile(x + 1, y + 1) * 16 +
      this.getTile(x + 1, y + 2) * 32
    return this.characters[index]
  }

  toBlind() {
    var blind = ''
    var pointerX = 0
    var pointerY = 0

    while (this.grid.length % 3) this.grid.push([0, 0])

    while (this.grid.length > pointerY) {
      pointerX = 0
      while (
        this.grid[pointerY].length > pointerX ||
        this.grid[pointerY + 1].length > pointerX ||
        this.grid[pointerY + 2].length > pointerX
      ) {
        var character = this.getCharacter(pointerX, pointerY)
        blind += character
        pointerX += 2
      }
      blind += '\n'
      pointerY += 3
    }

    return blind
  }
}

var grid = new Grid([
  [0, 0],
  [0, 1],
  [1, 0, 1, 1],
  [0, 0],
  [0, 1, 1, 1, 0, 1]
])

var output = document.getElementById('output')
output.innerHTML = grid.toBlind()
