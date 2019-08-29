class Grid {
  constructor(grid) {
    this.emptychar = 0
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
      this.getTile(x + 1, y + 2) * 32 +
      this.getTile(x, y + 3) * 64 +
      this.getTile(x + 1, y + 3) * 128
    if (index == 0) {
      return this.characters[this.emptychar]
    } else {
      return this.characters[index]
    }
  }

  toBlind() {
    var blind = ''
    var pointerX = 0
    var pointerY = 0

    while (this.grid.length % 4) this.grid.push([0, 0])

    while (this.grid.length > pointerY) {
      pointerX = 0
      while (
        this.grid[pointerY].length > pointerX ||
        this.grid[pointerY + 1].length > pointerX ||
        this.grid[pointerY + 2].length > pointerX ||
        this.grid[pointerY + 3].length > pointerX
      ) {
        var character = this.getCharacter(pointerX, pointerY)
        blind += character
        pointerX += 2
      }
      blind += '\n'
      pointerY += 4
    }

    return blind
  }
}

class Table {
  constructor(grid = [[0], [0]]) {
    this.grid = grid
    this.el = document.createElement('table')
    this.el.className = 'noselect'
    this.cellToggle = function(event) {
      console.log(1)
    }
    this.update()
  }

  setTile(x, y, value) {
    while (this.grid.length < y) this.grid.push([])
    while (this.grid[y].length < x) this.grid[y].push(0)
    this.grid[y][x] = value
  }

  getTile(x, y) {
    if (this.grid.length <= y || this.grid[y].length <= x) return 0
    return this.grid[y][x]
  }

  resizeTo(width, height) {
    if (width <= 0 || height <= 0) {
      throw new Error('width and height must me over 0')
    }

    while (this.grid.length > height) this.grid.pop()
    while (this.grid.length < height) this.grid.push([0])

    for (let y = 0; y < height; y++) {
      while (this.grid[y].length > width) this.grid[y].pop()
      while (this.grid[y].length < width) this.grid[y].push(0)
    }

    this.update()
  }

  update() {
    var tableBody = document.createElement('tbody')
    for (let y = 0; y < this.grid.length; y++) {
      var tr = document.createElement('tr')
      for (let x = 0; x < this.grid[y].length; x++) {
        var cell = this.grid[y][x]
        var td = document.createElement('td')
        td.className = 'noselect cell'
        td.onmousedown = this.cellToggle
        td.onmousemove = this.cellToggle
        td.setAttribute('data-x', x)
        td.setAttribute('data-y', y)
        td.innerHTML = cell
        td.style.background = cell ? 'black' : 'white'
        tr.appendChild(td)
      }
      tableBody.appendChild(tr)
    }
    this.el.innerHTML = ''
    this.el.appendChild(tableBody)
  }
}

DRAWMODE = -1

function resize() {
  var width = document.getElementById('width')
  var height = document.getElementById('height')

  table.resizeTo(width.value, height.value)
  grid.grid = table.grid
  output.innerHTML = grid.toBlind()
}

function toggle(event, el) {
  if (event === true || event.buttons != 0) {
    if (DRAWMODE == -1) {
      DRAWMODE = (el.innerHTML == 0) * 1
    }
    el.innerHTML = DRAWMODE
    el.style.background = DRAWMODE ? 'black' : 'white'
    table.setTile(el.getAttribute('data-x'), el.getAttribute('data-y'), DRAWMODE)
    grid.grid = table.grid
    output.innerHTML = grid.toBlind()
  } else {
    DRAWMODE = -1
  }
}

function tableClear(x = 6, y = 6) {
  width.value = x
  height.value = y
  grid.grid = new Array(y).fill(0).map(e => new Array(x).fill(0))
  table.grid = grid.grid
  output.innerHTML = grid.toBlind()
  table.update()
}

function tableSave() {
  prompt('Save it somewhere:', JSON.stringify(grid.grid))
}

function tableLoad() {
  let data = prompt('Enter saved Data:')
  grid.grid = JSON.parse(data)
  table.grid = grid.grid
  output.innerHTML = grid.toBlind()
}

var output = document.getElementById('output')
var drawBoard = document.getElementById('drawBoard')
var defaultBlock = document.getElementById('defaultBlock')

grid = new Grid([[0, 0], [0, 1], [1, 0, 1, 1], [0, 0], [0, 1, 1, 1, 0, 1]])

var table = new Table(grid.grid)
table.el.className = 'noselect bordered'
table.cellToggle = function(event) {
  if (event.buttons != 0) {
    if (DRAWMODE == -1 || event.type == 'mousedown') {
      DRAWMODE = (this.innerHTML == 0) * 1
    }
    this.innerHTML = DRAWMODE
    this.style.background = DRAWMODE ? 'black' : 'white'
    table.setTile(this.getAttribute('data-x'), this.getAttribute('data-y'), DRAWMODE)
    grid.grid = table.grid
    output.innerHTML = grid.toBlind()
  } else {
    DRAWMODE = -1
  }
}

defaultBlockTable = new Table([[0, 0], [0, 0], [0, 0], [0, 0]])
defaultBlockTable.el.className = 'noselect bordered'
defaultBlockTable.value = function(x = 0, y = 0) {
  return (
    this.getTile(x, y) * 1 +
    this.getTile(x, y + 1) * 2 +
    this.getTile(x, y + 2) * 4 +
    this.getTile(x + 1, y) * 8 +
    this.getTile(x + 1, y + 1) * 16 +
    this.getTile(x + 1, y + 2) * 32 +
    this.getTile(x, y + 3) * 64 +
    this.getTile(x + 1, y + 3) * 128
  )
}
defaultBlockTable.cellToggle = function(event) {
  if (event.buttons != 0) {
    if (DRAWMODE == -1 || event.type == 'mousedown') {
      DRAWMODE = (this.innerHTML == 0) * 1
    }
    this.innerHTML = DRAWMODE
    this.style.background = DRAWMODE ? 'black' : 'white'
    defaultBlockTable.setTile(this.getAttribute('data-x'), this.getAttribute('data-y'), DRAWMODE)
    grid.emptychar = defaultBlockTable.value()
    output.innerHTML = grid.toBlind()
  } else {
    DRAWMODE = -1
  }
}

defaultBlockTable.update()

output.innerHTML = grid.toBlind()
drawBoard.appendChild(table.el)
defaultBlock.appendChild(defaultBlockTable.el)
