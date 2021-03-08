module.exports = async function(input){
    const client = require("../../connect.js")
    var data = input.match(/\<(a|):(.*?):(.*?)\>/)
    var json = {}
    json.animated = data[1] == "a"
    json.name = data[2]
    json.id = data[3]

    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!

    return {data,json,res:res.rows}
}
