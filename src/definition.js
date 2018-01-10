let po = 0;


/*形状*/
const SHAPE = {
  BOX : 0,
  CIRCLE : 1,
  LINE : 2
};

/*Entity*/
const ENTITY_TYPE = {
  PLAYER  : 0,
  WALL : 1
};

/*Key*/
const KEY = {
  UP : 38,
  DOWN : 40,
  RIGHT : 39,
  LEFT : 37,
  Z : 90
}

/*singleton*/
let stageEntity;
let input;
let state;
let util;
let collision;
let mapData;
