const { CommandHandler } = require('vnftjs')
const path = require('path')

const plant = new CommandHandler()
plant.enableHelp()
plant.helpColor = 'PURPLE'

plant.prefix = 'p'

plant.loadCommands(path.join(__dirname, 'commands'))
plant.loadCommands(path.join(__dirname, 'scripts'))
plant.login(process.env.plant)
