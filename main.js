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


function waitForElement(selector, callback) {
    const observer = new MutationObserver((mutations, observer) => {
        const element = document.querySelector(selector);
        if (element) {
            observer.disconnect();
            callback(element);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}


function animateTilesMovement(){
    if (playing){
        GameTime+=PxSpeed
        if (GameTime>=document.body.clientHeight/4-PxSpeed/2 && GameTime<=document.body.clientHeight/4+PxSpeed/2){
            NewLine()
            GameTime=0
            document.getElementById("fps").innerText='FPS: '+fps
        }
    }
}


//Configure variables for game


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



// Configure video

if (window.location.search){
    const urlParams = new URLSearchParams(window.location.search);
    ytid=urlParams.get('id')
}

document.getElementById('player').setAttribute('data-plyr-embed-id',ytid)
const player = new Plyr('#player',{
    muted:false,
    autoplay:false,
    youtube: {
            modestbranding: 1,  // Removes YouTube branding from the player
            rel: 0,              // Prevents showing related videos at the end
            showinfo: 0          // Hides the video title and uploader info
    }
});

window.player = player

player.on('ready', () => {
    setTimeout(()=>{
        document.getElementsByClassName('plyr__control')[1].click()
        
    },100)
    setTimeout(()=>{
        SetUpMusicinfo()
    },1000)
    
})



player.on('statechange',(e)=>{
    if (e.detail.code===1 && !adspassed){
        //Video is loaded
        document.getElementById('waitingScreen').style.opacity=0
        setTimeout(()=>{
            document.getElementById('waitingScreen').style.display='none'
        },500)
        
        console.log('Video loaded')

        //Change Speed
        ChangeSpeed(1)
        //Pause
        player.pause()
        //Mute
        document.getElementsByClassName('plyr__control')[1].click()

        //FixSeed('Hello World')
        FixSeed(ytid)

        adspassed=true
    }   
}) 



player.on('ended',(e)=>{
    console.log('end')
    playing=false
    FixSeed(ytid)
    changeTileInfo(0)
    document.getElementById('SpeedUpNumber').innerText=Number(document.getElementById('SpeedUpNumber').innerText)+1
    document.getElementById('SpeedUpNumber').setAttribute('data-text',document.getElementById('SpeedUpNumber').innerText)
    setTimeout(()=>{
        document.getElementById('SpeedUpDiv').style.opacity=1
    },3000)
    setTimeout(()=>{
        document.getElementById('SpeedUpDiv').style.opacity=0
    },6500)
    setTimeout(()=>{
        startTime=Date.now()
        playing=true
        ChangeSpeed(SpeedSteps[0])
        if (SpeedSteps.length>=1){
            PxSpeed=Math.round(DefaultPxSpeed*SpeedSteps[0])
            SpeedSteps.splice(0,1)
        }else{
            PxSpeed+=2
        }
    },8500)
})

