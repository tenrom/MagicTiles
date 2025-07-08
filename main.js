

let rng=new Math.seedrandom('Hello World')
function NewLine(){
    n=Math.round(rng()*3)+1
    if (n===Number(document.getElementsByClassName('tile')[document.getElementsByClassName('tile').length-1].getAttribute('column'))){
        document.getElementsByClassName('tile')[document.getElementsByClassName('tile').length-1].GrowUp()
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



const player = new Plyr('#player',{});
window.player = player;


document.body.addEventListener('click',()=>{
    document.getElementsByClassName('plyr__control')[0].click()
})











// Play Pause document.getElementsByClassName('container')[0].querySelector('div').click()         player.play() player.pause()
// Reset document.getElementsByClassName('previous-button')[0].click()                             player.restart()
// Change Speed document.getElementsByTagName('video')[0].playbackRate=0.5                         player.media.playbackRate=2