const canvastile = document.getElementById('canvastile')
const ctxt=canvastile.getContext('2d')
canvastile.width=window.innerWidth
canvastile.height=window.innerHeight

let index=0
let tileArray=[]




class TileElement{
    constructor(column,first=false){
        this.id=index
        index++
        this.first=first
        this.column=column-1
        this.x=this.column*(canvastile.width/4)

        if (!this.first){
            this.y=-canvastile.height/2
        }else{
            this.y=canvastile.height/4*2
        }
        
        this.width=canvastile.width/4
        this.height=canvastile.height/4

        this.radius=canvastile.height*0.05
        
        this.isSlider=false
        this.isFinish=false
        this.isClick=false
        this.sliderOffset=0

        this.touchid=null
    }

    update(){
        if (!this.first){
            this.y+=movement
        }
        if (this.isClick){
            this.sliderOffset+=movement
            this.sliderOffset=this.sliderOffset.clamp(0,this.height-canvastile.height/4)
            if (this.sliderOffset===this.height-canvastile.height/4 && !this.isFinish){
                this.isFinish=true
                scoretext.innerText=Number(scoretext.innerText)+2*this.size
            }
        }
    }

    drawRect(){
        ctxt.roundRect(this.x, this.y, this.width, this.height, [this.radius])
        
        ctxt.fillStyle='#1f0707'
        ctxt.fill()

        ctxt.strokeStyle='#ca36c3'
        ctxt.lineWidth=1
        ctxt.stroke()
    }

    draw(){
        ctxt.beginPath()
        ctxt.save()
        

        ctxt.shadowColor = '#292929'
        ctxt.shadowBlur = 0
        ctxt.shadowOffsetX = 0
        ctxt.shadowOffsetY = 15
        
        this.drawRect()

        ctxt.restore()
        
        this.drawRect()
        
        if (this.first){
            ctxt.font = 'bold 8vw "Titillium Web"'
            ctxt.fillStyle='white'
            ctxt.textAlign='center'
            ctxt.textBaseline='middle'
            ctxt.fillText('PLAY',this.x+this.width/2,this.y+this.height/2)
        }
        if (this.isSlider){
            ctxt.beginPath()
            ctxt.roundRect(this.x, this.y+this.height-canvastile.height/4-this.sliderOffset, canvastile.width/4,canvastile.height/4, [this.radius])
            
            ctxt.fillStyle='#fd32f3'
            ctxt.fill()

            if (this.isFinish){
                ctxt.beginPath()
                ctxt.font = '400 3vh "Titillium Web"'
                ctxt.fillStyle='white'
                ctxt.textAlign='center'
                ctxt.textBaseline='middle'
                
                const shadows = [
                    { offsetX: 1, offsetY: 1, blur: 2, color: 'rgb(88, 88, 88)' },
                    { offsetX: -1, offsetY: -1, blur: 2, color: 'rgb(88, 88, 88)' },
                    { offsetX: -1, offsetY: 1, blur: 2, color: 'rgb(88, 88, 88)' },
                    { offsetX: 1, offsetY: -1, blur: 2, color: 'rgb(88, 88, 88)' },
                    { offsetX: 1, offsetY: 1, blur: 1, color: 'rgb(253, 246, 180)' },
                    { offsetX: -1, offsetY: -1, blur: 1, color: 'rgb(253, 246, 180)' },
                    { offsetX: -1, offsetY: 1, blur: 1, color: 'rgb(253, 246, 180)' },
                    { offsetX: 1, offsetY: -1, blur: 1, color: 'rgb(253, 246, 180)' }
                ]

                shadows.forEach(shadow => {
                    ctxt.shadowColor = shadow.color
                    ctxt.shadowOffsetX = shadow.offsetX
                    ctxt.shadowOffsetY = shadow.offsetY
                    ctxt.shadowBlur = shadow.blur
                    ctxt.fillText("+"+String(2*this.size), this.x+this.width/2, this.y-canvastile.height*0.03)
                })

                ctxt.shadowColor = 'transparent';
                ctxt.shadowOffsetX = 0;
                ctxt.shadowOffsetY = 0;
                ctxt.shadowBlur = 0;

            }
        }
    }

    GrowUp(){
        if (this.height===canvastile.height/4){
            this.height+=canvastile.height/4
            this.y-=canvastile.height/4
            this.size=1
            
            this.isSlider=true
            // this.ActiveThumb()
        }else{
            this.height+=canvastile.height/4
            this.y-=canvastile.height/4
            this.size+=1
        }
        // this.style.transform='translateY('+String(Number(this.style.transform.substring(11,this.style.transform.length-3))-document.body.clientHeight/4)+"px)"

    }
}


function handleParticlesTile(){
    for (let i=0; i<tileArray.length; i++){
        tileArray[i].update()
        tileArray[i].draw()
        if (tileArray[i].y>=canvastile.height){
            if (!isGameOver){
                if (tileArray[i].sliderOffset===0){
                    GameOver(true,i)
                }else{
                    tileArray.splice(i,1)
                    i--
                }
            }
        }
    }
}

function createParticleTile(column,first){
    tileArray.push(new TileElement(column,first))
    return tileArray[tileArray.length-1]
}



let lastTime = 0;
let deltaTime = 1;
let targetFPS = 60;
let frameDuration = 1000 / targetFPS;
let movement=PxSpeed

function animateTileElement(timestamp){
    if (!lastTime) lastTime = timestamp

    if (timestamp - lastTime >= frameDuration) {
        deltaTime = (timestamp - lastTime) 
        movement=Math.ceil(deltaTime/ (1000/60)*PxSpeed)
        let r=deltaTime/ (1000/60)*PxSpeed-movement
        // lastTime=timestamp-(movement/PxSpeed)
        lastTime=timestamp
        ctxt.clearRect(0,0,canvastile.width,canvastile.height)

        handleParticlesTile()
        animateTilesMovement()
        
        if (isGameOver){
            deathOffset-=movement
            if (deathOffset>=deathBar){
                PxSpeed=0
            }
        }
    }
    requestAnimationFrame(animateTileElement)
}

createParticleTile(2,true)


animateTileElement()



/////////////////////////////////////////////////////////
// FUNCTIONS
/////////////////////////////////////////////////////////

function findid(id){
    for (let i in tileArray){
        if (tileArray[i].id===id){
            return tileArray[i]
        }
    }
}

// New line

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

function NewLine(){
    n=getRandomCol(lastTile)
    console.log('n: ',n)
    if (lastTile!==-1){
        if (n===lastTile){
            if (n>4){
                findid(lastTileid[0]).GrowUp()
                findid(lastTileid[1]).GrowUp()
            }else{
                findid(lastTileid[0]).GrowUp()
            }
            
        }else{
            lastTileid=[]
            lastTile=n
            if (n>4){
                let c={'5':['1','3'],'6':['2','4']}

                let tile1=createParticleTile(c[n][0])
                lastTileid.push(tile1.id)
                
                let tile2=createParticleTile(c[n][1])
                lastTileid.push(tile2.id)
            }else {
                let tile1=createParticleTile(n)
                lastTileid.push(tile1.id)
            }
        }
    }else{
        lastTileid=[]
        lastTile=n
        if (n>4){
            let c={'5':['1','3'],'6':['2','4']}
            let tile1=createParticleTile(c[n][0])
            lastTileid.push(tile1.id)
            
            let tile2=createParticleTile(c[n][1])
            lastTileid.push(tile2.id)
        }else {
            let tile1=createParticleTile(n)
            lastTileid.push(tile1.id)
        }

        
    }
}

function animateTilesMovement(){
    if (playing){
        GameTime+=movement
        if (GameTime>=document.body.clientHeight/4-(movement)/2){
            NewLine()
            GameTime=0
            document.getElementById("fps").innerText=' PxSpeed: '+PxSpeed
        }
    }
}


/////////////////////////////////////////////////////////
// ON CLICK EVENT
/////////////////////////////////////////////////////////


canvastile.addEventListener('mousedown',(ev)=>{
    console.log(ev)
    let wrong=true
    let tilesNear=null
    for (let i in tileArray){
        if (tileArray[i].constructor.name==='TileElement'){
            tileArray[i].isClick=false
            if (tileArray[i].isSlider){
                let x1=tileArray[i].x
                let x2=tileArray[i].x+tileArray[i].width
                let y1=tileArray[i].y+tileArray[i].height-canvastile.height/4-tileArray[i].sliderOffset-30
                let y2=tileArray[i].y+tileArray[i].height+30

                if (x1<ev.clientX && ev.clientX<x2 && y1<ev.clientY && ev.clientY<y2 && tileArray[i].sliderOffset===0){
                    let e=tileArray[i]
                    e.isClick=true
                    wrong=false

                    UpdateBar(e)
                }else{
                    if(y1<ev.clientY && ev.clientY<y2 && tileArray[i].sliderOffset===0){
                        tilesNear=tileArray[i]
                        console.log('slider near')
                    }
                }
            }else{
                let x1=tileArray[i].x
                let x2=tileArray[i].x+tileArray[i].width
                let y1=tileArray[i].y-30
                let y2=tileArray[i].y+tileArray[i].height+30

                if (x1<ev.clientX && ev.clientX<x2 && y1<ev.clientY && ev.clientY<y2){
                    let e=tileArray[i]
                    tileArray.splice(i,1)
                    i--
                    wrong=false

                    UpdateBar(e)
                    addEmitterExplosion(e.x+e.width/2,e.y+e.height/2)
                    addEmitterTile(e.x,e.y,e.width,e.height,e.radius)

                    vibrer()

                    if (e.first){
                        setTimeout(()=>{
                            playing=true
                            ChangeSpeed(1)
                            player.embed.unMute()
                        },0)
                    }
                }else{
                    if(y1<ev.clientY && ev.clientY<y2){
                        tilesNear=tileArray[i]
                        console.log('tile near')
                    }
                }
            }
        }
    }

    if (wrong && tilesNear!==null){
        GameOver(false,[ev.clientX,tilesNear.y,tilesNear.height])
    }
})

canvastile.addEventListener('mouseup',(e)=>{
    for (let i in tileArray){
        tileArray[i].isClick=false
    }
})


canvastile.addEventListener('touchstart',(ev)=>{
    for (let i in tileArray){
        if (tileArray[i].isSlider){
            let x1=tileArray[i].x
            let x2=tileArray[i].x+tileArray[i].width
            let y1=tileArray[i].y+tileArray[i].height-canvastile.height/4-tileArray[i].sliderOffset
            let y2=tileArray[i].y+tileArray[i].height+30

            if (x1<ev.changedTouches[0].clientX && ev.changedTouches[0].clientX<x2 && y1<ev.changedTouches[0].clientY && ev.changedTouches[0].clientY<y2 && tileArray[i].sliderOffset===0){
                let e=tileArray[i]
                e.isClick=true
 
                e.touchid=ev.changedTouches[0].identifier

                UpdateBar(e)
            }
        }else{
            let x1=tileArray[i].x
            let x2=tileArray[i].x+tileArray[i].width
            let y1=tileArray[i].y-30
            let y2=tileArray[i].y+tileArray[i].height+30

            if (x1<ev.changedTouches[0].clientX && ev.changedTouches[0].clientX<x2 && y1<ev.changedTouches[0].clientY && ev.changedTouches[0].clientY<y2){
                let e=tileArray[i]
                tileArray.splice(i,1)
                i--

                if (!e.first){
                    UpdateBar(e)
                }
                addEmitterExplosion(e.x+e.width/2,e.y+e.height/2)
                addEmitterTile(e.x,e.y,e.width,e.height,e.radius)

                vibrer()

                if (e.first){
                    setTimeout(()=>{
                        playing=true
                        ChangeSpeed(1)
                        player.embed.unMute()
                    },0)
                }
            }
        }
    }
})

canvastile.addEventListener('touchend',(ev)=>{
    for (let i in tileArray){
        if (tileArray[i].touchid===ev.changedTouches[0].identifier){
            tileArray[i].isClick=false
        }
    }
})



class TileError{
    constructor(column,y,height){
        this.column=column
        this.x=this.column*(canvastile.width/4)
        this.y=y
        
        this.width=canvastile.width/4
        this.height=height+15

        this.radius=canvastile.height*0.05

        //For don't trigger game over
        this.sliderOffset=1
    }

    update(){
        this.y+=movement
    }

    drawRect(){
        ctxt.roundRect(this.x, this.y, this.width, this.height, [0])
        
        ctxt.fillStyle='rgba(186, 13, 13, 0.4)'
        ctxt.fill()

        ctxt.strokeStyle='rgba(234, 108, 108, 0.4)'
        ctxt.lineWidth=1
        ctxt.stroke()
    }

    draw(){
        ctxt.beginPath()
        ctxt.save()
        
        ctxt.shadowColor = 'rgba(41, 41, 41, 0)'
        ctxt.shadowBlur = 0
        ctxt.shadowOffsetX = 0
        ctxt.shadowOffsetY = 15
        
        this.drawRect()

        ctxt.restore()
        
        this.drawRect()
        
        if (this.first){
            ctxt.font = 'bold 8vw "Titillium Web"'
            ctxt.fillStyle='white'
            ctxt.textAlign='center'
            ctxt.textBaseline='middle'
            ctxt.fillText('PLAY',this.x+this.width/2,this.y+this.height/2)
        }
    }
}


let isGameOver=false
let deathOffset=0
let deathBar
function GameOver(isTile,a){
    playing=false
    isGameOver=true
    
    player.pause()
    UpdateDB((content)=>{

        content.accounts[username].musics.forEach(ytm => {
            if (ytm.ytid===ytid){
                if (ytm.pb<document.getElementById('text-Score').innerText){
                    content.accounts[username].musics[content.accounts[username].musics.indexOf(ytm)].pb=document.getElementById('text-Score').innerText
                }else{
                    return 0
                }
                
            }
        })

        if (Number(content.allytmusic[ytid].wr)<document.getElementById('text-Score').innerText){
            content.allytmusic[ytid].wr=document.getElementById('text-Score').innerText
        }

        return content
    })

    document.getElementsByClassName('transparentdiv')[0].style.display='block'
    if (!isTile){
        PxSpeed=0
        tileArray.splice(0,0,new TileError(Math.ceil(a[0]/(canvastile.width/4))-1,a[1],a[2]))
        setTimeout(()=>{
                SaveScore()
        },1500)
    }else{
        PxSpeed=0
        let h=tileArray[a].height
        deathBar=(canvastile.height-BarY)+h-canvastile.height/8
        setTimeout(() => {
            tileArray.push(new TileError(tileArray[a].column,tileArray[a].y,tileArray[a].height))
            PxSpeed=-10
            setTimeout(()=>{
                SaveScore()
            },2000)
        }, 500);
        
    }
    
}

function SaveScore(){
    console.log('finish')
    open(location.href.replace(/&score=[0-9]+/i,"").replace(/&stars=[0-9]+/i,"")+'&score='+document.getElementById('text-Score').innerText+'&stars='+document.getElementById('SpeedUpNumber').innerText,'_self')
}