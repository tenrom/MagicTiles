

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
    document.getElementsByTagName('video')[0].playbackRate=s
}

// Play Pause document.getElementsByClassName('ytp-play-button')[0].click()        .getElementsByClassName('ytp-large-play-button')[0].click()
// Reset document.getElementsByClassName('previous-button')[0].click()
// Change Speed document.getElementsByTagName('video')[0].playbackRate=0.5 




// Change "{}" to your options:
// https://github.com/sampotts/plyr/#options
const player = new Plyr('#player', {});

// Expose player so it can be used from the console
window.player = player;
