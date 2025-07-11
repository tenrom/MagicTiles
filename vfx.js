
const canvas2 = document.getElementById('canvas2')
const ctx2=canvas2.getContext('2d')
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



const canvas3 = document.getElementById('canvas3')
const ctx3=canvas3.getContext('2d')
canvas3.width=window.innerWidth
canvas3.height=window.innerHeight


let BarY=document.body.clientHeight/8*5
ctx3.beginPath()
ctx3.lineWidth=5
ctx3.moveTo(0, BarY)
ctx3.lineTo(document.body.clientWidth, BarY)
ctx3.strokeStyle='white'
ctx3.stroke()


function UpdateBar(id){
    let t=document.getElementById(id).getBoundingClientRect()
    let hitmargin=window.getComputedStyle(document.body).getPropertyValue('--hit-margin')

    let a=t.y+Number(hitmargin.slice(0,hitmargin.length-2))
    let b=t.y+t.height-Number(hitmargin.slice(0,hitmargin.length-2))

    // DEBUG
    // ctx3.beginPath()
    // ctx3.arc(t.x+t.width/2,a,10,0,Math.PI*2)
    // ctx3.arc(t.x+t.width/2,b,10,0,Math.PI*2)
    // ctx3.fillStyle = 'orange'
    // ctx3.fill()

    if (BarY<a || b<BarY){
        ctx3.clearRect(0,0,canvas3.width,canvas3.height)
        BarY=((a+b)/2).clamp(document.body.clientHeight/4*0.8,document.body.clientHeight*0.8)
        ctx3.beginPath()
        ctx3.lineWidth=5
        ctx3.moveTo(0, BarY)
        ctx3.lineTo(document.body.clientWidth, BarY)
        ctx3.strokeStyle='white'
        ctx3.stroke()
    }
}