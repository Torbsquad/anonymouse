module.exports = async function(page = 0){
    const client = require("../../connect.js")
    const res = await client.query('SELECT * FROM EMOTES OFFSET $1 LIMIT 100', [page*100])
    return res.rows
}
