function SetUpMusicinfo(){
    
    document.getElementById('MusicImg').src=`https://img.youtube.com/vi/${ytid}/hqdefault.jpg`

    let info=player.embed.getVideoData()
    document.getElementById('title').innerText=info.title
    document.getElementById('author').innerText=info.author


    document.getElementById('LoadingDiv').style.opacity=0
    setTimeout(()=>{
        document.getElementById('LoadingDiv').style.display='none'

        getDB((content)=>{
            console.log(DB)
            DB=content
            if (!JSON.stringify(DB['accounts'][username].musics).includes(ytid)){
                AddMusicToPlaylist(ytid,info.title,info.author,username)
            }else{
                if (!JSON.stringify(DB['accounts'][username].musics).includes(ytid)){
                    AddMusicToUser(ytid,username)
                }
            }
        })
    },500)

    document.getElementById('PlayBtn').addEventListener('click',()=>{
        document.getElementsByClassName('plyr__control')[0].click()
        document.getElementById('MusicInfoDiv').style.display='none'
    })
}


function LoadUserPlaylist(user){
    let html=""
    for (let i in DB.accounts[user].musics){
        let id=DB.accounts[user].musics[i].ytid
        html+=`<music-tile ytid="${id}" title="${decodeURI(DB["allytmusic"][id].title)}" author="${decodeURI(DB["allytmusic"][id].author)}"></music-tile>`
    }
    document.getElementById('musics').innerHTML=html
}

function LoadUserInvitation(user){
    GenerateQrCode(DB["accounts"][user].friendcode)
}