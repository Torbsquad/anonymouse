module.exports = async function(input){
    try{
        const client = require("../../connect.js")
        
        const res = await client.query(`
            SELECT VALUE FROM LUCKY
        `)

        return res.rows[0].value
    }
    catch(err){
        return {status: "failed"}
    }
}
