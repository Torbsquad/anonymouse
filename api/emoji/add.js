module.exports = async function(input){
    const client = require("../../connect.js")
    var data = input.match(/\<(a|):(.*?):(.*?)\>/)
    var json = {}
    json.animated = data[1] == "a"
    json.name = data[2]
    json.id = data[3]
    const res = await client.query('INSERT INTO EMOTES (id, name, animated) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', [json.id, json.name, json.animated])
    return json
}
