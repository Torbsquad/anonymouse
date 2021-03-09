module.exports = async function(){
    const client = require("../../connect.js")
    const res = await client.query('SELECT count(*) FROM EMOTES')
    return res.rows[0]
}
