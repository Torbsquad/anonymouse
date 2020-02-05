const axios = require('axios')
const pg = require('../../../db')

const { Site } = require('vnft-tools')
const site = new Site('/torb/insertUsers')

site.get = async (req, res) => {
  try{
    let users = await axios.get('https://api.vnft.cc/torb/getUsers')
    let insertQuery = `
      insert into torbstatus(user_id, username)
      values ${users.data.map(user => "('"+user.user_id+"','"+user.username+"')").join(",")}
    `
    await pg.query(insertQuery)
    res.json(insertQuery)
  }
  catch(err){
    res.json(err.message)
  }
}

module.exports = site
