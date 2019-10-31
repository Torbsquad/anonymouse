async function urlTo64(externalUrl) {
  let imageRequest = await axios.get(externalUrl, { responseType: 'arraybuffer' })
  var image = Buffer.from(imageRequest.data, 'binary').toString('base64')
  return image
}

function tweetImage(base64image) {
  var b64content = base64image
  T.post('media/upload', { media_data: b64content }, function(err, data, response) {
    var mediaId = data.media_id_string
    T.post('media/metadata/create', { media_id: mediaId }, function(err, data, response) {
      if (!err) {
        var params = { status: 'this tweet should not have a alt-tag to it', media_ids: [mediaId] }
        T.post('statuses/update', params, function(err, data, response) {
          console.log(data)
        })
      }
    })
  })
}

let img = await urlTo64('https://cdn.discordapp.com/attachments/442743346079858692/638435374024359946/unknown.png')
//tweetImage(img)
