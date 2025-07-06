
let rng=new Math.seedrandom('Hello World')
function NewLine(){
    n=Math.round(rng()*3)+1
    console.log(n===document.getElementsByClassName('tile')[document.getElementsByClassName('tile').length-1].getAttribute('column'))
    if (n===Number(document.getElementsByClassName('tile')[document.getElementsByClassName('tile').length-1].getAttribute('column'))){
        document.getElementsByClassName('tile')[document.getElementsByClassName('tile').length-1].GrowUp()
    }else{
        document.body.innerHTML+=`<game-tile column=${n}></game-tile>`
    }
}


let PxSpeed=10

function vibrer(){
    if (window.navigator.vibrate){
        window.navigator.vibrate(10)
    }
}


