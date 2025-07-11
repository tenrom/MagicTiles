let PxSpeed=10
let GameTime=0
let playing=false
let activeid=null
let isclicking=false
let clickids=[]
let lastTile=-1
let lastTileid=[]
let rng=null

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};