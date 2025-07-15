function SetUpMusicinfo(){
    
    document.getElementById('MusicImg').src=`https://img.youtube.com/vi/${ytid}/hqdefault.jpg`

    let info=player.embed.getVideoData()
    document.getElementById('title').innerText=info.title
    document.getElementById('author').innerText=info.author


    document.getElementById('LoadingDiv').style.opacity=0
    setTimeout(()=>{
        document.getElementById('LoadingDiv').style.display='none'
    },500)

    document.getElementById('PlayBtn').addEventListener('click',()=>{
        document.getElementsByClassName('plyr__control')[0].click()
        document.getElementById('MusicInfoDiv').style.display='none'
    })
}

