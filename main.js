//--------------------------------------------------------------------//
// Play Pause      |      player.play() / player.pause()              //
// Reset           |      player.restart()                            //
// Change Speed    |      player.media.playbackRate=2                 //
// Mute/Unmute     |      player.embed.Mute() / player.embed.unMute() //
//--------------------------------------------------------------------//


// FUNCTIONS

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

function BackHome(){
    open(String(window.location).split('/').slice(0,-1).join("/")+'/addmusic.html?id='+ytid,'_self')
}

function checkVideoData(n) {
    const videoData = player.embed.getVideoData()
    if (videoData.author) {
        document.getElementsByClassName('plyr__control')[1].click()
        SetUpMusicinfo()
    } else {
        if (n===20){
            document.getElementById('LoadingDiv').innerHTML=`The Video take too much time to load.<br>Please check your connection<br>and the validity of the id/url.<button class="buttonBack" onclick="BackHome()">Home</button>`
            return 0
        }
        setTimeout(()=>{checkVideoData(n+1)}, 500)
    }
}

/////////////////////////////////////////////////////////
// Configure video
/////////////////////////////////////////////////////////

// Create player
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
    }
});

window.player = player


// Add events
player.on('ready', () => {
    player.restart()
    checkVideoData(0)
})

player.on('statechange',(e)=>{
    if (e.detail.code===1 && !adspassed){
        //Video is loaded
        document.getElementById('waitingScreen').style.opacity=0
        setTimeout(()=>{
            document.getElementById('waitingScreen').style.display='none'
        },500)
        
        console.log('Video loaded')
        
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
        changeTileInfo(0)
        document.getElementById('SpeedUpDiv').style.opacity=1
    },3000)
    setTimeout(()=>{
        document.getElementById('SpeedUpDiv').style.opacity=0
    },6500)
    setTimeout(()=>{
        startTime=Date.now()
        playing=true
        ChangeSpeed(SpeedSteps[1])
        if (SpeedSteps.length>=1){
            PxSpeed=Math.round(DefaultPxSpeed*SpeedSteps[1])
            SpeedSteps.splice(0,1)
        }else{
            PxSpeed+=2
        }
    },8500)
})

