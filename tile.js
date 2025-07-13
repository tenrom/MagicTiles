

class TileElement extends HTMLElement{
    constructor(){
        
        super()
    }
    OnClickTile(e){
        
        if (this.getAttribute('first')!=="true"){
            vibrer()
            clearInterval(this.idTimer)
            UpdateBar(this.id)
            addEmitterExplosion(e.target.getBoundingClientRect().x+e.target.getBoundingClientRect().width/2,e.target.getBoundingClientRect().y+e.target.getBoundingClientRect().height/2)
            addEmitterTile(this.querySelector('div'))
            this.remove()
        }else{
            vibrer()
            playing=true
            document.getElementsByClassName('plyr__control')[0].click()
            player.embed.unMute()
            addEmitterExplosion(e.target.getBoundingClientRect().x+e.target.getBoundingClientRect().width/2,e.target.getBoundingClientRect().y+e.target.getBoundingClientRect().height/2)
            addEmitterTile(this.querySelector('div'))
            this.remove()
        }

    }
    MoveDown(){
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
                        completeSliderids.push(this.id)
                    }   
                }
            }
        }
    }
    ActiveThumb(){
        
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

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            this.removeEventListener('touchstart',this.OnClickTile)
            this.thumb.addEventListener('touchstart',e2)

            this.thumb.addEventListener('touchend',(e)=>{
                this.istouch=false
                activeid.splice(activeid.indexOf(this.id),this.id)
                clickids.push(this.id)
            })
            // this.thumb.addEventListener('mouseleave',(e)=>{
            //     this.istouch=false
            //     activeid.splice(activeid.indexOf(this.id),this.id)
            //     clickids.push(this.id)
            // })
            
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
        if (!this.style.height){
            this.style.height="50%"
            this.size=1
            this.querySelector('div').innerHTML=`
                <div class='thumb' style='height:${document.body.clientHeight/4}px;'></div>
                <div class='ptsSliderInfo titillium-web-bold'></div>
            `
            this.thumb=this.getElementsByClassName('thumb')[0]
            
            this.ActiveThumb()
        }else{
            this.style.height="calc(25% + "+this.style.height+")"
            this.size+=1
        }
        this.style.transform='translateY('+String(Number(this.style.transform.substring(11,this.style.transform.length-3))-document.body.clientHeight/4)+"px)"

    }
    
    connectedCallback(){
        
        this.classList.add('tile')

        
        if (!this.getElementsByClassName('thumb')[0]){
            this.istouch=false
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                this.addEventListener('touchstart',this.OnClickTile)
                document.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                }, false); 
            }else{
                this.addEventListener('mousedown',this.OnClickTile)
            }
        }else{
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
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
                        // this.thumb.addEventListener('mouseleave',(e)=>{
                        //     this.istouch=false
                        //     activeid.splice(activeid.indexOf(this.id),this.id)
                        //     clickids.push(this.id)
                        // })
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
            if (!this.getElementsByClassName('thumb')[0]){
                this.innerHTML=`
                <div class="innertile"><div>
                `
            }
            

            if (!this.style.transform){
                this.style.transform=`translateY(${-document.body.clientHeight/4}px)`
            }
            this.idTimer=setInterval(()=>{
                this.MoveDown()
                if (Number(this.style.transform.substring(11,this.style.transform.length-3))>=document.body.clientHeight){
                    clearInterval(this.idTimer)
                    this.remove()
                }
            },10)

        }else{
            this.style.transform=`translateY(${document.body.clientHeight/2}px)`
            this.innerHTML=`
            <div class="innertile firsttile"><h2 style="color:white;font-size:8vw;pointer-events:none" class="titillium-web-bold">PLAY</h2><div>
            `

        }
    }
}

window.customElements.define("game-tile",TileElement)