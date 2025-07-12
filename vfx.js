
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
        a=t.y-(document.body.clientHeight/16)
        b=t.y+t.height+(document.body.clientHeight/16)
    }else{
        t=document.getElementById(id).getBoundingClientRect()
        a=t.y+Number(hitmargin.slice(0,hitmargin.length-2))-(document.body.clientHeight/16)
        b=t.y+t.height-Number(hitmargin.slice(0,hitmargin.length-2))+(document.body.clientHeight/16)
    }
    
    // DEBUG
    // ctx3.beginPath()
    // ctx3.arc(t.x+t.width/2,a,10,0,Math.PI*2)
    // ctx3.arc(t.x+t.width/2,b,10,0,Math.PI*2)
    // ctx3.fillStyle = 'orange'
    // ctx3.fill()

    if (BarY<a || b<BarY){
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
})



function changeTileInfo(n){
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

changeTileInfo(1)

function UpdateMult(){
    multtext.innerText='x'+multperfect
}