var currentPage = 0
loadset(currentPage++)

function addEmote(emote){
    var content = document.getElementById("content")
    var emoteHolder = document.createElement("div")
    emoteHolder.className = "emoteholder"
    var icon = document.createElement("img")
    icon.className = "icon"
    icon.title = emote.name
    icon.src = `https://cdn.discordapp.com/emojis/${emote.id}.${emote.animated?"gif":"png"}`
    emoteHolder.appendChild(icon)
    content.appendChild(emoteHolder)
}

function loadset(page){
    axios.get(`https://vnft.cc/api/emoji/list/${page}`)
        .then(e=>{
            console.log(e.data.forEach(addEmote))
        })
}

function checkend(){
    if(window.scrollMaxY-400 < window.scrollY){       
        loadset(currentPage++)
    }
}

setInterval(checkend, 500)