

class MusicTile extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback(){
        this.id=this.getAttribute('ytid')
        this.title=this.getAttribute('title')
        this.author=this.getAttribute('author')
        
        this.attachShadow({ mode: "open" });
        this.mystyle=`
        .tile{
            width:calc(100% - 30px);
            height:calc(120px - 20px);
            background:linear-gradient(-90deg, #AF3EAF 40%, #954AB2 58%, #5468B9 100%);
            display:flex;
            flex-direction:row;
            justify-content:left;
            align-items:center;
            gap:19px;
            padding:10px 20px 10px 10px;
        }

        .title{
            color:white;
            font-family: 'Roboto', sans-serif;
            font-weight:600;
            font-size:15px;
            pointer-events:none;
        }
        .author{
            color:white;
            font-family: 'Roboto', sans-serif;
            font-weight:500;
            font-size:14px;
            pointer-events:none;
        }

        .textbox{
            color:white;
        }

        img{
            color:white;
            height:100%;
            width:auto;
            border-radius:10px;
            pointer-events:none;
        }
        `

        this.shadowRoot.innerHTML=`
            <style>${this.mystyle}</style>
            <div class="tile">
                <img src="https://img.youtube.com/vi/${this.id}/hqdefault.jpg">
                <div class="textbox">
                    <h2 class="title">${this.title}</h2>
                    <h2 class="author">${this.author}</h2>
                </div>
            </div>
            
        `
        

        this.addEventListener('click',()=>{
            open(String(window.location).split('/').slice(0,-1).join("/")+'/main.html?id='+this.id,'_self','fullscreen=yes')
        })
    }
}

window.customElements.define("music-tile",MusicTile)