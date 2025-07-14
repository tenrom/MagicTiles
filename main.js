//--------------------------------------------------------------------//
// Play Pause      |      player.play() / player.pause()              //
// Reset           |      player.restart()                            //
// Change Speed    |      player.media.playbackRate=2                 //
// Mute/Unmute     |      player.embed.Mute() / player.embed.unMute() //
//--------------------------------------------------------------------//


// FUNCTIONS


function InitializeTiles(){
    PxSpeed=document.body.clientHeight
    for (let index=0;index<14;index++){
        document.getElementById("Game").innerHTML+=`<game-tile column=1 id="${index}" style="display:none;"></game-tile>`
        queue.push(index)
    }
}

InitializeTiles()


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
            if (n>4){
                let c={'5':['1','3'],'6':['2','4']}

                let tile1=document.getElementById(queue[0])
                queue.splice(0,1)
                lastTileid.push(tile1.id)
                tile1.setAttribute('column',c[n][0])

                let tile2=document.getElementById(queue[0])
                queue.splice(0,1)
                lastTileid.push(tile2.id)
                tile2.setAttribute('column',c[n][1])

                tile1.Reset()
                tile2.Reset()
            }else {
                let tile1=document.getElementById(queue[0])
                queue.splice(0,1)
                lastTileid.push(tile1.id)
                tile1.setAttribute('column',n)

                tile1.Reset()
            }
        }
    }else{
        lastTileid=[]
        lastTile=n
        if (n>4){
            let c={'5':['1','3'],'6':['2','4']}

            let tile1=document.getElementById(queue[0])
            queue.splice(0,1)
            lastTileid.push(tile1.id)
            tile1.setAttribute('column',c[n][0])

            let tile2=document.getElementById(queue[0])
            queue.splice(0,1)
            lastTileid.push(tile2.id)
            tile2.setAttribute('column',c[n][1])

            tile1.Reset()
            tile2.Reset()
        }else {
            let tile1=document.getElementById(queue[0])
            queue.splice(0,1)
            lastTileid.push(tile1.id)
            tile1.setAttribute('column',n)

            tile1.Reset()
        }

        
    }
    
    if (clickids.length>=15){
        clickids=clickids.slice(5,-1)
    }
    if (completeSliderids.length>=15){
        completeSliderids=completeSliderids.slice(5,-1)
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




function animateTilesMovement(){
    if (playing){
        GameTime+=PxSpeed
        if (GameTime>=document.body.clientHeight/4-PxSpeed/2 && GameTime<=document.body.clientHeight/4+PxSpeed/2){
            NewLine()
            GameTime=0
        }
    }

    //requestAnimationFrame(animateTilesMovement)
}





const player = new Plyr('#player',{'autoplay':true,"mute":true});
window.player = player;


FixSeed('Hello World')




// setTimeout(()=>{
//     document.getElementById('truc').GrowUp()

//     setTimeout(()=>{
//         document.getElementById('truc').Reset()

//         setTimeout(()=>{
//             document.getElementById('truc').GrowUp()
//         },500)
//     },1000)
// },100)


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


