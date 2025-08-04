function rand(min,max){
    return Math.random()*(max-min)+min
}


const canvas = document.getElementById('canvas1')
const ctx=canvas.getContext('2d')
canvas.width=window.innerWidth
canvas.height=window.innerHeight

const buttonsElements=document.querySelectorAll('.button')
let buttonMeasurements = []

function measureButtons(){
    buttonMeasurements=[];
    buttonsElements.forEach(button => {
        buttonMeasurements.push(button.getBoundingClientRect())
    })
}

measureButtons()


let particlesArray=[]
class Particle {
    constructor(x,y,size){
        this.x=x
        this.y=y
        this.size=size
        this.weight=rand(1.5,3)
        this.directionX = rand(-2,2)
    }
    update(){
        this.y -= this.weight
        this.x += this.directionX
        if (this.size >= 0.3) this.size -=0.2
    }
    draw(){
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
        ctx.fillStyle = 'orange'
        ctx.fill()
    }
}

let activebutton = -1
buttonsElements.forEach(btn => btn.addEventListener('mouseenter',()=>{
    activebutton=btn.dataset.number
}))

buttonsElements.forEach(btn => btn.addEventListener('mouseleave',()=>{
    activebutton=-1
}))

function handleParticles(){
    for (let i=0; i<particlesArray.length; i++){
        particlesArray[i].update()
        particlesArray[i].draw()
        if (particlesArray[i].size=== 0.3){
            particlesArray.splice(i,1)
            i--
        }
    }
}

function createParticle(){
    if (activebutton>-1){
        let size = rand(10,50)
        let x=rand(0,buttonMeasurements[activebutton].width- size*2)+buttonMeasurements[activebutton].x+ size
        let y=buttonMeasurements[activebutton].y+40
        particlesArray.push(new Particle(x,y,size))

    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    createParticle()
    handleParticles()
    requestAnimationFrame(animate)
}

animate()


window.addEventListener('resize',()=>{
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    measureButtons()
})