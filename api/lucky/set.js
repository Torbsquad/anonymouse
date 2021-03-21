module.exports = async function(input){
    try{
        const client = require("../../connect.js")
        
        input = input.replace(/%47/g,"/")

        const res = await client.query(`
            UPDATE LUCKY SET VALUE = $1
        `, [input])

        return {status: "OK"}
    }
    catch(err){
        return {status: "failed"}
    }
}
