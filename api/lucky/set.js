module.exports = async function(input){
    try{
        const client = require("../../connect.js")
        
        const res = await client.query(`
            UPDATE LUCKY SET VALUE = $1
        `, [JSON.parse(input)])

        return {status: "OK"}
    }
    catch(err){
        return {status: "failed"}
    }
}
