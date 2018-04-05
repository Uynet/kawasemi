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
/******/ 	return __webpack_require__(__webpack_require__.s = 59);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_Effect_target_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timer_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Entity_Effect_stone_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Entity_Effect_smoke_js__ = __webpack_require__(30);






/*エンティティマネージャ*/
class EntityManager{
  static Init(){
    this.entityList = [];//全Entityのリスト
    this.enemyList = [];//敵のリスト(moverList?)
    this.wallList = [];//壁のリスト
    this.player;//プレイヤーのインスタンス
    this.updaterList = [];//更新が必要なEntity
    this.colliderList = [];

    this.entityIndex = 0;
  }
  static SortWallList(){
    //比較関数
    let compare = (w1,w2)=>{
      if(w1.pos.y > w2.pos.y)return 1
      else if(w1.pos.y < w2.pos.y) return -1;
      else return 0;
    }
    this.wallList.sort(compare);
  }


  /*Entityをリストに登録*/
  static addEntity(entity){
    //各entityの参照を保持する
    this.entityList[this.entityIndex] = entity; 
    this.entityIndex++;
    //更新が必要なEntityのみリストに追加
    switch(entity.type){
      case ENTITY.MOVER : break;
      case ENTITY.PLAYER : this.colliderList.push(entity);this.player = entity; break;
      case ENTITY.ENEMY : this.colliderList.push(entity);this.enemyList.push(entity); break;
      case ENTITY.WALL : this.colliderList.push(entity);this.wallList.push(entity); break;
      default : console.warn(entity)
    }

    if(entity.isMultiple) __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].addContainer(entity.container,entity.layer);
    else if(entity.isNoSprite);
    else __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].addContainer(entity.sprite,entity.layer);
  }

  /*Entityをリストから削除する*/
  static removeEntity(entity){
    let i;
    switch(entity.type){
      case ENTITY.PLAYER :
        this.player = null;
        i = this.colliderList.indexOf(entity);
        this.colliderList.splice(i,1);
        break;
      case ENTITY.ENEMY :
        i = this.enemyList.indexOf(entity);
        this.enemyList.splice(i,1);
        i = this.colliderList.indexOf(entity);
        this.colliderList.splice(i,1);
        break;
      case ENTITY.WALL :
        i = this.wallList.indexOf(entity);
        this.wallList.splice(i,1);
        i = this.colliderList.indexOf(entity);
        this.colliderList.splice(i,1);
        //this.SortWallList();
        break;
    }
    i = this.entityList.indexOf(entity);
    this.entityList.splice(i,1);
    this.entityIndex--;

    if(entity.isMultiple) __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].removeContainer(entity.container,entity.layer);
    else if(entity.isNoSprite)/*Nothing to do*/;
    else __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].removeContainer(entity.sprite,entity.layer);
  }
  /*Entityの更新*/
  static Update(){
    for(let i=0;i<this.entityIndex;i++){
      let l = this.entityList[i];
      if(l.isUpdater) l.Update(); 
    }
  }
  /*Entityの更新(Tiltle用)*/
  static UpdateTitle(){
    for(let i=0;i<this.entityIndex;i++){
      let l = this.entityList[i];
      if(l.name != "player" && l.isUpdater) l.Update(); 
    }
  }
  /*メッセージイベント中にアニメーションだけ行う*/
  static Animation(){
    for(let i=0;i<this.entityIndex;i++){
      let l = this.entityList[i];
      //playerはアニメーションのみ
      if(l.type == ENTITY.PLAYER){
        l.Animation(); 
      }
      //看板は読めるようにする
      if(l.name == "signboard" || l.name == "shop") {
        l.Update(); 
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EntityManager;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drawer_js__ = __webpack_require__(9);



class Art{
  static Load(resources){
    this.darkTexture = PIXI.utils.TextureCache["src/resource/effect/dark.png"];
    /*forにして*/
    this.playerPattern = {
      runR : [
        PIXI.Texture.fromFrame('player00.png'),
        PIXI.Texture.fromFrame('player01.png'),
        PIXI.Texture.fromFrame('player02.png'),
        PIXI.Texture.fromFrame('player03.png'),
        PIXI.Texture.fromFrame('player04.png'),
        PIXI.Texture.fromFrame('player05.png'),
      ],
      runL : [
        PIXI.Texture.fromFrame('player10.png'),
        PIXI.Texture.fromFrame('player11.png'),
        PIXI.Texture.fromFrame('player12.png'),
        PIXI.Texture.fromFrame('player13.png'),
        PIXI.Texture.fromFrame('player14.png'),
        PIXI.Texture.fromFrame('player15.png'),
      ],
      runUR : [
        PIXI.Texture.fromFrame('player20.png'),
        PIXI.Texture.fromFrame('player21.png'),
        PIXI.Texture.fromFrame('player22.png'),
        PIXI.Texture.fromFrame('player23.png'),
        PIXI.Texture.fromFrame('player24.png'),
        PIXI.Texture.fromFrame('player25.png'),
      ],
      runUL : [
        PIXI.Texture.fromFrame('player30.png'),
        PIXI.Texture.fromFrame('player31.png'),
        PIXI.Texture.fromFrame('player32.png'),
        PIXI.Texture.fromFrame('player33.png'),
        PIXI.Texture.fromFrame('player34.png'),
        PIXI.Texture.fromFrame('player35.png'),
      ],
      runDR : [
        PIXI.Texture.fromFrame('player40.png'),
        PIXI.Texture.fromFrame('player41.png'),
        PIXI.Texture.fromFrame('player42.png'),
        PIXI.Texture.fromFrame('player43.png'),
        PIXI.Texture.fromFrame('player44.png'),
        PIXI.Texture.fromFrame('player45.png'),
      ],
      runDL : [
        PIXI.Texture.fromFrame('player50.png'),
        PIXI.Texture.fromFrame('player51.png'),
        PIXI.Texture.fromFrame('player52.png'),
        PIXI.Texture.fromFrame('player53.png'),
        PIXI.Texture.fromFrame('player54.png'),
        PIXI.Texture.fromFrame('player55.png'),
      ],
      waitR :[
        PIXI.Texture.fromFrame('player60.png'),
        PIXI.Texture.fromFrame('player61.png'),
        PIXI.Texture.fromFrame('player62.png'),
        PIXI.Texture.fromFrame('player63.png'),
      ],
      waitL : [
        PIXI.Texture.fromFrame('player64.png'),
        PIXI.Texture.fromFrame('player65.png'),
        PIXI.Texture.fromFrame('player66.png'),
        PIXI.Texture.fromFrame('player67.png'),
      ],
      //上向き右
      waitUR : [
        PIXI.Texture.fromFrame('player70.png'),
        PIXI.Texture.fromFrame('player71.png'),
        PIXI.Texture.fromFrame('player72.png'),
        PIXI.Texture.fromFrame('player73.png'),
      ],
      //上向き左
      waitUL : [
        PIXI.Texture.fromFrame('player74.png'),
        PIXI.Texture.fromFrame('player75.png'),
        PIXI.Texture.fromFrame('player76.png'),
        PIXI.Texture.fromFrame('player77.png'),
      ],
      waitDR : [
        PIXI.Texture.fromFrame('player80.png'),
        PIXI.Texture.fromFrame('player81.png'),
        PIXI.Texture.fromFrame('player82.png'),
        PIXI.Texture.fromFrame('player83.png'),
      ],
      waitDL : [
        PIXI.Texture.fromFrame('player84.png'),
        PIXI.Texture.fromFrame('player85.png'),
        PIXI.Texture.fromFrame('player86.png'),
        PIXI.Texture.fromFrame('player87.png'),
      ],
      //死亡エフェクト
      dying : [
        PIXI.Texture.fromFrame('player90.png'),
        PIXI.Texture.fromFrame('player91.png'),
        PIXI.Texture.fromFrame('player92.png'),
        PIXI.Texture.fromFrame('player93.png'),
        PIXI.Texture.fromFrame('player94.png'),
        PIXI.Texture.fromFrame('player95.png'),
        PIXI.Texture.fromFrame('player96.png'),
        PIXI.Texture.fromFrame('player97.png'),
      ],
      jumpR : [
        PIXI.Texture.fromFrame('playerA0.png'),
        PIXI.Texture.fromFrame('playerA1.png'),
        PIXI.Texture.fromFrame('playerA2.png'),
        PIXI.Texture.fromFrame('playerA3.png'),
      ],
      jumpL : [
        PIXI.Texture.fromFrame('playerA4.png'),
        PIXI.Texture.fromFrame('playerA5.png'),
        PIXI.Texture.fromFrame('playerA6.png'),
        PIXI.Texture.fromFrame('playerA7.png'),
      ],
      jumpUR : [
        PIXI.Texture.fromFrame('playerB0.png'),
        PIXI.Texture.fromFrame('playerB1.png'),
        PIXI.Texture.fromFrame('playerB2.png'),
        PIXI.Texture.fromFrame('playerB3.png'),
      ],
      jumpUL : [
        PIXI.Texture.fromFrame('playerB4.png'),
        PIXI.Texture.fromFrame('playerB5.png'),
        PIXI.Texture.fromFrame('playerB6.png'),
        PIXI.Texture.fromFrame('playerB7.png'),
      ],
      jumpDR : [
        PIXI.Texture.fromFrame('playerC0.png'),
        PIXI.Texture.fromFrame('playerC1.png'),
        PIXI.Texture.fromFrame('playerC2.png'),
        PIXI.Texture.fromFrame('playerC3.png'),
      ],
      jumpDL : [
        PIXI.Texture.fromFrame('playerC4.png'),
        PIXI.Texture.fromFrame('playerC5.png'),
        PIXI.Texture.fromFrame('playerC6.png'),
        PIXI.Texture.fromFrame('playerC7.png'),
      ],
      fallR : [
        PIXI.Texture.fromFrame('playerD0.png'),
        PIXI.Texture.fromFrame('playerD1.png'),
        PIXI.Texture.fromFrame('playerD2.png'),
        PIXI.Texture.fromFrame('playerD3.png'),
      ],
      fallL : [
        PIXI.Texture.fromFrame('playerD4.png'),
        PIXI.Texture.fromFrame('playerD5.png'),
        PIXI.Texture.fromFrame('playerD6.png'),
        PIXI.Texture.fromFrame('playerD7.png'),
      ],
      fallUR : [
        PIXI.Texture.fromFrame('playerE0.png'),
        PIXI.Texture.fromFrame('playerE1.png'),
        PIXI.Texture.fromFrame('playerE2.png'),
        PIXI.Texture.fromFrame('playerE3.png'),
      ],
      fallUL : [
        PIXI.Texture.fromFrame('playerE4.png'),
        PIXI.Texture.fromFrame('playerE5.png'),
        PIXI.Texture.fromFrame('playerE6.png'),
        PIXI.Texture.fromFrame('playerE7.png'),
      ],
      fallDR : [
        PIXI.Texture.fromFrame('playerF0.png'),
        PIXI.Texture.fromFrame('playerF1.png'),
        PIXI.Texture.fromFrame('playerF2.png'),
        PIXI.Texture.fromFrame('playerF3.png'),
      ],
      fallDL : [
        PIXI.Texture.fromFrame('playerF4.png'),
        PIXI.Texture.fromFrame('playerF5.png'),
        PIXI.Texture.fromFrame('playerF6.png'),
        PIXI.Texture.fromFrame('playerF7.png'),
      ],
    };
    this.UIPattern = {
      HP : {
        outer : PIXI.Texture.fromFrame('UI00.png'),
        bar : PIXI.Texture.fromFrame('UI04.png'),
        icon : PIXI.Texture.fromFrame('UI08.png'),
      },
      bullet : {
        outer : PIXI.Texture.fromFrame('UI10.png'),
        bar : PIXI.Texture.fromFrame('UI14.png'),
        icon : {
          missile : PIXI.Texture.fromFrame('UI18.png'),
          laser : PIXI.Texture.fromFrame('UI19.png'),
          normal : PIXI.Texture.fromFrame('UI1A.png'),
        },
        pop : {
          normal : PIXI.Texture.fromFrame('UI30.png'),
          missile : PIXI.Texture.fromFrame('UI31.png'),
          laser : PIXI.Texture.fromFrame('UI32.png'),
        }
      },
      score : {
        icon : PIXI.Texture.fromFrame('UI09.png'),
      },
      message : {
        frame : PIXI.Texture.fromFrame('UI20.png'),
      },
    };
    this.bulletPattern = {
      bullet1 : [
        PIXI.Texture.fromFrame('bullet00.png'),
        PIXI.Texture.fromFrame('bullet01.png'),
        PIXI.Texture.fromFrame('bullet02.png'),
        PIXI.Texture.fromFrame('bullet03.png'),
      ],
      bullet2 : [
        PIXI.Texture.fromFrame('bullet10.png'),
        PIXI.Texture.fromFrame('bullet11.png'),
        PIXI.Texture.fromFrame('bullet12.png'),
        PIXI.Texture.fromFrame('bullet13.png'),
        PIXI.Texture.fromFrame('bullet14.png'),
        PIXI.Texture.fromFrame('bullet15.png'),
        PIXI.Texture.fromFrame('bullet16.png'),
        PIXI.Texture.fromFrame('bullet17.png'),
      ],
      bullet3 : [
        PIXI.Texture.fromFrame('bullet100.png'),
      ],
      lasersight : [
        PIXI.Texture.fromFrame('bullet20.png'),
      ],
      target : [
        PIXI.Texture.fromFrame('bullet30.png'),//Target
      ],
      shot : [
        PIXI.Texture.fromFrame('bullet40.png'),//bullet shot
        PIXI.Texture.fromFrame('bullet41.png'),
        PIXI.Texture.fromFrame('bullet42.png'),
        PIXI.Texture.fromFrame('bullet43.png'),
      ],
      hitWall : [
        PIXI.Texture.fromFrame('bullet50.png'),//bullet hit at wall
        PIXI.Texture.fromFrame('bullet51.png'),
        PIXI.Texture.fromFrame('bullet52.png'),
        PIXI.Texture.fromFrame('bullet53.png'),
      ],
      blur : [ 
        PIXI.Texture.fromFrame('bullet60.png'),//bullet blur
        PIXI.Texture.fromFrame('bullet61.png'),
        PIXI.Texture.fromFrame('bullet62.png'),
        PIXI.Texture.fromFrame('bullet63.png') 
      ],
      blur2 : [ 
        PIXI.Texture.fromFrame('bulletF0.png'),//bullet blur
        PIXI.Texture.fromFrame('bulletF1.png'),
        PIXI.Texture.fromFrame('bulletF2.png'),
        PIXI.Texture.fromFrame('bulletF3.png') 
      ],
      //ブロックの破片
      blockDebris : [
        PIXI.Texture.fromFrame('bullet110.png'),
        PIXI.Texture.fromFrame('bullet111.png'),
        PIXI.Texture.fromFrame('bullet112.png'),
        PIXI.Texture.fromFrame('bullet113.png'), 
      ],
      coin : {
        get : [
          PIXI.Texture.fromFrame('bulletD0.png'),
          PIXI.Texture.fromFrame('bulletD1.png'),
          PIXI.Texture.fromFrame('bulletD2.png'),
          PIXI.Texture.fromFrame('bulletD3.png') 
        ],
        bright : [
          PIXI.Texture.fromFrame('bulletD0.png'),
          PIXI.Texture.fromFrame('bulletD1.png'),
          PIXI.Texture.fromFrame('bulletD2.png'),
          PIXI.Texture.fromFrame('bulletD3.png') 
        ],
      },
        //看板のポップ
        signpop : [
          PIXI.Texture.fromFrame('bulletE0.png'),
          PIXI.Texture.fromFrame('bulletE1.png'),
          PIXI.Texture.fromFrame('bulletE2.png'),
          PIXI.Texture.fromFrame('bulletE3.png'), 
        ],
      explosion : {
        flash : [PIXI.Texture.fromFrame('bullet80.png')],
        fire : [PIXI.Texture.fromFrame('bulletA0.png')],
        stone : [PIXI.Texture.fromFrame('bulletB0.png')],
        smoke : [PIXI.Texture.fromFrame('bulletC0.png')],
        sonic :this.Cor("bullet",70,4),
        
      }
    }
    this.enemyPattern = {
      coin : [
        PIXI.Texture.fromFrame('enemy20.png'),
        PIXI.Texture.fromFrame('enemy21.png'),
        PIXI.Texture.fromFrame('enemy22.png'),
        PIXI.Texture.fromFrame('enemy23.png'),
        PIXI.Texture.fromFrame('enemy24.png'),
        PIXI.Texture.fromFrame('enemy25.png'),
        PIXI.Texture.fromFrame('enemy26.png'),
        PIXI.Texture.fromFrame('enemy27.png'),
        PIXI.Texture.fromFrame('enemy28.png'),
        PIXI.Texture.fromFrame('enemy29.png'),
        PIXI.Texture.fromFrame('enemy2a.png'),
        PIXI.Texture.fromFrame('enemy2b.png'),
        PIXI.Texture.fromFrame('enemy2c.png'),
      ],
      enemy1 : [
        PIXI.Texture.fromFrame('enemy00.png'),
        PIXI.Texture.fromFrame('enemy01.png'),
        PIXI.Texture.fromFrame('enemy02.png'),
        PIXI.Texture.fromFrame('enemy03.png')
      ],
      enemy2 :this.Cor("enemy",10,4),
      enemy3 : this.Cor("enemy",30,2),
      eBullet1 : this.Cor("enemy",40,4),
      enemy4 : this.Cor("enemy",50,2),
      enemy5 : this.Cor("enemy",60,2),
      eBullet2 : this.Cor("enemy",70,4),
      enemy6 : this.Cor("enemy",80,2),
      //壊せる木箱
      woodbox : [
        PIXI.Texture.fromFrame('enemy40.png')
      ]
    }
    this.wallPattern = {
      block : PIXI.Texture.fromFrame('wallA4.png'),
      HPBlock : PIXI.Texture.fromFrame('wallA5.png'),
      bulletBlock : PIXI.Texture.fromFrame('wallA6.png'),
      bigBlock : [
        PIXI.Texture.fromFrame('wallA2.png'),
        PIXI.Texture.fromFrame('wallA3.png'),
        PIXI.Texture.fromFrame('wallB2.png'),
        PIXI.Texture.fromFrame('wallB3.png'),
      ],
      goal : PIXI.Texture.fromFrame('wall01.png'),//ゴール
      signboard : PIXI.Texture.fromFrame('wall02.png'),//看板
      shop : PIXI.Texture.fromFrame('wall03.png'),//看板
      needle : [
        //壊れる
        PIXI.Texture.fromFrame('wall10.png'),//∧
        PIXI.Texture.fromFrame('wall11.png'),//>
        PIXI.Texture.fromFrame('wall12.png'),//<
        PIXI.Texture.fromFrame('wall13.png'),//V
        //壊れない
        PIXI.Texture.fromFrame('wall20.png'),//∧
        PIXI.Texture.fromFrame('wall21.png'),//>
        PIXI.Texture.fromFrame('wall22.png'),//<
        PIXI.Texture.fromFrame('wall23.png'),//V
      ],
      //壁縁あり
      edge : {
        inner : [
          PIXI.Texture.fromFrame('wall61.png'),
          PIXI.Texture.fromFrame('wall63.png'),
          PIXI.Texture.fromFrame('wall81.png'),
          PIXI.Texture.fromFrame('wall83.png'),
        ],
        //外向き枠
        out : [
          PIXI.Texture.fromFrame('wall64.png'),//
          PIXI.Texture.fromFrame('wall65.png'),//
          PIXI.Texture.fromFrame('wall66.png'),//
          PIXI.Texture.fromFrame('wall74.png'),//
          PIXI.Texture.fromFrame('wall75.png'),//
          PIXI.Texture.fromFrame('wall76.png'),//
          PIXI.Texture.fromFrame('wall84.png'),//
          PIXI.Texture.fromFrame('wall85.png'),//
          PIXI.Texture.fromFrame('wall86.png')//
        ],
        back : {
          inner : [
            PIXI.Texture.fromFrame('wall31.png'),
            PIXI.Texture.fromFrame('wall33.png'),
            PIXI.Texture.fromFrame('wall51.png'),
            PIXI.Texture.fromFrame('wall53.png'),
          ],
          out : [
            PIXI.Texture.fromFrame('wall34.png'),
            PIXI.Texture.fromFrame('wall35.png'),
            PIXI.Texture.fromFrame('wall36.png'),
            PIXI.Texture.fromFrame('wall44.png'),
            PIXI.Texture.fromFrame('wall45.png'),
            PIXI.Texture.fromFrame('wall46.png'),
            PIXI.Texture.fromFrame('wall54.png'),
            PIXI.Texture.fromFrame('wall55.png'),
            PIXI.Texture.fromFrame('wall56.png')
          ],
        }
      },
      //鉄骨
      steel : {
        entity : this.Cor("wall",90,4),
        back : this.Cor("wall",94,4),
      },
      //背景
      backGround : [PIXI.Texture.fromFrame('wallA0.png')],
      //すり抜け床
      through : [PIXI.Texture.fromFrame('wallC0.png')],
      //トゲが飛び出る床
      needleShot : [ PIXI.Texture.fromFrame('wallC1.png')],
    }

    /*画面遷移エフェクト*/
    this.seqPattern = [];
    for(let y=0;y<4;y++){
      for (let x=0;x<8;x++){
        let str = "seq" + y + "" + x +".png";
        let i = 8*y+x;
        this.seqPattern[i] = PIXI.Texture.fromFrame(str);
      }
    }
    //font
    this.LoadFont();

    //shader
    let filter = new PIXI.Filter(null,resources.shader.data);
    __WEBPACK_IMPORTED_MODULE_1__drawer_js__["a" /* default */].testFilter = filter;
  }

  static async LoadTexture(){
      let loader = PIXI.loader;
      await new Promise((res)=>loader
        .add('pattern','src/resource/img/playerPattern.json')
        .add('pattern2','src/resource/img/UIPattern.json')
        .add('pattern3','src/resource/img/bulletPattern.json')
        .add('pattern4','src/resource/img/enemyPattern.json')
        .add('pattern5','src/resource/img/wallPattern.json')
        .add('pattern6','src/resource/img/seqPattern.json')
        .add('pattern7','src/resource/img/font.json')
        .add('src/resource/effect/dark.png')
        .add('shader', 'src/Shader/test.frag')
        .load((loader,resources)=>Art.Load(resources)).onComplete.add(res)); }

  //pattern : str
  //start ,frames : int
  static Cor(pattern,start,frames){
    let filename;
    let a = [];//戻り値
    for(let i=0;i<frames;i++){
      filename = pattern + (start + i) + ".png";
      a[i] = PIXI.Texture.fromFrame(filename);
    }
    return a;
  }

  static SpriteFactory(texture){
    return new PIXI.Sprite(texture);
  }
  static LoadFont(){
    this.font = new Array(256);
    this.font["0"] = PIXI.Texture.fromFrame('font00.png');
    this.font["1"] = PIXI.Texture.fromFrame('font01.png');
    this.font["2"] = PIXI.Texture.fromFrame('font02.png');
    this.font["3"] = PIXI.Texture.fromFrame('font03.png');
    this.font["4"] = PIXI.Texture.fromFrame('font04.png');
    this.font["5"] = PIXI.Texture.fromFrame('font05.png');
    this.font["6"] = PIXI.Texture.fromFrame('font06.png');
    this.font["7"] = PIXI.Texture.fromFrame('font07.png');
    this.font["8"] = PIXI.Texture.fromFrame('font08.png');
    this.font["9"] = PIXI.Texture.fromFrame('font09.png');
    this.font["0r"] = PIXI.Texture.fromFrame('font10.png');
    this.font["1r"] = PIXI.Texture.fromFrame('font11.png');
    this.font["2r"] = PIXI.Texture.fromFrame('font12.png');
    this.font["3r"] = PIXI.Texture.fromFrame('font13.png');
    this.font["4r"] = PIXI.Texture.fromFrame('font14.png');
    this.font["5r"] = PIXI.Texture.fromFrame('font15.png');
    this.font["6r"] = PIXI.Texture.fromFrame('font16.png');
    this.font["7r"] = PIXI.Texture.fromFrame('font17.png');
    this.font["8r"] = PIXI.Texture.fromFrame('font18.png');
    this.font["9r"] = PIXI.Texture.fromFrame('font19.png');
    this.font["あ"] = PIXI.Texture.fromFrame('font20.png');
    this.font["い"] = PIXI.Texture.fromFrame('font21.png');
    this.font["う"] = PIXI.Texture.fromFrame('font22.png');
    this.font["え"] = PIXI.Texture.fromFrame('font23.png');
    this.font["お"] = PIXI.Texture.fromFrame('font24.png');
    this.font["か"] = PIXI.Texture.fromFrame('font25.png');
    this.font["き"] = PIXI.Texture.fromFrame('font26.png');
    this.font["く"] = PIXI.Texture.fromFrame('font27.png');
    this.font["け"] = PIXI.Texture.fromFrame('font28.png');
    this.font["こ"] = PIXI.Texture.fromFrame('font29.png');
    this.font["さ"] = PIXI.Texture.fromFrame('font2a.png');
    this.font["し"] = PIXI.Texture.fromFrame('font2b.png');
    this.font["す"] = PIXI.Texture.fromFrame('font2c.png');
    this.font["せ"] = PIXI.Texture.fromFrame('font2d.png');
    this.font["そ"] = PIXI.Texture.fromFrame('font2e.png');
    this.font["た"] = PIXI.Texture.fromFrame('font2f.png');
    this.font["ち"] = PIXI.Texture.fromFrame('font210.png');
    this.font["つ"] = PIXI.Texture.fromFrame('font211.png');
    this.font["て"] = PIXI.Texture.fromFrame('font212.png');
    this.font["と"] = PIXI.Texture.fromFrame('font213.png');
    this.font["な"] = PIXI.Texture.fromFrame('font214.png');
    this.font["に"] = PIXI.Texture.fromFrame('font215.png');
    this.font["ぬ"] = PIXI.Texture.fromFrame('font216.png');
    this.font["ね"] = PIXI.Texture.fromFrame('font217.png');
    this.font["の"] = PIXI.Texture.fromFrame('font218.png');
    this.font["は"] = PIXI.Texture.fromFrame('font30.png');
    this.font["ひ"] = PIXI.Texture.fromFrame('font31.png');
    this.font["ふ"] = PIXI.Texture.fromFrame('font32.png');
    this.font["へ"] = PIXI.Texture.fromFrame('font33.png');
    this.font["ほ"] = PIXI.Texture.fromFrame('font34.png');
    this.font["ま"] = PIXI.Texture.fromFrame('font35.png');
    this.font["み"] = PIXI.Texture.fromFrame('font36.png');
    this.font["む"] = PIXI.Texture.fromFrame('font37.png');
    this.font["め"] = PIXI.Texture.fromFrame('font38.png');
    this.font["も"] = PIXI.Texture.fromFrame('font39.png');
    this.font["や"] = PIXI.Texture.fromFrame('font3a.png');
    this.font["ゐ"] = PIXI.Texture.fromFrame('font3b.png');
    this.font["ゆ"] = PIXI.Texture.fromFrame('font3c.png');
    this.font[" "] = PIXI.Texture.fromFrame('font3d.png');
    this.font["よ"] = PIXI.Texture.fromFrame('font3e.png');
    this.font["ら"] = PIXI.Texture.fromFrame('font3f.png');
    this.font["り"] = PIXI.Texture.fromFrame('font310.png');
    this.font["る"] = PIXI.Texture.fromFrame('font311.png');
    this.font["れ"] = PIXI.Texture.fromFrame('font312.png');
    this.font["ろ"] = PIXI.Texture.fromFrame('font313.png');
    this.font["わ"] = PIXI.Texture.fromFrame('font314.png');
    this.font["欠番3"] = PIXI.Texture.fromFrame('font315.png');
    this.font["を"] = PIXI.Texture.fromFrame('font316.png');
    this.font["欠番4"] = PIXI.Texture.fromFrame('font317.png');
    this.font["ん"] = PIXI.Texture.fromFrame('font318.png');
    this.font["が"] = PIXI.Texture.fromFrame('font40.png');
    this.font["ぎ"] = PIXI.Texture.fromFrame('font41.png');
    this.font["ぐ"] = PIXI.Texture.fromFrame('font42.png');
    this.font["げ"] = PIXI.Texture.fromFrame('font43.png');
    this.font["ご"] = PIXI.Texture.fromFrame('font44.png');
    this.font["ざ"] = PIXI.Texture.fromFrame('font45.png');
    this.font["じ"] = PIXI.Texture.fromFrame('font46.png');
    this.font["ず"] = PIXI.Texture.fromFrame('font47.png');
    this.font["ぜ"] = PIXI.Texture.fromFrame('font48.png');
    this.font["ぞ"] = PIXI.Texture.fromFrame('font49.png');
    this.font["だ"] = PIXI.Texture.fromFrame('font4a.png');
    this.font["ぢ"] = PIXI.Texture.fromFrame('font4b.png');
    this.font["づ"] = PIXI.Texture.fromFrame('font4c.png');
    this.font["で"] = PIXI.Texture.fromFrame('font4d.png');
    this.font["ど"] = PIXI.Texture.fromFrame('font4e.png');
    this.font["ば"] = PIXI.Texture.fromFrame('font4f.png');
    this.font["び"] = PIXI.Texture.fromFrame('font410.png');
    this.font["ぶ"] = PIXI.Texture.fromFrame('font411.png');
    this.font["べ"] = PIXI.Texture.fromFrame('font412.png');
    this.font["ぼ"] = PIXI.Texture.fromFrame('font413.png');
    this.font["ぱ"] = PIXI.Texture.fromFrame('font414.png');
    this.font["ぴ"] = PIXI.Texture.fromFrame('font415.png');
    this.font["ぷ"] = PIXI.Texture.fromFrame('font416.png');
    this.font["ぺ"] = PIXI.Texture.fromFrame('font417.png');
    this.font["ぽ"] = PIXI.Texture.fromFrame('font418.png');
    this.font["ぁ"] = PIXI.Texture.fromFrame('font50.png');
    this.font["ぃ"] = PIXI.Texture.fromFrame('font51.png');
    this.font["ぅ"] = PIXI.Texture.fromFrame('font52.png');
    this.font["ぇ"] = PIXI.Texture.fromFrame('font53.png');
    this.font["ぉ"] = PIXI.Texture.fromFrame('font54.png');
    this.font["っ"] = PIXI.Texture.fromFrame('font55.png');
    this.font["ゃ"] = PIXI.Texture.fromFrame('font56.png');
    this.font["ゅ"] = PIXI.Texture.fromFrame('font57.png');
    this.font["ょ"] = PIXI.Texture.fromFrame('font58.png');
    this.font["ア"] = PIXI.Texture.fromFrame('font60.png');
    this.font["イ"] = PIXI.Texture.fromFrame('font61.png');
    this.font["ウ"] = PIXI.Texture.fromFrame('font62.png');
    this.font["エ"] = PIXI.Texture.fromFrame('font63.png');
    this.font["オ"] = PIXI.Texture.fromFrame('font64.png');
    this.font["カ"] = PIXI.Texture.fromFrame('font65.png');
    this.font["キ"] = PIXI.Texture.fromFrame('font66.png');
    this.font["ク"] = PIXI.Texture.fromFrame('font67.png');
    this.font["ケ"] = PIXI.Texture.fromFrame('font68.png');
    this.font["コ"] = PIXI.Texture.fromFrame('font69.png');
    this.font["サ"] = PIXI.Texture.fromFrame('font6a.png');
    this.font["シ"] = PIXI.Texture.fromFrame('font6b.png');
    this.font["ス"] = PIXI.Texture.fromFrame('font6c.png');
    this.font["セ"] = PIXI.Texture.fromFrame('font6d.png');
    this.font["ソ"] = PIXI.Texture.fromFrame('font6e.png');
    this.font["タ"] = PIXI.Texture.fromFrame('font6f.png');
    this.font["チ"] = PIXI.Texture.fromFrame('font610.png');
    this.font["ツ"] = PIXI.Texture.fromFrame('font611.png');
    this.font["テ"] = PIXI.Texture.fromFrame('font612.png');
    this.font["ト"] = PIXI.Texture.fromFrame('font613.png');
    this.font["ナ"] = PIXI.Texture.fromFrame('font614.png');
    this.font["ニ"] = PIXI.Texture.fromFrame('font615.png');
    this.font["ヌ"] = PIXI.Texture.fromFrame('font616.png');
    this.font["ネ"] = PIXI.Texture.fromFrame('font617.png');
    this.font["ノ"] = PIXI.Texture.fromFrame('font618.png');
    this.font["ハ"] = PIXI.Texture.fromFrame('font70.png');
    this.font["ヒ"] = PIXI.Texture.fromFrame('font71.png');
    this.font["フ"] = PIXI.Texture.fromFrame('font72.png');
    this.font["ヘ"] = PIXI.Texture.fromFrame('font73.png');
    this.font["ホ"] = PIXI.Texture.fromFrame('font74.png');
    this.font["マ"] = PIXI.Texture.fromFrame('font75.png');
    this.font["ミ"] = PIXI.Texture.fromFrame('font76.png');
    this.font["ム"] = PIXI.Texture.fromFrame('font77.png');
    this.font["メ"] = PIXI.Texture.fromFrame('font78.png');
    this.font["モ"] = PIXI.Texture.fromFrame('font79.png');
    this.font["ヤ"] = PIXI.Texture.fromFrame('font7a.png');
    this.font["ヰ"] = PIXI.Texture.fromFrame('font7b.png');
    this.font["ユ"] = PIXI.Texture.fromFrame('font7c.png');
    this.font["欠番5"] = PIXI.Texture.fromFrame('font7d.png');
    this.font["ヨ"] = PIXI.Texture.fromFrame('font7e.png');
    this.font["ラ"] = PIXI.Texture.fromFrame('font7f.png');
    this.font["リ"] = PIXI.Texture.fromFrame('font710.png');
    this.font["ル"] = PIXI.Texture.fromFrame('font711.png');
    this.font["レ"] = PIXI.Texture.fromFrame('font712.png');
    this.font["ロ"] = PIXI.Texture.fromFrame('font713.png');
    this.font["ワ"] = PIXI.Texture.fromFrame('font714.png');
    this.font["欠番6"] = PIXI.Texture.fromFrame('font715.png');
    this.font["ヲ"] = PIXI.Texture.fromFrame('font716.png');
    this.font["欠番7"] = PIXI.Texture.fromFrame('font717.png');
    this.font["ン"] = PIXI.Texture.fromFrame('font718.png');
    this.font["ガ"] = PIXI.Texture.fromFrame('font80.png');
    this.font["ギ"] = PIXI.Texture.fromFrame('font81.png');
    this.font["グ"] = PIXI.Texture.fromFrame('font82.png');
    this.font["ゲ"] = PIXI.Texture.fromFrame('font83.png');
    this.font["ゴ"] = PIXI.Texture.fromFrame('font84.png');
    this.font["ザ"] = PIXI.Texture.fromFrame('font85.png');
    this.font["ジ"] = PIXI.Texture.fromFrame('font86.png');
    this.font["ズ"] = PIXI.Texture.fromFrame('font87.png');
    this.font["ゼ"] = PIXI.Texture.fromFrame('font88.png');
    this.font["ゾ"] = PIXI.Texture.fromFrame('font89.png');
    this.font["ダ"] = PIXI.Texture.fromFrame('font8a.png');
    this.font["ヂ"] = PIXI.Texture.fromFrame('font8b.png');
    this.font["ヅ"] = PIXI.Texture.fromFrame('font8c.png');
    this.font["デ"] = PIXI.Texture.fromFrame('font8d.png');
    this.font["ド"] = PIXI.Texture.fromFrame('font8e.png');
    this.font["バ"] = PIXI.Texture.fromFrame('font8f.png');
    this.font["ビ"] = PIXI.Texture.fromFrame('font810.png');
    this.font["ブ"] = PIXI.Texture.fromFrame('font811.png');
    this.font["ベ"] = PIXI.Texture.fromFrame('font812.png');
    this.font["ボ"] = PIXI.Texture.fromFrame('font813.png');
    this.font["パ"] = PIXI.Texture.fromFrame('font814.png');
    this.font["ピ"] = PIXI.Texture.fromFrame('font815.png');
    this.font["プ"] = PIXI.Texture.fromFrame('font816.png');
    this.font["ペ"] = PIXI.Texture.fromFrame('font817.png');
    this.font["ポ"] = PIXI.Texture.fromFrame('font818.png');
    this.font["ァ"] = PIXI.Texture.fromFrame('font90.png');
    this.font["ィ"] = PIXI.Texture.fromFrame('font91.png');
    this.font["ゥ"] = PIXI.Texture.fromFrame('font92.png');
    this.font["ェ"] = PIXI.Texture.fromFrame('font93.png');
    this.font["ォ"] = PIXI.Texture.fromFrame('font94.png');
    this.font["ッ"] = PIXI.Texture.fromFrame('font95.png');
    this.font["ャ"] = PIXI.Texture.fromFrame('font96.png');
    this.font["ュ"] = PIXI.Texture.fromFrame('font97.png');
    this.font["ョ"] = PIXI.Texture.fromFrame('font98.png');
    this.font["A"] = PIXI.Texture.fromFrame('fontA0.png');
    this.font["B"] = PIXI.Texture.fromFrame('fontA1.png');
    this.font["C"] = PIXI.Texture.fromFrame('fontA2.png');
    this.font["D"] = PIXI.Texture.fromFrame('fontA3.png');
    this.font["E"] = PIXI.Texture.fromFrame('fontA4.png');
    this.font["F"] = PIXI.Texture.fromFrame('fontA5.png');
    this.font["G"] = PIXI.Texture.fromFrame('fontA6.png');
    this.font["H"] = PIXI.Texture.fromFrame('fontA7.png');
    this.font["I"] = PIXI.Texture.fromFrame('fontA8.png');
    this.font["J"] = PIXI.Texture.fromFrame('fontA9.png');
    this.font["K"] = PIXI.Texture.fromFrame('fontAa.png');
    this.font["L"] = PIXI.Texture.fromFrame('fontAb.png');
    this.font["M"] = PIXI.Texture.fromFrame('fontAc.png');
    this.font["N"] = PIXI.Texture.fromFrame('fontAd.png');
    this.font["O"] = PIXI.Texture.fromFrame('fontAe.png');
    this.font["P"] = PIXI.Texture.fromFrame('fontAf.png');
    this.font["Q"] = PIXI.Texture.fromFrame('fontA10.png');
    this.font["R"] = PIXI.Texture.fromFrame('fontA11.png');
    this.font["S"] = PIXI.Texture.fromFrame('fontA12.png');
    this.font["T"] = PIXI.Texture.fromFrame('fontA13.png');
    this.font["U"] = PIXI.Texture.fromFrame('fontA14.png');
    this.font["V"] = PIXI.Texture.fromFrame('fontA15.png');
    this.font["W"] = PIXI.Texture.fromFrame('fontA16.png');
    this.font["X"] = PIXI.Texture.fromFrame('fontA17.png');
    this.font["Y"] = PIXI.Texture.fromFrame('fontA18.png');
    this.font["Z"] = PIXI.Texture.fromFrame('fontA19.png');
    this.font["a"] = PIXI.Texture.fromFrame('fontB0.png');
    this.font["b"] = PIXI.Texture.fromFrame('fontB1.png');
    this.font["c"] = PIXI.Texture.fromFrame('fontB2.png');
    this.font["d"] = PIXI.Texture.fromFrame('fontB3.png');
    this.font["e"] = PIXI.Texture.fromFrame('fontB4.png');
    this.font["f"] = PIXI.Texture.fromFrame('fontB5.png');
    this.font["g"] = PIXI.Texture.fromFrame('fontB6.png');
    this.font["h"] = PIXI.Texture.fromFrame('fontB7.png');
    this.font["i"] = PIXI.Texture.fromFrame('fontB8.png');
    this.font["j"] = PIXI.Texture.fromFrame('fontB9.png');
    this.font["k"] = PIXI.Texture.fromFrame('fontBa.png');
    this.font["l"] = PIXI.Texture.fromFrame('fontBb.png');
    this.font["m"] = PIXI.Texture.fromFrame('fontBc.png');
    this.font["n"] = PIXI.Texture.fromFrame('fontBd.png');
    this.font["o"] = PIXI.Texture.fromFrame('fontBe.png');
    this.font["p"] = PIXI.Texture.fromFrame('fontBf.png');
    this.font["q"] = PIXI.Texture.fromFrame('fontB10.png');
    this.font["r"] = PIXI.Texture.fromFrame('fontB11.png');
    this.font["s"] = PIXI.Texture.fromFrame('fontB12.png');
    this.font["t"] = PIXI.Texture.fromFrame('fontB13.png');
    this.font["u"] = PIXI.Texture.fromFrame('fontB14.png');
    this.font["v"] = PIXI.Texture.fromFrame('fontB15.png');
    this.font["w"] = PIXI.Texture.fromFrame('fontB16.png');
    this.font["x"] = PIXI.Texture.fromFrame('fontB17.png');
    this.font["y"] = PIXI.Texture.fromFrame('fontB18.png');
    this.font["z"] = PIXI.Texture.fromFrame('fontB19.png');
    this.font["ー"] = PIXI.Texture.fromFrame('fontC0.png');
    this.font["!"] = PIXI.Texture.fromFrame('fontC1.png');
    this.font["?"] = PIXI.Texture.fromFrame('fontC2.png');
    this.font["。"] = PIXI.Texture.fromFrame('fontC3.png');
    this.font["、"] = PIXI.Texture.fromFrame('fontC4.png');
    this.font["."] = PIXI.Texture.fromFrame('fontC5.png');
    this.font["("] = PIXI.Texture.fromFrame('fontC6.png');
    this.font[")"] = PIXI.Texture.fromFrame('fontC7.png');
    this.font["-"] = PIXI.Texture.fromFrame('fontC8.png');
    this.font["+"] = PIXI.Texture.fromFrame('fontC9.png');
    this.font["→"] = PIXI.Texture.fromFrame('fontCa.png');
    this.font["←"] = PIXI.Texture.fromFrame('fontCb.png');
    this.font["↑"] = PIXI.Texture.fromFrame('fontCc.png');
    this.font["↓"] = PIXI.Texture.fromFrame('fontCd.png');
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = Art;





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Collision{

  /*collisionInfoを返す */
  static on(e1,e2){
    let isHit = false; //衝突したかどうかのbool値
      //ココが怪しい
      //衝突がtrueなら必ず法線が帰ってくるはずなのに
      //プレイヤー側の押し出しの途中で法線が拾えてない(?)事がある

      let n;// = {x:99999,y:0}; // 押し出すべき方向(法線) 衝突していなければundefined
    let depth;
    /*円同士の衝突判定*/
    if(e1.collider.shape == SHAPE.CIRCLE && e2.collider.shape == SHAPE.CIRCLE){
      let circ1 = e1.collider.hitbox;
      let circ2 = e2.collider.hitbox;
      if(DIST(circ1.pos,circ2.pos) < circ1.r + circ2.r){
        isHit = true;
        n = NOMALIZE({x:circ1.pos.x-circ2.pos.x , y:circ1.pos.y-circ2.pos.y});
      }else{
        isHit = false;
      }
      return new CollisionInfo(isHit , n , meri);
    }

    /*矩形同士*/
    if(e1.collider.shape == SHAPE.BOX && e2.collider.shape == SHAPE.BOX){
      let box1 = e1.collider.hitbox;
      let box2 = e2.collider.hitbox;

      if(
        box1.pos.x < box2.pos.x + box2.width &&
        box2.pos.x < box1.pos.x + box1.width &&
        box1.pos.y < box2.pos.y + box2.height &&
        box2.pos.y < box1.pos.y + box1.height
      )
        {
        //0 ↓ 0   1
        //1 → 1   0
        //2 ↑ 0   -1
        //3 ← -1  0
        let meri = [
          box2.pos.y+box2.height - box1.pos.y , 
          box2.pos.x+box2.width - box1.pos.x , 
          box1.pos.y+box1.height - box2.pos.y ,
          box1.pos.x+box1.width - box2.pos.x
        ];
        let maxI = meri.maxIndex();
        let minI = meri.minIndex();
        //console.log(meri);
        isHit = true;
        switch(minI){
          case 0: n = {x:0 , y:1};break;
          case 1: n = {x:1 , y:0};break;
          case 2: n = {x:0 , y:-1};break;
          case 3: n = {x:-1 , y:0};break;
        }
        depth = meri[minI];
      }else{
        isHit = false;
      }
      return new CollisionInfo(isHit , n , depth);
    }

    //線分単体
    if(e1.collider.shape == SHAPE.LINE && e2.collider.shape == SHAPE.LINE){
      return new CollisionInfo(isHit , n , depth);
    }

    //4つ線分の集合体
    if(e1.collider.shape == SHAPE.LINES && e2.collider.shape == SHAPE.LINES){
      return new CollisionInfo(isHit , n , depth);
    }
    //どれでもないパターン
    throw new Error("衝突判定がバグってます");
  }

  /*
  
  🍉 衝突応答
  
  */

  /*衝突応答 矩形同士*/
  //e1が呼び出し側
  static Resolve(e1,e2){
    console.assert(e1.e != undefined);
    /*速度*/
    let l = Collision.on(e1,e2);
    if(l.n.x != 0) e1.vel.x = 0;
    if(l.n.y == -1) e1.vel.y =0;
    if(l.n.y == 1) e1.vel.y =0;
    //while(Collision.on(e1,e2).isHit){
      e1.pos.x += l.n.x*l.depth;
      e1.pos.y += l.n.y*l.depth;
    //}
    /*note : now isHit == false*/
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Collision;


//衝突判定クラス
class CollisionInfo{
  constructor(isHit,n,depth){
    this.isHit = isHit; // 衝突したかどうか bool
    this.n = n //衝突したならば法線
    this.depth = depth;//めり込み量
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_js__ = __webpack_require__(26);

//サウンド管理
let source,buffer,gainNode;
class Audio{
  static Init(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.BGM = { } 
    this.SE = { }
    this.stack = [];
    this.time = __WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* default */].timer;
    this.lastSE;
  };
  static LoadSE(name){
    let url = "src/resource/SE/" + name + ".wav";
    let req = new XMLHttpRequest();
    // array buffer を指定
    req.responseType = 'arraybuffer';
    req.onreadystatechange = ()=>{
      if (req.readyState === 4) {
        if (req.status === 0 || req.status === 200) {
          // array buffer を audio buffer に変換
          this.context.decodeAudioData(req.response,
            (buffer)=>{this.SE[name] = buffer
            });
        }
      }
    }
    req.open('GET', url, true);
    req.send('');
  }
  static LoadBGM(name){
    let url = "src/resource/BGM/" + name + ".mp3";
    let req = new XMLHttpRequest();
    // array buffer を指定
    req.responseType = 'arraybuffer';
    req.onreadystatechange = ()=>{
      if (req.readyState === 4) {
        if (req.status === 0 || req.status === 200) {
          // array buffer を audio buffer に変換
          this.context.decodeAudioData(req.response,(buffer)=>{this.BGM[name] = buffer});
        }
      }
    }
    req.open('GET', url, true);
    req.send('');
  }
  // サウンドを再生
  static PlayBGM(name,gain){
    let buffer = this.BGM[name];
    source = this.context.createBufferSource(); // source を作成
    source.buffer = buffer; // buffer をセット
    source.connect(this.context.destination); // context に connect
    source.loop = true; // 再生
      if(gain){
        let gainNode = this.context.createGain();
        source.connect(gainNode);
        gainNode.connect(this.context.destination);
        gainNode.gain.value = gain;
      }
    source.start(0);
  };
  static PlaySE(name,gain,pitch){
    //同じ効果音は同時にならないようにする
    if(__WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* default */].timer-this.time > 2|| name != this.lastSE){
      this.time = __WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* default */].timer;
      this.lastSE = name;
      source = this.context.createBufferSource();
      source.buffer = this.SE[name];
      source.connect(this.context.destination);
      source.loop = false; // 再生
      if(!pitch)pitch = 1;
      source.playbackRate.value = pitch + Rand(0.05);
      gainNode = this.context.createGain();
      source.connect(gainNode);
      gainNode.connect(this.context.destination);
      gainNode.gain.value = 1;
      if(gain) gainNode.gain.value += gain;
      source.start(0);
    }
  };
  static Load() {
    return new Promise(res=>{
      this.Init();
      //!ココで読み込むnameはファイル名に統一すること!
  //    this.LoadBGM('stage4');
      this.LoadBGM('stage5');

      this.LoadSE('jump1');
      this.LoadSE('jump2');//空中ジャンプ
      this.LoadSE('coin1');
      this.LoadSE('coin2');//コイン反射
      this.LoadSE('targetOn');//照準
      this.LoadSE('playerDamage');
      this.LoadSE('enemyDamage');
      this.LoadSE('missileHit');
      this.LoadSE('missileShot');
      this.LoadSE('laserShot');
      this.LoadSE('normalShot');
      this.LoadSE('landing1');//着地
      this.LoadSE('landing2');//着地鉄骨
      this.LoadSE('landing3');//着地鉄骨
      this.LoadSE('blockBreak');//
      this.LoadSE('stageChange');//
      this.LoadSE('empty');//
      this.LoadSE('enemy3Shot');//
      this.LoadSE('enemy5Shot');//
      this.LoadSE('enemy6Swell');//
      this.LoadSE('changeWeapon');//
      res();
    })
  };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Audio;
;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stagePop_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gaugeHP_js__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gaugeBullet_js__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__WeaponList_js__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__font_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__message_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__menu_js__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__score_js__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__game_js__ = __webpack_require__(11);














//HP
const P_HP = {
  x : 8, 
  y : 0
};
//bullet
const P_BUL = {
  x : P_HP.x, 
  y : P_HP.y+16, 
};
//score
const P_SCORE = {
  x : 216,
  y : P_HP.y + 8, 
}
//message
const P_MES = {
  x:64,
  y:128
}
//Menu
let P_MENU = {
  x : 104,
  y : 48
}
/*UIクラス*/
class UIManager{
  static Init(){
    this.UIList = [];//UI全部のリスト
    this.HP;
    this.bullet;
    this.wlistk
    this.score;
    this.message;
    this.menu;
  }
  static PopStage(stage){
    let p = {
      x : 96,
      y : 64
    }
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_3__stagePop_js__["a" /* default */](p,"--どうくつ "+__WEBPACK_IMPORTED_MODULE_12__game_js__["a" /* default */].stage+"- "));//SCORE
  }

  /*タイトルでのUI配置に変更*/
  static SetTitle(){
    let p1 = {
      x : 96, 
      y : 64,
    }
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_7__font_js__["a" /* default */](p1,"さいはてどろっぷ","MES"));//SCORE
    let p2 = {
      x : p1.x, 
      y : p1.y+10,
    }
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_7__font_js__["a" /* default */](p2,"- ver0.1 -","MES"));//SCORE
    let p3 = {
      x : p1.x-8, 
      y : p2.y+48,
    }
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_7__font_js__["a" /* default */](p3,"Press Any Key","MES"));//SCORE
    let p4 = {
      x : 172, 
      y : 192,
    }
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_7__font_js__["a" /* default */](p4,"+ 2018 uynet","MES"));//SCORE
  }
  /*ステージ中でのUI配置に変更*/
  static SetStage(){
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_4__gaugeHP_js__["a" /* default */](P_HP));//HP
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_5__gaugeBullet_js__["a" /* default */](P_BUL));//BULLET
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_6__WeaponList_js__["a" /* default */](P_BUL));//WList;
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_10__score_js__["a" /* default */](P_SCORE));//SCORE
  }
  //フィルタ
  static SetFilter(filters){
    /*
    Drawer.entityContainer.filters = filters;
    Drawer.backContainer.filters = filters;
    Drawer.backGroundContainer.filters = filters;
    Drawer.foreContainer.filters = filters;
    Drawer.UIContainer.filters = filters;
    */
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].entityContainer.aplha = 0.5;
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].backContainer.filters = filters;
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].backGroundContainer.filters = filters;
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].foreContainer.filters = filters;
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].UIContainer.filters = filters;
  }
  //メニューを開く
  static SetMenu(){
    UIManager.SetFilter([__WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].testFilter]);
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_9__menu_js__["a" /* default */](ADV(P_MENU,VECY(16))));
  }
  //UIをすべて削除
  static Clean(){
    while(this.UIList.length>0){
      this.removeUI(this.UIList[0]);
    }
    let filters = [];
    UIManager.SetFilter(filters);
  }
  //メッセージイベント
  /* text : 入力文字列
   * sentence : textを改行文字で区切った配列
   */
  static PopMessage(text,type){
    /*type : 
     * POP 新しくフレームを作る
     * PAGE フレームを作らず改ページのみ
     */
    __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlaySE("changeWeapon");
    switch(type){
      case "POP" : 
        UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_8__message_js__["a" /* default */](P_MES,text));//枠
        break;
      case "PAGE" :
        this.message.Page(text);
        break;
      case "SELECT" : 
        //選択肢イベントが入る予定
        break;
    }
  }
  static CloseMessage(){
    UIManager.removeUI(this.message);
  }

  //UIをリストに登録
  static addUI(ui){
    let layer = ui.layer;
    if(!layer)layer = "UI";

    this.UIList.push(ui); 
    switch (ui.type){
      case "HP" : this.HP = ui; break;
      case "BULLET" : this.bullet = ui; break;
      case "WLIST" : this.wlist = ui; break;
      case "SCORE" : this.score = ui;break;
      case "MES" : this.message = ui;break;
      case "MENU" : this.menu = ui;break;
      case "PUSH" : /*noth*/break;
      default : console.warn(ui);
    }
    //スプライトの追加
    if(ui.isMultiple){
      //複スプライト
        __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].addContainer(ui.container,layer);
    }else{
      //単スプライト
      __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].addContainer(ui.sprite,layer);
    }
  }
  /*UIをリストから削除*/
  //参照の開放をする
  static removeUI(ui){
    let layer = ui.layer;
    if(!layer)layer = "UI";
    
    let i = this.UIList.indexOf(ui);
    //要素の子であるFontはリストに無いため参照を消さない
    if(i != -1) this.UIList.splice(i,1);
    if(ui.isMultiple){
      //複数スプライトを持つオブジェクト
        __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].removeContainer(ui.container,layer);
    }else{
      //単スプライト
      __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].removeContainer(ui.sprite,layer);
    }
  }
  /*UIの更新*/
  static Update(){
    for(let l of UIManager.UIList){
      l.Update();
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UIManager;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*矩形*/
class Box{
  //pos:左上の座標
  //width
  //height
  constructor(pos,width,height){
    this.pos = pos;
    this.width = width;
    this.height = height;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Box;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class EventManager{
  static Init(){
    this.eventList = [];
  }
  static PushEvent(event){
    this.eventList.push(event);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EventManager;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Collider{
  constructor(shape,hitbox){
    this.shape = shape;
    this.hitbox = hitbox;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Collider;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//パラメータ管理クラス
class Param{
  static Init(){
    this.player = {
      jumpVel : 4.5,//ジャンプ力
      runVel : 0.4,//はしり速度
      gravity : 0.15,
      maxHp : 100,
      maxBullet : 100,
      fliction : 0.7,
      invTime : 5,//無敵時間
      
      animRun : 4,
      animWait : 7,
      score : 0,

      vxMax : 3,
      vyMax : 8,
      //手に入れた武器の情報
      havingWeaponList : {
        normal : true,
        missile : false,
        laser : false,
      },
      //装備中の武器
      equip : "normal",
    }
    this.enemy1 = {
      hp : 10,
      atkMax : 10,
      atkMin : 5,
      gravity : 0.1,
      coin : 1
    }
    this.enemy2 = {
      hp : 20,
      atkMax : 10,
      atkMin : 5,
      gravity : 0.0,
      coin : 4
    }
    this.enemy3 = {
      hp : 30,
      atkMax : 10,
      atkMin : 5,
      gravity : 0,
      range : 80,
      coin : 3
    }
    this.enemy4 = {
      hp : 10,
      atkMax : 3,
      atkMin : 1,
      gravity : 0.2,
      coin : 2
    }
    this.enemy5 = {
      hp : 10,
      atkMax : 3,
      atkMin : 1,
      gravity : 0.2,
      term : 80,
      coin : 2
    }
    this.enemy6 = {
      hp : 1,
      atkMax : 3,
      atkMin : 1,
      gravity : 0,
      term : 50,
      coin : 1,
      exp : 49,
    }
    this.eBullet1 = {
      hp : 1,
      atkMin : 1,
      atkMax : 1,
    }
    this.eBullet2 = {
      hp : 1,
      atkMin : 5,
      atkMax : 10,
      gravity : 0.05
    }
    this.weapon1 = {
      //status
      agi : 20,
      cost : 17,
      speed : 7, 
      length : 580,
      //optional
      isTarget : true,
      isHorming : true,
      isLasersight : true,
    }
    this.weapon11 = {
      agi : 2,
      cost : 6,
      speed : 0.0001, 
      length : 180,
    }
    this.weapon2 = {
      agi : 26,
      cost : 20,
      length : 300,
      //optional
      isTarget : true,
     // isHorming : false,
      isLasersight : false,
    }
    //normal
    this.weapon3 = {
      agi : 16,
      cost : 6,
      speed : 4, 
      length : 300,
      //optional
      isTarget : true,
     // isHorming : false,
      isLasersight : false,
    }
    //Missile
    this.bullet1 = {
      atkMax : 50,
      atkMin : 10,
      hp : 1,
      curve : 0.2
    }
    //Laser
    this.bullet2 = {
      atkMax : 50,
      atkMin : 1,
      hp : 99999,
    }
    //normal
    this.bullet3 = {
      atkMax : 12,
      atkMin : 8,
      hp : 1,
      curve : 0.2
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Param;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input_js__ = __webpack_require__(13);




let PIXI_WIDTH = 800; let PIXI_HEIGHT = 640;
let size = 1; 
let centerX,centerY,toX,toY;
class Drawer{

  /*setting stage*/
  static Init(){
    this.app = new PIXI.Application(PIXI_WIDTH, PIXI_HEIGHT, {backgroundColor : 0x000000});
    this.Stage = this.app.stage;
      /* コンテナ(レイヤー)は以下の通り 下から優先して描画される
       * Background
       * Backコンテナ 
       * Entityコンテナ:Entityを描画するレイヤ
       * Effectコンテナ:画面に適用するエフェクトを描画するレイヤ
       * fore:手前に描画
       * UIコンテナ:UIを描画するレイヤ
       * */
    this.backGroundContainer = new PIXI.Container();//背景
    this.backContainer = new PIXI.Container();//backEntity
    this.entityContainer = new PIXI.Container();//Entity
    this.foreEntityContainer = new PIXI.Container();//手前に表示する 文字エフェクトなど
    this.foreContainer = new PIXI.Container();//手前に表示する 文字エフェクトなど
    this.filterContainer = new PIXI.Container();//画面遷移フィルター
    this.UIContainer = new PIXI.Container();//UI

    this.app.stage.addChild(this.backGroundContainer);
    this.app.stage.addChild(this.backContainer);
    this.app.stage.addChild(this.entityContainer);
    this.app.stage.addChild(this.foreEntityContainer);
    this.app.stage.addChild(this.foreContainer);
    this.app.stage.addChild(this.filterContainer);
    this.app.stage.addChild(this.UIContainer);
    this.Renderer = new PIXI.autoDetectRenderer(PIXI_WIDTH,PIXI_HEIGHT);


    /*拡大率*/
    this.magnification = 3;
    let po = VECN(this.magnification);
    this.backGroundContainer.scale = po;
    this.backContainer.scale = po;
    this.entityContainer.scale = po;
    this.UIContainer.scale = po;
    this.foreContainer.scale.set(4);
    this.foreEntityContainer.scale = po;
    this.filterContainer.scale = po;
    $("#pixiview").append(this.Renderer.view);

    //フィルタ
    //this.filters = 
    this.blurFilter = new PIXI.filters.BlurFilter();
    this.blurFilter.blur = 2;
    this.noiseFilter = new PIXI.filters.NoiseFilter(0.5);
    //
    this.mapSize = {
      width : 32,
      height : 32,
    }
  }

  /*コンテナにスプライトを追加*/
  static addContainer(sprite,CONTAINER){
    switch (CONTAINER){
      case "UI" : this.UIContainer.addChild(sprite); break;
      case "FILTER": this.filterContainer.addChild(sprite); break;
      case "ENTITY": this.entityContainer.addChild(sprite); break;
      case "FORE": this.foreContainer.addChild(sprite); break;
      case "FOREENTITY": this.foreEntityContainer.addChild(sprite); break;
      case "BACK": this.backContainer.addChild(sprite); break;
      case "BG": this.backGroundContainer.addChild(sprite); break;
      default : console.warn(CONTAINER);
    }
  }

  /*コンテナからスプライトを削除*/
  static removeContainer(sprite,CONTAINER){//,id){
    switch (CONTAINER){
      case "UI" : this.UIContainer.removeChild(sprite); break;
      case "ENTITY": this.entityContainer.removeChild(sprite); break;
      case "FILTER": this.filterContainer.removeChild(sprite); break;
      case "FORE": this.foreContainer.removeChild(sprite); break;
      case "FOREENTITY": this.foreEntityContainer.removeChild(sprite); break;
      case "BACK": this.backContainer.removeChild(sprite); break;
      case "BG": this.backGroundContainer.removeChild(sprite); break;
      default : console.warn("container");
    }
  }

  static SetMap(x,y){
    this.mapSize.width = x;
    this.mapSize.height = y;
  }

  /* プレイヤー中心にスクロール*/
  static ScrollOn(pos){
    centerX = BET(
      this.magnification*(-this.mapSize.width*16 + 134) + 400,
      //10ブロック戻すもどす
      this.magnification*(- pos.x-8) + 400,
      0
    );
    centerY = BET(
      //8ブロックぶん上げる
      this.magnification*(-this.mapSize.height*16 +8*16) + 300,
      this.magnification*(-pos.y-8) + 300,
      0
    );
    toX = this.entityContainer.x + ( centerX - this.entityContainer.x )/8;
    toY = this.entityContainer.y + ( centerY - this.entityContainer.y )/8;
    //背景レイヤ
    //スクロールが遅い
    this.backGroundContainer.x = Math.floor(toX/4 % 256);
    this.backGroundContainer.y = Math.floor(toY/4 % 256);
    //Entityレイヤ
    this.backContainer.x = Math.floor(toX);
    this.backContainer.y = Math.floor(toY);
    this.entityContainer.x = Math.floor(toX);
    this.entityContainer.y = Math.floor(toY);
    this.foreEntityContainer.x = Math.floor(toX);
    this.foreEntityContainer.y = Math.floor(toY);
    this.foreContainer.x = Math.floor(toX*4/3);
    this.foreContainer.y = Math.floor(toY*4/3);
    //UIは動かない

  }
  /*スクロール位置を一瞬で移動させる*/
  static ScrollSet(pos){
    centerX = BET(-700,this.magnification*(- pos.x-8 + 400/this.magnification),-64);
    centerY = this.magnification*(- pos.y-8 + 300/this.magnification);
    this.backContainer.x = Math.floor(centerX);
    this.backContainer.y = Math.floor(centerY);
    this.entityContainer.x = Math.floor(centerX);
    this.entityContainer.y = Math.floor(centerY);
    this.foreEntityContainer.x = Math.floor(centerX);
    this.foreEntityContainer.y = Math.floor(centerY);
    this.foreContainer.x = Math.floor(centerX);
    this.foreContainer.y = Math.floor(centerY);
  }

  static Quake(diff){
    this.Stage.x = Math.floor(diff.x);
    this.Stage.y = Math.floor(diff.y);
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = Drawer;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(14);


//これ継承してる意味ある？？
class EFFECT extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos,vel){
    if(!vel) vel = VEC0();
    super(pos,vel);
    this.type = "MOVER";
    this.layer = "ENTITY";
    this.isUpdater = true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EFFECT;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_mapData_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Event_startStageEvent_js__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Event_startGameEvent_js__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event_scene_js__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__UI_font_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Weapon_weaponManager_js__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__drawer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__timer_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__param_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__UI_menu_js__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Stage_stageGen_js__ = __webpack_require__(39);



















class Game{
  static Init(){
    /*audioとartはinitしない*/
    __WEBPACK_IMPORTED_MODULE_14__param_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_11__drawer_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_9__Weapon_weaponManager_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_1__Stage_pool_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_13__timer_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_17__Stage_stageGen_js__["a" /* default */].Init();

    /*initialize Game state*/
    Game.stage = 1;//現在のステージ番号
    Game.scene = new __WEBPACK_IMPORTED_MODULE_6__Event_scene_js__["a" /* default */]();

    //Gameにタイトル画面状態をプッシュ
    let event = new __WEBPACK_IMPORTED_MODULE_5__Event_startGameEvent_js__["a" /* default */]();
    __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__["a" /* default */].PushEvent(event);

    Game.Run();
  }

  static async Load(){
    await __WEBPACK_IMPORTED_MODULE_10__art_js__["a" /* default */].LoadTexture();
    __WEBPACK_IMPORTED_MODULE_16__audio_js__["a" /* default */].Load().then(_=>{
      Game.Init();
    })
  }

  //タイトル画面中の処理
  static UpdateTitle(){
    if(__WEBPACK_IMPORTED_MODULE_12__input_js__["a" /* default */].isAnyKeyClick()){
      let event = new __WEBPACK_IMPORTED_MODULE_4__Event_startStageEvent_js__["a" /* default */]();
      __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__["a" /* default */].PushEvent(event);
    }
    __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].UpdateTitle();
  }

  //ステージ中の処理
  static UpdateStage(){
    /*Entityの更新*/
    __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].Update();
    __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__["a" /* default */].Update();

    /*ポーズ状態に遷移*/
    if(__WEBPACK_IMPORTED_MODULE_12__input_js__["a" /* default */].isKeyClick(KEY.ESC)){
      __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__["a" /* default */].SetMenu();
      Game.scene.PushSubState("PAUSE");
    }
  }
  static UpdatePause(){
    __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__["a" /* default */].Update();
  }
  //看板を読んでいるときにアニメーションだけを行う
  static UpdateMes(){
    __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].Animation();
    __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__["a" /* default */].Update();
  }

  static Run(){
    requestAnimationFrame(Game.Run);
    for (let l of __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__["a" /* default */].eventList){
      if(l.Do().done){
        let i = __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__["a" /* default */].eventList.indexOf(l);
        __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__["a" /* default */].eventList.splice(i,1);
      }
    }
    switch(Game.scene.state){
      /*更新*/
      /*Note : Lastは自前関数*/
      case STATE.TITLE :
        switch(Game.scene.substate.Last()){
          case "DEFAULT" : Game.UpdateTitle();break;
          case  "TRANS" : /*Nothing to do*/ break;
        }
        break;
      case STATE.STAGE :
        switch(Game.scene.substate.Last()){
          case "DEFAULT" : Game.UpdateStage();break;
          case  "PAUSE" : Game.UpdatePause();break;
          case  "MES" : Game.UpdateMes(); break;
          case  "TRANS" : /*Nothing to do*/ break;
        }
        break;
      default :
        console.warn("unknown state");
    }
    /*描画*/
    __WEBPACK_IMPORTED_MODULE_11__drawer_js__["a" /* default */].Renderer.render(__WEBPACK_IMPORTED_MODULE_11__drawer_js__["a" /* default */].Stage);
    __WEBPACK_IMPORTED_MODULE_13__timer_js__["a" /* default */].IncTime();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;




/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_Effect_stone_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_Effect_bulletBlur_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entity_Effect_smoke_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Entity_Effect_fire_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Entity_Bullet_bullet1_js__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Entity_AI_horming_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Entity_AI_bullet1AI_js__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__param_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Entity_Effect_sonic_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Entity_Effect_flash_js__ = __webpack_require__(37);













/*Object Pool*/
class Pool{
  static Init(){
    this.unused = {
      stones : [],
      smokes : [],
      fires : [],
      bulletblurs : [],
      sonics : [],
      flashes : [],
      missiles : [],
    }
    for(let i = 0;i<1000;i++){
      this.unused.stones.push(new __WEBPACK_IMPORTED_MODULE_1__Entity_Effect_stone_js__["a" /* default */](VEC0(),VEC0()));
    }
    for(let i = 0;i<80;i++){
      this.unused.smokes.push(new __WEBPACK_IMPORTED_MODULE_3__Entity_Effect_smoke_js__["a" /* default */](VEC0(),VEC0(),0));
    }
    for(let i = 0;i<100;i++){
      this.unused.fires.push(new __WEBPACK_IMPORTED_MODULE_4__Entity_Effect_fire_js__["a" /* default */](VEC0(),VEC0()));
    }
    for(let i = 0;i<50;i++){
      this.unused.sonics.push(new __WEBPACK_IMPORTED_MODULE_11__Entity_Effect_sonic_js__["a" /* default */](VEC0()));
    }
    for(let i = 0;i<50;i++){
      this.unused.flashes.push(new __WEBPACK_IMPORTED_MODULE_12__Entity_Effect_flash_js__["a" /* default */](VEC0()));
    }
    for(let i = 0;i<300;i++){
      this.unused.bulletblurs.push(new __WEBPACK_IMPORTED_MODULE_2__Entity_Effect_bulletBlur_js__["a" /* default */](VEC0(),VEC0()));
    }
    for(let i = 0;i<100;i++){
      this.unused.missiles.push(new __WEBPACK_IMPORTED_MODULE_5__Entity_Bullet_bullet1_js__["a" /* default */](VEC0(),"dummyWeapon"));
    }
  }
  static GetBulletBlur(pos,vel){
    if(this.unused.bulletblurs.length > 0){
    let s = this.unused.bulletblurs.pop();
    s.Init(pos,vel);
    return s;
    }else{
      return false;
    }
  }
  static GetMissile(pos,weapon){
    if(this.unused.missiles.length > 0){
      let s = this.unused.missiles.pop();
      s.Init(pos,weapon);
      //param
      s.hp = __WEBPACK_IMPORTED_MODULE_10__param_js__["a" /* default */].bullet1.hp;//弾丸のHP 0になると消滅
      //phys
      s.arg = weapon.arg;
      s.vi = weapon.speed;
      s.pos = pos;
      s.vel = POV(s.arg,s.vi);
      //basic
      s.frame = 0;
      //collider
      s.collider.hitbox.pos = s.pos;
      //AI
      s.isTargetOn = weapon.isTargetOn;
      s.AIList[0].bullet = s;
      if(s.isTargetOn) s.targetedEnemy = weapon.target.enemy;
      //if(weapon.isHorming) s.AIList.push(new Horming(s));
      return s;
    }else{
      return false;
    }
  }
  static Remove(s){
    let listname;
    switch(s.name){
      case "bulletblur" : this.unused.bulletblurs.push(s);break;
      case "fire" : this.unused.fires.push(s);break;
      case "stone" : this.unused.stones.push(s);break;
      case "smoke" : this.unused.smokes.push(s);break;
      case "sonic" : this.unused.sonics.push(s);break;
      case "flash" : this.unused.flashes.push(s);break;
      case "missile" : this.unused.missiles.push(s);break;
      default :console.warn(s.name);
    }
    __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].removeEntity(s);
  }
  static GetFlash(pos,vel){
    if(this.unused.flashes.length > 0){
    let s = this.unused.flashes.pop();
    s.Init(pos,vel);
    return s;
    }else{
      return false;
    }
  }
  static GetSonic(pos,vel){
    if(this.unused.sonics.length > 0){
    let s = this.unused.sonics.pop();
    s.Init(pos,vel);
    return s;
    }else{
      return false;
    }
  }
  static GetStone(pos,vel){
    if(this.unused.stones.length > 0){
    let s = this.unused.stones.pop();
    s.Init(pos,vel);
    return s;
    }else{
      return false;
    }
  }
  static GetSmoke(pos,vel,size){
    if(this.unused.smokes.length>0){
      /*constructor*/
      let s = this.unused.smokes.pop();
      s.Init(pos,vel,size);
      return s;
    }
    else{
      return false;
    }
  }
  static GetFire(pos,vel){
    if(this.unused.fires.length>0){
      /*constructor*/
      let s = this.unused.fires.pop();
      s.Init(pos,vel);
      return s;
    }else{
      return false;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pool;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_js__ = __webpack_require__(26);


let inputedKeyList = (new Array(256)).fill(false);
let clickedKeyList = (new Array(256)).fill(false);
let anyKeyPress = false;
let timer = 0;

class Input{
  /*押下状態のときtrue*/
  static isKeyInput(key){
    return inputedKeyList[key];
  }
  /*押された瞬間のみture*/
  static isKeyClick(key){
    if(timer == __WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* default */].timer){
      return clickedKeyList[key];
    }else{
      return false;
    }
  }
  static isAnyKeyClick(){
    return anyKeyPress;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Input;

/*receive input event*/
$(document).on("keydown",(e)=> {
  anyKeyPress = true;
  clickedKeyList[event.keyCode] = false;
  if(!inputedKeyList[event.keyCode]){
    clickedKeyList[event.keyCode] = true;
    timer = __WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* default */].timer;
  }
  inputedKeyList[event.keyCode] = true;
  //上下キーを封じる
  switch(e.keyCode){
    case KEY.UP: 
    case KEY.DOWN: 
    case KEY.RIGHT: 
    case KEY.LEFT: 
    case KEY.SP: event.preventDefault();
  }
});
$(document).on("keyup",(e)=> {
  anyKeyPress = false;
  clickedKeyList[event.keyCode] = false;
  inputedKeyList[event.keyCode] = false;
});



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Entity{
  constructor(pos,vel){
    /*phys*/
    this.pos = pos;
    this.vel = vel;
    this.acc = VEC0();
    this.gravity;
    //this.e = 0.9;
    /*standard*/
    this.frame = 0;
    this.type = "MOVER";//最も深い階層に書いたもので上書きされる
    //this.collider;
    //this.isUpdater = true;    
    //this.isMultiple;
    /*sprite*/
    //this.sprite;
    //this.container;
    /*未実装*/
    this.layer;
    /* Other */
  }
  /*common*/
  Physics(){};
  Collision(){};
  Update(){};
  /*Hurt()*/
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Entity;





/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);





/*文字*/
class FontEffect extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  //strは表示する文字(今は数字のみ)
  constructor(pos,str,fonttype){
    let v = {
      x:Rand(1.5),
      y:-2
    }
    super(CPV(pos),v);
    /*基本情報*/
    this.fonttype = fonttype;
    this.name = "FontEffect";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
    this.e = 0.0;
    this.isMultiple = true;//このEntityは複数スプライトを持つか
    /*スプライト*/
    this.str = str; //0~9
    this.container = new PIXI.Container();
    this.d = this.str.length;//桁数
    //this.collider = new Collider(SHAPE.BOX,new Box(pos,8,8));//衝突判定の形状
    for(let i = 0;i<this.d;i++){
      let spid = this.str[i] + "";//str型にすること
      let tex;
      switch(this.fonttype){
        case "player" : tex = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].font[spid + "r"]; break;
        case "enemy" : tex = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].font[spid]; break;
        case "pop" : tex = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].font[spid]; break;
      }
      let sp =  __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(tex) ;
      sp.position = {x:this.pos.x + i*6,y:this.pos.y};
      this.container.addChild(sp);
    }
    this.gravity = 0.2;
  }


  Update(){
    //phys
    this.pos = ADV(this.pos,this.vel);
    this.vel.y += this.gravity;
    for(let i = 0;i<this.d;i++){
      //ここはあとで書き直す
      //というか別クラスにする
      if(this.fonttype == "pop"){
        this.container.children[i].position = {x:this.pos.x + i * 9,y:this.pos.y};
      }else{
        this.container.children[i].position = {x:this.pos.x + i * 6,y:this.pos.y};
      }
    }
    for(let i = 0;i<this.d;i++){
      if(this.frame > 30){
        this.container.children[i].alpha -=0.05; 
      }
    }
    if(this.frame > 90){
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FontEffect;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_entity_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_wall_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entity_backEntity_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Entity_backGround_js__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Entity_Mover_signboard_js__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Entity_Mover_shop_js__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Entity_Mover_player_js__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Entity_Enemy_enemy1_js__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Entity_Enemy_enemy2_js__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Entity_Enemy_enemy3_js__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Entity_Enemy_enemy4_js__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Entity_Enemy_enemy5_js__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Entity_Enemy_enemy6_js__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Entity_Mover_goal_js__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__drawer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__Entity_Mover_woodbox_js__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Entity_Mover_needle_js__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__stageGen_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pool_js__ = __webpack_require__(12);






















/*マップデータ*/
class MapData{
  constructor(){
    this.stageNo;
    this.entityData;
    this.width;
    this.height;
  }

  /*マップデータを読み込む*/
  static Load(stageNo){
    return new Promise((resolve)=>{
      let xhr = new XMLHttpRequest();
      xhr.open('GET','src/resource/map/stage'+stageNo+'.json',true);
      xhr.onload = ()=>{
        this.jsonObj = JSON.parse(xhr.responseText);
        //entityの読み込み
        this.backEntityData = this.jsonObj.layers[1].data;
        this.entityData = this.jsonObj.layers[2].data;
        this.foreEntityData = this.jsonObj.layers[3].data;
        this.foreData = this.jsonObj.layers[4].data;
        //objの読み込み(今は看板だけ)
        this.objData = this.jsonObj.layers[0].objects;
        this.width = this.jsonObj.layers[1].width;
        this.height = this.jsonObj.layers[1].height;
        //Drawerにマップの大きさを渡す
        __WEBPACK_IMPORTED_MODULE_17__drawer_js__["a" /* default */].SetMap(this.width,this.height);
        resolve();
      }
      xhr.send(null);
      this.stageNo = stageNo;
    });
  }
  
  static CreateEntityLayer(layer){
    let wallTiletype = this.jsonObj.tilesets[0].tileproperties;
    let entity;
    let ID;//tiledに対応しているID

    for(let y = 0;y<this.height;y++){
      for(let x = 0;x<this.width;x++){
        ID = this[layer][this.width*y + x]-1;
        //tiledのIDがjsonデータより1小さいので引く
        if(ID == -1)continue;//空白はjsonで0なので(引くと)-1となる
        if(!wallTiletype[ID])cl(x + "  " + y)
        let p = {x:16*x,y:16*y};
        switch(wallTiletype[ID].type){
          case TILE.WALL :
            switch(wallTiletype[ID].name){
              case "woodbox" : entity = new __WEBPACK_IMPORTED_MODULE_18__Entity_Mover_woodbox_js__["a" /* default */](p);break;
              case "needle" : entity = new __WEBPACK_IMPORTED_MODULE_19__Entity_Mover_needle_js__["a" /* default */](p,ID);break;
              default : entity = new __WEBPACK_IMPORTED_MODULE_2__Entity_wall_js__["a" /* default */](p,ID);
            }
            break;
          case TILE.BACK :
            entity = new __WEBPACK_IMPORTED_MODULE_3__Entity_backEntity_js__["a" /* default */](p,ID);
            switch(layer){
              case "backEntityData" : entity.layer = "BACK";break;
              case "entityData" : entity.layer = "ENTITY";break;
              case "foreData" : entity.layer = "FORE";break;
              case "foreEntityData" : entity.layer = "FOREENTITY";break;
              default :console.warn("れいやーエラー:"+layer);
            }
            break;
          default : 
            console.warn("未実装:" + wallTiletype[ID].type);
        }
        __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(entity);
      }
    }
  }

  static CreateObjectLayer(){
    let obj;
    let ID;//tiledに対応しているID
    //objectの生成
    for(let i = 0;i < this.objData.length;i++){
      ID = this.objData[i].gid;
        let p ={ 
          x: this.objData[i].x,
          y: this.objData[i].y -16,//なぜかyだけずれるので引く
        }
        let message;
        switch(ID){
          case 161 : obj = new __WEBPACK_IMPORTED_MODULE_7__Entity_Mover_player_js__["a" /* default */](p); break;
          case 162 :
            message = this.objData[i].properties;
            obj = new __WEBPACK_IMPORTED_MODULE_5__Entity_Mover_signboard_js__["a" /* default */](p,message);
            break;
          case 163 : obj = new __WEBPACK_IMPORTED_MODULE_14__Entity_Mover_goal_js__["a" /* default */](p); break;
          case 164 :
            message = this.objData[i].properties;
            obj = new __WEBPACK_IMPORTED_MODULE_6__Entity_Mover_shop_js__["a" /* default */](p,message);
            break;
          case 169 : obj = new __WEBPACK_IMPORTED_MODULE_8__Entity_Enemy_enemy1_js__["a" /* default */](p); break;
          case 170 : obj = new __WEBPACK_IMPORTED_MODULE_9__Entity_Enemy_enemy2_js__["a" /* default */](p); break;
          case 171 : obj = new __WEBPACK_IMPORTED_MODULE_10__Entity_Enemy_enemy3_js__["a" /* default */](p); break;
          case 172 : obj = new __WEBPACK_IMPORTED_MODULE_11__Entity_Enemy_enemy4_js__["a" /* default */](p); break;
          case 173 : obj = new __WEBPACK_IMPORTED_MODULE_12__Entity_Enemy_enemy5_js__["a" /* default */](p); break;
          case 174 : obj = new __WEBPACK_IMPORTED_MODULE_13__Entity_Enemy_enemy6_js__["a" /* default */](p); break;
      }
        __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(obj);
    }
  }
  /* state 
   * ENTER : 新しいステージに入った時
   * RESET : 死んでやり直す時
   */
  static async CreateStage(stageNo,state){
    await this.Load(stageNo);
    //背景の生成
    this.AddBackGround();
    //entityの生成
    this.CreateEntityLayer("backEntityData");
    this.CreateEntityLayer("entityData");
    this.CreateEntityLayer("foreEntityData");
    this.CreateEntityLayer("foreData");
    this.CreateObjectLayer();
      let p;
    if(stageNo >= 1){
      p = CPV(__WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].player.pos);
    }else{
      p = {
        x : 240,
        y : 128,
      }
    }
    __WEBPACK_IMPORTED_MODULE_17__drawer_js__["a" /* default */].ScrollSet(p);
  }

  /*マップデータを消して作り直す*/
  static RebuildStage(){
    MapData.DeleteStage();
    let state = "RESET";
    MapData.CreateStage(__WEBPACK_IMPORTED_MODULE_15__game_js__["a" /* default */].stage,state);
  }

  /*現在開かれているステージを削除*/
  static DeleteStage(){
    while(__WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].entityList.length > 0){
      //poolしている物はリストに無いので開放
      switch(__WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].entityList[0].name){
        case "bulletblur" :
        case "fire" : 
        case "smoke" :
        case "sonic" : 
        case "flash" : 
        case "missile" :
        case "stone":
          __WEBPACK_IMPORTED_MODULE_21__pool_js__["a" /* default */].Remove(__WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].entityList[0]);
          break;
        default:
          __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].removeEntity(__WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].entityList[0]);
      }
    }
    __WEBPACK_IMPORTED_MODULE_20__stageGen_js__["a" /* default */].Init();
  }
  //壁タイルの対応
  //タイルIDを渡すとテクスチャを返す
  static Tile(i){
    //エイリアス
    let wall = __WEBPACK_IMPORTED_MODULE_16__art_js__["a" /* default */].wallPattern;
    let out = __WEBPACK_IMPORTED_MODULE_16__art_js__["a" /* default */].wallPattern.edge.out;
    let inner = __WEBPACK_IMPORTED_MODULE_16__art_js__["a" /* default */].wallPattern.edge.inner;
    let backOut = __WEBPACK_IMPORTED_MODULE_16__art_js__["a" /* default */].wallPattern.edge.back.out;
    let backInner = __WEBPACK_IMPORTED_MODULE_16__art_js__["a" /* default */].wallPattern.edge.back.inner;
    let steel = __WEBPACK_IMPORTED_MODULE_16__art_js__["a" /* default */].wallPattern.steel;
    let needle = __WEBPACK_IMPORTED_MODULE_16__art_js__["a" /* default */].wallPattern.needle;
    //戻り値データ
    let tex;//テクスチャ
    let material = "wall";//材質
    let colType = "wall";//すり抜け床かどうか
    let isBreakable = false;//壊せるか
    switch(i){
      //Bigblock
      case 82 : tex = wall.bigBlock[0];break;
      case 83 : tex = wall.bigBlock[1];break;
      case 90 : tex = wall.bigBlock[2];break;
      case 91 : tex = wall.bigBlock[3];break;
      //block
      case 84 : tex = wall.block;break;
      case 85 : tex = wall.HPBlock;break;
      case 86 : tex = wall.bulletBlock;break;
      //edge in
      case 49 : tex = inner[0];break;
      case 51 : tex = inner[1];break;
      case 65 : tex = inner[2];break;
      case 67 : tex = inner[3];break;
      //edge out
      case 52:tex = out[0];break;
      case 53:tex = out[1];break;
      case 54:tex = out[2];break;
      case 60:tex = out[3];break;
      case 61:tex = out[4];break;
      case 62:tex = out[5];break;
      case 68:tex = out[6];break;
      case 69:tex = out[7];break;
      case 70:tex = out[8];break;
      //edge in back
      case 25 : tex = backInner[0];break;
      case 27 : tex = backInner[1];break;
      case 41 : tex = backInner[2];break;
      case 43 : tex = backInner[3];break;
      //edge out back
      case 28:tex = backOut[0];break;
      case 29:tex = backOut[1];break;
      case 30:tex = backOut[2];break;
      case 36:tex = backOut[3];break;
      case 37:tex = backOut[4];break;
      case 38:tex = backOut[5];break;
      case 44:tex = backOut[6];break;
      case 45:tex = backOut[7];break;
      case 46:tex = backOut[8];break;
      //steel
      case 72:tex = steel.entity[0];material = "steel";break; 
      case 73:tex = steel.entity[1];material = "steel";break; 
      case 74:tex = steel.entity[2];material = "steel";break; 
      case 75:tex = steel.entity[3];material = "steel";break; 
      case 76:tex = steel.back[0];break;
      case 77:tex = steel.back[1];break;
      case 78:tex = steel.back[2];break;
      case 79:tex = steel.back[3];break;
      //needle
      case 0 : case 1 : case 2 : case 3 :
        tex = needle[i];
        isBreakable = true;
        break;
      case 8 : case 9 : case 10 : case 11 :
        tex = needle[i-4];break;
      //through
      case 96 :
        tex = wall.through[0];
        colType="through";
        material = "steel";
        break;
  }
    return {
      colType : colType,
      material : material,
      texture : tex,
      isBreakable : isBreakable,
    }
  }

  //背景を追加
  static AddBackGround(){
    let back;
    let w = 20;
    let h = 20;
    for(let y = 0;y<h;y++){
      for(let x = 0;x<w;x++){
        let tex = __WEBPACK_IMPORTED_MODULE_16__art_js__["a" /* default */].wallPattern.backGround[0];
        let p = {
          x : (x - w/2)*32,
          y : (y - h/2)*32
        }
        __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_4__Entity_backGround_js__["a" /* default */](CPV(p),tex));
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MapData;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sonic_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stone_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__flash_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__fire_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__smoke_js__ = __webpack_require__(30);










//爆発エフェクト
class Explosion2 extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,arg){
    super(pos,VEC0());
    //微妙に左上に寄ってるので中心に
    this.pos = ADV(this.pos,VECN(8));
    this.arg = arg;
    this.vi = 15;
    /*基本情報*/
    this.frame = 0;
    this.isNoSprite = true;
  }
  Bomb(){
    /*stone*/
    for(let i = 0;i<8;i++){
      let arg = this.arg + Rand(0.7);
      let vi = this.vi + Rand(8);
      let v = POV(arg,vi);
      let stone = __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].GetStone(CPV(this.pos),v);
      if(stone)__WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(stone);
    }
    /*smoke*/
    for(let j = 0;j<6;j++){
      let v = {
        x : Rand(4),
        y : Rand(1)
      }
      let smoke = __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].GetSmoke(CPV(this.pos),v,15+Rand(10)); 
      if(smoke)__WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(smoke);
    }
  }

  Update(){
    //爆発して自分は消える
    this.Bomb();
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Explosion2;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drawer_js__ = __webpack_require__(9);




/*タイトル画面からゲーム開始画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
class QuakeEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(size,time){
    //undefined
    if(!time) {
      console.warn("invalid time : " + time);
      time = 5
    };
    super(1);
    function* gen(){
      let frame = 0;
      let d;
      while(size > 0.1){
        d = Rand2D(size);
        __WEBPACK_IMPORTED_MODULE_2__drawer_js__["a" /* default */].Quake(d);
        size *= 0.9;
        frame++;
        yield ;
      }
      __WEBPACK_IMPORTED_MODULE_2__drawer_js__["a" /* default */].Stage.x = 0;
      __WEBPACK_IMPORTED_MODULE_2__drawer_js__["a" /* default */].Stage.y = 0;
      yield ;
    }
    let itt = gen();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = QuakeEvent;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drawer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(13);




/*文字*/
let small = [
  ",",".","!","l","i","j","っ","ぁ","ぃ","ぅ","ぇ","ぉ",
]
class Font extends __WEBPACK_IMPORTED_MODULE_2__ui_js__["a" /* default */]{
  //strは表示する文字(今は数字のみ)
  constructor(pos,str,type){
    super(CPV(pos));
    /*基本情報*/
    this.type = type;
    this.name = "font";
    this.isAlive = true;//消えたらfalse
    this.isMultiple = true;
    this.frame = 0;//stagepopでしか使ってない
    /*スプライト*/
    this.str = str; //0~9
    this.container = new PIXI.Container();
    //0埋めをするかしないか
    switch(this.type){
      case "MENU" :
        this.layer = "FILTER";
      case "HP" :
      case "BULLET" :
      case "MES" :
        this.isPadding = true;
        this.d = this.str.length;//桁数
          break;
      case "SCORE" :
        this.isPadding = false;
        this.d = 5;//決め打ち
          break;
        defaut :
        console.warn(this.type);
    }
    this.SetPos(this.pos);
  };

  //HP,BULLETの表示用
  //HP,BULLETの中から呼ばれている
  SetFont(value){
    //phys
    //文字列型にすること
    this.str = value + "";
    //0埋め
    if(this.isPadding){
      if(this.str == "0")this.str = "ゐ";
      while(this.str.length < this.d){
        //スペースの代わりに欠番フォント(ゐ)を使っている←クソ
        this.str = "ゐ" + this.str;
      }
    }else if(!this.isPadding){
      while(this.str.length < this.d){
        //スペース(ゑ)
        this.str = " " + this.str;
      }
    }
    for(let i = 0;i<this.d;i++){
      let spid = this.str[i] + "";//str型にすること
        this.container.children[i].texture = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].font[spid];
    };
  };
  Move(pos){
    /*TODO コンテナ*/
    for(let i=0;i<this.container.children.length;i++){
      this.container.children[i].position = pos;
      this.container.children[i].position.x += 10 * i;
    }
  }

  PushText(str){
    let spid = str + "";//str型にすること
    let tex = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].font[spid];
    let sprite = new PIXI.Sprite(tex);
    let pos = CPV(this.pos);
    pos.x += this.d * 9;
    sprite.position = pos;
    this.container.addChild(sprite);
    this.d++;
  }
  ChangeText(text,pos){
    this.container.children = [];
    this.str = text; //0~9
    this.d = this.str.length;//桁数
    this.SetPos(CPV(pos));
  }

  SetPos(pos){
    let space;
    let sprite;
    let tex;
    for(let i = 0;i<this.d;i++){
      let spid = this.str[i] + "";//str型にすること
      tex = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].font[spid];
      //文字コードを比較している
      //日本語以降は半角として識別
      let s = this.str[i];
      if(s > "z"){
        space = 9;
      }else if( small.indexOf(s) >= 0 ) {
        space = 4;
      } else{
        space = 7;
      }
      sprite = new PIXI.Sprite(tex);
      sprite.position = pos;
      this.container.addChild(sprite);
      pos.x += space;
    };
  }

  //各UIの内部から呼ぶ必要がある
  Update(){
    this.frame++;
  };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Font;
;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Mover_coin_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Effect_explosion2_js__ = __webpack_require__(17);








class Enemy extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.type = ENTITY.ENEMY;
    this.isUpdater = true;
    this.colType = "through";
    this.material = "wall";
    /*固有情報*/
    this.AIList = [];//AIの配列
    /*レイヤー*/
    this.layer = "ENTITY";
  }
  addAI(AI){
    this.AIList.push(AI);
  }
  //自分がダメージを食らう
  Damage(atk){
    __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlaySE("enemyDamage",-0.5);
    this.hp += atk;
    //ダメージをポップ
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_3__Effect_fontEffect_js__["a" /* default */](this.pos,-atk+"","enemy"));
  }
  //プレイヤーにダメージを与える
  Hurt(){
    let player = __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].player; 
    let c = __WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__["a" /* default */].on(this,player);
    if(c.isHit && c.n.y != 1){
      //ダメージ
      let damage = RandBET(this.atkMin,this.atkMax);
      if(!player.isInvincible)player.Damage(-damage);
      //自分もダメージ
    //  this.Damage(-1);
    }
  }
  //しぬ
  Die(){
    this.isAlive = false;
      //死ぬ時にコイン
      for(let i = 0;i<this.coin;i++){
        __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_5__Mover_coin_js__["a" /* default */]({x:this.pos.x,y:this.pos.y}));
      }
      //EventManager.eventList.push(new QuakeEvent(5));//ゆれ
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_6__Effect_explosion2_js__["a" /* default */](this.pos));
  }
  Physics(){
    if(this.floor.on){
      this.pos.x += this.floor.under.vel.x;
      //this.pos.y += this.floor.under.vel.y;
    }
    if(this.gravity)this.acc.y += this.gravity;

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.acc.y = 0;
    this.acc.x = 0;
    //最大速度制限
  }
  ExecuteAI(){
    for (let AI of this.AIList){
      AI.Do();
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Event{
  constructor(func,args){
    this.func = func;/*実行する関数*/
    this.args = args;/*引数の配列*/
  }
  Do(){
    //?
    return this.func.next();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Event;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sonic_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stone_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__flash_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__fire_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__smoke_js__ = __webpack_require__(30);










//爆発エフェクト
class Explosion1 extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    //微妙に左上に寄ってるので中心に
    this.pos = ADV(this.pos,VECN(8));
    /*基本情報*/
    this.frame = 0;
    this.isNoSprite = true;
  }
  Bomb(){
    let sonic = __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].GetSonic(this.pos,VEC0());
    if(sonic)__WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(sonic);
    //stone(というか火花?)
    for(let i = 0;i<8;i++){
      let v = Rand2D(30);
      let stone = __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].GetStone(CPV(this.pos),v);
      if(stone)__WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(stone);
    }
    //smoke
    for(let i = 0;i<2;i++){
      let smoke = __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].GetStone(CPV(this.pos),{x:Rand(8),y:-1});
      if(smoke)__WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(smoke);
    }
    for(let i =0;i<3;i++){
      let v = Rand2D(16);
      let p = ADV(v,this.pos);
      let fire = __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].GetFire(p,VEC0());
      if(fire)__WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(fire);
    }
    for(let i =0;i<3;i++){
      let p = ADV(this.pos,Rand2D(16));
      let flash = __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].GetFlash(this.pos,VEC0());
      if(flash)__WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(flash);
    }
  }
  Collision(){
    for(let l of __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].enemyList){
      if(DIST(this.pos,l.pos) < 32){
        l.Damage(-RandBET(50,99));
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      };
    }
    for(let w of __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].wallList){
      if(DIST(this.pos,w.pos) < 32){
        //breakable object
        if(w.isBreakable){
          // ■ SoundEffect : hitWood
          w.Damage(-RandBET(50,99));
        }
      }
    }
  }

  Update(){
    //爆発して自分は消える
    this.Bomb();
    this.Collision();
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Explosion1;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class UI{
  constructor(pos){
    this.pos = pos;
    this.sprite;
    this.type;//enum
    this.isMultiple = false;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UI;




/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);







class Bullet extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.layer = "ENTITY";
    this.isMultiple = false;
    this.type = "MOVER";
    /*パラメータ*/
    this.hp;//弾丸のHP 0になると消滅
    this.atk;//攻撃力
    this.length;//これは武器がもつ?

    this.isUpdater  =true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet;



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);




/*bullet1発射した時のエフェクト*/
class BulletShot extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.shot;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    this.spid = Math.floor(this.frame/3);
    //phys
    this.pos = ADV(this.pos,this.vel);
    if(this.spid == 4){
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BulletShot;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Timer{
  static Init(){
    this.timer = 0;
  }
  static GetTime(){
    return this.timer;
  }
  static IncTime(){
    this.timer++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Timer;



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);




/*bullet1壁にぶつかった時した時のエフェクト*/
class BulletHitWall extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.frame = 0;
    /*スプライト*/
    this.spid = 0; //8~11
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.hitWall
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    this.spid = Math.floor(this.frame/3);
    if(this.spid == 4){
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BulletHitWall;



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);





//火花?
class Stone extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
  }
  Init(pos,vel){
    //constructor
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.name = "stone";
    this.frame = 0;
    this.isNext = false;
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.explosion.stone;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.alpha = 1;
    this.sprite.scale.set(1);
    this.sprite.anchor.set(0.5);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Update(){
    this.vel = MLV(this.vel,VECN(0.9)); //減速
    this.pos.y += 0.3;//重力
    //this.pos = Util.advec(this.pos,this.vel);
    this.sprite.position = this.pos;
    this.sprite.alpha -= 0.02;
    //再帰
    if(this.sprite.alpha > 0 && this.isNext){
      //生成は最初の一回のみ
      this.isNext = false;
      this.sprite.scale = MLV(this.sprite.scale,VECN(0.8));
      let p = ADV(this.pos,this.vel);
      let stone = __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].GetStone(p,this.vel);
      //次の石 : 小さく薄く
      if(stone){
        stone.sprite.scale = this.sprite.scale;
        stone.sprite.alpha = this.sprite.alpha;
        __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(stone);
      }
    }
    if(this.frame == 1)this.isNext = true;
    //持続時間
    if(this.frame > 3){
      __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].Remove(this);
    }
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Stone;



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_circle_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_mapData_js__ = __webpack_require__(16);








//背景オブジェクト 何もしない
class BackEntity extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos,ID){
    super(pos,VEC0());
    this.isUpdater = false;
    this.colType = "none";
    let wall = __WEBPACK_IMPORTED_MODULE_6__Stage_mapData_js__["a" /* default */].Tile(ID)
    this.tex = wall.texture;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.tex);
    this.sprite.position = pos;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BackEntity;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);





class Sonic extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel,size){
    super(pos,vel);
  }
  Init(pos,vel,size){
    /*基本情報*/
    this.pos = pos;
    this.vel = vel;
    this.name = "smoke";
    this.frame = 0;
    this.size = size;//煙の大きさ 浮力にも関わってくる
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.explosion.smoke;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.alpha = 0.7;
    this.sprite.position = this.pos;
    this.sprite.scale.set(size/5);
    this.sprite.anchor.set(0.5);
  }

  Update(){
    let b = 10;
    this.pos = ADV(this.pos,this.vel);
    this.vel.x *= (1-this.frame/10);
    if(this.vel.y > 0) this.vel.y *= 0.9;
    this.sprite.scale = VECN((this.size/2)/(this.frame+5));
    this.sprite.alpha -= 0.03;
    if(this.frame == 40){
      __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].Remove(this);
    }
    this.sprite.position = this.pos;

    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sonic;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drawer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_circle_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Stage_mapData_js__ = __webpack_require__(16);









class Wall extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos,ID){
    super(pos,VEC0());
    /*基本情報*/
    //this.name = name; 必要になったら
    this.type = ENTITY.WALL;
    this.layer = "ENTITY";
    this.collider = new __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.isUpdater = false;
    /*性質*/
    let wall = __WEBPACK_IMPORTED_MODULE_7__Stage_mapData_js__["a" /* default */].Tile(ID)
    this.material = wall.material;
    this.colType = wall.colType;
    if(this.colType == "through"){
      this.collider.hitbox.height = 8;
    }
    /*スプライト*/
    this.tex = __WEBPACK_IMPORTED_MODULE_7__Stage_mapData_js__["a" /* default */].Tile(ID).texture;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.tex);
    this.sprite.position = pos;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Wall;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(9);





class Lasersight extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,arg){
    super(pos,VEC0());
    /*基本情報*/
    this.name = "lasersight";
    this.layer = "BACK";
    this.arg = arg;
    /*スプライト*/
    this.spid = 0; //12~15
    this.frame = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.lasersight;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.x = 1;
    this.sprite.aplha = 0.1;
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }
  Delete(){
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
  }
  Rotate(player,weapon){
    this.arg = player.arg;
    this.pos = CPV(ADV(player.pos,POV(player.arg,8)));
    if(weapon.isTargetOn && Math.abs(player.arg - player.toArg < 5)){
      this.sprite.scale.x = DIST(weapon.target.enemy.pos,player.pos)/16 -0.5;
    }else this.sprite.scale.x = 16;
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    this.spid = 0;
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.position.x -= 4;
    this.sprite.position = ADV(this.sprite.position,POV(this.arg,8*this.sprite.scale.x));
    this.sprite.rotation = this.arg;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Lasersight;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drawer_js__ = __webpack_require__(9);






/*bullet1残像*/
class BulletBlur extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
  }
  Init(pos,vel){
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.name = "bulletblur";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
      /*スプライト*/
    this.spid = 0; //12~15
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.blur;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.5;
    this.sprite.scale = VECN((Rand(0.5)+1)/1);
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }
  Physics(){
    this.pos = ADV(this.pos,this.vel);
    this.vel = MLV(this.vel,VECN(0.9));
  }
  Update(){
    if(this.isAlive){
      this.sprite.alpha *= 0.9
      this.sprite.scale = ADV(this.sprite.scale,VECN(this.frame/256));
      this.Physics();
      this.sprite.position = ADV(this.pos.x,VECN(8));
      this.sprite.texture = this.pattern[this.spid];
      this.spid = Math.floor(this.frame/4)%4;
      if(this.frame >= 40){
        //消える時に一回だけ呼ばれる
        if(this.isAlive){
          //EntityManager.removeEntity(this);
          __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].Remove(this);
          this.isAlive = false
        }
      }
      this.sprite.position = ADV(this.pos,VECN(8));
      this.frame++;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BulletBlur;



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);





//閃光
class Fire extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
  }
  Init(pos,vel){
    /*基本情報*/
    this.pos = pos;
    this.vel = vel;
    this.name = "fire";
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.explosion.fire;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.alpha = 1;
    this.sprite.scale.set(1);
    this.sprite.anchor.set(0.5);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Update(){
    this.sprite.position = this.pos;
    let a = 10;
    this.pos = ADV(this.pos,this.vel);
    this.sprite.scale = ADV(this.sprite.scale, VECN(1/(this.frame+4)));
    this.sprite.alpha = 0.5 - this.frame/40;
    if(this.frame == 16){
      __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].Remove(this);
    }
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Fire;



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(2);



class horming{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  Do(){
    //敵方向へのベクトル
    if(this.bullet.isTargetOn){
      let to = ADV(this.bullet.targetedEnemy.pos , MLV(VECN(-1),this.bullet.pos));
      //外積を取って正負を判定
      let closs = this.bullet.vel.x * to.y - this.bullet.vel.y * to.x; 
      this.bullet.arg += closs/Math.abs(closs) * this.bullet.curve;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = horming;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);





class Sonic extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
  }
  Init(pos,vel,arg){
    this.pos = pos;
    this.vel = vel;
    this.arg = arg;
    /*基本情報*/
    this.frame = 0;
    this.name = "sonic";
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.explosion.sonic;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(1);
    this.sprite.alpha = 0.16;
    //this.arg = ADV(VECN(2),Rand2D(1));
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    this.spid = Math.floor(this.frame/3);
    //phys
    this.pos = ADV(this.pos,this.vel);

    this.sprite.scale = ADV(this.sprite.scale,VECN(4/(this.frame+2)));
    this.sprite.alpha *= 0.8;

    if(this.spid == 4){
      __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].Remove(this);
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sonic;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);





//閃光
class Flash extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
  }
  Init(pos,vel){
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.frame = 0;
    this.name = "flash"
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.explosion.flash;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.2;
    this.sprite.scale.set(1);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Update(){
    //this.sprite.texture = this.pattern[this.spid];
    this.sprite.alpha *=0.8;
    this.sprite.scale = VECN(2);
    if(this.frame == 4){
      __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].Remove(this);
      //EntityManager.removeEntity(this);
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Flash;



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__font_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_js__ = __webpack_require__(11);









class StagePop extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos,text){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "PUSH";
    this.isMultiple = true;
    this.pos = pos;
    this.frame = 0;
    //文字
    this.i = 0;
    this.text = text;
    this.d = this.text.length;
    this.textObject = new __WEBPACK_IMPORTED_MODULE_5__font_js__["a" /* default */](pos,"","MES");
    //スプライト
    this.spid = 0;
    this.container = new PIXI.Container();
    //text
    this.container.addChild(this.textObject.container);
    this.diff = 0;//文字のズレ
  }

  //1文字ずつ出ていって消える
  Update(){
    if(this.frame%3 == 0){
      this.diff = 4;
      this.i = Math.min(this.i+1,this.d-1);
      let str = this.text[this.i];
      this.textObject.PushText(str);
    }
    this.diff *= 0.3;
    let p = CPV(this.pos);
    p.y += this.diff;

    this.textObject.SetPos(p);

    if(this.frame>70) this.container.alpha -= 0.01;
    if(this.frame>300)__WEBPACK_IMPORTED_MODULE_1__uiManager_js__["a" /* default */].removeUI(this);
    this.frame ++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StagePop;



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_backEntity_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_wall_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mapData_js__ = __webpack_require__(16);





class StageGen{
  static Init(){
    this.wall = {
      left :{
        list : [],
        leftside : 6,
        rightside : 8,
        topGrid : {
          x : 7,
          y : 32,
        },
        lastGrid : {
          x : 12,
          y : 32,
        },
        dirrection : "U",
        dimmension : "R",
      }
    }
    this.checkpoint = 32;
  }
  static DimToID(dim){
    switch(dim){
      case "DRI": return 49;break;
      case "DLI": return 51;break;
      case "URI": return 65;break;
      case "ULI": return 67;break;
      case "ULO": return 52;break;
      case "URO": return 54;break;
      case "DLO": return 68;break;
      case "DRO": return 70;break;
      case "U"  : return 53;break;
      case "L"  : return 60;break;
      case "R"  : return 62;break;
      case "D"  : return 69;break;
    }
  }
  static Rot(dir,side){
    if(side == "R") {
      switch(dir){
        case "R" :return "D";
        case "D" :return "L";
        case "L" :return "U";
        case "U" :return "R";
      }
    }
    if(side == "L") {
      switch(dir){
        case "R" :return "U";
        case "D" :return "R";
        case "L" :return "D";
        case "U" :return "L";
      }
    }
  }
  static DirToV(dir){
    switch(dir){
      case "R": return {x:1,y:0};break;
      case "D": return {x:0,y:1};break;
      case "L": return {x:-1,y:0};break;
      case "U": return {x:0,y:-1};break;
    }
  }
  static DirSideToDim(dir,side){
    let dim;
    if(dir =="U" && side =="L") dim = "URO";
    if(dir =="U" && side =="R") dim = "DRI";
    //if(dir =="D" && side =="L") dim = "URO";
    //if(dir =="D" && side =="R") dim = "DRI";
    if(dir =="R") dim = "DRO";
    if(dir =="L") dim = "URI";
    return dim;
  }
  static GenerateChunk(playerY){
    this.GenerateWall(playerY);
  }
  static DeleteChunk(playerY){

  }
  static GenerateWall(playerY){
    //うねうね
    let grid = this.wall.left.topGrid;
    let dist = 2;//移動距離
    let dir =  this.wall.left.dirrection;
    let dim = this.wall.left.dimmension;
    let length = 20;//チャンク区間
    this.checkpoint -= length;
    //回す
    //置く
    //すすめる
    //left
    let leftSide = this.wall.left.leftside;
    let rightSide = this.wall.left.rightside;
    //checkpointの3ブロック↑まで生成する
    while(grid.y > this.checkpoint - 3){
      dim = this.Rot(dir,"R");
      dist--;
      //this.Rot
      if(Dice(2) * dist == 0){
        dist = 2
        let side;
        if(Dice(2)==0)side = "R";
        else side = "L";
        //区間指定
        if(dir == "L")side = "R";//→→↑
        if(dir == "R")side = "L";//↑←←
        if(grid.x<leftSide && this.dir == "U")side = "R";//↑→
        if(grid.x>rightSide && this.dir == "U")side = "L";//←↑
        dim = this.DirSideToDim(dir,side);
        dir = this.Rot(dir,side);
      }
      //put
      let ID = this.DimToID(dim);
      let entity = new __WEBPACK_IMPORTED_MODULE_2__Entity_wall_js__["a" /* default */](MLV(VECN(16),grid),__WEBPACK_IMPORTED_MODULE_3__mapData_js__["a" /* default */].WallTile(ID));
      __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(entity);
      this.wall.left.list.push(entity);
      //fill
    if(dir == "U"){
        let i = grid.x-1;
        while(i>0){
          let back = new __WEBPACK_IMPORTED_MODULE_1__Entity_backEntity_js__["a" /* default */]({x:16*i,y:16*(grid.y)},__WEBPACK_IMPORTED_MODULE_3__mapData_js__["a" /* default */].WallTile(79));
          __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(back);
          i--;
        }
      }
      //step
      grid = ADV(grid,this.DirToV(dir));
    }
    this.wall.left.topGrid = grid;
    //dequeue
    let dewall;
    while(this.wall.left.lastGrid.y > this.checkpoint + 2*length){
      dewall = this.wall.left.list.shift();
      this.wall.left.lastGrid.x = dewall.pos.x/16;
      this.wall.left.lastGrid.y = dewall.pos.y/16;
      __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].removeEntity(dewall);
      let i = this.wall.left.lastGrid.x -1;
      while(i>0){
        i--;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StageGen;



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_Bullet_bullet_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_Effect_target_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entity_Effect_lasersight_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Entity_Effect_fontEffect_js__ = __webpack_require__(15);







const DIR = {
  UR : "UR",
  UL : "UL",
  DR : "DR",
  DL : "DL",
  R : "R",
  L : "L",
};

const SEEN = 2;

class Weapon{
  /* 
   * ammunition : 弾薬数 
  /* agi : agility*/
  constructor(name){
    this.name = name;
    /*基本情報*/
    this.target = null;
    this.isTargetOn = false;//照準が発生しているか
    this.lasersight;
    this.isLaserOn = false;
    this.arg = 0;
  }
  Init(){
    this.isTargetOn = false;
    this.isLaserOn = false;
    this.target = null;//これ大丈夫か??
  }
  shot(player){
    //最後に撃ってからframeまで停止
    if((player.frame - player.frameShot) > this.agi){
      //shot時刻
      player.frameShot = player.frame;
      //playerの弾薬が残っていなければ打てない
      if(player.bullet < this.cost){
        __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_5__Entity_Effect_fontEffect_js__["a" /* default */](player.pos,"たりないよ","pop"));
          __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("empty");
      }else{
        //弾薬消費
        player.bullet -= this.cost;
        player.bullet = Math.max(0,player.bullet);

        this.arg = player.arg;
        this.Set(player);

      }
    }
  }
  //敵が視界に入っているか
  isSeen(player,enemy){
    return (player.dir == DIR.UR || player.dir ==  DIR.UL) && (player.pos.y-enemy.pos.y)/Math.abs((player.pos.x-enemy.pos.x)) > 1
      || (player.dir == DIR.DR || player.dir == DIR.DL) && (player.pos.y-enemy.pos.y)/Math.abs((player.pos.x-enemy.pos.x)) <-1
        || player.dir == DIR.R && (player.pos.x-enemy.pos.x)/Math.abs((player.pos.y-enemy.pos.y)) <-1
          || player.dir == DIR.L && (player.pos.x-enemy.pos.x)/Math.abs((player.pos.y-enemy.pos.y)) >1
  }
  Target(player){
    /*とりあえず全探索*/
    for(let l of __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].enemyList){
      //既にロックオンされている敵が射程外に出たら解除
      if(this.isTargetOn &&
        l == this.target.enemy){
        if(DIST_C(l.pos, player.pos) < this.length
          //各方向+-45度まで許容
          && this.isSeen(player,l)
        ){
          continue;
        }
        __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].removeEntity(this.target);
        this.isTargetOn = false;
        continue;
      }
      //射程距離以内かつ視界
      if(DIST_C(l.pos, player.pos) < this.length && this.isSeen(player,l)
      ){
        //既にロックオンされている敵より近ければ
        if(!this.isTargetOn ||
          DIST_C(l.pos,player.pos) +1< DIST_C(this.target.pos,player.pos)){
          //今のロック先を解除して
          if(this.isTargetOn){
            __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].removeEntity(this.target);
            this.isTargetOn = false;
          }
          //targetを追加する
          this.target = new __WEBPACK_IMPORTED_MODULE_2__Entity_Effect_target_js__["a" /* default */](l);
          __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].addEntity(this.target);
          __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("targetOn");
          this.isTargetOn = true;
        }
      }
    }
    if(this.isTargetOn == true){
      //lockしていた敵が視界から消えたら消去
      if(!this.target.enemy.isAlive){
        __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].removeEntity(this.target);
        this.isTargetOn = false;
      }else{
        //方向を指定
        player.toArg = Math.atan((this.target.pos.y-player.pos.y)/(this.target.pos.x-player.pos.x));
        if(player.pos.x > this.target.pos.x ) player.toArg += Math.PI;
      }
    }
  }
  //レーザーサイト
  Lasersight(player,weapon){
    if(!this.isLaserOn){
      let effect;
      let p = CPV(ADV(player.pos,POV(player.toArg,16)));
      effect = new __WEBPACK_IMPORTED_MODULE_3__Entity_Effect_lasersight_js__["a" /* default */](p,player.toArg);
      __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].addEntity(effect);
      this.lasersight = effect;
      this.isLaserOn = true;
    }else{
      this.lasersight.Rotate(player,this);
    }
  }
  Reset(){
    if(this.isTargetOn)__WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].removeEntity(this.target);
    if(this.isLasersight)__WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].removeEntity(this.lasersight);
    this.Init();
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = Weapon;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AI{
  /*enemyの参照を受け取り関数を実行する*/
  constructor(enemy){
    this.enemy = enemy;
  }
  Do(){
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AI;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(2);





class Enemy2AI{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    this.enemy = enemy;
  }

  Collision(){
    /*衝突判定*/
    for(let l of __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].wallList){
      if(l == this.enemy) continue;
      /*衝突判定*/
      let c = __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__["a" /* default */].on(this.enemy,l);
      if(c.isHit){
        /* 衝突応答*/

        /*速度*/
        if(c.n.x != 0) {
          this.enemy.vel.x  *= -1; 
        }
        //地面との衝突
        if(c.n.y == -1){ 
          this.enemy.isJump = false;
          this.enemy.vel.y *= -1;
        }
        //天井との衝突
        if(c.n.y == 1 ){
          this.enemy.vel.y *= -1;
        }
        /*押し出し*/
        this.enemy.pos.x += c.n.x * c.depth;
        this.enemy.pos.y += c.n.y * c.depth;
        /*note : now isHit == false*/
      }
    }
    // 敵同士の衝突
    this.enemy.floor.on  =false ;
    this.enemy.floor.under = null;
    for(let i=0;i<__WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].enemyList.length;i++){
      let l = __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].enemyList[i];
      let c = __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__["a" /* default */].on(this.enemy,l);
      //これないと自分と衝突判定してバグ
      if(i == __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].enemyList.indexOf(this.enemy))continue;
      //衝突判定
      if(c.isHit){
        // 衝突応答

        //壁との衝突
        if(c.n.x != 0){
          this.enemy.vel.x *= -1; 
        }
        //地面との衝突
        if(c.n.y == -1){ 
          this.enemy.floor.on = true;
          this.enemy.floor.under = __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].enemyList[i];
          this.enemy.isJump = false;
          this.enemy.vel.y *= -1;
        }
        //天井との衝突
        if(c.n.y == 1 ){
          this.enemy.vel.y *= -1;
        }
        //押し出し
        let l = __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].enemyList[i];
        this.enemy.pos.x += c.n.x * c.depth/2;
        this.enemy.pos.y += c.n.y * c.depth/2;
        //note : now isHit == false
      }
    }
  }
  Do(enemy){
    this.Collision();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy2AI;



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ai_js__ = __webpack_require__(41);




let player;

class Enemy5AI extends __WEBPACK_IMPORTED_MODULE_2__ai_js__["a" /* default */]{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy,dist){
    super(enemy)
    this.enemy = enemy;
    this.dist = dist;
    player = __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].player;
  }

  Do(){
    if(DIST(this.enemy.pos,player.pos) < this.dist){
      this.enemy.isActive = true;
    }else{
      this.enemy.isActive = false;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy5AI;



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Enemy_enemy_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__ = __webpack_require__(0);





/*Targetクラス*/
class Target extends __WEBPACK_IMPORTED_MODULE_1__effect_js__["a" /* default */]{
  constructor(enemy){
    super(enemy.pos,VEC0());
    /*基本情報*/
    this.name = "target";
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].bulletPattern.target;
    this.sprite = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.alpha = 1;
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.enemy = enemy;//ロックしているenemyの情報
      this.spid = 0;
  }

  Update(){
    //これいる？
    this.sprite.anchor.set(0.5);
    this.sprite.rotation = this.frame/50;
    //シュッてなるやつ
    //ゼロ除算回避
    this.sprite.scale = VECN(1.5 + 1.5/(this.frame+1));
    this.sprite.position = ADV(this.pos,VECN(8));
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Target;



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__entity_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Effect_bulletHitWall_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_getCoin_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_brightCoin_js__ = __webpack_require__(61);











let player;
//コイン
class Coin extends __WEBPACK_IMPORTED_MODULE_6__entity_js__["a" /* default */]{
  constructor(pos){
    player = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player;
    super(pos,{x:Rand(2),y:-3});
    /*基本情報*/
    this.frame = 0;
    this.e = 0.9;
    this.isUpdater = true;    
    this.type = "MOVER";
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].enemyPattern.coin;
    this.spid = 0;
    this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    /*コライダ*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,9,9));//衝突判定の形状
    /*パラメータ*/
    this.gravity = 0.5 + Rand(0.2);
    this.layer = "ENTITY";
    /*AI*/
    this.vel.y = 0.3;
  }
  Collision(){
    this.isJump = true;
    //collision at wall
    for(let l of __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].wallList){
      if(l == this) continue;
      let c = __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l);
      if(c.isHit){
        /* 衝突応答*/
        __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlaySE("coin2");

        /*速度*/
        if(c.n.x != 0) this.vel.x *= -this.e;
        //地面との衝突
        if(c.n.y == -1){ 
          this.isJump = false;
          this.vel.y = Math.min(0,this.vel.y * -this.e);
        }
        //天井との衝突
        if(c.n.y == 1 ){
          this.vel.y = Math.min(0,this.vel.y * -0.3)
        }
        /*押し出し*/
        this.pos.x += c.n.x * c.depth;
        this.pos.y += c.n.y * c.depth;
        /*note : now isHit == false*/
      }
    }
  }
  //phys
  Physics(){
    this.acc = VEC0();
    this.acc.y += this.gravity;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.x += this.acc.x;
    //最大速度制限
    this.vel.y = BET(-0.5,this.vel.y,0.5);
    this.vel.x = BET(-3,this.vel.x,3);
  }
  GetByPlayer(){
    //プレイヤーに回収される
    if(DIST(this.pos,player.pos)<48){
      this.coltype = "none";
      let vec = NOMALIZE({
        x : player.pos.x - this.pos.x,
        y : player.pos.y - this.pos.y
      });
      this.pos.x += 5 * vec.x;
      this.pos.y += 5 * vec.y;
      if(DIST(this.pos,player.pos)<2){
        __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlaySE("coin1",-1);
        __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_8__Effect_getCoin_js__["a" /* default */](this.pos,{x:0,y:0}));
        player.GetScore(1);
        __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(this);
      }
    }
  }

  Update(){
    //Animation
    if(this.frame%3 == 0){
      this.spid = (this.spid+1)%12;
    }
    //たまに光る
    if(this.frame%(8 + Math.floor(Rand(1))) == 0){
      let p = ADV(this.pos,Rand2D(5));
      console.assert(p);
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_9__Effect_brightCoin_js__["a" /* default */](p));
    }
    //Collision
    if(this.coltype!="none")this.Collision();
    this.Physics();
    if(__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player.isAlive)this.GetByPlayer();
    //時間立つと点滅
    if( this.frame > 300 && this.frame%8 <4) this.sprite.texture = this.pattern[12];
    else this.sprite.texture = this.pattern[this.spid];
    //消える
    if( this.frame > 450 ){
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
    this.sprite.position = this.pos;

    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Coin;



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Event_eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Event_quakeEvent_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__AI_bullet1AI_js__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__AI_horming_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__bullet_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Effect_bulletShot_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Effect_bulletBlur_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Effect_explosion1_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__param_js__ = __webpack_require__(8);

















const bullet1 = __WEBPACK_IMPORTED_MODULE_15__param_js__["a" /* default */].bullet1;

/*bullet1クラス*/
//Missile
class Bullet1 extends __WEBPACK_IMPORTED_MODULE_11__bullet_js__["a" /* default */]{
  constructor(pos,weapon){
    //super(pos,POV(weapon.arg,weapon.speed));
    super(VEC0(),VEC0());
  }
  Init(pos,weapon){
    /*基本情報*/
    this.frame = 0;
    this.name = "missile";
    this.arg = weapon.arg;
    this.vi = weapon.speed;
    this.isTargetOn = weapon.isTargetOn;
    if(this.isTargetOn) this.targetedEnemy = weapon.target.enemy
    this.isUpdater  =true;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].bulletPattern.bullet1;
    this.spid = 0;
    this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    this.sprite.anchor.set(0.5);
    /*コライダ*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,4,4));//衝突判定の形状
    /*パラメータ*/
    this.hp = __WEBPACK_IMPORTED_MODULE_15__param_js__["a" /* default */].bullet1.hp;//弾丸のHP 0になると消滅
    this.atkMin = __WEBPACK_IMPORTED_MODULE_15__param_js__["a" /* default */].bullet1.atkMin;//攻撃力
    this.atkMax = __WEBPACK_IMPORTED_MODULE_15__param_js__["a" /* default */].bullet1.atkMax;//攻撃力
    this.curve = __WEBPACK_IMPORTED_MODULE_15__param_js__["a" /* default */].bullet1.curve;
    this.AIList = [];
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_9__AI_bullet1AI_js__["a" /* default */](this));
    if(weapon.isHorming) this.AIList.push(new __WEBPACK_IMPORTED_MODULE_10__AI_horming_js__["a" /* default */](this));
  }

  Update(){
    /*□Effect BulletBulr*/
      let p = CPV(this.pos);
      let d = Rand2D(5);
      p = ADV(p,d);
      let v = POV(this.arg+Math.PI,4);
      let blur = __WEBPACK_IMPORTED_MODULE_6__Stage_pool_js__["a" /* default */].GetBulletBlur(p,v);
      if(blur)__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(blur);
    /*Effect Sonic*/
    /*
    if(this.frame%4 == 0){
      let sonic = Pool.GetSonic(p,v);
      if(sonic)EntityManager.addEntity(sonic);
    }
    */
    for (let AI of this.AIList){
      AI.Do();
    }
    /*observer*/
    //HP || 経過時間
    if(this.hp<=0){
      __WEBPACK_IMPORTED_MODULE_6__Stage_pool_js__["a" /* default */].Remove(this);
      __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlaySE("missileHit",1);
      __WEBPACK_IMPORTED_MODULE_7__Event_eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_8__Event_quakeEvent_js__["a" /* default */](6,3));//ゆれ
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_14__Effect_explosion1_js__["a" /* default */](CPV(this.pos)));
    }
    if(this.frame > 100){
      __WEBPACK_IMPORTED_MODULE_6__Stage_pool_js__["a" /* default */].Remove(this);
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_12__Effect_bulletShot_js__["a" /* default */](CPV(this.pos)));
    }
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.rotation = this.arg + Math.PI/2;
    this.sprite.texture = this.pattern[this.spid];

    this.spid = (this.spid+1)%4;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet1;



/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Effect_bulletHitWall_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio_js__ = __webpack_require__(3);





class Bullet1AI{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  Phisics(){
    this.bullet.vel = POV(this.bullet.arg,this.bullet.vi);
    this.bullet.pos.x += this.bullet.vel.x;
    this.bullet.pos.y += this.bullet.vel.y;
  }
  /* 衝突判定 */
  collision(){
    for(let l of __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].enemyList){
      if(__WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__["a" /* default */].on(this.bullet,l).isHit){
        l.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
        this.bullet.hp--;
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      };
    }
    for(let w of __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].wallList){
      if(__WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__["a" /* default */].on(this.bullet,w).isHit){
        //breakable object
        if(w.isBreakable){
          // ■ SoundEffect : hitWood
          w.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
          this.bullet.hp--;
          //wall
          }else{
            // ■ SoundEffect : hitWall
            if(w.material == "steel")__WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("landing3",3);
            this.bullet.hp = 0;
          }
      }
    }
    /*
    //壁との判定を二分探索
    let l = EntityManager.wallList.length;
    let m = Math.floor(l/2);//判別位置
    let d = Math.floor(m/2);//移動距離
    
    //broad phase
    for(let i = 0;i<20;i++){
      let w = EntityManager.wallList[m];
      if(!w){
        cl(m);
      }
      //上半分
      if(this.bullet.pos.y < w.pos.y - 16){
        m -= d;
        if(m<0)break;
        d = Math.floor(d/2);
        continue;
      }else if(this.bullet.pos.y > w.pos.y){
      //下半分
        m += d;
        if(m >= l){
          m = l-1;
          break;
        }
        d = Math.floor(d/2);
        continue;
      }else{
        //narrow phase
        //衝突?
        for(let j = 0;j<20;j++){
          if(Collision.on(this.bullet,w).isHit){
            //breakable object
            if(w.name == "woodbox"){
              // ■ SoundEffect : hitWood
              w.Damage(-this.bullet.atk );
              this.bullet.hp--;
              //wall
              }else{
                // ■ SoundEffect : hitWall
                this.bullet.hp = 0;
              }
              // □ Effect : Exp
              break;
          }else{
            m = Math.max(m-1,0) ;
            w = EntityManager.wallList[m];
          }
        }
      }
    }
    */
  }

  Do(){
    this.collision();
    this.Phisics();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet1AI;



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*円*/
class Circle{
  /* pos : 中心の座標 */
  /* r : 半径 */
  constructor(pos,r){
    this.pos = pos;
    this.r = r;
  }
}
/* unused harmony export default */



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__font_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__param_js__ = __webpack_require__(8);







const P_AMOUNT = {
  x : 22, 
  y : 4, 
};
//HP Icon
const P_ICON = {
  x : -16, 
  y : 0, 
};
//WLIST
const P_WLIST = {
  x : -12,
  y : 16,
}
class GaugeBullet extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "BULLET"; 
    this.isMultiple = true;
    this.pos = pos;
    /*パラメータ*/
    this.max = __WEBPACK_IMPORTED_MODULE_5__param_js__["a" /* default */].player.maxBullet;

    /*child*/
    this.outer = {pos:CPV(pos)};
    this.bar = {pos:CPV(pos)};
    this.icon = {pos:ADV(pos,P_ICON)};
    this.amount = new __WEBPACK_IMPORTED_MODULE_4__font_js__["a" /* default */](ADV(pos,P_AMOUNT),this.max + "","BULLET");//数字
    this.wlist = {
      pos:ADV(pos,P_WLIST),
      list: null,
      container : new PIXI.Container(),
    };

    //pos
    /*スプライト*/
    this.wlistPattern = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern.bullet.pop;
    this.frame = new PIXI.Rectangle(0, 0,16,16);
    this.spid = 0;
    this.container = new PIXI.Container();
    let s;
    //outer
    s = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern.bullet.outer);
    s.position = this.outer.pos; 
    this.container.addChild(s);
    //bar
    s = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern.bullet.bar);
    s.position = this.bar.pos; 
    this.container.addChild(s);
    //icon
    let equip = __WEBPACK_IMPORTED_MODULE_5__param_js__["a" /* default */].player.equip;
    s = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern.bullet.icon[equip]);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);

    let list = Object.keys(__WEBPACK_IMPORTED_MODULE_5__param_js__["a" /* default */].player.havingWeaponList);
    list = list.filter((arr)=>{
      return __WEBPACK_IMPORTED_MODULE_5__param_js__["a" /* default */].player.havingWeaponList[arr];
    })
    this.wlist.list = list;
    //アイコンリストをぷっしゅ　
    let p = this.wlist.pos; 
    //p = this.pos; 
    for(let w of this.wlist.list){
      s = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern.bullet.pop[w]);
      s.position = p;
      this.container.addChild(s);
      p.x += 8;
    }

  }
  Push(w){
    let p = CPV(this.wlist.pos); 
    let s = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern.bullet.pop[w]);
    p.x += (this.wlist.list.length-1)*8;
    s.position = p;
    this.container.addChild(s);
    this.wlist.list.push(w);
    //samall weapon list
  }
  SetBar(bullet){
    //barの長さを更新
    this.container.children[1].scale.x = bullet/this.max;
    //bullet数字の更新
    this.amount.SetFont(bullet);
  }
  ChangeWeapon(name){
    //アイコンを武器に変更
    this.container.children[2].texture = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern.bullet.icon[name];
  }
  Update(){
    this.container.position.x = this.pos.x;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GaugeBullet;



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__font_js__ = __webpack_require__(19);






const P_TEXT = VECN(8);//テキストの相対位置
const COLUMN = 10;//行間

class Message extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos,text){
    super(pos); 
    /*基本情報*/
    this.text = text;
    let sent = this.text.split("\n");
    this.sentence = [];//Font
      this.type = "MES";
    /*child*/
    this.outer = {
      sprite : __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern.message.frame), 
    }
    //文字の長さに応じて枠を調整
    this.outer.sprite.scale.x *= 1.5;
    this.outer.sprite.scale.y *= 1.5; //yは固定
    /*スプライト*/
    this.isMultiple = true;
    //枠スプライト追加
    let p = CPV(pos);
    this.outer.sprite.position = p;
    this.container = new PIXI.Container();
    this.container.addChild(this.outer.sprite);
    p = ADV(p,P_TEXT);
    //テキスト
    for(let i = 0;i<sent.length;i++){
      this.sentence.push(new __WEBPACK_IMPORTED_MODULE_4__font_js__["a" /* default */](p,sent[i],"MES"));//テキスト 
      p.y += COLUMN;
    }
    //各行各文字のスプライトを追加
    for(let l of this.sentence){
      this.container.addChild(l.container);
    }
  }
  Page(text){
    //改ページするために文字だけを消す
    for(let i=0;i<this.sentence.length;i++){
      __WEBPACK_IMPORTED_MODULE_1__uiManager_js__["a" /* default */].removeUI(this.sentence[i]);
    }
    //これをすると先頭以外の要素が消える
    //つまり枠スプライトを残し他の文字を消す
    this.container.children.length = 1;//は？
      //新しい文字
      this.text = text;
    let sent = this.text.split("\n");
    this.sentence = [];//Font
      let p = CPV(this.pos);
    p = ADV(p,P_TEXT);
    //テキスト
    for(let i = 0;i<sent.length;i++){
      this.sentence.push(new __WEBPACK_IMPORTED_MODULE_4__font_js__["a" /* default */](p,sent[i],"MES"));//テキスト 
      p.y += COLUMN;
    }
    //各行各文字のスプライトを追加
    for(let l of this.sentence){
      this.container.addChild(l.container);
    }
    __WEBPACK_IMPORTED_MODULE_1__uiManager_js__["a" /* default */].addUI(this);
  }
  Update(){
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Message;



/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__font_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event_eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Event_quitGameEvent_js__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__drawer_js__ = __webpack_require__(9);










const COLUMN = 12;
const INDENT = {x:-8,y:0};
 
class Menu extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos){
    super(pos); 
    /*基本情報*/
    this.type = "MENU";
    this.isMultiple = true;
    let p = CPV(pos);
    this.title = new __WEBPACK_IMPORTED_MODULE_4__font_js__["a" /* default */]({x:p.x,y:p.y + -1 * COLUMN},"-PAUSE-","MENU"),
    this.index = 0;
    this.layer = "FILTER";
    this.items = [
      new __WEBPACK_IMPORTED_MODULE_4__font_js__["a" /* default */]({x:p.x + 0,y:p.y + 1 * COLUMN},"さいかい","MENU"),
      new __WEBPACK_IMPORTED_MODULE_4__font_js__["a" /* default */]({x:p.x + 0,y:p.y + 2 * COLUMN},"ぶき","MENU"),
      new __WEBPACK_IMPORTED_MODULE_4__font_js__["a" /* default */]({x:p.x + 0,y:p.y + 3 * COLUMN},"やめる","MENU"),
    ];
    this.Select(this.index);
    /*スプライト*/
    this.container = new PIXI.Container;
    this.container.addChild(this.title.container);
    for(let l of this.items){
      this.container.addChild(l.container);
    }
  }
  Select(i){
    for(let j=0;j<this.items.length;j++){
      let p = {
        x : this.pos.x, 
        y : this.pos.y + (j+1)*COLUMN,
      }
      if(j==i){
        this.items[j].Move(ADV(p,INDENT));
      }
      else {
        this.items[j].Move(p);
      }
    }
  }
  Close(){
    __WEBPACK_IMPORTED_MODULE_1__uiManager_js__["a" /* default */].SetFilter([]);
    __WEBPACK_IMPORTED_MODULE_1__uiManager_js__["a" /* default */].removeUI(__WEBPACK_IMPORTED_MODULE_1__uiManager_js__["a" /* default */].menu);
    __WEBPACK_IMPORTED_MODULE_5__game_js__["a" /* default */].scene.PopSubState();
  }

  Update(){
    if(__WEBPACK_IMPORTED_MODULE_3__input_js__["a" /* default */].isKeyClick(KEY.DOWN)||(__WEBPACK_IMPORTED_MODULE_3__input_js__["a" /* default */].isKeyClick(KEY.RIGHT))){
      this.index = Math.min(this.index+1,this.items.length-1);
      this.Select(this.index);
    }
    if(__WEBPACK_IMPORTED_MODULE_3__input_js__["a" /* default */].isKeyClick(KEY.UP) || __WEBPACK_IMPORTED_MODULE_3__input_js__["a" /* default */].isKeyClick(KEY.LEFT)){
      this.index = Math.max(this.index-1,0);
      this.Select(this.index);
    }
    if(__WEBPACK_IMPORTED_MODULE_3__input_js__["a" /* default */].isKeyClick(KEY.X)){
      switch(this.items[this.index].str){
        case "さいかい" : 
          this.Close();
          break;
        case "ぶき" : break;
        case "やめる" :
          this.Close();
          let qe  = new __WEBPACK_IMPORTED_MODULE_7__Event_quitGameEvent_js__["a" /* default */]();
          __WEBPACK_IMPORTED_MODULE_6__Event_eventmanager_js__["a" /* default */].eventList.push(qe);
          break;
      }
    }
    if(__WEBPACK_IMPORTED_MODULE_3__input_js__["a" /* default */].isKeyClick(KEY.ESC)){
        this.Close();
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Menu;



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(9);





class Signpop extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.name = "signpop";
    /*スプライト*/
    this.spid = 0; //12~15
    this.frame = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.signpop;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
  }
  Delete(){
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    this.spid = Math.floor(this.frame/4)%4;
    this.sprite.position = this.pos;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Signpop;



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fadeEvent_js__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__audio_js__ = __webpack_require__(3);






class GameOverEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(){
    super();
    function* gen(){
      let frame = 0;
      __WEBPACK_IMPORTED_MODULE_1__eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_2__fadeEvent_js__["a" /* default */]("fadeout"));

      __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("stageChange");
      while(frame<30){
        frame++;
        yield;
      }
      __WEBPACK_IMPORTED_MODULE_3__game_js__["a" /* default */].scene.PushSubState("SEQ");
      yield;
    }
    let itt = gen();
    this.func = itt;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameOverEvent;



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__drawer_js__ = __webpack_require__(9);








/*タイトル画面からゲーム開始画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
class FadeEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(type){
    super();//どうでもいい
    function* FadeOut(){
      let pattern = __WEBPACK_IMPORTED_MODULE_5__art_js__["a" /* default */].seqPattern;
      let seq = new Array(400);
      let spid = 0;
      let frame = 0;
      //♢を初期化して追加
      for(let i = 0; i < 400; i++) {
      let sp = __WEBPACK_IMPORTED_MODULE_5__art_js__["a" /* default */].SpriteFactory(pattern[spid]);
      let y = Math.floor(i/20);
      let x = i%20;
      sp.scale = VECN(2);
      sp.position.x = x*16-24;
      sp.position.y = y*16-24;
      seq[i] = sp;
      __WEBPACK_IMPORTED_MODULE_6__drawer_js__["a" /* default */].addContainer(sp,"FILTER");
    }
      /*フェードアウト*/
      while(frame < 40){
        for(let i = 0; i < 400; i++) {
          //上から下へ
          spid = Math.max(0,Math.min(Math.floor(frame - i/8),15));
          seq[i].texture = pattern[spid];
        }
        frame++;
        yield;
      }
      /*ここでマップをロード*/
      __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__["a" /* default */].DeleteStage();
      __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__["a" /* default */].CreateStage(__WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */].stage,"ENTER");

      /*マップデータを生成するのでちょっと待つ*/
      frame = 0;
      while(frame < 10){
        frame++;
        yield
      }
      /*フェードin*/
      __WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */].scene.PopSubState();
      while(frame < 40){
        for(let i = 0; i < 400; i++) {
          spid = 16 + Math.max(0,Math.min(Math.floor(frame -i/8),15));
          seq[i].texture = pattern[spid];
        }
        frame++;
        yield;
      }
      for(let i = 0; i < 400; i++) {
        __WEBPACK_IMPORTED_MODULE_6__drawer_js__["a" /* default */].removeContainer(seq[i],"FILTER");
      }
      yield;
    }

    let itt;
    itt = FadeOut();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FadeEvent;



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__weapon1_js__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weapon2_js__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__weapon3_js__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__param_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__UI_uiManager_js__ = __webpack_require__(4);







class WeaponManager{
  static Init(){
    /*singleton list*/
    /*武器のインスタンスを作成*/
    this.weapons = {
      missile : new __WEBPACK_IMPORTED_MODULE_1__weapon1_js__["a" /* default */](),
      laser : new __WEBPACK_IMPORTED_MODULE_2__weapon2_js__["a" /* default */](),
      normal : new __WEBPACK_IMPORTED_MODULE_3__weapon3_js__["a" /* default */]()
    };
    /*selectBoxの選択*/
    this.select;
  }

  /*プレイヤーの参照を受け取って武器を変更*/
  static ChangeWeapon(player,name){
    __WEBPACK_IMPORTED_MODULE_0__audio_js__["a" /* default */].PlaySE("changeWeapon",0);
    __WEBPACK_IMPORTED_MODULE_5__UI_uiManager_js__["a" /* default */].bullet.ChangeWeapon(name);
    player.weapon = this.weapons[name];
    __WEBPACK_IMPORTED_MODULE_4__param_js__["a" /* default */].player.equip = name;
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = WeaponManager;



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(2);





class Enemy2AI{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    this.enemy = enemy;
  }

  Do(enemy){
    //enemy.acc.x = 1;
  }
}
/* unused harmony export default */



/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__param_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_explosion2_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_stone_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__AI_moveReflect_js__ = __webpack_require__(42);












//敵の弾丸その2
class eBullet2 extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,8,8));//衝突判定の形状
    this.frame = 0;
    this.type = "MOVER"
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].enemyPattern.eBullet2;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.param = __WEBPACK_IMPORTED_MODULE_7__param_js__["a" /* default */].eBullet2;
    //this.addAI(new MoveReflect(this));
    this.atkMin = this.param.atkMin;
    this.atkMax = this.param.atkMax;
    this.hp = this.param.hp;
    this.gravity = this.param.gravity;
    /*フラグ*/
    this.isAlive = true;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
  }
  Animation(){
    this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
  }
  Die(){
    __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_8__Effect_explosion2_js__["a" /* default */](CPV(this.pos),1.5*Math.PI))
  }
  Collision(){
    for(let w of __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].wallList){
      let c = __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,w);
      //判定は落下中のみ
      if(c.isHit && this.vel.y >2){
        this.hp--;
      }
    }
  }

  Update(){
    //for (let AI of this.AIList){
    // AI.Do();
    //}
   if(this.frame%1 == 0){
    let stone = __WEBPACK_IMPORTED_MODULE_6__Stage_pool_js__["a" /* default */].GetStone(ADV(this.pos,VECX(4)),VEC0());
    if(stone)__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(stone);
    }
    this.Physics();
    if(Math.abs(this.vel.y)>1)this.vel.y *= 1;
    this.Collision();
    this.Hurt();
    this.Animation();
    this.frame++;
    //observer
    if(this.hp<=0 || this.frame > 300){
      this.Die();
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = eBullet2;



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_mapData_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__drawer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__fadeEvent_js__ = __webpack_require__(54);











class GameClearEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(){
    super();
    function* gen(){
      let frame = 0;
      __WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */].scene.PushSubState("TRANS");
      __WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */].stage++;
      __WEBPACK_IMPORTED_MODULE_7__audio_js__["a" /* default */].PlaySE("stageChange");
      __WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__["a" /* default */].PopStage(__WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */].stage);
      __WEBPACK_IMPORTED_MODULE_8__eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_9__fadeEvent_js__["a" /* default */]("fadeout"));
      while(frame < 50){
        frame++;
        yield;
      }
      if(__WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */].stage == 2)__WEBPACK_IMPORTED_MODULE_7__audio_js__["a" /* default */].PlayBGM("stage5",0.2);
      if(__WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */].stage == 5)__WEBPACK_IMPORTED_MODULE_5__drawer_js__["a" /* default */].entityContainer.filters = [__WEBPACK_IMPORTED_MODULE_5__drawer_js__["a" /* default */].testFilter];
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameClearEvent;



/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(11);
/*｡+☆.En†rypoinT.☆+｡*/
 

/*拡大方式をニアレストネイバーに*/
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
__WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */].Load();



/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);




class GetCoin extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos){
    super(pos,{x:0,y:0});
    /*基本情報*/
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.coin.get;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.alpha = 0.7;
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    this.spid = Math.floor(this.frame/3);
    //phys
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    if(this.spid == 4){
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GetCoin;



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);




class BrightCoin extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    //velが渡されなければ0を渡す
    super(pos,vel);
    /*基本情報*/
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.coin.bright;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.alpha = 0.7;
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    this.spid = Math.floor(this.frame/3);
    //phys
    
    this.pos = ADV(this.pos,this.vel);
    if(this.spid == 4){
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BrightCoin;



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);




//真の背景であり背景オブジェクトではない
class BackEntity extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos,tex){
    super(pos,VEC0());
    this.layer = "BG";
    this.isUpdater = false;
    this.tex = tex;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.tex);
    this.sprite.scale = VECN(2);
    this.sprite.position = pos;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BackEntity;



/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event_eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Event_messageEvent_js__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__backEntity_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Effect_signpop_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Event_quakeEvent_js__ = __webpack_require__(18);















class Signboard extends __WEBPACK_IMPORTED_MODULE_9__backEntity_js__["a" /* default */]{
  constructor(pos,message){
    super(pos,__WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].wallPattern.signboard);
    /*基本情報*/
    this.layer= "BACK";
    this.name = "signboard";
    this.isUpdater = true;
      /* 固有情報
       * message : 複数のページからなる文章
       * text : 1つのページの文章
       * sentense : 1行の文章
       * font : 1文字
       * */
       //オブジェクトを配列に変換?
    this.message = [];
    for(let l in message){
      this.message.push(message[l]);
    }
    this.page = 0;//現在のページ番号
    this.isRead = false;//会話中かどうか
    /*スプライト*/
    this.tex = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].wallPattern.signboard;//テクスチャ
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.tex);
    this.sprite.position = pos;
    //pop
    let p = CPV(this.pos);
    p.y -= 16;
    this.popup = new __WEBPACK_IMPORTED_MODULE_11__Effect_signpop_js__["a" /* default */](p);
    __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].addEntity(this.popup);
  }
  Read(){
    if(!this.isRead){
      this.isRead = true;
      let event = new __WEBPACK_IMPORTED_MODULE_7__Event_messageEvent_js__["a" /* default */](this.message[this.page],"POP");
      __WEBPACK_IMPORTED_MODULE_6__Event_eventmanager_js__["a" /* default */].eventList.push(event);
      this.page++;
    }else{
      /*イベント発生用メッセージ*/
      //イベントを発生させてページを読み進める
      //最初のイベントせんよう
      if(this.message[this.page] == "EVENT"){;
        let event = new __WEBPACK_IMPORTED_MODULE_7__Event_messageEvent_js__["a" /* default */](this.message[this.page],"EVENT");
        __WEBPACK_IMPORTED_MODULE_6__Event_eventmanager_js__["a" /* default */].eventList.push(event);
        //クソポイント
        //ここでメッセージを変更するな
        this.message = ["..."];
        this.page++;
      }
      if(this.page < this.message.length){
        let event = new __WEBPACK_IMPORTED_MODULE_7__Event_messageEvent_js__["a" /* default */](this.message[this.page],"PAGE");
        __WEBPACK_IMPORTED_MODULE_6__Event_eventmanager_js__["a" /* default */].eventList.push(event);
        this.page++;
        //続きがあれば読む
        }else{
          //なければ終了
          __WEBPACK_IMPORTED_MODULE_8__game_js__["a" /* default */].scene.PopSubState();
          __WEBPACK_IMPORTED_MODULE_10__UI_uiManager_js__["a" /* default */].CloseMessage();//枠を閉じる
          this.isRead = false;
          this.isNear = false;
          this.page = 0;
          this.popup;
        }
    }
  }

  Update(){
    //メッセージ文が"EVENT"ならばイベントを発生させる
    //page : 現在のページ番号
    let player = __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].player;
    if(DIST(player.pos,this.pos) <  16 && player.isAlive){
      player.isCanRead = true;
      if( __WEBPACK_IMPORTED_MODULE_5__input_js__["a" /* default */].isKeyClick(KEY.X)){
        this.Read();
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Signboard;



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event_quakeEvent_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Entity_Effect_explosion1_js__ = __webpack_require__(22);









//新しくメッセージ枠を開く
function* pop(text){
  __WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */].scene.PushSubState("MES");
  __WEBPACK_IMPORTED_MODULE_2__UI_uiManager_js__["a" /* default */].PopMessage(text,"POP");
  yield ;
}
//メッセージをスクロールする
function* page(text){
  __WEBPACK_IMPORTED_MODULE_2__UI_uiManager_js__["a" /* default */].PopMessage(text,"PAGE");
  yield ;
}
//突貫工事クソイベントなので必ず直すこと
function* event(){
  let e = new __WEBPACK_IMPORTED_MODULE_6__Event_quakeEvent_js__["a" /* default */](5,10);
  //stage1で開く壁の為 だけ に 作られている!
  __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].wallList[93]);
  let p = {
    x : 160,
    y : 352,
  }
  __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_7__Entity_Effect_explosion1_js__["a" /* default */](p));
  __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__["a" /* default */].eventList.push(e);
  __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlaySE("missileHit");
  yield ;
}

let itt;
//メッセージイベント
class MessageEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  //text ... 文章の配列
  //type : 
  //pop : new message 
  //page : scrll page
  //event : trriger event
  constructor(text,type){
    super(); //特に意味はない
    switch(type){
      case "POP" : itt = pop(text); break;
      case "PAGE": itt = page(text); break;
      case "EVENT": itt = event(); break;
    }
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MessageEvent;



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__font_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__param_js__ = __webpack_require__(8);








const P_AMOUNT = {
  x : 22, 
  y : 4, 
};
//HP Icon
const P_ICON = {
  x : -16, 
  y : 0, 
};

class gaugeHP extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "HP"; 
    this.isMultiple = true;
    this.pos = pos;
    /*child*/
    this.outer = {pos:CPV(pos)};
    this.bar = {pos:CPV(pos)};
    this.icon = {pos:ADV(pos,P_ICON)};
    let maxHP = __WEBPACK_IMPORTED_MODULE_6__param_js__["a" /* default */].player.maxHp;
    this.amount = new __WEBPACK_IMPORTED_MODULE_5__font_js__["a" /* default */](ADV(pos,P_AMOUNT),maxHP + "","HP");//数字
    /*スプライト*/
    this.spid = 0;
    this.container = new PIXI.Container();
    let s;
    //outer
    s = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.HP.outer);
    s.position = this.outer.pos; 
    this.container.addChild(s);
    //bar
    s = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.HP.bar);
    s.position = this.bar.pos; 
    this.container.addChild(s);
    //icon
    s = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.HP.icon);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);
    /*パラメータ*/
    this.max = __WEBPACK_IMPORTED_MODULE_6__param_js__["a" /* default */].player.maxHp;
    /*state*/
    this.isPopIn = true;
  }
  SetBar(hp){
    //barの長さを更新
    this.container.children[1].scale.x = hp/this.max;
    //HP数字の更新
    this.amount.SetFont(hp);
  }
  Update(){
    this.container.position.x = this.pos.x;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = gaugeHP;



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__font_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__param_js__ = __webpack_require__(8);








//score Icon
const P_OFFSET = {
  x : 0,
  y : 16,
}

class WeaponList extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "WLIST"; 
    this.isMultiple = true;
    this.pos = pos;
    this.pattern = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.bullet.pop;
    //スプライト
    this.spid = 0;
    this.container = new PIXI.Container();
    //icon
    this.Push();
  }
  Push(){
    let s;
    let wList = Object.keys(__WEBPACK_IMPORTED_MODULE_6__param_js__["a" /* default */].player.havingWeaponList);
    wList = wList.filter((arr)=>{
      return __WEBPACK_IMPORTED_MODULE_6__param_js__["a" /* default */].player.havingWeaponList[arr];
    })
    //渡されるposはbulletゲージの位置なので少しずらす　
    this.pos = ADV(this.pos,P_OFFSET);
    //アイコンリストをぷっしゅ　
    let p = CPV(this.pos); 
    for(let w of wList){
      s = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(this.pattern[w.name]);
      s.position = p;
      this.container.addChild(s);
      p.x += 8;
    }
  }
  Update(){
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WeaponList;



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__ = __webpack_require__(16);






/*初期状態タイトル画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
class QuitGameEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(){
    super(1);
    function* gen(){
      __WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */].scene.ChangeState(STATE.STAGE,STATE.TITLE);
      /*delete all entities*/
      __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__["a" /* default */].DeleteStage();
      __WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__["a" /* default */].Clean();
      /*Reinitialize Game*/
      __WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */].stage = 0;
      /*Setting Title*/
      __WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__["a" /* default */].SetTitle();
      yield ;
    }
    let itt = gen();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = QuitGameEvent;



/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__font_js__ = __webpack_require__(19);







//score Icon
const P_ICON = {
  x : 36, 
  y : -4, 
};

class Score extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "SCORE"; 
    this.isMultiple = true;
    this.pos = pos;
    //child
    this.icon = {pos:ADV(pos,P_ICON)};
    this.amount = new __WEBPACK_IMPORTED_MODULE_5__font_js__["a" /* default */](pos,"    0","SCORE");//数字
    //スプライト
    this.spid = 0;
    this.container = new PIXI.Container();
    let s;
    //icon
    s = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.score.icon);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);
  }
  SetScore(score){
    this.amount.SetFont(score);
  }
  Update(){
    //this.amount.container.position = this.pos
    this.amount.Update();
    /*nothing to do*/
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Score;



/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Event_eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Event_quakeEvent_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__param_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__backEntity_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__UI_message_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Effect_signpop_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__UI_stagePop_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__UI_font_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__UI_gaugeBullet_js__ = __webpack_require__(49);



















class Shop extends __WEBPACK_IMPORTED_MODULE_11__backEntity_js__["a" /* default */]{
  constructor(pos,message){
    super(pos,0);
    /*基本情報*/
    this.layer= "BACK";
    this.name = "shop";
    this.isUpdater = true;
      /* 固有情報
       * message : 複数のページからなる文章
       * text : 1つのページの文章
       * sentense : 1行の文章
       * font : 1文字
       * */
       //オブジェクトを配列に変換?
    this.message = [];
    for(let l in message){
      this.message.push(message[l]);
    }
    this.page = 0;//現在のページ番号
    this.isRead = false;//会話中かどうか
    /*スプライト*/
    this.tex = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].wallPattern.shop;//テクスチャ
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.tex);
    this.sprite.position = pos;
    //pop
    let p = CPV(this.pos);
    p.y -= 16;
    this.popup = new __WEBPACK_IMPORTED_MODULE_14__Effect_signpop_js__["a" /* default */](p);
    __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(this.popup);

  }
  Read(){
    this.isRead = !this.isRead;
    let weapon = this.message[0];
    if(this.isRead){
      __WEBPACK_IMPORTED_MODULE_10__game_js__["a" /* default */].scene.PushSubState("MES");

      //this.messageの武器を手に入れる
      //もう持っていたら発生しない
      if(!__WEBPACK_IMPORTED_MODULE_9__param_js__["a" /* default */].player.havingWeaponList[weapon]){
        let text = this.ToJap(weapon)+"をてにいれた\ncキーでチェンジできるよ↓"; 
        __WEBPACK_IMPORTED_MODULE_12__UI_uiManager_js__["a" /* default */].PopMessage(text,"POP");
        //テスト
        __WEBPACK_IMPORTED_MODULE_9__param_js__["a" /* default */].player.havingWeaponList[weapon] = true;
        __WEBPACK_IMPORTED_MODULE_12__UI_uiManager_js__["a" /* default */].bullet.Push(weapon);
      }else{
        let text = "きりかえはc だよ↓"; 
        __WEBPACK_IMPORTED_MODULE_12__UI_uiManager_js__["a" /* default */].PopMessage(text,"POP");
      }
    }
    else{
      __WEBPACK_IMPORTED_MODULE_10__game_js__["a" /* default */].scene.PopSubState();
      __WEBPACK_IMPORTED_MODULE_12__UI_uiManager_js__["a" /* default */].CloseMessage();//枠を閉じる

      let p = {
        x : 64,
        y : 96
      }
      __WEBPACK_IMPORTED_MODULE_12__UI_uiManager_js__["a" /* default */].addUI(new __WEBPACK_IMPORTED_MODULE_15__UI_stagePop_js__["a" /* default */](p,"-" + this.ToJap(weapon) +"をてにいれた "));//SCORE
    }
  }
  //武器名を日本語にするだけ
  ToJap(weapon){
    switch(weapon){
      case "missile" : return "ミサイル";
      case "laser" : return "レーザー";
      default : cl("po"); 
    }
  }

  Update(){
    //page : 現在のページ番号
    let player = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player;
    if(DIST(player.pos,this.pos) <  16 && player.isAlive){
        player.isCanRead = true;
      if( __WEBPACK_IMPORTED_MODULE_6__input_js__["a" /* default */].isKeyClick(KEY.X)){
        this.Read();
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Shop;



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__param_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Stage_mapData_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Stage_stageGen_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Event_eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Event_gameOverEvent_js__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__drawer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Weapon_weaponManager_js__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__Effect_bulletShot_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Effect_explosion1_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Effect_explosion2_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__Event_quakeEvent_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__Effect_weaponIcon_js__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__UI_stagePop_js__ = __webpack_require__(38);


























const STATE = {
  WAITING : "WAITING",
  RUNNING  : "RUNNING",
  JUMPING : "JUMPING",
  FALLING : "FALLING",
  DYING : "DYING",//死んでから遷移開始するまでの操作不能状態
  DEAD : "DEAD"
}

const DIR = {
  UR : "UR",
  UL : "UL",
  DR : "DR",
  DL : "DL",
  R : "R",
  L : "L",
};

let po = (i)=>{
  if(i>0) return 1 + 2 * Math.atan(i-10)/Math.PI;
  else return -(1 + 2 * Math.atan(-i-10)/Math.PI);
};

class Player extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0(),VEC0());
    /*基本情報*/
    let p = CPV(this.pos);
    this.collider = new __WEBPACK_IMPORTED_MODULE_4__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_6__Collision_box_js__["a" /* default */](pos,8,16));//衝突判定の形状
    this.type = ENTITY.PLAYER;
    this.layer = "ENTITY";
    this.name = "player";
    this.frame = 0;
    this.frameDead;//死んだ時刻
    this.frameDamaged;//最後に攻撃を食らった時刻 無敵時間の計算に必要
    this.frameShot = 0;//最後にshotした時刻
    this.e = 0.1;//反発係数
    this.score = 0;
    this.offset = 0;//↑入力での画面スクロールに使う変数
    this.isUpdater = true;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].playerPattern;
    this.spid = 0 // spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position.x = Math.floor(this.pos.x);
    this.sprite.position.y = Math.floor(this.pos.y);
    /*パラメータ*/
    this.param = __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player;
    this.maxHP = __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.maxHp;
    this.hp = this.maxHP;
    this.maxBullet = __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.maxBullet;
    this.bullet = this.maxBullet;
    this.gravity = __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.gravity;
    this.arg = 0;//狙撃角度 0 - 2π
    this.scArg = 0;//スクロール用
    this.toArg = 0;
    this.scPos = VEC0();//スクロール位置
    this.score = this.param.score;
    //UIManager.HP.SetBar(this.hp);//HPbarの更新
    //UIManager.bullet.SetBar(this.bullet);//HPbarの更新

      this.vxMax = __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.vxMax;
    this.vyMax = __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.vyMax;
    /*状態*/
    this.state = STATE.WAITING;
    this.weapon = __WEBPACK_IMPORTED_MODULE_15__Weapon_weaponManager_js__["a" /* default */].weapons[this.param.equip];//選択中の武器のインスタンス
      this.weapon.Init();
    this.dir = DIR.R;//向き
    /*フラグ*/
    this.isJump = false;//空中にいるか
    this.isRun = false;//走っているか
    this.isAlive = true;//
    this.isInvincible = false;//無敵時間
    this.isCanRead = false;//看板を読める状態
    this.isReading = false;//看板を読んでいる
        /*床の親子関係*/
        this.floor = {
          on : false,//乗っているか
          under : null,//自分の下
        }
        //??
        this.poyo = true;
  }
  /*キー入力による移動*/
  Input(){
    /*ジャンプ*/
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyClick(KEY.Z)){
      if(this.isJump == false){
        this.vel.y = - __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.jumpVel;
        this.isJump = true;
        this.state = STATE.JUMPING;
        // ■ SoundEffect : jump
        __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("jump1");
        //effect
        let p = ADV(this.pos,VECY(12));
        let v = {
          x : Rand(1),
          y : Rand(0.4),
        }
        let s = __WEBPACK_IMPORTED_MODULE_23__Stage_pool_js__["a" /* default */].GetSmoke(p,v,10);
        __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__["a" /* default */].addEntity(s);
      }
    }
    /*空中ジャンプ*/
    //空中でZ押すとbulletを消費してジャンプできる
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyClick(KEY.Z)){
      /*
      if(this.state == STATE.FALLING){
        let jumpCost = 20
          if(this.bullet >= jumpCost){
            Audio.PlaySE("jump2");
            EntityManager.addEntity(new Explosion2(CPV(this.pos),Math.PI*(1/2)));
            EventManager.eventList.push(new QuakeEvent(20,5));
            this.frameShot = this.frame;//最終ショット時刻
              this.vel.y = - Param.player.jumpVel;
            this.bullet -= 20;
            this.state = STATE.JUMPING;
          }else{
            //足りないとできない
            Audio.PlaySE("empty");
            EntityManager.addEntity(new FontEffect(this.pos,"たりないよ","pop"));
          }
      }
      */
    }
    /*右向き*/
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyInput(KEY.RIGHT)){
      this.state = STATE.RUNNING;
      this.dir = DIR.R;
      this.isRun = true;
      this.toArg = 0;
      this.acc.x = __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.runVel;
    }
    /*左向き*/
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyInput(KEY.LEFT)){
      this.state = STATE.RUNNING;
      this.dir = DIR.L;
      this.isRun = true;
      this.toArg = Math.PI;
      this.acc.x = -__WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.runVel;
    }
    /*上向き*/
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyInput(KEY.UP)){
      //右向き上 or 左向き上
      if(this.dir == DIR.R || this.dir == DIR.UR || this.dir == DIR.DR){
        this.dir = DIR.UR;
      }else if(this.dir == DIR.L || this.dir == DIR.UL || this.dir == DIR.DL){
        this.dir = DIR.UL;
      }
      this.toArg = 3 * Math.PI/2;
    }
    /*下向き*/
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyInput(KEY.DOWN)){
      //右向き下 or 左向き下
      if(this.dir == DIR.R || this.dir == DIR.UR || this.dir == DIR.DR){
        this.dir = DIR.DR;
      }else if(this.dir == DIR.L || this.dir == DIR.UL || this.dir == DIR.DL){
        this.dir = DIR.DL;
      }
      this.toArg = Math.PI/2;
    }
    /*shot*/
    //看板が近くにあれば優先
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyInput(KEY.X)){
      if(this.isCanRead){
        this.isReading = true;
        this.state = STATE.WAITING;
        return;
      }
      this.weapon.shot(this);
    }
    /*for debug*/
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyInput(KEY.J)){
      this.Damage(-999);
    }
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyClick(KEY.C) && this.isAlive){
      //武器チェンジ
      //持っている武器の中で次の武器をセレクト
      //リストの末尾でループ
      
      //武器リストから持っている物だけを抽出
      let wList = Object.keys(this.param.havingWeaponList);
      wList = wList.filter((arr)=>{
        return this.param.havingWeaponList[arr];
      })
      let wIndex = wList.indexOf(this.weapon.name);
      let wNameNext = wList[wIndex+1];//次の武器をセレクト
      if(!wNameNext)wNameNext = wList[0];//最後尾でループ
      this.ChangeWeapon(wNameNext);
    }
  }

  /*状態からアニメーションを行う*/
  Animation(){
    this.frame++;
    let state;
    switch(this.state){
      case STATE.WAITING :
        this.spid = (Math.floor(this.frame/__WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.animWait))%4
          state = "wait";
          break;
      case STATE.JUMPING :
        this.spid = (Math.floor(this.frame/__WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.animRun))%4
          state = "jump";
          break;
      case STATE.FALLING :
        this.spid = (Math.floor(this.frame/__WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.animRun))%4;
          state = "fall";
        break;
      case STATE.RUNNING :
        this.spid = (Math.floor(this.frame/__WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.animRun))%6;
        state = "run";
        //走り中は画像をちょっとだけ跳ねさせる
        //スプライト位置を動かしているだけなので当たり判定は変化していない
        let a = 2;//振幅
          let l = 9;//周期
        let f = (Math.abs((this.frame%l -l/2))-l/2);
        this.sprite.position.y = this.pos.y - a*4*f*f/l/l;
        if(this.frame%5 == 0 && this.floor.on){;
          //歩き土埃エフェクト
          let p = ADV(this.pos,VECY(16));
          let v = {
            x : -this.vel.x/2,
            y : -0.3 + Rand(0.1),
          }
          let s = __WEBPACK_IMPORTED_MODULE_23__Stage_pool_js__["a" /* default */].GetSmoke(p,v,6 + Rand(2));
          __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__["a" /* default */].addEntity(s);
          //■ SE : foot
          switch(this.floor.under.material){
            case "wall" : __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("landing1",0);break;
           case "steel": __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("landing2",-0.4,0.8);__WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("landing1",-1);break;
            default : break;
          }
        }
        break;
        //死亡
        case STATE.DYING:
          this.spid = Math.min(7,(Math.floor((this.frame - this.frameDead)/__WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.animRun)));
          state = "dying"
          break;
    }
    if(state == "dying"){
      this.sprite.texture = this.pattern[state][this.spid];
    }else{
      this.sprite.texture = this.pattern[state+this.dir][this.spid];
    }
  }

  //他から呼ばれる系
  /*武器チェンジ*/
  ChangeWeapon(name){
    this.weapon.Reset();
    __WEBPACK_IMPORTED_MODULE_15__Weapon_weaponManager_js__["a" /* default */].ChangeWeapon(this,name);
    __WEBPACK_IMPORTED_MODULE_16__UI_uiManager_js__["a" /* default */].bullet.ChangeWeapon(name);
    //変更先の武器アイコンをpop
    let p = CPV(this.pos);
    p.y-=8;
    __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_22__Effect_weaponIcon_js__["a" /* default */](p,name));
  }
  /*ダメージ*/
  /*負の値を入れる*/
  Damage(atk){
    if(atk>0 && atk%1>0){
      console.warn(atk);
      atk = Math.floor(atk);
    }
    //無敵時間は攻撃を受けない
    if(!this.isInvincible && this.isAlive){
      __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("playerDamage");

      //bulletが少ないと防御力がさがる(思いつき)
      //0~1
      /*
      let def = (1 - this.bullet/this.maxBullet)
      atk *= (1 + 30*def*def);
      atk = Math.floor(atk);
      */

      this.hp+=atk;
      //フォントはダメージ数に応じて数字を表示する　
      __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_17__Effect_fontEffect_js__["a" /* default */](this.pos,-atk+"","player"));
      this.hp = Math.max(this.hp,0);
      //ダメージを受けて一定時間無敵になる
      this.isInvincible = true;
      this.frameDamaged = this.frame;
      __WEBPACK_IMPORTED_MODULE_11__Event_eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_21__Event_quakeEvent_js__["a" /* default */](5,2));
    }
  }
  //コイン取得
  GetScore(){
    if(this.isAlive){
      this.score+=1;
      this.param.score = this.score;
      this.bullet += 5;//とりあえずbulletも回復しとくか
      __WEBPACK_IMPORTED_MODULE_16__UI_uiManager_js__["a" /* default */].score.SetScore(this.score);
    }
  }
  /* 衝突判定 */
  Collision(){
    //下からしか通れない物体
    this.floor.on = false;
    this.floor.under = null;
    //壁
    for(let l of __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__["a" /* default */].colliderList){
      if(l == this)continue;
      if(l.coltype == "none")continue;
      let c = __WEBPACK_IMPORTED_MODULE_5__Collision_collision_js__["a" /* default */].on(this,l);
      if(c.isHit){
        /* 衝突応答*/
        /*フラグの解除*/

        //床との衝突
        if(c.n.y == -1 && this.vel.y > 0){
          this.floor.under = l;
          this.floor.on = true;
          /*直せ*/
          if(l.name == "enemy6"){
            l.isSwelling = true;
          }
            if(this.isJump){
              //着地エフェクト
              let p = ADV(this.pos,VECY(16));
              let v = {
                x : 2 + Rand(1),
                y : Rand(0.4),
              }
              let s = __WEBPACK_IMPORTED_MODULE_23__Stage_pool_js__["a" /* default */].GetSmoke(p,v,10);
              __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__["a" /* default */].addEntity(s);
              switch(l.material){
                case "wall": __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("landing1",1);break;
                case "steel": __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("landing2",1);__WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("landing1");break;
                case "wood": __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("landing1",1);break;
                default : console.warn(l.material);
              }
            }
            this.isJump = false;
        }

        //Resolve
        switch(l.colType){
          case "through" : 
            //下からのみ通り抜けられる床
            if(c.n.y == -1 && l.pos.y - (this.pos.y - (this.vel.y-l.vel.y) + 8) > 0&& this.vel.y > 0){
              __WEBPACK_IMPORTED_MODULE_5__Collision_collision_js__["a" /* default */].Resolve(this,l);
            }
            break;
          case "wall" : __WEBPACK_IMPORTED_MODULE_5__Collision_collision_js__["a" /* default */].Resolve(this,l);break;
          default : console.warn(l.colType);break;
        /*note : now isHit == false*/
        }
      }
    }
  }
  Physics(){
    //動く床に乗っている時
    if(this.floor.on){
      this.pos.x += this.floor.under.vel.x; 
      this.pos.y += this.floor.under.vel.y; 
    }
    this.acc.y += this.gravity;
    this.pos.x += this.vel.x; 
    this.pos.y += this.vel.y; 
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    //最大速度制限:
    this.vel.x = BET(-this.vxMax , this.vel.x , this.vxMax);
    if(this.vel.y > this.vyMax)this.vel.y = this.vyMax;
    //if(this.vel.y < -this.vyMax)this.vel.y = -this.vyMax;
    /*摩擦
     * 地面にいる&&入力がない場合のみ有向*/
     if(this.state == STATE.WAITING){
      this.vel.x *= __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.fliction;
     }else if(this.isJump){
      this.vel.x *= 0.99;
     }
     //jumping state
     if(this.isJump && this.vel.y <= 0){
       this.state = STATE.JUMPING;
     }
     if(this.vel.y > 0 && this.isJump){
       this.state = STATE.FALLING;
     }
     this.acc.x = 0;
     this.acc.y = 0;


     //画面端の制限
     this.pos.x = Math.min(this.pos.x,__WEBPACK_IMPORTED_MODULE_13__drawer_js__["a" /* default */].mapSize.width * 16-4);//右端
     this.pos.x = Math.max(this.pos.x,0);//←端
     this.pos.y = Math.max(this.pos.y,0);//↑端
     if(this.pos.y > __WEBPACK_IMPORTED_MODULE_13__drawer_js__["a" /* default */].mapSize.height * 16+8)this.Damage(-999);//下端
  }

  ScrollByDir(){
    let d = POV(this.arg,100*po(this.offset));
    let p = ADV(this.pos,d);
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyInput(KEY.SP)) {
      let to = ADV(p,MLV(this.scPos,VECN(-1)));
      this.scPos = ADV(this.scPos , MLV(to,VECN(1/20)));
      this.offset = Math.min(this.offset+0.5,20);
      __WEBPACK_IMPORTED_MODULE_13__drawer_js__["a" /* default */].ScrollOn(this.scPos);
    }else{
      this.scPos = p;
      this.offset = 0;
    }
  }

  Observer(){
    if(this.hp <= 0){
      if(this.isAlive){
        //死亡開始時に一回だけ呼ばれる部分
        __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_19__Effect_explosion1_js__["a" /* default */](CPV(this.pos)));
        this.weapon.Reset();
        this.frameDead = this.frame;
        this.isDying = true;
        this.isAlive = false;
      }
      this.state = STATE.DYING;
    }
  }
  Dying(){
    //死亡中
    if(this.isDying){//まだ死んでない  
      if(this.frame - this.frameDead < 50){
        this.isDying = true;
      }else{
        //完全に死んだ
        //完全死亡時に一回だけ呼ばれる部分
        if(this.isDying){
          //this.state = STATE.DEAD
          let g = new __WEBPACK_IMPORTED_MODULE_12__Event_gameOverEvent_js__["a" /* default */]();
          __WEBPACK_IMPORTED_MODULE_11__Event_eventmanager_js__["a" /* default */].eventList.push(g);
        }
        this.isDying = false;
      }
    }
  }

  //bulletのかいふく
  Supply(){
    //最後に撃った時刻から経過するほど早くなる
    let t = (this.frame-this.frameShot);
    if(t<=50 && t%10 == 0) this.bullet++;
    else if(t>50 && t<=100 && t%5 == 0) this.bullet++;
    else if(t>100 && t<=150 && t%3 == 0) this.bullet++;
    else if(t>150) this.bullet++;
    this.bullet = BET(0,this.bullet,this.maxBullet);
    __WEBPACK_IMPORTED_MODULE_16__UI_uiManager_js__["a" /* default */].bullet.SetBar(this.bullet); //BulletBarの更新
  }

  SetArg(arg){
    this.toArg %= (Math.PI * 2)
    this.arg %= (Math.PI * 2)
    let d = this.toArg - this.arg;
    if(d > Math.PI)d -= 2*Math.PI;
    if(d < -Math.PI)d += 2*Math.PI;
    this.arg += d*0.2;
  }

  CreateStage(){
    if(this.pos.y < __WEBPACK_IMPORTED_MODULE_10__Stage_stageGen_js__["a" /* default */].checkpoint * 16){
      __WEBPACK_IMPORTED_MODULE_10__Stage_stageGen_js__["a" /* default */].GenerateChunk(__WEBPACK_IMPORTED_MODULE_10__Stage_stageGen_js__["a" /* default */].checkpoint);
    }
    if(this.pos.y > __WEBPACK_IMPORTED_MODULE_10__Stage_stageGen_js__["a" /* default */].wall.left.lastGrid.y * 16){
      this.Damage(-999);
    }
  }

  Update(){
    if(this.maxHP == 100 && __WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyClick(KEY.K) && this.isAlive){
      let p = {
        x : 64,
        y : 96
      }
      __WEBPACK_IMPORTED_MODULE_16__UI_uiManager_js__["a" /* default */].addUI(new __WEBPACK_IMPORTED_MODULE_24__UI_stagePop_js__["a" /* default */](p,"-HPがふえた "));//SCORE
      p.y += 10;
      if(!this.param.havingWeaponList.missile){
        this.param.havingWeaponList.missile = true;
        __WEBPACK_IMPORTED_MODULE_16__UI_uiManager_js__["a" /* default */].bullet.Push("missile");
      }
      if(!this.param.havingWeaponList.laser){
        this.param.havingWeaponList.laser = true;
        __WEBPACK_IMPORTED_MODULE_16__UI_uiManager_js__["a" /* default */].bullet.Push("laser");
      }
      this.param.maxHp = 300;
      this.Damage(-999);
      __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("missileHit");
    }
    if(this.isAlive){
      /*Init*/
      if(!this.isJump) {
        this.state = STATE.WAITING; //何も入力がなければWAITINGとみなされる
      }
      this.isRun = false;
      this.Input();//入力
      this.SetArg(this.toArg);
      this.weapon.Update(this);//weapon
      this.Physics();//物理
      this.Collision();//衝突
      this.Supply();//bulletのかいふく　
      __WEBPACK_IMPORTED_MODULE_16__UI_uiManager_js__["a" /* default */].HP.SetBar(this.hp);//HPbarの更新
    }
    this.isCanRead = false;
    //this.CreateStage();//マップ生成
    this.ScrollByDir();//向きに応じてスクロール位置を変更
    __WEBPACK_IMPORTED_MODULE_13__drawer_js__["a" /* default */].ScrollOn(this.pos);//プレイヤー中心にスクロール
    this.Observer(); //死亡チェック
    this.Dying();//死亡中
    //無敵時間の有向時間
    if(this.frame - this.frameDamaged > __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.invTime){
      this.isInvincible = false;
    }
    this.sprite.position = {
      x : Math.floor(this.pos.x-4),
      y : Math.floor(this.pos.y)
    }
    /*パラメータ*/
    this.offset *= 0.99;
    this.Animation();//状態から画像を更新
    /*reset*/
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;




/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_Bullet_bullet_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_Bullet_bullet1_js__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__weapon_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Entity_Effect_bulletShot_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Entity_Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Event_eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Event_quakeEvent_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__param_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Entity_Effect_explosion1_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Entity_Effect_explosion2_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Entity_Effect_lasersight_js__ = __webpack_require__(32);
















class Weapon1 extends __WEBPACK_IMPORTED_MODULE_4__weapon_js__["a" /* default */]{
  constructor(){
    super("missile");
    /*基本情報*/
    /*パラメータ*/
    this.param = __WEBPACK_IMPORTED_MODULE_11__param_js__["a" /* default */].weapon1;
    this.agi = this.param.agi;//間隔
    this.cost = this.param.cost;
    this.speed = this.param.speed;//弾速
    this.length = this.param.length;//射程距離
    /*option*/
    this.isTarget = this.param.isTarget;
    this.isHorming = this.param.isHorming;
    this.isLasersight = this.param.isLasersight;
  }
  //装填
  Set(player){
    let p = {
      x: player.pos.x -4 + 10 * Math.cos(this.arg),
      y: player.pos.y + 10 * Math.sin(this.arg),
    }
    let bullet = __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].GetMissile(p,this);
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(bullet);
    /* ■ SoundEffect : shot */
    __WEBPACK_IMPORTED_MODULE_6__audio_js__["a" /* default */].PlaySE("missileShot",2);
    /* □ Effect : shot */
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_7__Entity_Effect_bulletShot_js__["a" /* default */](CPV(p),VEC0()));
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_13__Entity_Effect_explosion2_js__["a" /* default */](CPV(p),this.arg));
  }
  Update(player){
    if(this.isTarget) this.Target(player);
    if(this.isLasersight) this.Lasersight(player);
  }
  Option(option,value){
    switch(option){
      case "isHorming" : this.isHorming = value ;break;
      case "isLasersight" : this.isLasersight = value ;break;
      case "isTarget" : this.isTarget = value ;break;
      default : console.warn(option);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Weapon1;



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_Bullet_bullet_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_Bullet_bullet2_js__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__weapon_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Entity_Effect_bulletShot_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Entity_Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Event_eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Event_quakeEvent_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__param_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Entity_Effect_explosion1_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Entity_Effect_explosion2_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Entity_Effect_lasersight_js__ = __webpack_require__(32);
















const DIR = {
  UR : "UR",
  UL : "UL",
  DR : "DR",
  DL : "DL",
  R : "R",
  L : "L",
};

class Weapon2 extends __WEBPACK_IMPORTED_MODULE_3__weapon_js__["a" /* default */]{
  constructor(){
    super("laser");
    /*基本情報*/
    this.target;
    this.isTargetOn = false;//照準が発生しているか
    this.lasersight;
    this.isLaserOn = false;
    /*パラメータ*/
    this.param = __WEBPACK_IMPORTED_MODULE_11__param_js__["a" /* default */].weapon2;
    this.agi = this.param.agi;//間隔
    this.cost = this.param.cost;
    this.speed = this.param.speed;//弾速
    this.length = this.param.length;//射程距離
    /*オプション*/
    this.isTarget = this.param.isTarget;
    this.isLasersight = this.param.isLasersight;

  }
  Set(player){
    let arg = player.arg;
    let p = ADV(POV(arg,16),CPV(player.pos));
    let bullet;
    //再帰的に生成
    p = ADV(player.pos,POV(arg,16));
    bullet = new __WEBPACK_IMPORTED_MODULE_1__Entity_Bullet_bullet2_js__["a" /* default */](p,arg,true,0);
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(bullet);
    /* ■ SoundEffect : shot */
    __WEBPACK_IMPORTED_MODULE_5__audio_js__["a" /* default */].PlaySE("laserShot",0.7);
    /* □ Effect : shot */
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_7__Entity_Effect_bulletShot_js__["a" /* default */](CPV(p),VEC0()));
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_12__Entity_Effect_explosion1_js__["a" /* default */](CPV(p)));
    //反動
    //player.vel.x -= v.x/11;
    //if(player.dir == DIR.DR || player.dir == DIR.DL) player.vel.y = -1.2;
    //振動
    __WEBPACK_IMPORTED_MODULE_9__Event_eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_10__Event_quakeEvent_js__["a" /* default */](17,5));
  }
  Update(player){
    if(this.isTarget) this.Target(player);
    if(this.isLasersight) this.Lasersight(player);
  }
  Reset(){
    if(this.isTargetOn)__WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this.target);
    if(this.isLasersight)__WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this.lasersight);
    this.Init();
  }
  Option(option,value){
    switch(option){
      case "isHorming" : this.isHorming = value ;break;
      case "isLasersight" : this.isLasersight = value ;break;
      case "isTarget" : this.isTarget = value ;break;
      default : console.warn(option);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Weapon2;



/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Event_eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event_quakeEvent_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AI_bullet2AI_js__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__bullet_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_bulletBlur_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Effect_explosion1_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Effect_explosion2_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__param_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Stage_pool_js__ = __webpack_require__(12);
















const bullet2 = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].bullet2;

//Laser
class Bullet2 extends __WEBPACK_IMPORTED_MODULE_8__bullet_js__["a" /* default */]{
  constructor(pos,arg,isNext,step){
    super(pos,POV(arg,VEC0()));
    /*基本情報*/
    this.frame = 0;
    this.arg = arg;
    this.isUpdater  =true;
    this.layer = "BACK"//壁に埋めるため
      this.name = "laser";
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].bulletPattern.bullet2;
    this.spid = 0;
    this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    this.sprite.anchor.set(0.5);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this.sprite.alpha = 0.7;
    /*コライダ*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_1__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_3__Collision_box_js__["a" /* default */](pos,6,6));//衝突判定の形状
    /*パラメータ*/
    this.hp = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].bullet2.hp;//弾丸のHP 0になると消滅
    this.atkMax = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].bullet2.atkMax;//攻撃力
    this.atkMin = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].bullet2.atkMin;//攻撃力
    /*AI*/
    this.AIList = [];
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_7__AI_bullet2AI_js__["a" /* default */](this));

    this.step = step;

    //壁にぶつかってなければレーザー光線を進める
    if(step > 30){
      isNext = false;
    }
    for(let w of __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].colliderList){
      let c = __WEBPACK_IMPORTED_MODULE_2__Collision_collision_js__["a" /* default */].on(this,w);
      //なおせ　
      if(w.name == "player")continue;
      if(c.isHit){
        if(w.isBreakable) {
          w.Damage(-1);
          let e = new __WEBPACK_IMPORTED_MODULE_11__Effect_explosion2_js__["a" /* default */](CPV(this.pos),this.arg + Math.PI);
          //e = Pool.GetSmoke(CPV(this.pos),VEC0(),3);
          __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].addEntity(e);
        }
        else if(w.type == "ENEMY"){
          __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_11__Effect_explosion2_js__["a" /* default */](CPV(this.pos),this.arg + Math.PI));
          w.Damage(-RandBET(this.atkMin,this.atkMax));
          }
        else {
          if(w.material == "steel"){
            let i = POV(this.arg,-16);//入射角ベクトル
            //r = i+2n*(i・n)

            let r = ADV(i,MLV(VECN(2),MLV(c.n,VECN(DOT(i,c.n)))));
            this.arg = Math.atan(r.y/r.x);
            //if(r.y<0)this.arg += Math.PI;
          //鉄で反射
          }else{
          //壁にぶつかったので停止
          __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_11__Effect_explosion2_js__["a" /* default */](CPV(this.pos),this.arg + Math.PI));
          isNext = false;
          }
        }
      }
    }
    if(isNext){
      step++;
      let p = ADV(this.pos,POV(this.arg,16));
      let bullet = new Bullet2(p,this.arg,isNext,step);
      __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].addEntity(bullet);
    }
  }

  Update(){
    for (let AI of this.AIList){
    //  AI.Do();
    }
    if(this.frame%2 == 0){
      this.spid = Math.min(this.spid+1,7);
    }
    /*observer*/
    //HP || 経過時間
    if( this.frame > 20 || this.hp<=0){
      __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.position.x -=4;
    this.sprite.rotation = this.arg;
    this.sprite.texture = this.pattern[this.spid];

    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet2;



/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Effect_bulletHitWall_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Effect_explosion1_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Effect_explosion2_js__ = __webpack_require__(17);






class Bullet2AI{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  /* 衝突判定 */
  collision(){
    for(let l of __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].enemyList){
      if(__WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__["a" /* default */].on(this.bullet,l).isHit){
        l.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
        this.bullet.hp--;
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      }
    }
    for(let l of __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].wallList){
      if(__WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__["a" /* default */].on(this.bullet,l).isHit){
        //breakable object
          __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_4__Effect_explosion2_js__["a" /* default */](CPV(this.bullet.pos),this.bullet.arg + Math.PI));
        if(l.isBreakable){
          /* ■ SoundEffect : hitWood */
          l.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
          this.bullet.hp--;
          //wall
          }else{
            /* ■ SoundEffect : hitWall */
            this.bullet.hp = 0;
          /* □ Effect : Exp */
          }
      }
    }
  }
  Do(){
    this.collision();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet2AI;



/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_Bullet_bullet_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_Bullet_bullet3_js__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__weapon_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Entity_Effect_bulletShot_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Entity_Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Event_eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Event_quakeEvent_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__param_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Entity_Effect_explosion1_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Entity_Effect_explosion2_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Entity_Effect_lasersight_js__ = __webpack_require__(32);

















class Weapon3 extends __WEBPACK_IMPORTED_MODULE_4__weapon_js__["a" /* default */]{
  constructor(){
    super("normal");
    /*基本情報*/
    /*パラメータ*/
    this.param = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].weapon3;
    this.agi = this.param.agi;//間隔
    this.cost = this.param.cost;
    this.speed = this.param.speed;//弾速
    this.length = this.param.length;//射程距離
    /*option*/
    this.isTarget = this.param.isTarget;
    this.isHorming = this.param.isHorming;
    this.isLasersight = this.param.isLasersight;
  }
  Set(player){
    this.arg = player.arg;
    let p = {
      x: player.pos.x -4 + 10 * Math.cos(this.arg),
      y: player.pos.y + 10 * Math.sin(this.arg),
    }
    let bullet = new __WEBPACK_IMPORTED_MODULE_1__Entity_Bullet_bullet3_js__["a" /* default */](p,this);
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(bullet);
    /* ■ SoundEffect : shot */
    __WEBPACK_IMPORTED_MODULE_6__audio_js__["a" /* default */].PlaySE("normalShot",-0.6);
    /* □ Effect : shot */
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_8__Entity_Effect_bulletShot_js__["a" /* default */](CPV(p),VEC0()));
    //振動
    //EventManager.eventList.push(new QuakeEvent(8,2));
  }
  Update(player){
    if(this.isTarget) this.Target(player);
    if(this.isLasersight) this.Lasersight(player);
  }
  Option(option,value){
    switch(option){
      case "isHorming" : this.isHorming = value ;break;
      case "isLasersight" : this.isLasersight = value ;break;
      case "isTarget" : this.isTarget = value ;break;
      default : console.warn(option);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Weapon3;



/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event_eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AI_bullet3AI_js__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__AI_horming_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__bullet_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Effect_bulletBlur2_js__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Effect_bulletHitWall_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__param_js__ = __webpack_require__(8);














//normal bullet
class Bullet3 extends __WEBPACK_IMPORTED_MODULE_9__bullet_js__["a" /* default */]{
  constructor(pos,weapon){
    super(pos,POV(weapon.arg,weapon.speed));
    this.Init(pos,weapon);
  }
  Init(pos,weapon){
    /*基本情報*/
    this.frame = 0;
    this.name = "normal";
    this.arg = weapon.arg;
    this.vi = weapon.speed;
    this.isTargetOn = weapon.isTargetOn;
    if(this.isTargetOn) this.targetedEnemy = weapon.target.enemy
    this.isUpdater = true;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].bulletPattern.bullet3;
    this.spid = 0;
    this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    this.sprite.anchor.set(0.5);
    /*コライダ*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,4,4));//衝突判定の形状
    /*パラメータ*/
    this.hp = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].bullet3.hp;//弾丸のHP 0になると消滅
    this.atkMin = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].bullet3.atkMin;//攻撃力
    this.atkMax = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].bullet3.atkMax;//攻撃力
    //this.curve = Param.bullet3.curve;
    this.AIList = [];
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_7__AI_bullet3AI_js__["a" /* default */](this));
    //if(weapon.isHorming) this.AIList.push(new Horming(this));
  }

  Update(){
    /*□Effect BulletBulr*/
    if(this.frame%2 == 0){
      let p = CPV(this.pos);
      let d = Rand2D(5);
      p = ADV(p,d);
      let v = POV(this.arg+Math.PI,4);
      let blur = new __WEBPACK_IMPORTED_MODULE_10__Effect_bulletBlur2_js__["a" /* default */](p,v);
      if(blur)__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(blur);
    }
    for (let AI of this.AIList){
      AI.Do();
    }
    /*observer*/
    //HP || 経過時間
    if(this.hp<=0 ||
      this.frame > 30) {
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(this);
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_11__Effect_bulletHitWall_js__["a" /* default */](CPV(this.pos)));
    }
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.rotation = this.arg + Math.PI/2;
    this.sprite.texture = this.pattern[this.spid];

    this.spid = (this.spid+0)%4;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet3;



/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Effect_bulletHitWall_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio_js__ = __webpack_require__(3);





class Bullet3AI{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  Phisics(){
    this.bullet.vel = POV(this.bullet.arg,this.bullet.vi);
    this.bullet.pos.x += this.bullet.vel.x;
    this.bullet.pos.y += this.bullet.vel.y;
  }
  /* 衝突判定 */
  collision(){
    for(let l of __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].enemyList){
      if(__WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__["a" /* default */].on(this.bullet,l).isHit){
        l.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
        this.bullet.hp--;
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      };
    }
    for(let w of __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].wallList){
      if(__WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__["a" /* default */].on(this.bullet,w).isHit){
        //breakable object
        if(w.isBreakable){
          // ■ SoundEffect : hitWood
          w.Damage(-1);
          this.bullet.hp--;
          //wall
          }else{
            // ■ SoundEffect : hitWall
            switch(w.material){
              case  "wall" : __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("landing1",-1,2);break;
              case  "steel": __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("landing3",0,2);break;
              }
            this.bullet.hp = 0;
          }
      }
    }
  }

  Do(){
    this.collision();
    this.Phisics();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet3AI;



/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(9);





/*bullet3残像*/
class BulletBlur2 extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    this.Init(pos,vel);
  }
  Init(pos,vel){
    /*基本情報*/
    this.name = "bulletblur2";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
      /*スプライト*/
    this.spid = 0; //12~15
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.blur2;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.anchor.set(0.5);
    this.sprite.scale = VECN(Rand(0.5)+1);
    this.sprite.position = ADV(this.pos,VECN(8));
    //this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Physics(){
    this.pos = ADV(this.pos,this.vel);
    this.vel = MLV(this.vel,VECN(0.9));
  }


  Update(){
    if(this.isAlive){
      //this.sprite.scale = ADV(this.sprite.scale,VECN(this.frame/256));
      this.Physics();
      this.sprite.position = ADV(this.pos.x,VECN(8));
      this.sprite.texture = this.pattern[this.spid];
      this.spid = Math.floor(this.frame/4)%4;
      this.sprite.alpha *= 0.94;
      if(this.frame >= 16){
        //消える時に一回だけ呼ばれる
        if(this.isAlive){
          __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
          this.isAlive = false
        }
      }
      this.sprite.position = ADV(this.pos,VECN(8));
      this.frame++;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BulletBlur2;



/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(9);





//武器チェンジ時のアイコンのポップ
class WeaponIcon extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,name){
    super(pos,VEC0());
    /*基本情報*/
    /*スプライト*/
    this.spid = name; //12~15
    this.layer = "FOREENTITY";
    this.frame = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].UIPattern.bullet.pop;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;

    this.d = 12;
  }
  Delete(){
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
  }

  Update(){
    this.d*= 0.3;
    this.pos = CPV(__WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].player.pos);
    this.pos.y -= 12;
    this.pos.y -= this.d;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
    if(this.frame>30 || this.spid != __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].player.weapon.name)this.Delete();
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WeaponIcon;



/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AI_enemy1AI_js__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__param_js__ = __webpack_require__(8);












let EntityList = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].entityList;

class Enemy1 extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.frame = 0;
    this.type = ENTITY.ENEMY;
    this.dir = 1;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].enemyPattern.enemy1;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.addAI(new __WEBPACK_IMPORTED_MODULE_6__AI_enemy1AI_js__["a" /* default */](this));
    this.param = __WEBPACK_IMPORTED_MODULE_9__param_js__["a" /* default */].enemy1
    this.atkMin = this.param.atkMin;
    this.atkMax = this.param.atkMax;
    this.hp = this.param.hp;
    this.gravity = this.param.gravity;
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
  }
  //衝突判定
  Collision(){
    for(let l of __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].wallList){
      if(l == this) continue;
      let c = __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l);
      if(c.isHit){
        /* 衝突応答*/
        if(c.n.x != 0) this.vel.x = 0;
        //地面との衝突
        if(c.n.y == -1){ 
          this.isJump = false;
          this.vel.y = Math.min(0,this.vel.y * -0.3);
        }
        //天井との衝突
        if(c.n.y == 1 ){
          this.vel.y = Math.max(0,this.vel.y * -0.3)
        }
        /*押し出し*/
        this.pos.x += c.n.x * c.depth;
        this.pos.y += c.n.y * c.depth;
        /*note : now isHit == false*/
      }
    }
    this.floor.on = false;
    this.floor.under = null;
    for(let i=0;i<__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].enemyList.length;i++){
      let l = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].enemyList[i];
      let c = __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l);
      //これないと自分と衝突判定してバグ
      if(i == __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].enemyList.indexOf(this))continue;
      /*衝突判定*/
      if(c.isHit){
        /* 衝突応答*/

        /*速度*/
        if(c.n.x != 0) this.vel.x = 0;
        //地面との衝突
        if(c.n.y == -1){ 
          this.floor.on = true; 
          this.floor.under = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].enemyList[i];
          this.isJump = false;
          this.vel.y = Math.min(1,this.vel.y * -0.3);
        }
        //天井との衝突
        if(c.n.y == 1 ){
          this.vel.y = Math.max(1,this.vel.y * -0.3)
        }
        /*押し出し*/
        let l = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].enemyList[i];
        this.pos.x += c.n.x * c.depth/2;
        this.pos.y += c.n.y * c.depth/2;
        /*note : now isHit == false*/
      }
    }
  }
  Animation(){
    this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
  }

  Update(){
    for (let AI of this.AIList){
      AI.Do();
    }
    this.Collision();
    this.Physics();
    this.Hurt();
    //アニメーション
    this.Animation();
    //observer
    if(this.hp<=0){
      this.Die();
    }
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy1;



/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ai_js__ = __webpack_require__(41);






class Enemy1AI extends __WEBPACK_IMPORTED_MODULE_2__ai_js__["a" /* default */]{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    super(enemy)
  }

  Do(){
    this.enemy.acc.x = (this.enemy.pos.x < __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].player.pos.x)? 0.01 : -0.01;
    this.enemy.vel.x = Math.max(-1,Math.min(this.enemy.vel.x,1));
    //たまにジャンプする
    if(!this.enemy.isJump && this.enemy.frame % (10 + Math.floor(100*Math.random())) == 0){
      this.enemy.acc.y += -3;
      this.enemy.isJump = true;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy1AI;



/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AI_enemy2AI_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AI_moveReflect_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Mover_coin_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Event_eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Event_quakeEvent_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__param_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Effect_explosion2_js__ = __webpack_require__(17);
















class Enemy2 extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.frame = 0;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].enemyPattern.enemy2;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.param = __WEBPACK_IMPORTED_MODULE_13__param_js__["a" /* default */].enemy2;
    this.addAI(new __WEBPACK_IMPORTED_MODULE_7__AI_moveReflect_js__["a" /* default */](this));
    this.atkMin = this.param.atkMin;
    this.atkMax = this.param.atkMax;
    this.hp = this.param.hp;
    this.gravity = this.param.gravity;
    this.coin = this.param.coin;
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
    this.vel = Rand2D(1);
  }
  //die
  Animation(){
    this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
  }

  Update(){
    for (let AI of this.AIList){
      AI.Do();
    }
    this.Physics();
    this.Hurt();
    this.Animation();
    this.frame++;
    //observer
    if(this.hp<=0){
      this.Die();
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy2;



/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AI_enemy2AI_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AI_shot_js__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__AI_moveLissajous_js__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Event_eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Event_quakeEvent_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__param_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Effect_explosion2_js__ = __webpack_require__(17);














let STATE = {
  WAITING : "WAITING",
  ACTIVE : "ACTIVE",
}

class Enemy3 extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.arg = 0;
    this.frame = 0;
    this.frameShot = 0;//最後にshotした時刻
      this.e = 0;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].enemyPattern.enemy3;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = ADV(this.pos , VECN(8));
    this.sprite.anchor.set(0.5);
    /*パラメータ*/
    this.param = __WEBPACK_IMPORTED_MODULE_11__param_js__["a" /* default */].enemy3;
    this.addAI(new __WEBPACK_IMPORTED_MODULE_7__AI_shot_js__["a" /* default */](this));
    this.addAI(new __WEBPACK_IMPORTED_MODULE_8__AI_moveLissajous_js__["a" /* default */](this));
    this.atkMin = this.param.atkMin;
    this.atkMax = this.param.atkMax;
    this.hp = this.param.hp;
    this.range = this.param.range;
    this.coin = this.param.coin;
    /*state*/
    this.state = "WAITING";
    /*フラグ*/
    this.isAlive = true;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
  }
  Animation(){
  //  this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = ADV(this.pos , VECN(8));
  }
  Collision(){
    for(let w of __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].wallList){
      let c = __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,w);
      if(c.isHit){
        __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].Resolve(this,w);
      }
    }
  }

  Update(){
    //if(DIST(this.pos,EntityManager.player.pos) < this.range){
    if(__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player.weapon.isSeen(__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player,this)){
      //if(EntityManager.player.weapon.target.enemy == this){
        this.state = "ACTIVE";
      //}else{
       // this.state = "WAITING"
      //}
    }else{
      this.state = "WAITING";
    }
    switch(this.state){
      case "WAITING" :
        this.sprite.scale.set(1);
        this.sprite.rotation = 0; 
        this.spid = 0;
        this.vel = VEC0();
        break;
      case "ACTIVE" :
        this.sprite.rotation += 0.1;
        this.sprite.scale.set(1 + Math.cos(this.frame/2)/5);
        this.spid = 1
        this.AIList[0].Do();
        this.AIList[1].Do();
        break;
      default :
        console.warn(this.state);
    }

    this.Physics();
    this.Collision();
    this.Hurt();
    this.Animation();
    this.frame++;
    //observer
    if(this.hp<=0){
      this.Die();
    }
    this.arg = Math.atan((__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player.pos.y-this.pos.y)/(__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player.pos.x-this.pos.x));
    if(this.pos.x > __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player.pos.x ) this.arg += Math.PI;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy3;



/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Enemy_eBullet1_js__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio_js__ = __webpack_require__(3);





//arg方向に向かって発射する

class Shot{

  constructor(enemy){
    this.enemy = enemy;
  }
  Do(enemy){
    if(this.enemy.frame - this.enemy.frameShot >= 100){
      __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("enemy3Shot",-0.7);
      let arg = this.enemy.arg + Rand(0.1);
      let p = CPV(this.enemy.pos);
      let d = POV(arg,16);
      p = ADV(p,d);
      let v = POV(arg,2.0);
      __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_2__Enemy_eBullet1_js__["a" /* default */](p,v))
      this.enemy.frameShot = this.enemy.frame;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Shot;



/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__param_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Effect_explosion2_js__ = __webpack_require__(17);









//敵の弾丸その1
class eBullet1 extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,8,8));//衝突判定の形状
    this.frame = 0;
    this.type = "MOVER"
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].enemyPattern.eBullet1;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.param = __WEBPACK_IMPORTED_MODULE_6__param_js__["a" /* default */].eBullet1;
    //this.addAI(new moveReflect(this));
    this.atkMin = this.param.atkMin;
    this.atkMax = this.param.atkMax;
    //this.hp = ENEMY3.HP;
    //this.gravity = ENEMY3.GRAVITY;
    /*フラグ*/
    this.isAlive = true;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
  }
  Animation(){
    this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
  }
  Die(){
    __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(this);
  }
  Collision(){
    for(let w of __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].wallList){
      let c = __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,w);
      if(c.isHit){
        this.hp = 0;
      }
    }
  }

  Update(){
    /*
    for (let AI of this.AIList){
      AI.Do();
    }
    */
    this.Physics();
    this.Collision();
    this.Hurt();
    this.Animation();
    this.frame++;
    //observer
    if(this.hp<=0 || this.frame > 300){
      this.Die();
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = eBullet1;



/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ai_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collision_js__ = __webpack_require__(2);




//リサージュ曲線で移動
class MoveLissajous extends __WEBPACK_IMPORTED_MODULE_1__ai_js__["a" /* default */]{

  constructor(enemy){
    super(enemy);
  }
  Do(enemy){
    this.enemy.vel.x = 1*Math.sin(this.enemy.frame/10);
    this.enemy.vel.y = 1*Math.cos(this.enemy.frame/8);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MoveLissajous;



/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AI_enemy5AI_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__param_js__ = __webpack_require__(8);






//import Enemy4AI from '../AI/enemy4AI.js';





let EntityList = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].entityList;

class Enemy4 extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.frame = 0;
    this.type = ENTITY.ENEMY;
    this.dir = 1;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].enemyPattern.enemy4;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.addAI(new __WEBPACK_IMPORTED_MODULE_6__AI_enemy5AI_js__["a" /* default */](this,130));
    this.param = __WEBPACK_IMPORTED_MODULE_9__param_js__["a" /* default */].enemy4
    this.atkMin = this.param.atkMin;
    this.atkMax = this.param.atkMax;
    this.hp = this.param.hp;
    this.gravity = this.param.gravity;
    this.coin = this.param.coin;
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    this.isActive = false;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
  }
  //衝突判定
  Collision(){
    for(let l of __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].wallList){
      if(l == this) continue;
      let c = __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l);
      if(c.isHit){
        /* 衝突応答*/
        if(c.n.x != 0) this.vel.x = 0;
        //地面との衝突
        if(c.n.y == -1){ 
          this.isJump = false;
          this.vel.y = Math.min(0,this.vel.y * -0.3);
          this.vel.x *= 0.8;//摩擦
        }
        //天井との衝突
        if(c.n.y == 1 ){
          this.vel.y = Math.max(0,this.vel.y * -0.3)
        }
        /*押し出し*/
        this.pos.x += c.n.x * c.depth;
        this.pos.y += c.n.y * c.depth;
        /*note : now isHit == false*/
      }
    }
    this.floor.on = false;
    this.floor.under = null;
    for(let i=0;i<__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].enemyList.length;i++){
      let l = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].enemyList[i];
      let c = __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l);
      //これないと自分と衝突判定してバグ
      if(i == __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].enemyList.indexOf(this))continue;
      /*衝突判定*/
      if(c.isHit){
        /* 衝突応答*/

        /*速度*/
        if(c.n.x != 0) this.vel.x = 0;
        //地面との衝突
        if(c.n.y == -1){ 
          this.floor.on = true; 
          this.floor.under = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].enemyList[i];
          this.isJump = false;
          this.vel.y = Math.min(0,this.vel.y * -0.3);
        }
        //天井との衝突
        if(c.n.y == 1 ){
          this.vel.y = Math.max(1,this.vel.y * -0.3)
        }
        /*押し出し*/
        let l = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].enemyList[i];
        this.pos.x += c.n.x * c.depth/2;
        this.pos.y += c.n.y * c.depth/2;
        /*note : now isHit == false*/
      }
    }
  }
  Animation(){
    //this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
  }

  Update(){
    for (let AI of this.AIList){
      AI.Do();
    }


    this.Collision();
    this.Physics();
    this.Hurt();
    this.Animation();

    if(this.isActive){
      this.spid = 1;
      if(!this.isJump){
        this.vel.x *= 0.7;
      }
      //たまにじゃんぷ　
      if(this.frame%40 == 0 && !this.isJump){
        this.vel.y = -3;
        this.vel.x = (__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player.pos.x - this.pos.x > 0)?0.7:-0.7;
        this.isJump = true;
      }
    }else{
      this.spid = 0;
      this.frame = 0;
    }

    //observer
    if(this.hp<=0){
      this.Die();
    }
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy4;



/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AI_moveReflect_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Entity_Enemy_eBullet2_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__AI_enemy5AI_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__param_js__ = __webpack_require__(8);














class Enemy5 extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.frame = 0;
    this.type = ENTITY.ENEMY;
    this.dir = 1;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].enemyPattern.enemy5;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.addAI(new __WEBPACK_IMPORTED_MODULE_9__AI_enemy5AI_js__["a" /* default */](this,200));
    this.addAI(new __WEBPACK_IMPORTED_MODULE_7__AI_moveReflect_js__["a" /* default */](this));
    this.param = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].enemy5;
    this.atkMin = this.param.atkMin;
    this.atkMax = this.param.atkMax;
    this.hp = this.param.hp;
    this.gravity = 0 * this.param.gravity;
    this.coin = this.param.coin;
    this.term = this.param.term;
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    this.isActive = false;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
    this.vel.x = -0.5;
  }
  //衝突判定
  Collision(){
    for(let l of __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].wallList){
      if(l == this) continue;
      let c = __WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__["a" /* default */].on(this,l);
      if(c.isHit){
        /* 衝突応答*/
        if(c.n.x != 0) this.vel.x = 0;
        //地面との衝突
        if(c.n.y == -1){ 
          this.isJump = false;
          this.vel.y = Math.min(0,this.vel.y * -0.3);
        }
        //天井との衝突
        if(c.n.y == 1 ){
          this.vel.y = Math.max(0,this.vel.y * -0.3)
        }
        /*押し出し*/
        this.pos.x += c.n.x * c.depth;
        this.pos.y += c.n.y * c.depth;
        /*note : now isHit == false*/
      }
    }
    this.floor.on = false;
    this.floor.under = null;
    for(let i=0;i<__WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].enemyList.length;i++){
      let l = __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].enemyList[i];
      let c = __WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__["a" /* default */].on(this,l);
      //これないと自分と衝突判定してバグ
      if(i == __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].enemyList.indexOf(this))continue;
      /*衝突判定*/
      //判定は落下中のみ
      if(c.isHit){
        /* 衝突応答*/

        //壁との衝突
        if(c.n.x != 0) this.vel.x = 0;
        //地面との衝突
        if(c.n.y == -1){ 
          this.floor.on = true; 
          this.floor.under = __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].enemyList[i];
          this.isJump = false;
          this.vel.y = Math.min(1,this.vel.y * -0.3);
        }
        //天井との衝突
        if(c.n.y == 1 ){
          this.vel.y = Math.max(1,this.vel.y * -0.3)
        }
        /*押し出し*/
        let l = __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].enemyList[i];
        this.pos.x += c.n.x * c.depth/2;
        this.pos.y += c.n.y * c.depth/2;
        /*note : now isHit == false*/
      }
    }
  }
  Animation(){
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
  }

  Update(){
    /*AI*/
    for (let AI of this.AIList){
      AI.Do();//activationのみ
    }
    //this.isActive = (Math.abs(this.pos.x - EntityManager.player.pos.x) < 200)
    //動く
    //弾を発射
    if(this.isActive){
      this.spid = 1;
      if(this.frame%this.term == 0){
        let p = CPV(this.pos);
        p = ADV(p,VECX(4));//弾は中心から
          let v = {
            x : 0,
            y : -1,
          }
          let b = new __WEBPACK_IMPORTED_MODULE_8__Entity_Enemy_eBullet2_js__["a" /* default */](p,v);
          //SE
          __WEBPACK_IMPORTED_MODULE_2__audio_js__["a" /* default */].PlaySE("enemy5Shot");
          __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].addEntity(b);
      }
    }else{
      this.spid = 0;
      this.frame = 0;
    }
    /*きょうつう*/
 //   this.Collision();
    this.Physics();
    this.Hurt();
    this.Animation();
    //observer
    if(this.hp<=0){
      this.Die();
    }
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy5;



/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Entity_Enemy_eBullet2_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_explosion1_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__AI_enemy5AI_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__param_js__ = __webpack_require__(8);














//playerに踏まれると膨らむ
//膨らんで爆発
class Enemy6 extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.frame = 0;
    this.type = ENTITY.ENEMY;
    this.dir = 1;
    this.name = "enemy6";
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].enemyPattern.enemy6;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    /*パラメータ*/
    this.addAI(new __WEBPACK_IMPORTED_MODULE_9__AI_enemy5AI_js__["a" /* default */](this,200));
    this.param = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].enemy6
    this.atkMin = this.param.atkMin;
    this.atkMax = this.param.atkMax;
    this.hp = this.param.hp;
    this.gravity = 0 * this.param.gravity;
    this.coin = this.param.coin;
    this.exp = this.param.exp;
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    this.isActive = false;
    this.isSwelling = false;//膨らんでいるとtrue;
    this.isShrinking = false;//縮んでいる時true
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
  }
  Animation(){
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = ADV(this.pos,VECN(8));
  }
  Swell(){
    //1.5まで大きくなる
    let d = 1.5 - this.sprite.scale.x; 
    this.sprite.scale.x += d*0.1;
    this.sprite.scale.y += d*0.1;
    this.collider.hitbox.width = 16 * this.sprite.scale.x
    this.collider.hitbox.height = 16 * this.sprite.scale.y
    if(this.sprite.scale.x > 1.49){
      this.isSwelling = false;
      this.isShrinking = true;
    }
  }
  Shrink(){
    this.sprite.scale.x -= 0.3;
    this.sprite.scale.y -= 0.3;
    if(this.sprite.scale.x < 0.1){
      this.Bomb();
    }
  }
  Bomb(){
    if(DIST(this.pos,__WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].player.pos)<32){
      __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].player.Damage(-this.exp);
    }
    __WEBPACK_IMPORTED_MODULE_2__audio_js__["a" /* default */].PlaySE("missileHit");
    __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_8__Effect_explosion1_js__["a" /* default */](this.pos));
    this.Die();
  }


  Update(){
    /*きょうつう*/
    this.Collision();
    this.Physics();
    this.Hurt();
    this.Animation();
    if(this.isSwelling){
      this.spid = 1;
      this.Swell();
    }
    if(this.isShrinking){
      this.Shrink();
    }
    //observer
    if(this.hp<=0){
      //this.Bomb();
      this.isSwelling = true;
    }
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy6;



/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Event_gameOverEvent_js__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Event_eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Event_gameClearEvent_js__ = __webpack_require__(58);












class Goal extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos){
    super(pos);
    this.layer = "ENTITY";
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].wallPattern.goal);
    this.sprite.position = pos;
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    /*固有*/
    this.isgoal = false;//??
    this.isUpdater = true;
  }
  Update(){
    if(__WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,__WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].player).isHit){
      /*ステージ遷移処理*/
      if(!this.isgoal){
        let g = new __WEBPACK_IMPORTED_MODULE_9__Event_gameClearEvent_js__["a" /* default */]();
        __WEBPACK_IMPORTED_MODULE_8__Event_eventmanager_js__["a" /* default */].eventList.push(g);
        this.isgoal = true;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Goal;



/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__timer_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__wall_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Effect_bulletShot_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Effect_blockDebris_js__ = __webpack_require__(92);













let EntityList = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].entityList;

//壊せる木箱
class WoodBox extends __WEBPACK_IMPORTED_MODULE_9__wall_js__["a" /* default */]{
  constructor(pos){
    super(pos,__WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].enemyPattern.woodbox[0]);
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.type = "WALL";
    this.name = "woodbox";
    this.isBreakable = true;//破壊可能
    this.isUpdater = true;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].wallPattern.steel.entity;
    this.spid = 3; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.hp = 1;
    /*フラグ*/
    this.isAlive = true;
  }
  //自分がダメージを食らう
  Damage(atkMax){
    this.hp += atkMax;
       __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlaySE("blockBreak");
  }

  Update(){
    this.sprite.position = this.pos;

    /*observer*/
    if(this.hp<=0){
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(this);
      let p = CPV(this.pos);
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_10__Effect_bulletShot_js__["a" /* default */](p,VEC0()));
      let v;
      for(let i = 0;i<2 ;i++){
        v = {
          x : Rand(1) + (2*i-1),//←と→に飛ばす
          y : -1-Rand(3)/5,
        }
        __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_11__Effect_blockDebris_js__["a" /* default */](p,v));
      }
     
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WoodBox;



/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(9);





//woodboxを壊した時の破片
class BlockDebris extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.name = "blockDebris";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
    this.gravity = 0.1;
    /*スプライト*/
    this.spid = 0; //12~15
    //this.pattern = Art.bulletPattern.blockDebris;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.blockDebris;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.rotation = Rand(2);
  }
  Physics(){
    this.vel.y += this.gravity;
    this.pos = ADV(this.pos,this.vel);
  }
  Update(){
    if(this.isAlive){
      this.Physics();
      this.sprite.position = ADV(this.pos.x,VECN(8));
      this.sprite.texture = this.pattern[this.spid];
      this.spid = Math.floor(this.frame/4)%4;
      if(this.frame >= 16){
        //消える時に一回だけ呼ばれる
        if(this.isAlive){
          __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
          this.isAlive = false
        }
      }
      this.sprite.position = ADV(this.pos,VECN(8));
      this.frame++;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BlockDebris;



/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_mapData_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wall_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__backEntity_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_bulletShot_js__ = __webpack_require__(25);











let EntityList = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].entityList;

//トゲ
class Needle extends __WEBPACK_IMPORTED_MODULE_7__wall_js__["a" /* default */]{
  constructor(pos,ID){
    super(pos,ID);
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */]({x:pos.x,y:pos.y},16,16));//衝突判定の形状
    this.name = "needle";
    this.layer = "ENTITY";
    this.isUpdater  =true;
    this.hp = 1;
    //wall parameter
    let wall = __WEBPACK_IMPORTED_MODULE_6__Stage_mapData_js__["a" /* default */].Tile(ID);
    this.isBreakable = wall.isBreakable;
    this.coltype = "none";
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].wallPattern.steel.entity;
    this.spid = 3; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(this.tex);//現在表示中のスプライト
    this.sprite.position = this.pos;
  }
  //自分がダメージを食らう
  Damage(atk){
    this.hp += atk;
  }

  //プレイヤーにダメージ
  Hurt(){
    let player = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player; 
    let c = __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,player);
    if(c.isHit){
      //ダメージ
      //速度が大きい程ダメージ大きい
      let v = player.vel.x * player.vel.x + player.vel.y * player.vel.y;
      //if(v >1){
        let damage = Math.floor(v) + 1;
        __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player.Damage(-damage);
      //}
      //反動
      //player.vel.y = -6 * c.n.y;
      //player.vel.x = -6 * c.n.x; 
    }
  }

  Update(){
    this.sprite.position = this.pos;

    this.Hurt()
    /*observer*/
    if(this.hp<=0){
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(this);
      let p = CPV(this.pos);
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_9__Effect_bulletShot_js__["a" /* default */](p,VEC0()));
      __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlaySE("blockBreak");
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Needle;



/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drawer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_mapData_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__gameClearEvent_js__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__FadeEvent_js__ = __webpack_require__(95);










/*タイトル画面からゲーム開始画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
class StartStageEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(){
    super(1);
    function* gen(){
      let frame = 0;
      __WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */].scene.PushSubState("TRANS");
      __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_8__FadeEvent_js__["a" /* default */]("fadeout"));
      __WEBPACK_IMPORTED_MODULE_6__audio_js__["a" /* default */].PlaySE("stageChange");
      while(frame < 50){
        frame++;
        yield;
      }
      //ここで非同期
      __WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */].scene.ChangeState(STATE.TITLE,STATE.STAGE);
      //Game.scene.PopSubState("TRANS");
      //Drawer.entityContainer.filters = [Drawer.testFilter];
      __WEBPACK_IMPORTED_MODULE_4__UI_uiManager_js__["a" /* default */].PopStage(); 
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StartStageEvent;



/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__drawer_js__ = __webpack_require__(9);








/*タイトル画面からゲーム開始画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
class FadeEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(type){
    super();//どうでもいい
    function* FadeOut(){
      let pattern = __WEBPACK_IMPORTED_MODULE_5__art_js__["a" /* default */].seqPattern;
      let seq = new Array(400);
      let spid = 0;
      let frame = 0;
      //♢を初期化して追加
      for(let i = 0; i < 400; i++) {
      let sp = __WEBPACK_IMPORTED_MODULE_5__art_js__["a" /* default */].SpriteFactory(pattern[spid]);
      let y = Math.floor(i/20);
      let x = i%20;
      sp.scale = VECN(2);
      sp.position.x = x*16-24;
      sp.position.y = y*16-24;
      seq[i] = sp;
      __WEBPACK_IMPORTED_MODULE_6__drawer_js__["a" /* default */].addContainer(sp,"FILTER");
    }
      /*フェードアウト*/
      while(frame < 40){
        for(let i = 0; i < 400; i++) {
          //上から下へ
          spid = Math.max(0,Math.min(Math.floor(frame - i/8),15));
          seq[i].texture = pattern[spid];
        }
        frame++;
        yield;
      }
      /*ここでマップをロード*/
      __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__["a" /* default */].DeleteStage();
      __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__["a" /* default */].CreateStage(__WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */].stage,"ENTER");

      /*マップデータを生成するのでちょっと待つ*/
      frame = 0;
      while(frame < 10){
        frame++;
        yield
      }
      /*フェードin*/
      __WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */].scene.PopSubState();
      while(frame < 40){
        for(let i = 0; i < 400; i++) {
          spid = 16 + Math.max(0,Math.min(Math.floor(frame -i/8),15));
          seq[i].texture = pattern[spid];
        }
        frame++;
        yield;
      }
      for(let i = 0; i < 400; i++) {
        __WEBPACK_IMPORTED_MODULE_6__drawer_js__["a" /* default */].removeContainer(seq[i],"FILTER");
      }
      yield;
    }

    let itt;
    itt = FadeOut();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FadeEvent;



/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__ = __webpack_require__(16);






/*初期状態タイトル画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
class StartGameEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(){
    super(1);
    function* gen(){
      __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlayBGM("title",0);
      __WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */].scene.ChangeState(STATE.INIT,STATE.TITLE);
      __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__["a" /* default */].DeleteStage();
      __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__["a" /* default */].CreateStage(0,"ENTER");
      yield ;
    }
    let itt = gen();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StartGameEvent;



/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(0);


 
class Scene{
  constructor(){
    this.state = STATE.INIT;
    this.substate = ["DEFAULT"];
  }

  ChangeState(oldState,newState){
    //UIのクリア
    __WEBPACK_IMPORTED_MODULE_0__UI_uiManager_js__["a" /* default */].Clean(); 
    switch(newState){
      /*ゲーム画面用 UIの作成*/
      case "TITLE" : __WEBPACK_IMPORTED_MODULE_0__UI_uiManager_js__["a" /* default */].SetTitle(); break;
      case "STAGE" : __WEBPACK_IMPORTED_MODULE_0__UI_uiManager_js__["a" /* default */].SetStage(); break;
    }
    this.state = newState;
  }

  PushSubState(sub){
    this.substate.push(sub);
  }
  PopSubState(){
    this.substate.pop();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scene;



/***/ })
/******/ ]);