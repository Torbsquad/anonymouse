const { Script } = require("vnftjs");

const idle = new Script();

idle.funct = client => {
  client.user.setStatus("idle")
}

module.exports = idle;