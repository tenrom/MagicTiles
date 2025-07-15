//https://stackoverflow.com/questions/76448215/programmatically-adding-a-file-in-a-github-repository-in-javascript-and-html

let ytid="PTZgxW_3LIQ"
let PxSpeed=10
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
let startTime=-1
let duration=-1
let adspassed=false

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};