function LoadMusic(){
    let id=document.getElementById('ytid').value
    if (id) open(String(window.location).replace(window.location.pathname,'')+'/main.html?id='+id,'_self')
}

document.getElementById('loadbtn').addEventListener('click',LoadMusic)



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

window.addEventListener('resize',()=>{
    createColumnLines()
})