

class TileElement extends HTMLElement{
    constructor(){
        
        super()
    }
    OnClickTile(){
        console.log("destroy")
        
        vibrer()
        clearInterval(this.idTimer)
        this.remove()

    }
    MoveDown(){
        // console.log(this.style.transform)
        this.style.transform='translateY('+String(Number(this.style.transform.substring(11,this.style.transform.length-3))+PxSpeed)+"px)"
    }
    GrowUp(){
        if (!this.style.height){
            this.style.height="50%"
        }else{
            this.style.height="calc(25% + "+this.style.height+")"
        }

        this.style.transform='translateY('+String(Number(this.style.transform.substring(11,this.style.transform.length-3))-document.body.clientHeight/4)+"px)"        
    }
    connectedCallback(){
        
        this.classList.add('tile')

        this.addEventListener('mousedown',()=>{this.OnClickTile()})
        this.style.gridColumn=this.getAttribute('column')
        this.style.gridRow=1

        console.log('hello')
        
        if (!this.style.transform){
            this.style.transform=`translateY(${-document.body.clientHeight/4}px)`
        }
        this.goUp=false
        this.idTimer=setInterval(()=>{
            this.MoveDown()
            if (Number(this.style.transform.substring(11,this.style.transform.length-3))>=document.body.clientHeight){
                clearInterval(this.idTimer)
                this.remove()
            }

            if (Number(this.style.transform.substring(11,this.style.transform.length-3))>=-PxSpeed && Number(this.style.transform.substring(11,this.style.transform.length-3))<0){
                NewLine()
            }
        },10)
    }
}

window.customElements.define("game-tile",TileElement)