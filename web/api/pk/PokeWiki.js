const axios = require('axios')

class PokeWiki {
  constructor(args) {
    this.name = args
  }
  async load() {
    let pokewiki_url = `https://www.pokewiki.de/${this.name}`
    let request = await axios.get(pokewiki_url)
    this.data = request.data
    this.squashed = this.data.split('\n').join('')
    request = await axios.get(`https://www.serebii.net/pokedex-swsh/${this.english.toLowerCase()}/`)
    this.serebii = request.data
    this.serebii = this.serebii
      .split('\n')
      .join(' ')
      .replace(/\s+/g, ' ')
    return this.data
  }
  get stats() {
    var stats = []
    var c = this.serebii.match(/Stats(.{0,100})h2.*?table>/g)
    for (let d of c) {
      let name = d.match(/Stats(.{0,100})<\/h2/)[1]
      if (name.includes(' - ')) {
        name = name.replace(/^ - /, '')
      } else {
        name = 'Default'
      }
      let values = d
        .match(/Base Stats - Total: (.*?)<\/tr>/)[1]
        .replace(/<.*?>/g, '')
        .split(' ')
      let hp = values[0]
      let atk = values[1]
      let def = values[2]
      let spatk = values[3]
      let spdef = values[4]
      stats.push({ name, hp, atk, def, spatk, spdef })
    }
    return stats
  }
  get english() {
    let e = this.data.match(/title=\"Englisch\">en<\/span><span.*?>(.*?)<\/span><\/div>/)[1]
    return e
  }
  get german() {
    let e = this.data.match(/span style="padding:4px 0px 2px 0px;display: inline-block;"><b>(.*?)<\/b><\/span/)[1]
    return e
  }
  get typing() {
    let t = this.squashed.match(/Allgemeine Informationen.*?style="background:#ffffff">(.*?)Fangen/)[1]
    t = t
      .match(/<a href="\/.*?" title="(.*?)"><img alt=".*?\.png"/g)
      .map(e => e.match(/<a href="\/.*?" title="(.*?)"><img alt=".*?\.png"/)[1])
    return t.join(', ')
  }
  get image() {
    let a = this.squashed.match(/float: right.{1,100}pokemon_icon.{1,100}<img(.*?)\/div/g)[0]
    a = a.match(/src=\"(.*?)\"/)[1]
    return 'https://www.pokewiki.de' + a
  }
}

module.exports = PokeWiki
