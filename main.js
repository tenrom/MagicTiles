

let rng=new Math.seedrandom('Hello World')
function NewLine(){
    n=Math.round(rng()*3)+1
    console.log(n===document.getElementsByClassName('tile')[document.getElementsByClassName('tile').length-1].getAttribute('column'))
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





// Play Pause document.getElementById('play-pause-button').click()
// Reset document.getElementsByClassName('previous-button')[0].click()
// Change Speed document.getElementsByTagName('video')[0].playbackRate=0.5 


