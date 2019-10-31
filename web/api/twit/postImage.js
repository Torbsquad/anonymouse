/*
async function url2Base64(url) {
  let imageFromUrl = await axios.get(url, { responseType: 'arraybuffer' })
  return Buffer.from(imageFromUrl.data, 'binary').toString('base64')
}

function tweetImage(base64image, status = ' ') {
  T.post('media/upload', { media_data: base64image }, function(err, data, response) {
    var media_id = data.media_id_string
    T.post('media/metadata/create', { media_id }, function(err, data, response) {
      if (err) return false
      var params = { status, media_ids: [media_id] }
      T.post('statuses/update', params, function(err, data, response) {
        console.log(data)
      })
    })
  })
}

let img = await url2Base64('https://cdn.discordapp.com/attachments/442743346079858692/638435374024359946/unknown.png')
//tweetImage(img)
*/
