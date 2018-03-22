/*meta*/
Array.prototype.Last = function(){
  if(this.length == 0){
    return undefined;
  }
  else{
    return this[this.length-1];
  }
}
Array.prototype.maxIndex = function(){
  let max = this[0];
  let maxI = 0;
  for(let i = 1;i<this.length;i++){
    if(max < this[i]){
      max = this[i];
      maxI = i;
    }
  }
  return maxI;
}
Array.prototype.minIndex = function(){
  let min = this[0];
  let minI = 0;
  for(let i = 1;i<this.length;i++){
    if(min > this[i]){
      min = this[i];
      minI = i;
    }
  }
  return minI;
}


const DIR = {
  UP : 0,
  DOWN : 1,
  RIGHT : 2,
  LEFT : 3,
};

/*形状*/
const SHAPE = {
  BOX : "BOX",
  CIRCLE : "CIRCLE",
  LINE : "LINE"
};

/*Key*/
const KEY = {
  LEFT : 37,
  UP : 38,
  RIGHT : 39,
  DOWN : 40,
  Z : 90,
  X : 88,
  V : 86,
  C : 67,
  H : 72,
  J : 74,
  K : 75,
  L : 76,
  SP : 32,
  SHIFT : 16, 
  ESC : 27, 
}

/*State*/ 
const STATE = {
  INIT : "INIT",
  STAGE : "STAGE",
  TITLE : "TITLE",
  PAUSE : "PAUSE"
}

/*Entity*/
const ENTITY = {
  PLAYER  : "PLAYER",
  WALL : "WALL",
  MOVER : "MOVER",
  ENEMY : "ENEMY",
  OTHERS : "OTHERS",
}

/*MapChip*/
const TILE = {
  SPACE : 0,
  WALL :1,
  PLAYER : 2,
  ENEMY : 3,
  GOAL : 4,
  BACK : 5,
  SIGN : 6,
  NEEDLE : 7,
  FORE : 8,
}


/*UI*/
const UI_ = {
  HP : "HP",
  BULLET : "BULLET",
  FONT : "FONT",
  SCORE : "SCORE",
  MSSSAGE : "MES"
}

/*Vector*/
const VEC0 = ()=>{return {x:0,y:0}};//0ベクトルを返す
const VECN = (n)=>{return {x:n,y:n}};//
const VECX = (vx)=>{return {x:vx,y:0}};//
const VECY = (vy)=>{return {x:0,y:vy}};//
const CPV = (v)=>{return {x:v.x,y:v.y}};//値渡し
const ADV = (v1,v2)=>{ return {x:v1.x + v2.x ,y:v1.y + v2.y}};//ベクトル加算
const MLV = (v1,v2)=>{ return {x:v1.x * v2.x ,y:v1.y * v2.y}};//ベクトル乗算
const POV =  (arg,vi)=>{return {x:vi*Math.cos(arg),y:vi*Math.sin(arg)}}//極表示のベクトルを直交座標に変換
const NOMALIZE = v=>{ let a = Math.sqrt(v.x * v.x + v.y * v.y); v.x /= a; v.y /= a; return v; }//正規化
const DOT = (v1,v2)=>{return v1.x*v2.x + v1.y*v2.y};//内積
/*Random*/
const Rand = (d)=>{
  return 2 * d * (Math.random()-0.5);
}
const Dice = (d)=>{
  return Math.floor(d * (Math.random()));
}
//random between
const RandBET = (min,max)=>{
  return Math.floor((max-min)*Math.random())+min;
}
/*maxmin*/
const BET = (min,x,max)=>{
  return Math.min(Math.max(x,min),max);
}

//-d ~ +d までの値を返す
let Rand2D = (d)=>{
  let p = {
    x:Rand(d),
    y:Rand(d)
  }
  return p;
}
/*distance*/
let DIST = (p1,p2)=>{
  return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
}
//チェビシェフ
let DIST_C = (p1,p2)=>{
  return Math.max(Math.abs(p1.x-p2.x)+Math.abs(p1.y-p2.y));
}
/*for debug*/
let cl = console.log;

