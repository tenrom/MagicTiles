//--------------------------------------------------------------------//
// Play Pause      |      player.play() / player.pause()              //
// Reset           |      player.restart()                            //
// Change Speed    |      player.media.playbackRate=2                 //
// Mute/Unmute     |      player.embed.Mute() / player.embed.unMute() //
//--------------------------------------------------------------------//


// FUNCTIONS

let index=0

function NewLine(){
    n=getRandomCol(lastTile)
    if (lastTile!==-1){
        if (n===lastTile){
            if (n>4){
                document.getElementById(lastTileid[0]).GrowUp()
                document.getElementById(lastTileid[1]).GrowUp()
            }else{
                document.getElementById(lastTileid[0]).GrowUp()
            }
            
        }else{
            lastTileid=[]
            lastTile=n
            index++
            lastTileid.push(index)
            if (n>4){
                let c={'5':['1','3'],'6':['2','4']}
                document.getElementById("Game").innerHTML+=`<game-tile column=${c[n][0]} id="${index}"></game-tile>`

                index++
                lastTileid.push(index)
                document.getElementById("Game").innerHTML+=`<game-tile column=${c[n][1]} id="${index}"></game-tile>`
            }else {
                document.getElementById("Game").innerHTML+=`<game-tile column=${n} id="${index}"></game-tile>`
            }
        }
    }else{
        lastTileid=[]
        lastTile=n
        index++
        lastTileid.push(index)
        if (n>4){
            let c={'5':['1','3'],'6':['2','4']}
            document.getElementById("Game").innerHTML+=`<game-tile column=${c[n][0]} id="${index}"></game-tile>`
            
            index++
            lastTileid.push(index)
            document.getElementById("Game").innerHTML+=`<game-tile column=${c[n][1]} id="${index}"></game-tile>`
        }else {
            document.getElementById("Game").innerHTML+=`<game-tile column=${n} id="${index}"></game-tile>`
        }
    }
    
}

function FixSeed(seed){
    rng=new Math.seedrandom(seed)
}

function getRandomCol(flastTile){
    let pos={
        '-1':['1','2','3','4','5','6'],
        '1':['1','2','3','4','6'],
        '2':['2','1','3','4','5'],
        '3':['3','1','2','4','6'],
        '4':['4','1','2','3','5'],
        '5':['5','2','4','6'],
        '6':['6','1','3','5']
    }
    console.log(flastTile)
    let po=pos[String(flastTile)]

    return po[Math.round(rng()*(po.length-1))]
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


let intid=setInterval(()=>{
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


FixSeed('Hello World')




// setTimeout(()=>{document.getElementById('truc').GrowUp()},200)


document.addEventListener('mousedown',()=>{
    isclicking=true
})

document.addEventListener('mouseup',()=>{
    isclicking=false
})

document.addEventListener('touchstart',()=>{
    isclicking=true
})

document.addEventListener('touchend',()=>{
    isclicking=false
})