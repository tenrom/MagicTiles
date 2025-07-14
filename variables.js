let PxSpeed=50
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




Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};