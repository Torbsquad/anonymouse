const pg = require('../../db')
const { Script } = require('vnftjs')
const { sleep } = require('vnft-tools')
const { get } = require('axios')
const { RichEmbed } = require('discord.js')

const TARGET_CHANNEL = '539802587239677963'
const TARGET_CHARACTERS = [
  23945254, // Lily Rose (Sakura Lily)
  25212840, // Aba Remillard
  3206978, //  Abaddon Seraph
  15530979, // Ava Aoyagi
  9894204, //  Miyoki Malicera
  23076248, // Atinuviel I'lave
]

const TARGET_ATTRIBUTES = ['Name', 'Server', 'Race', 'Gender']
const TARGET_FREECOMPANY = []//['Name']
const FCPREFIX = 'Free Company-'

const TRANSLATIONS = {
  Gender: ['Genderless', 'Male', 'Female'],
  Race: [
    'Missing No. 0',
    'likely Hyur',
    'Elezen',
    'Lalafell',
    "Miqo'te",
    'Roegadyn',
    'Au Ra',
    'likely Hrothgar',
    'likely Viera',
  ],
}

async function pg_get() {
  return JSON.parse((await pg.query(`SELECT CONTENT FROM FFXSPY LIMIT 1`))[0].content)
}

async function pg_set(value) {
  return await pg.query(`UPDATE FFXSPY SET CONTENT = $1 WHERE true`, [value])
}

function currentTime() {
  let time = new Date()
  time.setHours(time.getHours() + 1)
  time = time.toString().split(' ')[4]
  time = time.split(':')
  return time[0] + ':' + time[1]
}

const spy = new Script()
spy.intervalTime = 120000 * 2

spy.funct = async bot => {
  const channel = bot.channels.find(c => c.id == TARGET_CHANNEL)
  const data = await pg_get()

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
      response.setFooter('id: '+id)

      const TARGET = [].concat(
        TARGET_ATTRIBUTES,
        TARGET_FREECOMPANY.map(fc => FCPREFIX + fc),
      )

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

      await sleep(10000)
      channel.send('', { embed: response })
      channel.send({ file: char.Portrait.split('?')[0] })

      data[id] = chardata
    }
  }
  bot.user.setActivity(`last check: ${currentTime()}`)
  await pg_set(data)
}

module.exports = spy
