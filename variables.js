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


Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};