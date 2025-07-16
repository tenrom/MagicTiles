//https://stackoverflow.com/questions/76448215/programmatically-adding-a-file-in-a-github-repository-in-javascript-and-html

let ytid="PTZgxW_3LIQ"
let DefaultPxSpeed=10
let PxSpeed=DefaultPxSpeed
let GameTime=0
let playing=false
let activeid=[]
let isclicking=false
let completeSliderids=[]
let clickids=[]
let lastTile=-1
let lastTileid=[]
let rng=null
let scoretext=document.getElementById('text-Score')
let multtext=document.getElementById('text-mult')
let multperfect=0
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let queue=[]
let adspassed=false
let SpeedSteps=[1.25,1.5,1.75,2]

let timelastframe=0
let fps=60
let dif=0

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};