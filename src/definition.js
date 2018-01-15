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
  X : 88
}

/*State*/ 
const STATE = {
  STAGE : 0
}

/*Entity*/
const ENTITY = {
  PLAYER  : 0,
  WALL : 1,
  ENEMY : 2,
  BULLET : 3
};

/*MapChip*/
const TILE = {
  SPACE : 0,
  WALL :1,
  PLAYER : 2,
  ENEMY : 3
}

/*Vector*/
let VEC0 = {x:0,y:0};


const JUMP_VEL = 7;//ジャンプ速度
const RUN_VEL = 5;//はしり速度
const PLAYER_GRAVITY = 0.2;
const PLAYER_HP = 10;
const FRICTION = 0.9;
