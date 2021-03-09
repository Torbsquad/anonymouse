module.exports = async function(page = 0){
    const client = require("../../connect.js")
    var count = await client.query('SELECT count(*) FROM EMOTES')
    count = count.rows[0].count
    count = Math.floor(count/1000)*1000
    const res = await client.query('SELECT * FROM EMOTES OFFSET $1 LIMIT 1000', [count - page*1000])
    return res.rows.reverse()
}
