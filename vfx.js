
const canvas2 = document.getElementById('canvas2')
const ctx2=canvas2.getContext('2d')


function createColumnLines(){
    canvas2.width=window.innerWidth
    canvas2.height=window.innerHeight


    for (let i=1;i<4;i++){
        ctx2.beginPath()
        ctx2.lineWidth=1
        ctx2.moveTo((document.body.clientWidth/4)*i, 0)
        ctx2.lineTo((document.body.clientWidth/4)*i, document.body.clientHeight)
        ctx2.strokeStyle='white'
        ctx2.stroke()

    }   
}

createColumnLines()



const canvas3 = document.getElementById('canvas3')
const ctx3=canvas3.getContext('2d')
let BarY=document.body.clientHeight/8*5

function createBar(){
    canvas3.width=window.innerWidth
    canvas3.height=window.innerHeight

    ctx3.clearRect(0,0,canvas3.width,canvas3.height)
    ctx3.beginPath()
    ctx3.lineWidth=5
    ctx3.moveTo(0, BarY)
    ctx3.lineTo(document.body.clientWidth, BarY)
    ctx3.strokeStyle='white'
    ctx3.stroke()
}

createBar()

function UpdateBar(id){
    let t=null
    let hitmargin=window.getComputedStyle(document.body).getPropertyValue('--hit-margin')
    let a=null
    let b=null
    if (document.getElementById(id).getElementsByClassName('thumb')[0]){
        t=document.getElementById(id).getElementsByClassName('thumb')[0].getBoundingClientRect()
        a=t.y-(document.body.clientHeight/8)*0.8
        b=t.y+t.height+(document.body.clientHeight/8)*0.8
    }else{
        t=document.getElementById(id).getBoundingClientRect()
        a=t.y+Number(hitmargin.slice(0,hitmargin.length-2))-(document.body.clientHeight/8)**0.8
        b=t.y+t.height-Number(hitmargin.slice(0,hitmargin.length-2))+(document.body.clientHeight/8)*0.8
    }
    
    // DEBUG
    // ctx3.beginPath()
    // ctx3.arc(t.x+t.width/2,a,10,0,Math.PI*2)
    // ctx3.arc(t.x+t.width/2,b,10,0,Math.PI*2)
    // ctx3.fillStyle = 'orange'
    // ctx3.fill()

    if ((BarY<a && BarY!==document.body.clientHeight*0.8) || (b<BarY && BarY!==document.body.clientHeight/4*0.8)){
        // COOL
        changeTileInfo(1)
        multperfect=0
        UpdateMult()
        scoretext.innerText=Number(scoretext.innerText)+1
        
        // Move bar
        BarY=((a+b)/2).clamp(document.body.clientHeight/4*0.8,document.body.clientHeight*0.8)
        createBar()
    }else{
        if (t.y<=BarY && BarY<=t.y+t.height){
            // PERFECT
            changeTileInfo(3)
            multperfect++
            UpdateMult()
            scoretext.innerText=Number(scoretext.innerText)+3
        }else{
            // GREAT
            changeTileInfo(2)
            multperfect=0
            UpdateMult()
            scoretext.innerText=Number(scoretext.innerText)+2
        }
    }
}


window.addEventListener('resize',()=>{
    createColumnLines()
    createBar()
    canvas1.width=window.innerWidth
    canvas1.height=window.innerHeight
    canvas4.width=window.innerWidth
    canvas4.height=window.innerHeight
})



function changeTileInfo(n){
    if (n===0){
        document.getElementById('info1').style.display='none'
        document.getElementById('info2').style.display='none'
        document.getElementById('info3').style.display='none'
        document.getElementById('text-mult').style.display='none'
    }
    if (n===1){
        document.getElementById('info1').style.display='block'
        document.getElementById('info2').style.display='none'
        document.getElementById('info3').style.display='none'
        document.getElementById('text-mult').style.display='none'
    }
    if (n===2){
        document.getElementById('info1').style.display='none'
        document.getElementById('info2').style.display='block'
        document.getElementById('info3').style.display='none'
        document.getElementById('text-mult').style.display='none'
    }
    if (n===3){
        document.getElementById('info1').style.display='none'
        document.getElementById('info2').style.display='none'
        document.getElementById('info3').style.display='block'
        document.getElementById('text-mult').style.display='block'
    }
}

changeTileInfo(0)

function UpdateMult(){
    multtext.innerText='x'+multperfect
}


// Visual Effects

function rand(min,max){
    return Math.random()*(max-min)+min
}

const canvas1 = document.getElementById('canvas1')
const ctx1=canvas1.getContext('2d')
canvas1.width=window.innerWidth
canvas1.height=window.innerHeight


let emittersArray=[]

class FontainParticle {
    constructor(x,y,size,color,weight,directionX,coefscale){
        this.x=x
        this.y=y
        this.size=size
        this.color=color
        this.weight=weight
        this.directionX=directionX
        this.coefscale=coefscale
    }
    update(){
        this.y += this.weight
        this.x += this.directionX
        if (this.size >= this.coefscale) this.size -= this.coefscale
    }
    draw(){
        ctx1.beginPath()
        ctx1.arc(this.x,this.y,this.size,0,Math.PI*2)
        ctx1.strokeStyle = this.color
        ctx1.lineWidth=2
        ctx1.stroke()
    }
}


function handleParticles(emitter){
    for (let i=0; i<emittersArray[emitter].length; i++){
        emittersArray[emitter][i].update()
        emittersArray[emitter][i].draw()
        if (emittersArray[emitter][i].size<=emittersArray[emitter][i].coefscale){
            emittersArray[emitter].splice(i,1)
            i--
        }
    }
}

function createParticle(x,y,size,color,weight,directionX,coefscale,emitter){
    size = rand(size[0],size[size.length-1])
    x=rand(x[0],x[x.length-1])
    y=rand(y[0],y[y.length-1])
    weight=rand(weight[0],weight[weight.length-1])
    directionX=rand(directionX[0],directionX[directionX.length-1])
    emittersArray[emitter].push(new FontainParticle(x,y,size,color,weight,directionX,coefscale))
}

function animate(){
    ctx1.clearRect(0,0,canvas1.width,canvas1.height)
    
    for (let emitter=0;emitter<emittersArray.length;emitter++){
        handleParticles(emitter)
    }
    
    requestAnimationFrame(animate)
}

function addEmitterExplosion(x,y){
    let l=emittersArray.push([])
    for (let i=0;i<30;i++){
        let r=rand(0,2*Math.PI)
        let rayonmin=(Math.min(document.body.clientHeight/4,document.body.clientWidth/4)-50).clamp(0,999999)
        let rayonmax=Math.min(document.body.clientHeight/4,document.body.clientWidth/4)
        let rrand=rand(1,3)
        createParticle([rand(Math.cos(r)*rayonmin,Math.cos(r)*rayonmax)+x],[rand(Math.sin(r)*rayonmin,Math.sin(r)*rayonmax)+y],[5,10],'white',[rrand*Math.cos(r)*Math.tan(r)],[rrand*Math.cos(r)],0.3,l-1)
    }
}

animate()

// TILES



const canvas4 = document.getElementById('canvas4')
const ctx4=canvas4.getContext('2d')
canvas4.width=window.innerWidth
canvas4.height=window.innerHeight

let emittersArrayTile=[]







class TileParticle {
    constructor(x,y,width,height,radius,color,opacity,coefscale,heightmax,strokewidth){
        this.x=x
        this.y=y
        this.width=width
        this.defaultheight=height
        this.height=height
        this.radius=radius
        this.color=color
        this.coefscale=coefscale
        this.heightmax=heightmax
        this.strokewidth=strokewidth
        this.opacity=opacity
    }
    update(){
        if (this.coefscale!==0){
            if ((this.defaultheight < this.heightmax && this.height <= this.heightmax) || (this.defaultheight > this.heightmax && this.height >= this.heightmax)){
                this.rapport=this.width/this.height
                this.height += this.coefscale
                this.width = this.height*this.rapport
                this.x -= (this.coefscale*this.rapport)/2
                this.y -= this.coefscale/2

                this.rapportangle=this.radius/this.height
                this.radius=(this.radius+this.coefscale*this.rapportangle).clamp(0,999999)
            }
        }
        if (Number(this.color.replaceAll('rgba(','').replaceAll(')','').split(',')[3])!==0){
            let oldopacity=Number(this.color.replaceAll('rgba(','').replaceAll(')','').split(',')[3])
            let newopacity=oldopacity-this.opacity.clamp(0,5)
            this.color=this.color.replaceAll(')','').slice(0,this.color.replaceAll(')','').length-String(oldopacity).length)+newopacity+')'
        }
    }
    draw(){
        ctx4.beginPath()
        ctx4.roundRect(this.x, this.y, this.width, this.height, [this.radius])
        if (this.strokewidth===-1){
            ctx4.fillStyle=this.color
            ctx4.fill()
        }else{
            ctx4.strokeStyle=this.color
            ctx4.lineWidth=this.strokewidth
            ctx4.stroke()
        }
    }
}


function handleTileParticles(emitter){
    for (let i=0; i<emittersArrayTile[emitter].length; i++){
        emittersArrayTile[emitter][i].update()
        emittersArrayTile[emitter][i].draw()
        if (emittersArrayTile[emitter][i].height<=emittersArrayTile[emitter][i].coefscale){
            emittersArrayTile[emitter].splice(i,1)
            i--
        }
    }
}

function createTileParticle(x,y,width,height,radius,color,opacity,coefscale,heightmax,strokewidth,emitter){
    x=rand(x[0],x[x.length-1])
    y=rand(y[0],y[y.length-1])
    emittersArrayTile[emitter].push(new TileParticle(x,y,width,height,radius,color,opacity,coefscale,heightmax,strokewidth))
}

function animateTile(){
    ctx4.clearRect(0,0,canvas4.width,canvas4.height)
    
    for (let emitter=0;emitter<emittersArrayTile.length;emitter++){
        handleTileParticles(emitter)
    }
    
    requestAnimationFrame(animateTile)
}

function addEmitterTile(element){
    let bound=element.getBoundingClientRect()
    let l=emittersArrayTile.push([])
    let radius=getComputedStyle(element).borderRadius
    createTileParticle([bound.x], [bound.y],bound.width, bound.height,Number(radius.slice(0,radius.length-2)),'rgba(255,255,255,1.2)',0.05,3,bound.height,-1,0,l-1)

    createTileParticle([bound.x], [bound.y],bound.width, bound.height,Number(radius.slice(0,radius.length-2)),'rgba(255,255,255,1.2)',0.015,-5,2,-1,0,l-1)

    createTileParticle([bound.x], [bound.y],bound.width, bound.height,Number(radius.slice(0,radius.length-2)),'rgba(255,255,255,1.2)',0.04,0,bound.height,12,0,l-1)

    createTileParticle([bound.x], [bound.y],bound.width, bound.height,Number(radius.slice(0,radius.length-2)),'rgba(255,255,255,1.2)',0.04,3,bound.height*1.6,4,0,l-1)
}



animateTile()
