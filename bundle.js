/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawer_js__ = __webpack_require__(4);

/*エンティティのリスト*/
let EntityList = []; 
class StageEntity{
  static getEntityList(){
    return EntityList;
    console.log(EntityList);
  }

  //Entityをリストに登録
  static addEntity(entity){
    let EntityList = StageEntity.getEntityList(); 
    EntityList.push(entity); 
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].addStage(entity.sprite);
  }
  static spliceEntity(entity){
    /* */
  }
  //末尾のEntityをリストから削除
  static popEntity(){
    EntityList.pop(); 
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].addStage(entity.sprite);
  }

  static UpdateEntity(){
    let EntityList = StageEntity.getEntityList(); 
    for(let l of EntityList){
      l.updatePosition(); 
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StageEntity;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Entity{
  constructor(pos){
    this.pos = pos;
    this.sprite;
    this.type;//enum
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Entity;





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Art{
  constructor(){
    this.playerTexture;
    this.teki1Texture;
    this.teki2Texture;
  }

  static LoadTexture(){
    this.playerTexture = PIXI.Texture.fromImage('resource/img/player.png');
    this.teki1Texture = PIXI.Texture.fromImage('resource/img/teki1.png');
    this.teki2Texture = PIXI.Texture.fromImage('resource/img/teki2.png');
  }

  static SpriteFactory(texture){
    return new PIXI.Sprite(texture);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Art;




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_stageEntity_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapData_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__art_js__ = __webpack_require__(2);







/*TODO Sceneクラスでやる*/
let state = 0;

class Game{
  constructor(){
  }
  static Init(){
    __WEBPACK_IMPORTED_MODULE_3__drawer_js__["a" /* default */].InitializeValuables();
    Game.Load();

    /*TODO どっかに移す*/
    __WEBPACK_IMPORTED_MODULE_2__mapData_js__["a" /* default */].CreateStage(0);
  }

  static Load(){
    __WEBPACK_IMPORTED_MODULE_4__art_js__["a" /* default */].LoadTexture();
  }

  static Update(){
    //各Entityの位置の更新
    __WEBPACK_IMPORTED_MODULE_0__Stage_stageEntity_js__["a" /* default */].UpdateEntity();
  }

  static Run(){
    requestAnimationFrame(Game.Run);

    switch(state){
      /*更新*/
      case 0 : Game.Update();
        break;
    }
    /*描画*/
    __WEBPACK_IMPORTED_MODULE_3__drawer_js__["a" /* default */].Renderer.render(__WEBPACK_IMPORTED_MODULE_3__drawer_js__["a" /* default */].Stage);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Singleton */
class Drawer{
  constructor(){
    this.Stage;
    this.Rnderer;
  }

  //setting stage
  static InitializeValuables(){
    this.Stage = new PIXI.Stage(0x000000);
    this.Renderer = new PIXI.autoDetectRenderer(600,400);
    $("#pixiview").append(this.Renderer.view);
  }

  static addStage(Sprite){
    this.Stage.addChild(Sprite);
  }

  static popStage(Sprite){
    this.Stage.destroy(Sprite);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Drawer;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(6);


class Collision{
  static on(e1,e2){

    //??
    let coltype  = {
      e1shape : e1.collisionShape.shape,
      e2shape : e2.collisionShape.shape
    }

    let c_to_c = {
      e1shape : SHAPE.CIRCLE,
      e2shape : SHAPE.CIRCLE
    }

    //円同士の衝突判定
    if(e1.collisionShape.shape == SHAPE.CIRCLE && e2.collisionShape.shape == SHAPE.CIRCLE){
      let isHit;
      let circ1 = e1.collisionShape.hitbox;
      let circ2 = e2.collisionShape.hitbox;
      if(__WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].distance(circ1.pos,circ2.pos) < circ1.r + circ2.r){
        isHit = true;
      }else{
        isHit = false;
      }
      let n = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].nomalize({x:circ1.pos.x-circ2.pos.x , y:circ1.pos.y-circ2.pos.y});
      return new CollisionInfo(isHit , n);
    }
    throw new Error("po");
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Collision;


//衝突判定クラス
class CollisionInfo{
  constructor(isHit,n){
    this.isHit = isHit; // bool
    this.n = n //法線
  }
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//便利関数
class Util{
  static distance(p1,p2){
    return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
  }

  //ベクトルの正規化
  static nomalize(v){
    let a = Math.sqrt(v.x * v.x + v.y * v.y);
    v.x /= a;
    v.y /= a;
    return v;
  }

  static advec(v1,v2){

    return {x:v1.x + v2.x ,y:v1.y + v2.y};
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Util;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CollisionShape{
  constructor(shape,hitbox){
    this.shape = shape;
    this.hitbox = hitbox;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CollisionShape;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(1);


/* 動く物体クラス*/
class Mover extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  /*
   * vel : 速度
   * acc : 加速度
   * */
  constructor(pos,vel,acc){
    super(pos);
    this.vel = vel;
    this.acc = acc;
    //this.dir; //enum dirrection
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mover;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game_js__ = __webpack_require__(3);
/*｡+☆.En†rypoinT.☆+｡*/
 

__WEBPACK_IMPORTED_MODULE_0__Game_js__["a" /* default */].Init();
__WEBPACK_IMPORTED_MODULE_0__Game_js__["a" /* default */].Run();



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_stageEntity_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_entity_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_wall_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entity_Mover_mover_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Entity_Mover_player_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Game_js__ = __webpack_require__(3);







/*マップデータ*/
class MapData{
  constructor(){
    this.stageNo;
    this.data;
    this.width;
    this.height;
  }

  static Load(stageNo){
    return new Promise((resolve)=>{
      let xhr = new XMLHttpRequest();
      xhr.open('GET','resource/map/stage'+stageNo+'.json',true);
      xhr.onreadystatechange = ()=>{
        if(xhr.responseText!=""){
          /*TODO 1回しか実行されないように */
          let jsonObj = JSON.parse(xhr.responseText);
          this.data = jsonObj.layers[0].data;
          this.width = jsonObj.layers[0].width;
          this.height = jsonObj.layers[0].height;
          resolve();
        }
      }
      xhr.send(null);
      this.stageNo = stageNo;
    });
  }

  static async CreateStage(stageNo){
    await this.Load(stageNo);

    for(let y = 0;y<this.height;y++){
      for(let x = 0;x<this.width;x++){
        switch(this.data[this.width*y + x]){
          case 0 :
            /*nothing to do*/
            break;
          case 1 :
            __WEBPACK_IMPORTED_MODULE_0__Stage_stageEntity_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_2__Entity_wall_js__["a" /* default */]({x:32*x,y:32*y}));
            break;
 case 2 :
   __WEBPACK_IMPORTED_MODULE_0__Stage_stageEntity_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_4__Entity_Mover_player_js__["a" /* default */]({x:32*x,y:32*y}));
   break;
        }
      }
    }
    return;
  }

  /*現在開かれているステージを削除*/
  DeleteStage(){
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MapData;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collisionShape_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_circle_js__ = __webpack_require__(12);






class Wall extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos){
    super(pos);
    this.type = ENTITY_TYPE.WALL;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].teki1Texture);
    this.sprite.position = pos;
    this.collisionShape = new __WEBPACK_IMPORTED_MODULE_2__Collision_collisionShape_js__["a" /* default */](SHAPE.CIRCLE,new __WEBPACK_IMPORTED_MODULE_3__Collision_circle_js__["a" /* default */](pos,16));//衝突判定の形状
  }
  updatePosition(){
    /*nothing to do*/
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Wall;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Circle{
  constructor(pos,r){
    this.pos = pos;
    this.r = r;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Circle;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mover_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collisionShape_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_Circle_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__input_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_stageEntity_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_js__ = __webpack_require__(6);









const JUMP_VEL = 13;//ジャンプ速度
const RUN_VEL = 5;//はしり速度

  class Player extends __WEBPACK_IMPORTED_MODULE_0__mover_js__["a" /* default */]{
    constructor(pos){
      super(pos,{x:0,y:-10},{x:0,y:0});
      this.type = ENTITY_TYPE.PLAYER;
      this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].playerTexture);
      this.sprite.position = pos;
      this.collisionShape = new __WEBPACK_IMPORTED_MODULE_2__Collision_collisionShape_js__["a" /* default */](SHAPE.CIRCLE,new __WEBPACK_IMPORTED_MODULE_4__Collision_Circle_js__["a" /* default */](pos,16));//衝突判定の形状
    }



    updatePosition(){
      if(__WEBPACK_IMPORTED_MODULE_5__input_js__["a" /* default */].isKeyInput(40)){
        this.vel.y = JUMP_VEL;
      }
      if(__WEBPACK_IMPORTED_MODULE_5__input_js__["a" /* default */].isKeyInput(KEY.UP) || __WEBPACK_IMPORTED_MODULE_5__input_js__["a" /* default */].isKeyInput(KEY.Z)){
        this.vel.y = -JUMP_VEL;
      }
      if(__WEBPACK_IMPORTED_MODULE_5__input_js__["a" /* default */].isKeyInput(37)){
        this.vel.x = -RUN_VEL;
      }
      if(__WEBPACK_IMPORTED_MODULE_5__input_js__["a" /* default */].isKeyInput(39)){
        this.vel.x = RUN_VEL;
      }

      this.pos.x += this.vel.x; 
      this.pos.y += this.vel.y; 
      this.sprite.position = this.pos;
      /* */
      this.vel.y += 0.8;

      /* 衝突判定 */
      /*TODO リスト分割 */
      let EntityList = __WEBPACK_IMPORTED_MODULE_6__Stage_stageEntity_js__["a" /* default */].getEntityList();

      for(let l of EntityList){
        if(l.type==ENTITY_TYPE.WALL){
          if(__WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l).isHit){
            /* 衝突応答をかく */
            this.vel = {x:0,y:0};//とりあえず
              while(__WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l).isHit){
                this.pos.x += __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l).n.x;
                this.pos.y += __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l).n.y;
              }
          }
        }
      }


    }
  }
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;




/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Circle{
  constructor(pos,r){
    this.pos = pos;
    this.r = r;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Circle;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let inputedKeyList = (new Array(256)).fill(false);

class Input{
  static isKeyInput(key){
    return inputedKeyList[key];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Input;


/*receive input event*/
$(document).on("keydown",(e)=> {
  inputedKeyList[event.keyCode] = true;
  event.preventDefault();
});
$(document).on("keyup",(e)=> {
  inputedKeyList[event.keyCode] = false;
});



/***/ })
/******/ ]);