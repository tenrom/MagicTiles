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
            this.y+=PxSpeed
        }
        if (this.isClick){
            this.sliderOffset+=PxSpeed
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
            tileArray.splice(i,1)
            i--
        }
    }
}

function createParticleTile(column,first){
    tileArray.push(new TileElement(column,first))
    return tileArray[tileArray.length-1]
}


function animateTileElement(){
    ctxt.clearRect(0,0,canvastile.width,canvastile.height)
    
    handleParticlesTile()

    requestAnimationFrame(animateTileElement)
}

createParticleTile(2,true)


animateTileElement()




// On click

// canvastile.addEventListener('mousedown',(e)=>{

//     for (let i in tileArray){
//         tileArray[i].isClick=false
//         if (tileArray[i].isSlider){
//             let x1=tileArray[i].x
//             let x2=tileArray[i].x+tileArray[i].width
//             let y1=tileArray[i].y+tileArray[i].height-canvastile.height/4
//             let y2=tileArray[i].y+tileArray[i].height+30

//             if (x1<e.clientX && e.clientX<x2 && y1<e.clientY && e.clientY<y2){
//                 let e=tileArray[i]
//                 e.isClick=true

//                 UpdateBar(e)
//             }
//         }else{
//             let x1=tileArray[i].x
//             let x2=tileArray[i].x+tileArray[i].width
//             let y1=tileArray[i].y-30
//             let y2=tileArray[i].y+tileArray[i].height+30

//             if (x1<e.clientX && e.clientX<x2 && y1<e.clientY && e.clientY<y2){
//                 let e=tileArray[i]
//                 tileArray.splice(i,1)
//                 i--

//                 UpdateBar(e)
//                 addEmitterExplosion(e.x+e.width/2,e.y+e.height/2)
//                 addEmitterTile(e.x,e.y,e.width,e.height,e.radius)

//                 vibrer()

//                 if (e.first){
//                     setTimeout(()=>{
//                         playing=true
//                         PxSpeed=DefaultPxSpeed
//                         ChangeSpeed(1)
//                         player.embed.unMute()
//                     },0)
//                 }
//             }
//         }
//     }
// })

// canvastile.addEventListener('mouseup',(e)=>{
//     for (let i in tileArray){
//         tileArray[i].isClick=false
//     }
// })


canvastile.addEventListener('touchstart',(ev)=>{
    for (let i in tileArray){
        if (tileArray[i].isSlider){
            let x1=tileArray[i].x
            let x2=tileArray[i].x+tileArray[i].width
            let y1=tileArray[i].y+tileArray[i].height-canvastile.height/4
            let y2=tileArray[i].y+tileArray[i].height+30

            if (x1<ev.changedTouches[0].clientX && ev.changedTouches[0].clientX<x2 && y1<ev.changedTouches[0].clientY && ev.changedTouches[0].clientY<y2){
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

                UpdateBar(e)
                addEmitterExplosion(e.x+e.width/2,e.y+e.height/2)
                addEmitterTile(e.x,e.y,e.width,e.height,e.radius)

                vibrer()

                if (e.first){
                    setTimeout(()=>{
                        playing=true
                        PxSpeed=DefaultPxSpeed
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






function findid(id){
    for (let i in tileArray){
        if (tileArray[i].id===id){
            return tileArray[i]
        }
    }
}