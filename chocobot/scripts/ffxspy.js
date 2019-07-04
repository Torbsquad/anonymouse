const { Script } = require('vnftjs')
const { get } = require('axios')
const { RichEmbed } = require('discord.js')

const TARGET_CHANNEL = '539802587239677963'
const TARGET_CHARACTERS = [
  //20859306, //Bellini Lewo
  //20864548, //Na'il Lateef
  //21349090, //Diya Na'il
  //21853274, //Eava Wright
  23945254, //Lily Rose (Sakura Lily)
  6862438, //Lena Lorien
  25212840, //Aba Remillard
  3206978, //Abaddon Seraph
  15530979, //Ava Aoyagi
  9894204, //Miyoki Malicera
  22149004, //Nai Suru
  23076248 //Atinuviel I'lave
  //12506676 G'anta Kasper
]

const TARGET_ATTRIBUTES = ['Name', 'Server', 'Race', 'Gender']
const TARGET_FREECOMPANY = ['Name']
const FCPREFIX = 'Free Company-'

const TRANSLATIONS = {
  Gender: ['Genderless', 'Male', 'Female'],
  Race: ['Missing No. 0', 1, 2, 'Lalafell', "Miqo'te", 5, 'Au Ra'],
}

const test = new Script()
test.intervalTime = 120000
test.funct = async bot => {
  const channel = bot.channels.find(c => c.id == TARGET_CHANNEL)
  const data = JSON.parse(channel.topic)

  for (let id of TARGET_CHARACTERS) {
    const targetSite = await get(`https://xivapi.com/character/${id}?data=FC`)
    const target = targetSite.data
    const char = target.Character
    const fc = target.FreeCompany

    const chardata = {}
    TARGET_ATTRIBUTES.forEach(a => (chardata[a] = char[a]))
    TARGET_FREECOMPANY.forEach(a => (chardata[FCPREFIX + a] = !fc ? 'unknown' : fc[a]))

    if (!data[id]) {
      data[id] = {}
      TARGET_ATTRIBUTES.forEach(a => (data[id][a] = 'unknown'))
      TARGET_FREECOMPANY.forEach(a => (data[id][FCPREFIX + a] = 'unknown'))
    }

    const hasChanged = JSON.stringify(chardata) != JSON.stringify(data[id])

    if (hasChanged) {
      let response = new RichEmbed()
      response.setColor('FFFF99')

      const TARGET = [].concat(TARGET_ATTRIBUTES, TARGET_FREECOMPANY.map(fc => FCPREFIX + fc))

      for (let attribute of TARGET) {
        let before = data[id][attribute] || 'null'
        let after = chardata[attribute] || 'null'

        if (TRANSLATIONS[attribute]) {
          if (TRANSLATIONS[attribute][before]) {
            before = TRANSLATIONS[attribute][before]
          }
          if (TRANSLATIONS[attribute][after]) {
            after = TRANSLATIONS[attribute][after]
          }
        }

        let label = `__**${attribute}**__`
        let text = before == after ? after : `${before} **⇛ ${after}**`
        response.addField(label, text)
      }

      channel.send('@everyone', { embed: response })
      channel.send({ file: char.Portrait })

      data[id] = chardata
    }
  }

  channel.setTopic(JSON.stringify(data))
}

module.exports = test
