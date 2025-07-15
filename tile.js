

class TileElement extends HTMLElement{
    constructor(){
        
        super()
    }
    OnClickTile(e){
        //Optimisation
        if (isMobile) {
            this.removeEventListener('touchstart',this.OnClickTile)
        }else{
            this.removeEventListener('mousedown',this.OnClickTile)
        }

        if (this.getAttribute('first')!=="true"){
            vibrer()
            cancelAnimationFrame(this.idTimer)
            UpdateBar(this.id)
            addEmitterExplosion(e.target.getBoundingClientRect().x+e.target.getBoundingClientRect().width/2,e.target.getBoundingClientRect().y+e.target.getBoundingClientRect().height/2)
            addEmitterTile(this.querySelector('div'))
            //Remove
            this.style.display='none'
            queue.push(this.id)
        }else{
            vibrer()
            playing=true
            PxSpeed=10
            document.getElementsByClassName('plyr__control')[0].click()
            player.embed.unMute()
            addEmitterExplosion(e.target.getBoundingClientRect().x+e.target.getBoundingClientRect().width/2,e.target.getBoundingClientRect().y+e.target.getBoundingClientRect().height/2)
            addEmitterTile(this.querySelector('div'))
            //Remove
            this.remove()
        }

    }
    // MoveDown(){
    //     this.style.transform='translateY('+String(Number(this.style.transform.substring(11,this.style.transform.length-3))+PxSpeed)+"px)"
        
    //     if (this.style.height){
    //         if (this.istouch){
                
    //             let t=this.getElementsByClassName('thumb')[0]
    //             let n=(Number(t.style.transform.substring(11,t.style.transform.length-3))-PxSpeed).clamp((-this.size*(document.body.clientHeight/4)),0)
    //             t.style.transform='translateY('+String(n)+"px)"

    //             if (this.istouch){
    //                 if (t.getBoundingClientRect().y<=this.querySelector("div").getBoundingClientRect().y+2 && t.getBoundingClientRect().y!==0 && !completeSliderids.includes(this.id)){
    //                     scoretext.innerText=Number(scoretext.innerText)+2*this.size
    //                     this.getElementsByClassName('ptsSliderInfo')[0].innerText="+"+2*this.size
    //                     this.getElementsByClassName('ptsSliderInfo')[0].style.opacity=1
    //                     completeSliderids.push(this.id)
    //                 }   
    //             }
    //         }
    //     }
    // }
    MoveDownSmooth(){

        this.style.transform='translateY('+String(Number(this.style.transform.substring(11,this.style.transform.length-3))+PxSpeed)+"px)"
        
        if (this.style.height){
            if (this.istouch){
                
                let t=this.getElementsByClassName('thumb')[0]
                let n=(Number(t.style.transform.substring(11,t.style.transform.length-3))-PxSpeed).clamp((-this.size*(document.body.clientHeight/4)),0)
                t.style.transform='translateY('+String(n)+"px)"

                if (this.istouch){
                    if (t.getBoundingClientRect().y<=this.querySelector("div").getBoundingClientRect().y+2 && t.getBoundingClientRect().y!==0 && !completeSliderids.includes(this.id)){
                        scoretext.innerText=Number(scoretext.innerText)+2*this.size
                        this.getElementsByClassName('ptsSliderInfo')[0].innerText="+"+2*this.size
                        this.getElementsByClassName('ptsSliderInfo')[0].style.opacity=1
                        this.getElementsByClassName('ptsSliderInfo')[0].style.display='block'
                        completeSliderids.push(this.id)
                    }   
                }
            }
        }


        if (Number(this.style.transform.substring(11,this.style.transform.length-3))>=document.body.clientHeight){
            cancelAnimationFrame(this.idTimer)

            //Optimisation
            if (!this.getElementsByClassName('thumb')[0] || this.getElementsByClassName('thumb')[0].display==='none'){
                if (isMobile) {
                    this.removeEventListener('touchstart',this.OnClickTile)
                }else{
                    this.removeEventListener('mousedown',this.OnClickTile)
                }
            }else{
                this.DisableThumb()
            }

            //Remove
            this.style.display='none'
            queue.push(this.id)
            return 0
        }
        this.idTimer=requestAnimationFrame(()=>{this.MoveDownSmooth()})
    }
    // EventTouchStart(e){
    //     this.istouch=true
    //     this.removeEventListener('touchstart',this.EventTouchStart)
    //     activeid.push(this.parentElement.parentElement.id)
    //     UpdateBar(this.parentElement.parentElement.id)
    // }
    // EventTouchEnd(e){
    //     this.istouch=false
    //     activeid.splice(activeid.indexOf(this.parentElement.parentElement.id),this.parentElement.parentElement.id)
    //     clickids.push(this.parentElement.parentElement.id)
    // }
    // EventMouseDown(e){
    //     this.istouch=true
    //     this.removeEventListener('mousedown',this.EventMouseDown)
    //     activeid.push(this.parentElement.parentElement.id)
    //     UpdateBar(this.parentElement.parentElement.id)
    // }
    // EventMouseUp(e){
    //     this.istouch=false
    //     activeid.splice(activeid.indexOf(this.parentElement.parentElement.id),this.parentElement.parentElement.id)
    //     clickids.push(this.parentElement.parentElement.id)
    // }

    ActiveThumb(e){

        this.thumb=this.getElementsByClassName('thumb')[0]  

        let e1=(e)=>{
            this.istouch=true
            this.thumb.removeEventListener('mousedown',e1)
            activeid.push(this.id)
            UpdateBar(this.id)
        }
        let e2=(e)=>{
            this.istouch=true
            this.thumb.removeEventListener('touchstart',e2)
            activeid.push(this.id)
            UpdateBar(this.id)
        }

        if (isMobile) {
            this.removeEventListener('touchstart',this.OnClickTile)
            this.thumb.addEventListener('touchstart',e2)

            this.thumb.addEventListener('touchend',(e)=>{
                this.istouch=false
                activeid.splice(activeid.indexOf(this.id),this.id)
                clickids.push(this.id)
            })
        }else{
            this.removeEventListener('mousedown',this.OnClickTile)
            this.thumb.addEventListener('mousedown',e1)

            this.thumb.addEventListener('mouseup',(e)=>{
                this.istouch=false
                activeid.splice(activeid.indexOf(this.id),this.id)
                clickids.push(this.id)
            })
            this.thumb.addEventListener('mouseleave',(e)=>{
                this.istouch=false
                activeid.splice(activeid.indexOf(this.id),this.id)
                clickids.push(this.id)
            })
        }
    }
    GrowUp(){
        if (!this.style.height || this.style.height==="25%"){
            this.style.height="50%"
            this.size=1

            // this.querySelector('div').innerHTML=`
            //     <div class='thumb' style='height:${document.body.clientHeight/4}px;'></div>
            //     <div class='ptsSliderInfo titillium-web-bold'></div>
            // `

            this.querySelector('div').getElementsByClassName('thumb')[0].style.display='block'
            this.querySelector('div').getElementsByClassName('ptsSliderInfo')[0].style.display='block'

            this.thumb=this.getElementsByClassName('thumb')[0]
            
            this.ActiveThumb()
        }else{
            this.style.height="calc(25% + "+this.style.height+")"
            this.size+=1
        }
        this.style.transform='translateY('+String(Number(this.style.transform.substring(11,this.style.transform.length-3))-document.body.clientHeight/4)+"px)"

    }
    DisableThumb(){
        this.thumb=this.getElementsByClassName('thumb')[0]  

        let e1=(e)=>{
            this.istouch=true
            this.thumb.removeEventListener('mousedown',e1)
            activeid.push(this.id)
            UpdateBar(this.id)
        }
        let e2=(e)=>{
            this.istouch=true
            this.thumb.removeEventListener('touchstart',e2)
            activeid.push(this.id)
            UpdateBar(this.id)
        }

        if (isMobile) {
            this.thumb.removeEventListener('touchstart',e2)

            this.thumb.removeEventListener('touchend',(e)=>{
                this.istouch=false
                activeid.splice(activeid.indexOf(this.id),this.id)
                clickids.push(this.id)
            })
        }else{
            this.thumb.removeEventListener('mousedown',e1)

            this.thumb.removeEventListener('mouseup',(e)=>{
                this.istouch=false
                activeid.splice(activeid.indexOf(this.id),this.id)
                clickids.push(this.id)
            })
            this.thumb.removeEventListener('mouseleave',(e)=>{
                this.istouch=false
                activeid.splice(activeid.indexOf(this.id),this.id)
                clickids.push(this.id)
            })
        }
    }
    Shrink(){
        this.style.height="25%"
        this.size=0

        this.DisableThumb()
        this.querySelector('div').getElementsByClassName('thumb')[0].style.display='none'
        this.querySelector('div').getElementsByClassName('thumb')[0].style.transform='translateY(0px)'

        this.querySelector('div').getElementsByClassName('ptsSliderInfo')[0].style.display='none'
        this.querySelector('div').getElementsByClassName('ptsSliderInfo')[0].style.opacity=0

        if (clickids.includes(this.id)){
            clickids.splice(completeSliderids.indexOf(this.id),1)
        }
        if (completeSliderids.includes(this.id)){
            completeSliderids.splice(completeSliderids.indexOf(this.id),1)
        }
        if (activeid.includes(this.id)){
            activeid.splice(completeSliderids.indexOf(this.id),1)
        }
    }
    Reset(){
        this.style.transform=`translateY(${-document.body.clientHeight/4}px)`
        this.style.display='block'

        this.Shrink()

        if (isMobile) {
            this.addEventListener('touchstart',this.OnClickTile)
        }else{
            this.addEventListener('mousedown',this.OnClickTile)
        }

        this.style.gridColumn=this.getAttribute('column')
        this.style.gridRow=1

        cancelAnimationFrame(this.idTimer)
        this.MoveDownSmooth()
    }
    connectedCallback(){
        
        this.classList.add('tile')


        if (!this.getElementsByClassName('thumb')[0] || this.getElementsByClassName('thumb')[0].display==='none'){
            this.istouch=false
            if (isMobile) {
                this.addEventListener('touchstart',this.OnClickTile)
            }else{
                this.addEventListener('mousedown',this.OnClickTile)
            }
        }else{
            if (!isMobile) {
                this.thumb=this.getElementsByClassName('thumb')[0]
                if (activeid){
                    if (isclicking && activeid.includes(this.id)){
                        this.istouch=true
                        this.size=Math.round(this.clientHeight/(document.body.clientHeight/4)-1)

                        this.thumb.addEventListener('mouseup',(e)=>{
                            this.istouch=false
                            activeid.splice(activeid.indexOf(this.id),this.id)
                            clickids.push(this.id)
                        })
                        this.thumb.addEventListener('mouseleave',(e)=>{
                            this.istouch=false
                            activeid.splice(activeid.indexOf(this.id),this.id)
                            clickids.push(this.id)
                        })
                    }
                }
                if (!clickids.includes(this.id)){
                    this.size=Math.round(this.clientHeight/(document.body.clientHeight/4)-1)
                    this.ActiveThumb()
                }
            }else{
                this.thumb=this.getElementsByClassName('thumb')[0]
                if (activeid.length){
                    if (isclicking && activeid.includes(this.id) && !clickids.includes(this.id)){
                        this.istouch=true
                        this.size=Math.round(this.clientHeight/(document.body.clientHeight/4)-1)

                        this.thumb.addEventListener('touchend',(e)=>{
                            this.istouch=false
                            activeid.splice(activeid.indexOf(this.id),this.id)
                            clickids.push(this.id)
                        })
                    }
                }
                if (!clickids.includes(this.id)){
                    this.size=Math.round(this.clientHeight/(document.body.clientHeight/4)-1)
                    this.ActiveThumb()
                }
            }

            if (completeSliderids.includes(this.id)){
                this.istouch=false
                this.size=Math.round(this.clientHeight/(document.body.clientHeight/4)-1)
                this.getElementsByClassName('ptsSliderInfo')[0].innerText="+"+2*this.size
                this.getElementsByClassName('ptsSliderInfo')[0].style.opacity=1
            }

            this.size=Math.round(this.clientHeight/(document.body.clientHeight/4)-1)
            
        }

        this.style.gridColumn=this.getAttribute('column')
        this.style.gridRow=1

        if (this.getAttribute('first')!=="true"){
            if (!this.getElementsByClassName('thumb')[0] || this.getElementsByClassName('thumb')[0].display==='none'){
                this.innerHTML=`
                <div class="innertile"><div>
                `

                this.querySelector('div').innerHTML=`
                    <div class='thumb' style='height:${document.body.clientHeight/4}px; display:none;'></div>
                    <div class='ptsSliderInfo titillium-web-bold' style=' display:none;'></div>
                `

            }
            

            if (!this.style.transform){
                this.style.transform=`translateY(${-document.body.clientHeight/4}px)`
            }

            this.MoveDownSmooth()

        }else{
            this.style.transform=`translateY(${document.body.clientHeight/2}px)`
            this.innerHTML=`
            <div class="innertile firsttile"><h2 style="color:white;font-size:8vw;pointer-events:none" class="titillium-web-bold">PLAY</h2><div>
            `

        }
    }
}

window.customElements.define("game-tile",TileElement)