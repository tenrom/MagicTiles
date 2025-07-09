

let rng=new Math.seedrandom('Hello World')
function NewLine(){
    n=Math.round(rng()*3)+1
    if (document.getElementsByClassName('tile').length){
        if (n===Number(document.getElementsByClassName('tile')[document.getElementsByClassName('tile').length-1].getAttribute('column'))){
            document.getElementsByClassName('tile')[document.getElementsByClassName('tile').length-1].GrowUp()
        }else{
            document.getElementById("Game").innerHTML+=`<game-tile column=${n}></game-tile>`
        }
    }else{
        document.getElementById("Game").innerHTML+=`<game-tile column=${n}></game-tile>`
    }
    
}



function vibrer(){
    if (window.navigator.vibrate){
        window.navigator.vibrate(50)
    }
}


function ChangeSpeed(s){
    player.restart()
    player.media.playbackRate=s
}

function Load(id){
    player.source = {
        type: 'video',
        sources: [
            {
                src: id,
                provider: 'youtube',
            },
        ],
    };
}

setInterval(()=>{
    console.log(GameTime)
    if (playing){
        GameTime+=PxSpeed
        if (GameTime>=document.body.clientHeight/4-PxSpeed/2 && GameTime<=document.body.clientHeight/4+PxSpeed/2){
            NewLine()
            GameTime=0
        }
    }
},10)



const player = new Plyr('#player',{'autoplay':true,"mute":true});
window.player = player;






// Play Pause document.getElementsByClassName('container')[0].querySelector('div').click()         player.play() player.pause()
// Reset document.getElementsByClassName('previous-button')[0].click()                             player.restart()
// Change Speed document.getElementsByTagName('video')[0].playbackRate=0.5                         player.media.playbackRate=2

// Mute/Unmute player.embed.Mute() / player.embed.unMute() 