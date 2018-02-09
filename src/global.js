const DIR = {
  UP : 0,
  DOWN : 1,
  RIGHT : 2,
  LEFT : 3,
};

/*形状*/
const SHAPE = {
  BOX : 0,
  CIRCLE : 1,
  LINE : 2
};

/*Key*/
const KEY = {
  LEFT : 37,
  UP : 38,
  RIGHT : 39,
  DOWN : 40,
  Z : 90,
  X : 88,
  C : 67,
  H : 72,
  J : 74,
  K : 75,
  L : 76,
  SP : 32
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
  PLAYER  : 0,
  WALL : 1,
  ENEMY : 2,
  BULLET : 3,
  EFFECT : 4
}

/*MapChip*/
const TILE = {
  SPACE : 0,
  WALL :1,
  PLAYER : 2,
  ENEMY : 3,
  GOAL : 4
}

const CONTAINER = {
  ENTITY : "ENTITY",
  FILTER : "FILTER"
}

/*UI*/
const UI_ = {
  WICON : "WICON",
  SELBOX : "SELBOX",
  WEQUIP : "WEQUIP",
  HP : "HP",
  BULLET : "BULLET"
}
const WICON_X = 8;
const WICON_Y = 40;

/*Vector*/
let VEC0 = {x:0,y:0};


/*for debug*/
let po = ()=>{console.log("po")};
let cl = console.log;
