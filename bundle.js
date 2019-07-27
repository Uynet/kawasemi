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
/******/ 	return __webpack_require__(__webpack_require__.s = 73);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_Effect_target_js__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timer_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(1);





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
      default : console.warn(entity);
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
        this.colliderList.remove(entity);
        break;
      case ENTITY.ENEMY :
        this.enemyList.remove(entity);
        this.colliderList.remove(entity);
        break;
      case ENTITY.WALL :
        this.wallList.remove(entity);
        this.colliderList.remove(entity);
        //this.SortWallList();
        break;
    }
    this.entityList.remove(entity);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drawer_js__ = __webpack_require__(5);



class Art{
  static Load(resources){
    this.test = PIXI.Texture.fromFrame('distance00.png'),
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
          weapon4 : PIXI.Texture.fromFrame('UI1B.png'),
          weapon5 : PIXI.Texture.fromFrame('UI1C.png'),
        },
        pop : {
          normal : PIXI.Texture.fromFrame('UI30.png'),
          missile : PIXI.Texture.fromFrame('UI31.png'),
          laser : PIXI.Texture.fromFrame('UI32.png'),
          weapon4 : PIXI.Texture.fromFrame('UI33.png'),
          weapon5 : PIXI.Texture.fromFrame('UI34.png'),
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
      trail : [ 
        PIXI.Texture.fromFrame('bullet60.png'),//bullet trail
        PIXI.Texture.fromFrame('bullet61.png'),
        PIXI.Texture.fromFrame('bullet62.png'),
        PIXI.Texture.fromFrame('bullet63.png'), 
        PIXI.Texture.fromFrame('bullet64.png'), 
        PIXI.Texture.fromFrame('bullet65.png') 
      ],
      trail2 : [ 
        PIXI.Texture.fromFrame('bulletF0.png'),//bullet trail
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
        fire : [
          PIXI.Texture.fromFrame('bulletA0.png'),
          PIXI.Texture.fromFrame('bulletA1.png'),
          PIXI.Texture.fromFrame('bulletA2.png'),
          PIXI.Texture.fromFrame('bulletA3.png'),
          PIXI.Texture.fromFrame('bulletA4.png'),
          PIXI.Texture.fromFrame('bulletA5.png'),
          PIXI.Texture.fromFrame('bulletA6.png'),
          PIXI.Texture.fromFrame('bulletA7.png'),
        ],
        stone : [PIXI.Texture.fromFrame('bulletB0.png')],
        smoke : [
          PIXI.Texture.fromFrame('bulletC0.png'),
          PIXI.Texture.fromFrame('bulletC1.png'),
          PIXI.Texture.fromFrame('bulletC2.png'),
          PIXI.Texture.fromFrame('bulletC3.png'),
          PIXI.Texture.fromFrame('bulletC4.png'),
          PIXI.Texture.fromFrame('bulletC5.png'),
          PIXI.Texture.fromFrame('bulletC6.png'),
          PIXI.Texture.fromFrame('bulletC7.png'),
        ],
        sonic :this.Frame("bullet",70,4),
      },
      buringFire : this.Frame("bullet" ,120 , 4 ),

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
      enemy2 :this.Frame("enemy",10,4),
      enemy3 : this.Frame("enemy",30,2),
      eBullet1 : this.Frame("enemy",40,4),
      enemy4 : this.Frame("enemy",50,2),
      enemy5 : this.Frame("enemy",60,2),
      eBullet2 : this.Frame("enemy",70,4),
      enemy6 : this.Frame("enemy",80,2),
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
        adapt : PIXI.Texture.fromFrame('wall72.png'),
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
        entity : this.Frame("wall",90,4),
        back : this.Frame("wall",94,4),
      },
      //背景
      backGround : [
        PIXI.Texture.fromImage("src/resource/img/BG0.png"),
        PIXI.Texture.fromImage("src/resource/img/BG1.png"),
        PIXI.Texture.fromImage("src/resource/img/BG2.png"),
      ],

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
    __WEBPACK_IMPORTED_MODULE_1__drawer_js__["a" /* default */].testFilter = new PIXI.Filter(null,resources.testShader.data , {
      time: { // 変数名
        type: '1f', // 型
        value: 300 // 初期値
      },
      x: { // 変数名
        type: '1f', // 型
        value: 0 // 初期値
      },
      y: { // 変数名
        type: '1f', // 型
        value: 0 // 初期値
      }
    });
    __WEBPACK_IMPORTED_MODULE_1__drawer_js__["a" /* default */].fireFilter = new PIXI.Filter(null,resources.fireShader.data , {
      frame: {
        type: '1f',
        value: 0 // 初期値
      }
    });


    //Drawer.smokeFilter =new PIXI.Filter(null,resources.smokeShader.data);
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
        .add('distance','src/resource/img/distance.json')
        .add('testShader', 'src/Shader/test.frag')
        .add('fireShader', 'src/Shader/fire.frag')
        //.add('smokeShader', 'src/Shader/smoke.frag')
        .load((loader,resources)=>Art.Load(resources)).onComplete.add(res)); }

  //pattern : str
  //start ,frames : int
  static Frame(pattern,start,frames){
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_js__ = __webpack_require__(11);


//サウンド管理
let source,buffer,gainNode;
class Audio{
  static Init(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.testLowPass = this.context.createBiquadFilter();
    this.testLowPass.type = 'lowpass';
    this.testLowPass.frequency.value = 22050;
    this.BGM = { } 
    this.SE = { }
    this.stack = [];
    this.time = __WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* default */].timer;
    this.lastSE;
    this.PlayingBGM = {
      name : null,
      source : null,
    }
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
  static async PlayBGM(name,gain){
    let buffer = this.BGM[name];
    source = this.context.createBufferSource(); // source を作成
    source.buffer = buffer; // buffer をセット
    //source.connect(this.context.destination); // context に connect
    //if(gain){
    let gainNode = this.context.createGain();
    source.loop = true;
    source.connect(gainNode);
    gainNode.connect(this.testLowPass);
    this.testLowPass.connect(this.context.destination);

    gainNode.gain.value = gain;
    //}

    this.PlayingBGM = {
      name : name,
      source : source,
    }
    source.start(0);
    return;
  };
  static LowPassFadeOutBGM(){
    let p = this.testLowPass.frequency.value;
    this.testLowPass.frequency.value= p-(p-440)*0.01;
  }
  static StopBGM(){
    this.PlayingBGM.source.stop();
    this.PlayingBGM = {
      name : null,
      source : null,
    }
  }
  static PlaySE(name,gain,pitch){
    //同じ効果音は同時にならないようにする
    if(__WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* default */].timer-this.time > 4|| name != this.lastSE){
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
  static Update(){
    if(this.isFadeout){
      this.LowPassFadeOutBGM();
    }
  };
  static Load() {
    return new Promise(res=>{
      this.Init();
      //!ココで読み込むnameはファイル名に統一すること!
      this.LoadBGM('stage4');
      this.LoadBGM('stage5');
      this.LoadBGM('stage6');
      this.LoadBGM('boss');
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
      this.LoadSE('bomb');//
      res();
    })
  };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Audio;
;


/***/ }),
/* 3 */
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
/* 4 */
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
    //console.assert(e1.e != undefined);
    if(e1.e === undefined)e1.e = 0;
    /*速度*/
    let l = Collision.on(e1,e2);
    if(l.n.x != 0) e1.vel.x = 0;
    if(l.n.y == -1) e1.vel.y =0;
    if(l.n.y == 1) e1.vel.y =0.1;//0にすると天井に張り付いてしまう
    //while(Collision.on(e1,e2).isHit){
      e1.pos.x += l.n.x*l.depth;
      e1.pos.y += l.n.y*(l.depth-0.1);//0にすると地上での着地判定がトグルしてしまう
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input_js__ = __webpack_require__(14);




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

    let Re = new PIXI.Rectangle(0,0,PIXI_WIDTH/2,PIXI_HEIGHT/2);
    this.renderTarget = new PIXI.Sprite();

    this.backGroundContainer = new PIXI.Container();//背景
    this.backContainer = new PIXI.Container();//backEntity
    this.entityContainer = new PIXI.Container();//Entity
    this.foreEntityContainer = new PIXI.Container();//手前に表示する 文字エフェクトなど
    this.foreContainer = new PIXI.Container();//手前に表示する 文字エフェクトなど
    this.filterContainer = new PIXI.Container();//画面遷移フィルター
    this.UIContainer = new PIXI.Container();//UI

    this.renderTarget.addChild(this.backGroundContainer);
    this.renderTarget.addChild(this.backContainer);
    this.renderTarget.addChild(this.entityContainer);
    this.renderTarget.addChild(this.foreEntityContainer);
    this.renderTarget.addChild(this.foreContainer);
    this.renderTarget.addChild(this.filterContainer);
    this.renderTarget.addChild(this.UIContainer);
    this.Stage.addChild(this.renderTarget);


    this.Renderer = new PIXI.autoDetectRenderer(PIXI_WIDTH,PIXI_HEIGHT);


    /*拡大率*/
    this.magnification = 3;
    this.backGroundContainer.scale.set(3);
    this.backContainer.scale.set(this.magnification);
    this.entityContainer.scale.set(this.magnification);
    this.UIContainer.scale.set(this.magnification);
    this.foreContainer.scale.set(this.magnification + 1);
    this.foreEntityContainer.scale.set(this.magnification);
    this.filterContainer.scale.set(this.magnification + 1);
    $("#pixiview").append(this.Renderer.view);

    //フィルタ
    this.blurFilter = new PIXI.filters.BlurFilter();
    this.blurFilter.blur = 2;
    this.noiseFilter = new PIXI.filters.NoiseFilter(0.5);
    this.outlineFilter = new PIXI.filters.NoiseFilter();

    //shderはなぜかartにある
    Drawer.Stage.filters = [Drawer.testFilter];
    
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
  static removeContainer(sprite,container){
    switch (container){
      case "UI" : this.UIContainer.removeChild(sprite); break;
      case "ENTITY": this.entityContainer.removeChild(sprite); break;
      case "FILTER": this.filterContainer.removeChild(sprite); break;
      case "FORE": this.foreContainer.removeChild(sprite); break;
      case "FOREENTITY": this.foreEntityContainer.removeChild(sprite); break;
      case "BACK": this.backContainer.removeChild(sprite); break;
      case "BG": this.backGroundContainer.removeChild(sprite); break;
      default : console.warn(container);
    }
  }

  static SetMap(x,y){
    this.mapSize.width = x;
    this.mapSize.height = y;
  }

  /* プレイヤー中心にスクロール*/
  static ScrollOn(pos){
    //this.renderTarget.anchor.x = 0.5;
    //this.renderTarget.anchor.y = 0.5;
    //this.renderTarget.rotation = Math.PI + Math.sin(Timer.timer/100)*0.1;
    centerX = clamp(
      this.magnification*(-pos.x-8)+PIXI_WIDTH/2,
      this.magnification*(-this.mapSize.width*16) + PIXI_WIDTH,
      0
    );
    centerY = clamp(
      //8ブロックぶん上げる
      this.magnification*(-pos.y-8) + PIXI_HEIGHT/2,
      this.magnification*(-this.mapSize.height*16) + PIXI_HEIGHT,
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
    centerX = BET(
      this.magnification*(-this.mapSize.width*16) + PIXI_WIDTH,
      this.magnification*(-pos.x-8)+PIXI_WIDTH/2,
      0
    );
    centerY = BET(
      //8ブロックぶん上げる
      this.magnification*(-this.mapSize.height*16) + PIXI_HEIGHT,
      this.magnification*(-pos.y-8) + PIXI_HEIGHT/2,
      0
    );
    centerX = clamp(
      this.magnification*(-pos.x-8)+PIXI_WIDTH/2,
      this.magnification*(-this.mapSize.width*16) + PIXI_WIDTH,
      0
    );
    centerY = clamp(
      //8ブロックぶん上げる
      this.magnification*(-pos.y-8) + PIXI_HEIGHT/2,
      this.magnification*(-this.mapSize.height*16) + PIXI_HEIGHT,
      0
    );
    this.backContainer.x = Math.floor(centerX);
    this.backContainer.y = Math.floor(centerY);
    this.entityContainer.x = Math.floor(centerX);
    this.entityContainer.y = Math.floor(centerY);
    this.foreEntityContainer.x = Math.floor(centerX);
    this.foreEntityContainer.y = Math.floor(centerY);
    this.foreContainer.x = Math.floor(centerX);
    this.foreContainer.y = Math.floor(centerY);
  }
  //フィルタ
  static SetFilter(filters){
    Drawer.renderTarget.filters = filters;
  }
  static Dist(){
    let extract = this.Renderer.plugins.extract;
    let canvas = extract.canvas();
    const distContext = canvas.getContext("webgl");
    var rgba = context.getImageData(p.x, p.y, 1, 1).data;
  }
  static Quake(diff){
    this.Stage.x = Math.floor(diff.x);
    this.Stage.y = Math.floor(diff.y);
  }
  static QuakeRot(arg){
    this.renderTarget.anchor.set(0.5);
    this.renderTarget.rotation = arg;
  }
  static SetMagnification(magnification){
    this.magnification = magnification;
    this.backGroundContainer.scale.set(3);
    this.backContainer.scale.set(this.magnification);
    this.entityContainer.scale.set(this.magnification);
    this.UIContainer.scale.set(this.magnification);
    this.foreContainer.scale.set(this.magnification + 1);
    this.foreEntityContainer.scale.set(this.magnification);
    this.filterContainer.scale.set(this.magnification + 1);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Drawer;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stagePop_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gaugeHP_js__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gaugeBossHP_js__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__gaugeBullet_js__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__WeaponList_js__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__font_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__message_js__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__menu_js__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__score_js__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__timer_js__ = __webpack_require__(23);
















//BossHP
const P_BossHP = {
  x : 4, 
  y : 180
};
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
  x : 208,
  y : P_HP.y + 8, 
}
//message
const P_MES = {
  x:8,
  y:132,
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
    this.BossHP;
    this.bullet;
    this.wlistk
    this.score;
    this.message;
    this.menu;
  }
  static PopStage(stage){
    let p = {
      x : 96,
      y : 72
    }
    switch(__WEBPACK_IMPORTED_MODULE_13__game_js__["a" /* default */].stage){
      case 11: UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_3__stagePop_js__["a" /* default */](p,"^- こんてぃにゅーぽいんと -$" ,));
        break;
      case 12: break;
      default : UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_3__stagePop_js__["a" /* default */](p,"^-すてーじ "+__WEBPACK_IMPORTED_MODULE_13__game_js__["a" /* default */].stage+"-$"));//SCORE
    }
  }

  //call by startbossBattleEvent
  static SetBoss(){
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_5__gaugeBossHP_js__["a" /* default */](P_BossHP));//HP
  }

  /*タイトルでのUI配置に変更*/
  static SetTitle(){
    let p1 = {
      x : 96, 
      y : 64,
    }
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_8__font_js__["a" /* default */](p1,"さいはてどろっぷ","MES"));//SCORE
    let p2 = {
      x : p1.x, 
      y : p1.y+10,
    }
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_8__font_js__["a" /* default */](p2,"- ver0.2 -","MES"));//SCORE
    let p3 = {
      x : p1.x-8, 
      y : p2.y+48,
    }
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_8__font_js__["a" /* default */](p3,"Press Any Key","MES"));//SCORE
    let p4 = {
      x : 172, 
      y : 192,
    }
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_8__font_js__["a" /* default */](p4,"+ 2018 uynet","MES"));//SCORE
  }
  /*ステージ中でのUI配置に変更*/
  static SetStage(){
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_4__gaugeHP_js__["a" /* default */](P_HP));//HP
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_6__gaugeBullet_js__["a" /* default */](P_BUL));//BULLET
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_7__WeaponList_js__["a" /* default */](P_BUL));//WList;
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_11__score_js__["a" /* default */](P_SCORE));//SCORE
  }
  //メニューを開く
  static SetMenu(){
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].SetFilter([__WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].testFilter]);
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_10__menu_js__["a" /* default */](ADV(P_MENU,VECY(16))));
  }
  //UIをすべて削除
  static Clean(){
    while(this.UIList.length>0){
      this.removeUI(this.UIList[0]);
    }
    let filters = [];
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].SetFilter(filters);
  }
  //メッセージイベント
  /* text : 入力文字列
   * sentence : textを改行文字で区切った配列
   */
  static PopMessage(signboard){
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_9__message_js__["a" /* default */](P_MES,signboard));//枠
  }

  //UIをリストに登録
  static addUI(ui){
    let layer = ui.layer;
    if(!layer)layer = "UI";

    this.UIList.push(ui); 
    switch (ui.type){
      case "HP" : this.HP = ui; break;
      case "BULLET" : this.bullet = ui; break;
      case "BossHP" : this.BossHP = ui; break;
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
    
    this.UIList.remove(ui)
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//パラメータ管理クラス
class Param{
  static Init(){
    this.player = {
      //プレイ中ステータス
      jumpVel : 6.2,//ジャンプ力
      runVel : 0.3,//はしり速度
      gravity : 0.26,
      maxHp : 30,
      maxBullet : 100,
      fliction : 0.7,
      invTime : 150,//無敵時間
      status : {
        hp : 30,
        bullet : 100,
      },
      
      animRun : 4,
      animWait : 11,
      score : 0,

      vxMax : 3,
      vyMax : 7,
      //手に入れた武器の情報
      havingWeaponList : {
        normal : true,
        missile :true,//false,
        laser : true,//false,
        weapon4 : true,//
        weapon5 : false,
      },
      //装備中の武器
      equip : "normal",
    }
    this.enemy1 = {
      hp : 500,
      atkMax : 10000,
      atkMin : 1,
      gravity : 0.030,
      coin : 15
    }
    this.enemy2 = {
      hp : 10,
      atkMax : 5,
      atkMin : 1,
      gravity : 0.0,
      coin : 4
    }
    this.enemy3 = {
      hp : 5,
      atkMax : 4,
      atkMin : 1,
      gravity : 0,
      range : 80,
      coin : 3
    }
    this.enemy4 = {
      hp : 5,
      atkMax : 3,
      atkMin : 2,
      gravity : 0.2,
      coin : 2
    }
    this.enemy5 = {
      hp : 5,
      atkMax : 3,
      atkMin : 1,
      gravity : 0,
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
      atkMin : 2,
      atkMax : 4,
    }
    this.eBullet2 = {
      hp : 1,
      atkMin : 5,
      atkMax : 10,
      gravity : 0.05
    }
    this.weapon1 = {
      //status
      agi : 25,
      cost : 6,
      speed : 8, 
      length : 280,
      remain : 180,
      //optional
      isTarget : true,
      isHorming : true,
      isLasersight : false,
    }
    this.weapon2 = {
      agi : 25,
      cost : 10,
      length : 300,
      //optional
      isTarget : true,
     // isHorming : false,
      isLasersight : true,
    }
    //normal
    this.weapon3 = {
      agi : 7,
      cost : 3,
      speed : 6, 
      length : 150,
      //optional
      isTarget : true,
     // isHorming : false,
      isLasersight : false,
    }
    //??
    this.weapon4 = {
      agi : 1,
      cost : 1,
      speed : 4, 
      length : 400,
      //optional
      isTarget : true,
     // isHorming : false,
      isLasersight : false,
    }
    //??
    this.weapon5 = {
      agi : 300,
      cost : 1,
      speed : 1, 
      length : 300,
      //optional
      isTarget : true,
     // isHorming : false,
      isLasersight : false,
    }
    //Missile
    this.bullet1 = {
      atkMax : 15,
      atkMin : 8,
      hp : 1,
      curve : 0.2
    }
    //Laser
    this.bullet2 = {
      atkMax : 20,
      atkMin : 15,
      hp : 99999,
    }
    //normal
    this.bullet3 = {
      atkMax : 5,
      atkMin : 3,
      hp : 1,
      curve : 0.2,
      deleteFrameCount : 180,//残存時間
    }
    this.bullet4 = {
      atkMax : 1,
      atkMin : 1,
      hp : 10,
      curve : 0.2
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Param;



/***/ }),
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(17);


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Event_startStageEvent_js__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Event_startGameEvent_js__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event_scene_js__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__UI_font_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Weapon_weaponManager_js__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__input_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__timer_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__UI_menu_js__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Stage_stageData_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__Stage_distanceField_js__ = __webpack_require__(71);




















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
    __WEBPACK_IMPORTED_MODULE_17__Stage_stageData_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_18__Stage_distanceField_js__["a" /* default */].Init();

    /*initialize Game state*/
    //現在のステージ番号
    if(Game.debug) Game.stage = 3
    else Game.stage = 1;
    Game.continuePoint = 1;//コンティニュー地点

    Game.scene = new __WEBPACK_IMPORTED_MODULE_6__Event_scene_js__["a" /* default */]();

    //Gameにタイトル画面状態をプッシュ
    let event = new __WEBPACK_IMPORTED_MODULE_5__Event_startGameEvent_js__["a" /* default */]();
    __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__["a" /* default */].PushEvent(event);

    Game.Run();
  }

  static async Load(){
    Game.debug=true;//デバッグモード
    //Game.debug=false;

    await __WEBPACK_IMPORTED_MODULE_10__art_js__["a" /* default */].LoadTexture();
    __WEBPACK_IMPORTED_MODULE_16__audio_js__["a" /* default */].Load();

    const po = ()=>{
      Game.Init();
      let a = document.getElementById("po");
      a.parentNode.removeChild(a);
    }
    let b = document.getElementById("screen");

    if(!Game.debug) setTimeout(po,2500);//直せ
    else po();

    __WEBPACK_IMPORTED_MODULE_12__input_js__["a" /* default */].returnScroll();//スクロール解除
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
    __WEBPACK_IMPORTED_MODULE_16__audio_js__["a" /* default */].Update();
    __WEBPACK_IMPORTED_MODULE_13__timer_js__["a" /* default */].IncTime();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;




/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_Effect_Explosion_stone_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_Effect_Explosion_smoke_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entity_Effect_Explosion_fire_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Entity_Bullet_bullet1_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Entity_AI_horming_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Entity_AI_bullet1AI_js__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Entity_Effect_Explosion_sonic_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Entity_Effect_Explosion_flash_js__ = __webpack_require__(43);












/*Object Pool*/
class Pool{
  static Init(){
    this.unused = {
      stones : [],
      smokes : [],
      fires : [],
      sonics : [],
      flashes : [],
    }
    for(let i = 0;i<1000;i++){
      this.unused.stones.push(new __WEBPACK_IMPORTED_MODULE_1__Entity_Effect_Explosion_stone_js__["a" /* default */](VEC0(),VEC0()));
    }
    for(let i = 0;i<80;i++){
      this.unused.smokes.push(new __WEBPACK_IMPORTED_MODULE_2__Entity_Effect_Explosion_smoke_js__["a" /* default */](VEC0(),VEC0(),0));
    }
    for(let i = 0;i<100;i++){
      this.unused.fires.push(new __WEBPACK_IMPORTED_MODULE_3__Entity_Effect_Explosion_fire_js__["a" /* default */](VEC0(),VEC0()));
    }
    for(let i = 0;i<50;i++){
      this.unused.sonics.push(new __WEBPACK_IMPORTED_MODULE_10__Entity_Effect_Explosion_sonic_js__["a" /* default */](VEC0()));
    }
    for(let i = 0;i<50;i++){
      this.unused.flashes.push(new __WEBPACK_IMPORTED_MODULE_11__Entity_Effect_Explosion_flash_js__["a" /* default */](VEC0()));
    }
  }
  static Remove(s){
    let listname;
    switch(s.name){
      case "fire" : this.unused.fires.push(s);break;
      case "stone" : this.unused.stones.push(s);break;
      case "smoke" :  this.unused.smokes.push(s);break;
      case "sonic" : this.unused.sonics.push(s);break;
      case "flash" : this.unused.flashes.push(s);break;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drawer_js__ = __webpack_require__(5);




/*タイトル画面からゲーム開始画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
class QuakeEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(size,time,isRot){
    //undefined
    if(time>=1 || !time) {
      console.warn("invalid time : " + time);
      time = 0.9
    };
    super(1);
    function* gen(){
      if(isRot){
        let frame = 0;
        let arg;
        while(frame < 200){
          arg = Math.sin(frame*0.1)*Math.exp(-frame*0.1)*0.4;
          __WEBPACK_IMPORTED_MODULE_2__drawer_js__["a" /* default */].QuakeRot(arg);
          frame++;
          yield ;
        }
        __WEBPACK_IMPORTED_MODULE_2__drawer_js__["a" /* default */].Stage.x = 0;
        __WEBPACK_IMPORTED_MODULE_2__drawer_js__["a" /* default */].Stage.y = 0;
        yield ;
      }
      else { 
        let frame = 0;
        let d;
        while(size > 0.1){
          d = Rand2D(size);
          __WEBPACK_IMPORTED_MODULE_2__drawer_js__["a" /* default */].Quake(d);
          size *= time;
          frame++;
          yield ;
        }
        __WEBPACK_IMPORTED_MODULE_2__drawer_js__["a" /* default */].Stage.x = 0;
        __WEBPACK_IMPORTED_MODULE_2__drawer_js__["a" /* default */].Stage.y = 0;
        yield ;
      }
    }
    let itt = gen();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = QuakeEvent;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_js__ = __webpack_require__(23);


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
  static VirtualKeyDown(key){
    inputedKeyList[key] = true;
  }
  static VirtualKeyUp(key){
    inputedKeyList[key] = false;
  }
  static isAnyKeyClick(){
    return anyKeyPress;
  }
  //スクロール禁止用関数
  static noScroll(){
    //PC用
    const scroll_event = 
      'onwheel' in document ? 'wheel' :
      'onmousewheel' in document ? 'mousewheel' :
      'DOMMouseScroll';
    $(document).on(scroll_event,e=>{e.preventDefault();});
    //SP用
    $(document).on('touchmove.noScroll',e=>{e.preventDefault();});
  }
  //スクロール復活用関数
  static returnScroll(){
    //PC用
    const scroll_event =
    'onwheel' in document ? 'wheel' :
    'onmousewheel' in document ? 'mousewheel' :
    'DOMMouseScroll';
    $(document).off(scroll_event);
    //SP用
    $(document).off('.noScroll');
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(8);





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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stageData_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_entity_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entity_wall_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Entity_backEntity_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Entity_backGround_js__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Entity_Mover_signboard_js__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Entity_Mover_shop_js__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Entity_Mover_player_js__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Entity_Enemy_enemy1_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Entity_Enemy_enemy2_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Entity_Enemy_enemy3_js__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Entity_Enemy_enemy4_js__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Entity_Enemy_enemy5_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Entity_Enemy_enemy6_js__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Entity_Mover_goal_js__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Entity_Mover_woodbox_js__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__Entity_Mover_needle_js__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__stageGen_js__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pool_js__ = __webpack_require__(12);
























/*マップデータ*/

let wallTileInfo = {
  outer : [52,53,54,60,61,62,68,69,70],
  inner : [67,65,51,49],
  ID : 58,
}
let backTileInfo = {
  outer : [28,29,30,36,37,38,44,45,46],
  inner : [43,41,27,25],
  ID : 34,
}

class MapData{
  constructor(){
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
        __WEBPACK_IMPORTED_MODULE_19__drawer_js__["a" /* default */].SetMap(this.width,this.height);
        resolve();
      }
      xhr.send(null);
      this.stageNo = stageNo;
    });
  }
  //周囲8マスのステージ壁の有無
  static GetIsAdjacent(layer,x,y,tileInfo){
    /*
     * [0,1,2,
     *  3,4,5,
     *  6,7,8]
     * */
     const adaptiveWallID = tileInfo.ID;//...ステージ壁 
     let adj =  [ 
      (adaptiveWallID == (this[layer][this.width*(y-1) + (x-1)]-1)),
      (adaptiveWallID == (this[layer][this.width*(y-1) + (x+0)]-1)),
      (adaptiveWallID == (this[layer][this.width*(y-1) + (x+1)]-1)),
      (adaptiveWallID == (this[layer][this.width*(y+0) + (x-1)]-1)),
      true,
      (adaptiveWallID == (this[layer][this.width*(y+0) + (x+1)]-1)),
      (adaptiveWallID == (this[layer][this.width*(y+1) + (x-1)]-1)),
      (adaptiveWallID == (this[layer][this.width*(y+1) + (x+0)]-1)),
      (adaptiveWallID == (this[layer][this.width*(y+1) + (x+1)]-1)),
     ];
     if(x == 0){
       adj[0] = true;
       adj[3] = true;
       adj[6] = true;
     }
     if(x == this.width-1){
       adj[2] = true;
       adj[5] = true;
       adj[8] = true;
     }
     if(y == 0){
       adj[0] = true;
       adj[1] = true;
       adj[2] = true;
     }
     if(y == this.height-1){
       adj[6] = true;
       adj[7] = true;
       adj[8] = true;
     }

     return adj;
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
        let p = {x:16*x,y:16*y};//座標を変換
        switch(wallTiletype[ID].type){
          case TILE.WALL :
            switch(wallTiletype[ID].name){
              case "woodbox" : entity = new __WEBPACK_IMPORTED_MODULE_20__Entity_Mover_woodbox_js__["a" /* default */](p);break;
              case "needle" : entity = new __WEBPACK_IMPORTED_MODULE_21__Entity_Mover_needle_js__["a" /* default */](p,this.WallData(ID,layer,x,y));break;
              default : entity = new __WEBPACK_IMPORTED_MODULE_3__Entity_wall_js__["a" /* default */](p,this.WallData(ID,layer,x,y));
            }
            break;
          case TILE.BACK :
            entity = new __WEBPACK_IMPORTED_MODULE_4__Entity_backEntity_js__["a" /* default */](p,this.WallData(ID,layer,x,y));
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
          case 161 :
            obj = new __WEBPACK_IMPORTED_MODULE_8__Entity_Mover_player_js__["a" /* default */](p); 
            obj.SetStatus();
            break;
          case 162 :
            message = this.objData[i].properties;
            obj = new __WEBPACK_IMPORTED_MODULE_6__Entity_Mover_signboard_js__["a" /* default */](p,message,"signboard");
            break;
          case 163 : obj = new __WEBPACK_IMPORTED_MODULE_15__Entity_Mover_goal_js__["a" /* default */](p); break;
          case 164 :
            //直せ
            message = this.objData[i].properties;
            obj = new __WEBPACK_IMPORTED_MODULE_6__Entity_Mover_signboard_js__["a" /* default */](p,message,"shop");
            break;
          case 169 : obj = new __WEBPACK_IMPORTED_MODULE_9__Entity_Enemy_enemy1_js__["a" /* default */](p); break;
          case 170 : obj = new __WEBPACK_IMPORTED_MODULE_10__Entity_Enemy_enemy2_js__["a" /* default */](p); break;
          case 171 : obj = new __WEBPACK_IMPORTED_MODULE_11__Entity_Enemy_enemy3_js__["a" /* default */](p); break;
          case 172 : obj = new __WEBPACK_IMPORTED_MODULE_12__Entity_Enemy_enemy4_js__["a" /* default */](p); break;
          case 173 : obj = new __WEBPACK_IMPORTED_MODULE_13__Entity_Enemy_enemy5_js__["a" /* default */](p); break;
          case 174 : obj = new __WEBPACK_IMPORTED_MODULE_14__Entity_Enemy_enemy6_js__["a" /* default */](p); break;
      }
        __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(obj);
    }
  }
  /* state 
   * ENTER : 新しいステージに入った時
   * RESET : 死んでやり直す時
   */
  static async CreateStage(stageNo,state){
    //BGM再生
    if(__WEBPACK_IMPORTED_MODULE_18__audio_js__["a" /* default */].PlayingBGM.name!=__WEBPACK_IMPORTED_MODULE_1__stageData_js__["a" /* default */].StageBGM[stageNo])__WEBPACK_IMPORTED_MODULE_18__audio_js__["a" /* default */].PlayBGM(__WEBPACK_IMPORTED_MODULE_1__stageData_js__["a" /* default */].StageBGM[stageNo],1.0);
    await this.Load(stageNo);
    //背景の生成
    let BG = __WEBPACK_IMPORTED_MODULE_1__stageData_js__["a" /* default */].StageBackGround[stageNo];
    this.AddBackGround(BG);
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
    __WEBPACK_IMPORTED_MODULE_19__drawer_js__["a" /* default */].ScrollSet(p);
  }

  /*マップデータを消して作り直す*/
  static RebuildStage(){
    MapData.DeleteStage();
    let state = "RESET";
    MapData.CreateStage(__WEBPACK_IMPORTED_MODULE_16__game_js__["a" /* default */].stage,state);
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
          __WEBPACK_IMPORTED_MODULE_23__pool_js__["a" /* default */].Remove(__WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].entityList[0]);
          break;
        default:
          __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].removeEntity(__WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].entityList[0]);
      }
    }
    __WEBPACK_IMPORTED_MODULE_22__stageGen_js__["a" /* default */].Init();
  }
  static MapToWorldPos(x,y){
    return new Vec2(16*x , 16*y);
  }
  //壁タイルの対応
  //タイルIDを渡すとテクスチャを返す
  static WallData(i,layer,x,y){
    //エイリアス
    let wall = __WEBPACK_IMPORTED_MODULE_17__art_js__["a" /* default */].wallPattern;
    let adaptive = __WEBPACK_IMPORTED_MODULE_17__art_js__["a" /* default */].wallPattern.edge.adapt;
    let out = __WEBPACK_IMPORTED_MODULE_17__art_js__["a" /* default */].wallPattern.edge.out;
    let inner = __WEBPACK_IMPORTED_MODULE_17__art_js__["a" /* default */].wallPattern.edge.inner;
    let backOut = __WEBPACK_IMPORTED_MODULE_17__art_js__["a" /* default */].wallPattern.edge.back.out;
    let backInner = __WEBPACK_IMPORTED_MODULE_17__art_js__["a" /* default */].wallPattern.edge.back.inner;
    let steel = __WEBPACK_IMPORTED_MODULE_17__art_js__["a" /* default */].wallPattern.steel;
    let needle = __WEBPACK_IMPORTED_MODULE_17__art_js__["a" /* default */].wallPattern.needle;
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
      //adaptive wall
      case 58 : return this.WallData(this.AdaptMap(layer,x,y,wallTileInfo));break;
      //adaptive wall
      case 34 : return this.WallData(this.AdaptMap(layer,x,y,backTileInfo));break;
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
  //エッジを自動的にいい感じに対応させるやつ
  //IDが帰ってくる
  static AdaptMap(layer,x,y,tileInfo){
    /* 隣接項
     * 0 1 2
     * 3 4 5 < 4は自分なので冗長であるが入れている
     * 6 7 8
     * */
    let adj = this.GetIsAdjacent(layer,x,y,tileInfo);
    /* 外枠(非背景)のTiled上のID
     * 0 1 2
     * 3 4 5
     * 6 7 8
     * */
    // 外側の辺
    // 上
    if(!adj[1]){
      if(!adj[3]) return tileInfo.outer[0];//左上
      if(!adj[5]) return tileInfo.outer[2];//右上
      else return tileInfo.outer[1];//真上
    }
    // 下
    if(!adj[7]){
      if(!adj[3]) return tileInfo.outer[6]; //左下
      if(!adj[5]) return tileInfo.outer[8]; //右下
      else return  tileInfo.outer[7]; //ました
    }
    //左
    if(!adj[3]) return tileInfo.outer[3];
    //右
    if(!adj[5]) return tileInfo.outer[5];

    /* 内枠(非背景)のTiled上のID
     * 01
     * 23
     * */

    // 内側
    if(adj[1] &&adj[3]&&adj[5] &&adj[7]){
      if(!adj[0]) return tileInfo.inner[0];//左上
      if(!adj[2]) return tileInfo.inner[1];//
      if(!adj[6]) return tileInfo.inner[2];//
      if(!adj[8]) return tileInfo.inner[3];//
      return tileInfo.outer[4]　//中央

    };
    console.error("invalid tile");
  }

  //背景を追加
  static AddBackGround(BG){
    let back;
    let w = 24;
    let h = 16;
    for(let y = 0;y<h;y++){
      for(let x = 0;x<w;x++){
        let tex = __WEBPACK_IMPORTED_MODULE_17__art_js__["a" /* default */].wallPattern.backGround[BG];
        let p = {
          x : (x - w/2)*32,
          y : (y - h/2)*32
        }
        __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_5__Entity_backGround_js__["a" /* default */](CPV(p),tex));
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MapData;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_box_js__ = __webpack_require__(8);



class Entity{
  constructor(pos,vel){
    /*phys*/
    this.pos = pos;
    this.vel = vel;
    this.acc = VEC0();
    this.gravity;
    this.size = 16;
    //this.e = 0.9;
    /*standard*/
    this.frame = 0;
    this.spid = 0;
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
    this.AIList = [];
  }
  /*common*/
  Physics(){};
  Collision(){};
  Update(){};
  Set(param , value){
    this[param] = value;
  }
  SetSize(size){
    this.size = size;
    this.sprite.scale.set(this.size/16);
    this.collider = new __WEBPACK_IMPORTED_MODULE_0__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_1__Collision_box_js__["a" /* default */](this.pos,this.size,this.size));//衝突判定の形状
  }
  AddForce(f){
    this.force.x = f.x;
    this.force.y = f.y;
  }
  ExecuteAI(){
    for (let AI of this.AIList){
      AI.Do();
    }
  }
  Delete(){
    EntityManager.removeEntity(this);
  }
  /*Hurt()*/
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Entity;





/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stone2_js__ = __webpack_require__(41);







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
    let sonic = __WEBPACK_IMPORTED_MODULE_4__Stage_pool_js__["a" /* default */].GetSonic(this.pos,VEC0());
    if(sonic!==false)__WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(sonic);
    //stone(というか火花?)
    for(let i = 0;i<14;i++){
      let arg = Rand(Math.PI);
      let v = POV(arg,8);
      let stone2 = new __WEBPACK_IMPORTED_MODULE_5__stone2_js__["a" /* default */](CPV(this.pos),v);
      __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(stone2);
    }
    //smoke
    for(let i = 0;i<8;i++){
      let arg = Rand(Math.PI);
      let v = POV(arg,Rand(3));
      let smoke = __WEBPACK_IMPORTED_MODULE_4__Stage_pool_js__["a" /* default */].GetSmoke(CPV(this.pos),v,2+Rand(1));
      if(smoke!== false)__WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(smoke);
    }
    for(let i =0;i<3;i++){
      let v = Rand2D(24);
      let p = ADV(v,this.pos);
      let fire = __WEBPACK_IMPORTED_MODULE_4__Stage_pool_js__["a" /* default */].GetFire(p,VEC0());
      if(fire!== false)__WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(fire);
    }
    for(let i =0;i<3;i++){
      let p = ADV(this.pos,Rand2D(16));
      let flash = __WEBPACK_IMPORTED_MODULE_4__Stage_pool_js__["a" /* default */].GetFlash(this.pos,VEC0());
      if(flash!== false)__WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(flash);
    }
  }
  Collision(){
    for(let l of __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].enemyList){
      if(DIST(this.pos,l.pos) < 32){
        l.Damage(-RandBET(5,8));
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      };
    }
    for(let w of __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].wallList){
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
    if(this.frame == 0){
      this.Bomb();
      this.Collision();
    }
    if(this.frame > 300) __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Explosion1;



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(14);




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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);







class Bullet extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  SetSprite(){
    this.spid = 0;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
  }
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.layer = "ENTITY";
    this.isMultiple = false;
    this.type = "MOVER";

    this.isUpdater  =true;
    this.AIList = [];
  }
  Update(){
    this.ExecuteAI();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class UI{
  constructor(pos){
    this.pos = pos;
    this.sprite;
    this.type;//enum
    this.isMultiple = false;
    this.isUpdater = true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UI;




/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Timer{
  static Init(){
    this.timer = 0;
    this.timeScale = 1.0;
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Mover_coin_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_Explosion_explosion2_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_Explosion_explosion3_js__ = __webpack_require__(35);











class Enemy extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.size = 16;
    this.type = ENTITY.ENEMY;
    this.isUpdater = true;
    this.colType = "through";
    this.material = "wall";
    this.frame = 0;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    /*固有情報*/
    this.AIList = [];//AIの配列
    /*レイヤー*/
    this.layer = "ENTITY";
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
    this.force = VEC0();
  }
  addAI(AI){
    this.AIList.push(AI);
  }
  //自分がダメージを食らう
  Damage(atk){
    __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlaySE("enemyDamage",-0.7);
    this.hp += atk;
    //ダメージをポップ
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_5__Effect_fontEffect_js__["a" /* default */](this.pos,-atk+"","enemy"));
  }
  //プレイヤーにダメージを与える
  Hurt(){
    let player = __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].player; 
    let c = __WEBPACK_IMPORTED_MODULE_6__Collision_collision_js__["a" /* default */].on(this,player);
    if(c.isHit && c.n.y != 1){
      //ダメージ
      let damage = RandBET(this.atkMin,this.atkMax);
      if(!player.isInvincible)player.Damage(-damage);
    }
    //プレイヤーに衝突応答
  }
  //しぬ
  Die(){
    this.isAlive = false;
      //死ぬ時にコイン
      for(let i = 0;i<this.coin;i++){
        __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_7__Mover_coin_js__["a" /* default */]({x:this.pos.x,y:this.pos.y}));
      }
      __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_4__Event_quakeEvent_js__["a" /* default */](15,0.4));//ゆれ
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_9__Effect_Explosion_explosion3_js__["a" /* default */](this.pos));
  }
  Physics(){
    if(this.floor.on){
      this.pos.x += this.floor.under.vel.x;
      //this.pos.y += this.floor.under.vel.y;
    }
    if(this.gravity)this.acc.y += this.gravity;

    this.acc.x += this.force.x;
    this.acc.y += this.force.y;
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
  SetParam(param){
    Object.keys(param).forEach(key=>{
      this[key]=param[key];
    })
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy;



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);





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
      if(stone!==false)__WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(stone);
    }
    /*smoke*/
    for(let j = 0;j<6;j++){
      let v = {
        x : Rand(4),
        y : Rand(1)
      }
      let smoke = __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].GetSmoke(CPV(this.pos),v,1 + Rand(0.2)); 
      if(smoke!==false)__WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(smoke);
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
/* 26 */
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(4);



class Animator{
  constructor(entity,isLoop,term,frames){
    this.entity = entity;
    this.isLoop = isLoop;
    this.animTerm = term;
    this.animFrames = frames;
  }
  Do(){
    if(this.entity.frame%this.animTerm == this.animTerm-1){
      this.entity.sprite.texture = this.entity.pattern[this.entity.spid];
      if(this.isLoop) this.entity.spid = (this.entity.spid+1)%this.animFrames;
      else this.entity.spid = Math.min(this.entity.spid+1,this.animFrames-1);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Animator;



/***/ }),
/* 28 */
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(5);





class Lasersight extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,arg){
    super(pos,VEC0());
    /*基本情報*/
    this.name = "lasersight";
    this.layer = "BACK";
    this.arg = arg;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.lasersight;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.x = 1;
    this.sprite.aplha = 0.05;
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }
  Rotate(player,weapon){
    this.arg = player.arg;
    this.pos = CPV(ADV(player.pos,POV(player.arg,8)));
    if(weapon.isTargetOn && Math.abs(player.arg - player.toArg < 5)){
      this.sprite.scale.x = DIST(weapon.target.enemy.pos,player.pos)/16 -0.5;
    }else this.sprite.scale.x = 16;
  }
  Update(){
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.position.x -= 4;
    this.sprite.position = ADV(this.sprite.position,POV(this.arg,8*this.sprite.scale.x));
    this.sprite.rotation = this.arg;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Lasersight;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_circle_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_mapData_js__ = __webpack_require__(16);








//背景オブジェクト 何もしない
class BackEntity extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos,wall){
    super(pos,VEC0());
    this.isUpdater = false;
    this.colType = "none";
    this.tex = wall.texture;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.tex);
    this.sprite.position = pos;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BackEntity;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__input_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__font_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__game_js__ = __webpack_require__(11);










class StagePop extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos,text,interval){
    //interval ... 文字の出る速さ
    super(pos);
    if(!interval){
      this.interval = 3;
    }else{
      this.interval = interval;
    }
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "PUSH";
    this.isMultiple = true;
    pos.x -= (text.length)*8/2;
    this.pos = pos;
    this.frame = 0;
    //文字
    this.i = 0;
    this.text = text;
    this.d = this.text.length;
    this.textObject = new __WEBPACK_IMPORTED_MODULE_6__font_js__["a" /* default */](pos,"","MES");
    //スプライト
    this.spid = 0;
    this.container = new PIXI.Container();
    //text
    this.container.addChild(this.textObject.container);
    this.diff = 0;//文字のズレ
  }

  //1文字ずつ出ていって消える
  Update(){
    if(this.frame%this.interval == 0){
      this.diff = 4;
      this.i = Math.min(this.i+1,this.d-1);
      let str = this.text[this.i];
      if(str != " " && str != "$"){
        //Audio.PlaySE("empty",-0.5);
        //Audio.PlaySE("changeWeapon",-0.1);
      }
      this.textObject.PushText(str);
    }
    this.diff *= 0.3;
    let p = CPV(this.pos);
    p.y += this.diff;

    this.textObject.SetPos(p);

    if(this.frame>this.text.length * this.interval) this.container.alpha -= 0.01;
    if(this.frame>300)__WEBPACK_IMPORTED_MODULE_2__uiManager_js__["a" /* default */].removeUI(this);
    this.frame ++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StagePop;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_Bullet_bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_Effect_target_js__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entity_Effect_lasersight_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__audio_js__ = __webpack_require__(2);
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
        player.bullet = 0;
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
        player.toArg = Math.atan((this.target.ofsetPos.y-(player.pos.y+player.size/2))/(this.target.ofsetPos.x-(player.pos.x+player.size/2)));
        if(player.pos.x+player.size/2 > this.target.ofsetPos.x ) player.toArg += Math.PI;
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
/* 33 */
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
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(4);



class Horming{
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
      this.bullet.Set("arg",this.bullet.arg + closs/Math.abs(closs) * this.bullet.curve);
      //これめっちゃ楽しい
      //this.bullet.targetedEnemy.vel.x += this.bullet.vel.x;
      //this.bullet.targetedEnemy.vel.y += this.bullet.vel.y;
      //this.bullet.Set("vel", ADV(to,this.bullet.vel)); 
      
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Horming;



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sonic_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__stone_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__stone2_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__flash_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__fire_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__smoke_js__ = __webpack_require__(39);












//爆発エフェクト
class Explosion4 extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    //微妙に左上に寄ってるので中心に
    this.pos = ADV(this.pos,VECN(8));
    /*基本情報*/
    this.frame = 0;
    this.isNoSprite = true;
  }
  Bomb(){
    //stone(というか火花?)
    for(let i = 0;i<4;i++){
      let arg = Rand(Math.PI);
      let v = POV(arg,2);
      let stone2 = new __WEBPACK_IMPORTED_MODULE_7__stone2_js__["a" /* default */](CPV(this.pos),v);
      __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(stone2);
    }
  }

  Update(){
    //爆発して自分は消える
    if(this.frame == 0){
      this.Bomb();
    }
    if(this.frame > 300) __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Explosion4;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_circle_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Stage_mapData_js__ = __webpack_require__(16);









class Wall extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos,wall){
    super(pos,VEC0());
    /*基本情報*/
    //this.name = name; 必要になったら
    this.type = ENTITY.WALL;
    this.layer = "ENTITY";
    this.collider = new __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.isUpdater = false;
    /*性質*/
    this.material = wall.material;
    this.colType = wall.colType;
    if(this.colType == "through"){
      this.collider.hitbox.height = 16;
    }
    /*スプライト*/
    this.tex = wall.texture;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.tex);
    this.sprite.position = pos;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Wall;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AI_animator_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__entity_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_bulletHitWall_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_getCoin_js__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Effect_bright_js__ = __webpack_require__(38);












let player;
//コイン
class Coin extends __WEBPACK_IMPORTED_MODULE_7__entity_js__["a" /* default */]{
  constructor(pos){
    player = __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].player;
    super(pos,{x:Rand(2),y:-3});
    /*基本情報*/
    this.frame = 0;
    this.e = 0.9;
    this.type = "MOVER";
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].enemyPattern.coin;
    this.spid = 0;
    this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    /*コライダ*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__["a" /* default */](pos,9,9));//衝突判定の形状
    /*パラメータ*/
    this.gravity = 0.5 + Rand(0.2);
    this.layer = "ENTITY";
    this.isUpdater = true;
    /*AI*/
    this.vel.y = 0.3;
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_1__AI_animator_js__["a" /* default */](this,true,3,12));
  }
  Collision(){
    this.isJump = true;
    //collision at wall
    for(let l of __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].wallList){
      if(l == this) continue;
      let c = __WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__["a" /* default */].on(this,l);
      if(c.isHit){
        /* 衝突応答*/
        __WEBPACK_IMPORTED_MODULE_2__audio_js__["a" /* default */].PlaySE("coin2");

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
        __WEBPACK_IMPORTED_MODULE_2__audio_js__["a" /* default */].PlaySE("coin1",-1);
        __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_9__Effect_getCoin_js__["a" /* default */](this.pos,{x:0,y:0}));
        player.GetScore(1);
        __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].removeEntity(this);
      }
    }
  }
  Update(){
    this.ExecuteAI();
    //たまに光る
    if(this.frame%(8 + Math.floor(Rand(1))) == 0){
      let p = ADV(this.pos,Rand2D(5));
      console.assert(p);
      __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_10__Effect_bright_js__["a" /* default */](p));
    }
    //Collision
    if(this.coltype!="none")this.Collision();
    this.Physics();
    if(__WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].player.isAlive)this.GetByPlayer();
    //時間立つと点滅
    if( this.frame > 300 && this.frame%8 <4) this.sprite.alpha = 0;
    else this.sprite.alpha = 1;
    if( this.frame > 450 ) __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    this.sprite.position = this.pos;

    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Coin;



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);




class Bright extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Bright;



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Collision_box_js__ = __webpack_require__(8);








class Smoke extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
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
    this.collider = new __WEBPACK_IMPORTED_MODULE_5__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_6__Collision_box_js__["a" /* default */](pos,32,32));//衝突判定の形状
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.explosion.smoke;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.alpha = 0.6;
    this.sprite.position = this.pos;
    this.sprite.scale.set(0.0);
    this.sprite.anchor.set(0.5);
    this.e = 0.4;
    this.sprite.blendMode = PIXI.BLEND_MODES.DARKEN;

  }

  Update(){
    let b = 10;
    this.pos = ADV(this.pos,this.vel);
    this.vel.x *= 0.91;
    this.vel.y *= 0.91;
    let d = this.size - this.sprite.scale.x;
    this.sprite.scale.x += d * 0.1;
    this.sprite.scale.y += d * 0.1;
    //this.sprite.rotation += Math.PI/32
    let l = this.spid*8+10;
    if(this.frame%20 == 19)this.sprite.alpha -= 0.1;
    if(this.frame%l == l-1)this.spid++;
    if(this.frame == 400 || this.spid >= 8){
      this.spid = 0;
      __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].Remove(this);
    }
    this.sprite.position = this.pos;

    this.sprite.texture = this.pattern[this.spid];
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Smoke;



/***/ }),
/* 40 */
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
    let texture = new PIXI.Graphics();
    this.color = 0xFFA219;
    this.size = 16;
    texture.beginFill(this.color);
    texture.drawCircle(0,0,this.size);
    texture.endFill();
    this.sprite = texture;
    this.sprite.position = this.pos;
    this.sprite.alpha = 0.17;
    this.sprite.scale.set(6);
    //this.sprite.anchor.set(0.5);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Update(){
    this.sprite.position = this.pos;
    let a = 10;
    this.pos = ADV(this.pos,this.vel);
    this.size *= 0.9;
    let d = (2 - this.sprite.scale.x)*0.2;
    this.sprite.scale.x += d;
    this.sprite.scale.y += d;
    this.sprite.alpha *= 0.92;
    if(this.frame%3==0) this.spid = 1;//this.spid+=1;
    if(this.spid >= 8 || this.frame > 40){
      this.spid = 0;
      this.frame = 0;
      __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].Remove(this);
    }
    this.frame++;
    //this.sprite.texture = this.pattern[this.spid];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Fire;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);




//火花2
class Stone2 extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    this.Init(pos,vel);
  }
  Init(pos,vel){
    //constructor
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.name = "stone2";
    this.frame = 0;
    this.isNext = false;
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.explosion.stone;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.alpha = 1;
    this.size = 8 + Rand(6);
    this.sprite.anchor.set(0.5);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Update(){
    this.sprite.scale.set(this.size/16);
    let d = lerp(0.88,0.96,((14-this.size)/12));
    this.vel = MLV(this.vel,VECN(d)); //減速
    this.pos = ADV(this.pos,this.vel);
    this.sprite.position = this.pos;
    this.size *= 0.95;
    this.sprite.rotation += Math.PI/2;
    //持続時間
    if(this.frame >30){
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Stone2;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drawer_js__ = __webpack_require__(5);






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
    this.sprite.scale.set(5);
    this.sprite.alpha = 0.1;
    //this.sprite.filters = [Drawer.testFilter];
    //this.arg = ADV(VECN(2),Rand2D(1));
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    this.spid = Math.floor(this.frame/3);
    //phys
    this.pos = ADV(this.pos,this.vel);

    this.sprite.scale = ADV(this.sprite.scale,VECN(4/(this.frame+2)*2));
    this.sprite.alpha *= 0.9;

    if(this.spid == 4){
      __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__["a" /* default */].Remove(this);
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sonic;



/***/ }),
/* 43 */
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
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enemy2_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__enemy4_js__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Effect_Explosion_explosion1_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Effect_Explosion_explosion2_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_Explosion_explosion3_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_Explosion_explosion4_js__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Effect_Explosion_shockwave_js__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Mover_coin_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__AI_enemy1AI_js__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__Event_StartBossBattleEvent_js__ = __webpack_require__(86);
























let EntityList = __WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].entityList;

//enum
const State = {
  INIT : "INIT",
  WAIT : "WAIT",
  JUMP : "JUMP",
  POP : "POP",
}

class Enemy1 extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.size = 96;
    this.collider = new __WEBPACK_IMPORTED_MODULE_14__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_16__Collision_box_js__["a" /* default */](pos,this.size,this.size));//衝突判定の形状
    this.type = ENTITY.ENEMY;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_13__art_js__["a" /* default */].enemyPattern.enemy1;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_13__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.scale.set(this.size/16);
    this.sprite.position = this.pos;
    /*パラメータ*/
    //this.addAI(new Enemy1AI(this));
    this.SetParam(__WEBPACK_IMPORTED_MODULE_21__param_js__["a" /* default */].enemy1);
    this.maxHP = this.hp;
    /*フラグ*/
    this.state = State.INIT;
    this.isAlive = true;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
    this.enemyPop = 3;
  }
  PopEnemy(enemyPop){
    let p = {
      x : this.pos.x + this.size/2,
      y : 0,
    }
    for(let i = 0;i<enemyPop;i++){
      let e = new __WEBPACK_IMPORTED_MODULE_5__enemy4_js__["a" /* default */](ADV(p,Rand2D(enemyPop)));
      //ちょっと特殊
      e.AIList[0].dist = 1000;
     // e.coin = Dice(2)+1;
      __WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].addEntity(e);
    }
  }
  Initing(){
    this.PopEnemy(12);
    this.state = "POP";
    this.Landing();
    let e = new __WEBPACK_IMPORTED_MODULE_22__Event_StartBossBattleEvent_js__["a" /* default */]("boss");
    __WEBPACK_IMPORTED_MODULE_2__Event_eventmanager_js__["a" /* default */].PushEvent(new __WEBPACK_IMPORTED_MODULE_3__Event_quakeEvent_js__["a" /* default */](40,0.97));
    __WEBPACK_IMPORTED_MODULE_2__Event_eventmanager_js__["a" /* default */].PushEvent(e);
    let p = CPV(this.pos);
    p.y += this.size;
    p.x += this.size/2;
  //  EntityManager.addEntity(new Explosion4(p));
  }
  Jump(){
    __WEBPACK_IMPORTED_MODULE_2__Event_eventmanager_js__["a" /* default */].PushEvent(new __WEBPACK_IMPORTED_MODULE_3__Event_quakeEvent_js__["a" /* default */](10,0.99));
    this.vel.y = -0.2;
    this.acc.y = -2.3;
    this.state = "JUMP";
    let p = ADV(this.pos,VEC2(-20,90));
    //  Audio.PlaySE("enemy5Shot");
    __WEBPACK_IMPORTED_MODULE_12__audio_js__["a" /* default */].PlaySE("landing2",1.6);
  }
  Waiting(){
    //たまにジャンプする
      this.Jump();
  }
  Poping(){
    __WEBPACK_IMPORTED_MODULE_12__audio_js__["a" /* default */].PlaySE("landing3",1);
    this.vel.y = Math.min(0,this.vel.y * -0.3);
    this.vel.x *= 0.4;
    if(this.vel.y>-0.05 ){
      this.state = "WAIT";
    }
  }
  Landing(){
    let f = {x: (this.pos.x+this.size/2 < __WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].player.pos.x)? 2 : -2 , y:-0.8};
    if(__WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].player.isJump){
      f.x *= 0;
      f.y = -0.3;
    }
    __WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].player.AddForce(f);
    for(let e of __WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].enemyList){
      f = {x: (this.pos.x+this.size/2 < e.pos.x)? 0.3 : -0.3 , y:-0.7};
      e.AddForce(f);
    }

    if(this.hp/this.maxHP<0.5) this.enemyPop = 5;
    if(this.hp/this.maxHP<0.2) this.enemyPop = 7;
    this.PopEnemy(this.enemyPop);

    let p = CPV(this.pos);
    p.y += this.size;
    this.acc.x = 0;
    __WEBPACK_IMPORTED_MODULE_2__Event_eventmanager_js__["a" /* default */].PushEvent(new __WEBPACK_IMPORTED_MODULE_3__Event_quakeEvent_js__["a" /* default */](10,0.97));
    __WEBPACK_IMPORTED_MODULE_2__Event_eventmanager_js__["a" /* default */].PushEvent(new __WEBPACK_IMPORTED_MODULE_3__Event_quakeEvent_js__["a" /* default */](40,0.97,true));
    __WEBPACK_IMPORTED_MODULE_12__audio_js__["a" /* default */].PlaySE("missileHit",2);
    __WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_10__Effect_Explosion_shockwave_js__["a" /* default */](p));
    for(let i = 0;i<4;i++){
      __WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_6__Effect_Explosion_explosion1_js__["a" /* default */](p));
      p.x += this.size/4;
    }
  }
  Jumping(){
    //着地
    this.Landing();
    this.state = "POP"  
  }
  //衝突判定
  Collision(){
    for(let l of __WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].wallList){
      if(l == this) continue;
      let c = __WEBPACK_IMPORTED_MODULE_15__Collision_collision_js__["a" /* default */].on(this,l);
      if(c.isHit){
        /* 衝突応答*/
        if(c.n.x != 0) this.vel.x = 0;
        //地面との衝突
        if(c.n.y == -1 && this.vel.y>0){ 
          switch(this.state){
            case "WAIT" : this.Waiting();break;
            case "JUMP" : this.Jumping();break;
            case "POP" : this.Poping();break;
            case "INIT" : this.Initing();break;//この名前何
          }
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
    this.CollisionEnemy();
  }
  CollisionEnemy(){
    this.floor.on = false;
    this.floor.under = null;
    for(let i=0;i<__WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].enemyList.length;i++){
      let l = __WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].enemyList[i];
      let c = __WEBPACK_IMPORTED_MODULE_15__Collision_collision_js__["a" /* default */].on(this,l);
      //これないと自分と衝突判定してバグ
      if(i == __WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].enemyList.indexOf(this))continue;
      /*衝突判定*/
      if(c.isHit){
        /* 衝突応答*/
        /*速度*/
        if(c.n.x != 0) this.vel.x = 0;
        //地面との衝突
        if(c.n.y == -1){ 
//          EntityManager.enemyList[i].Damage(-99);
        }
        /*note : now isHit == false*/
      }
    }
  }
  //プレイヤーにダメージ
  Hurt(){
    let player = __WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].player; 
    let c = __WEBPACK_IMPORTED_MODULE_15__Collision_collision_js__["a" /* default */].on(this,player);
    //
    //潰されたときだけ
    if(c.isHit && c.n.y == -1){
      //ダメージ
      let damage = RandBET(this.atkMin,this.atkMax);
      if(!player.isInvincible)player.Damage(-damage);
      //if(!player.isInvincible)player.Damage(-damage);
    }
    if(c.isHit && c.n.y != 1){
      player.vel.x = -c.n.x*10;
      //if(!player.isInvincible)player.Damage(-10);
    }
    if(c.isHit && c.n.y == 1){
      //上に乗られたらダメージ
      //this.Damage(-1);
    }
  }
  Damage(atk){
    if(this.state != "INIT"){
      __WEBPACK_IMPORTED_MODULE_12__audio_js__["a" /* default */].PlaySE("enemyDamage",-0.7);
      this.hp = Math.max(this.hp+atk,0);
      //ダメージをポップ
      __WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_20__Effect_fontEffect_js__["a" /* default */](this.pos,-atk+"","enemy"));
      //this.SetSize(lerp(96,192,this.hp/this.maxHP));
      __WEBPACK_IMPORTED_MODULE_19__UI_uiManager_js__["a" /* default */].BossHP.SetBar(this.hp);
    }
  }
  Animation(){
    this.spid = Math.floor(this.frame/6)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
  }

  Physics(){
    if(this.floor.on){
      this.pos.x += this.floor.under.vel.x;
      //this.pos.y += this.floor.under.vel.y;
    }
    if(this.gravity)this.acc.y += this.gravity;

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    if(this.pos.x < 0){
       this.pos.x =0;
       this.vel.x = 0;
    }
    if(this.pos.x > 16*__WEBPACK_IMPORTED_MODULE_1__drawer_js__["a" /* default */].mapSize.width){
      this.posx = 16*__WEBPACK_IMPORTED_MODULE_1__drawer_js__["a" /* default */].mapSize.width;
      this.vel.x = 0;
    }
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.acc.y = 0;
    this.acc.x = 0;
    //最大速度制限
  }
  Update(){
    //AI
    if(this.state == "JUMP"){
      this.acc.x = (this.pos.x+this.size/2 < __WEBPACK_IMPORTED_MODULE_17__Stage_entityManager_js__["a" /* default */].player.pos.x)? 0.010 : -0.010;
      this.vel.x = Math.max(-1,Math.min(this.vel.x,1));
    }

    this.Collision();
    this.Physics();
    this.Hurt();
    //アニメーション
    this.Animation();
    //observer
    if(this.hp<=0){
      this.Die();
      __WEBPACK_IMPORTED_MODULE_2__Event_eventmanager_js__["a" /* default */].PushEvent(new __WEBPACK_IMPORTED_MODULE_3__Event_quakeEvent_js__["a" /* default */](30,0.99));
      __WEBPACK_IMPORTED_MODULE_12__audio_js__["a" /* default */].PlaySE("stageChange",1,0.8);
      __WEBPACK_IMPORTED_MODULE_12__audio_js__["a" /* default */].PlaySE("bomb",1,0.6);
      __WEBPACK_IMPORTED_MODULE_12__audio_js__["a" /* default */].StopBGM();
    }
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy1;



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AI_enemy2AI_js__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AI_moveReflect_js__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Mover_coin_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__param_js__ = __webpack_require__(7);















class Enemy2 extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].enemyPattern.enemy2;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.SetParam(__WEBPACK_IMPORTED_MODULE_13__param_js__["a" /* default */].enemy2);
    this.addAI(new __WEBPACK_IMPORTED_MODULE_7__AI_moveReflect_js__["a" /* default */](this));
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
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(4);





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
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AI_enemy5AI_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__param_js__ = __webpack_require__(7);






//import Enemy4AI from '../AI/enemy4AI.js';





let EntityList = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].entityList;

class Enemy4 extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].enemyPattern.enemy4;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.addAI(new __WEBPACK_IMPORTED_MODULE_6__AI_enemy5AI_js__["a" /* default */](this,130));
    this.SetParam(__WEBPACK_IMPORTED_MODULE_9__param_js__["a" /* default */].enemy4)
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    this.isActive = false;
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
  Physics(){
    if(this.floor.on){
      this.pos.x += this.floor.under.vel.x;
      //this.pos.y += this.floor.under.vel.y;
    }
    if(this.gravity)this.acc.y += this.gravity;
    this.vel.y = Math.min(this.vel.y,4.8);

    this.acc.x += this.force.x;
    this.acc.y += this.force.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.acc.y = 0;
    this.acc.x = 0;
    this.force.x *= 0.9;
    this.force.y *= 0.9;
    //最大速度制限
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
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ai_js__ = __webpack_require__(49);




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
/* 49 */
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
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__drawer_js__ = __webpack_require__(5);








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
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Enemy_enemy_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__ = __webpack_require__(0);





/*Targetクラス*/
class Target extends __WEBPACK_IMPORTED_MODULE_1__effect_js__["a" /* default */]{
  constructor(enemy){
    //このposは参照型なので常にenemyを追尾している
    super(enemy.pos,VEC0());
    this.ofset = enemy.size/2;
    this.ofsetPos = ADV(this.pos , VECN(this.ofset));
    /*基本情報*/
    this.name = "target";
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].bulletPattern.target;
    this.sprite = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.enemy = enemy;//ロックしているenemyの情報
  }

  Update(){
    this.sprite.anchor.set(0.5);
    this.sprite.rotation = this.frame/50;
    //シュッてなるやつ
    this.sprite.scale = VECN(1.5 + 1.5/(this.frame+1)); //ゼロ除算回避
    this.ofsetPos = ADV(this.pos , VECN(this.ofset));
    this.sprite.position = this.ofsetPos;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Target;



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AI_animator_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__AI_bullet1AI_js__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__AI_horming_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__AI_emitTrail_js__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Effect_bulletShot_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Effect_bulletTrail_js__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Effect_Explosion_fire2_js__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Effect_Explosion_explosion1_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__param_js__ = __webpack_require__(7);



















const bullet1 = __WEBPACK_IMPORTED_MODULE_17__param_js__["a" /* default */].bullet1;

/*bullet1クラス*/
//Missile
class Bullet1 extends __WEBPACK_IMPORTED_MODULE_11__bullet_js__["a" /* default */]{
  constructor(pos,weapon){
    super(pos,POV(weapon.arg,weapon.speed));
    this.Init(pos,weapon);
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
    this.collider = new __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__["a" /* default */](pos,4,4));//衝突判定の形状
    /*パラメータ*/
    this.hp = __WEBPACK_IMPORTED_MODULE_17__param_js__["a" /* default */].bullet1.hp;//弾丸のHP 0になると消滅
    this.atkMin = __WEBPACK_IMPORTED_MODULE_17__param_js__["a" /* default */].bullet1.atkMin;//攻撃力
    this.atkMax = __WEBPACK_IMPORTED_MODULE_17__param_js__["a" /* default */].bullet1.atkMax;//攻撃力
    this.curve = __WEBPACK_IMPORTED_MODULE_17__param_js__["a" /* default */].bullet1.curve;
    let emitTerm = 2;
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_2__AI_animator_js__["a" /* default */](this,true,1,4));
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_9__AI_bullet1AI_js__["a" /* default */](this));
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_12__AI_emitTrail_js__["a" /* default */](this,__WEBPACK_IMPORTED_MODULE_14__Effect_bulletTrail_js__["a" /* default */],1));
    if(weapon.isHorming) this.AIList.push(new __WEBPACK_IMPORTED_MODULE_10__AI_horming_js__["a" /* default */](this));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet1;



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Effect_bulletHitWall_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Effect_Explosion_explosion1_js__ = __webpack_require__(19);









class Bullet1AI{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  Phisics(){
    this.bullet.Set("vel", POV(this.bullet.arg,this.bullet.vi));
    this.bullet.pos.x += this.bullet.vel.x;
    this.bullet.pos.y += this.bullet.vel.y;
  }
  /* 衝突判定 */
  Collision(){
    for(let l of __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].enemyList){
      if(__WEBPACK_IMPORTED_MODULE_2__Collision_collision_js__["a" /* default */].on(this.bullet,l).isHit){
        l.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
        this.bullet.hp--;
      };
    }
    for(let w of __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].wallList){
      if(__WEBPACK_IMPORTED_MODULE_2__Collision_collision_js__["a" /* default */].on(this.bullet,w).isHit){
        //breakable object
        if(w.isBreakable){
          // ■ SoundEffect : hitWood
          w.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
          this.bullet.hp--;
          //wall
          }else{
            // ■ SoundEffect : hitWall
            if(w.material == "steel")__WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("landing3",5);
            this.bullet.hp = 0;
          }
      }
    }
  }

  Observer(){
    if(this.bullet.hp<=0){
      __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].removeEntity(this.bullet);
      __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("missileHit",1);
      __WEBPACK_IMPORTED_MODULE_5__Event_eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_6__Event_quakeEvent_js__["a" /* default */](50,0.8));//ゆれ
      __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_7__Effect_Explosion_explosion1_js__["a" /* default */](CPV(this.bullet.pos)));
    }
    if(this.bullet.frame > 180){
      __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].removeEntity(this.bullet);
      __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].addEntity(new BulletShot(CPV(this.bullet.pos)));
    }
  }
  Do(){
    this.Collision();
    this.Phisics();
    this.Observer();
    this.bullet.sprite.position = ADV(this.bullet.pos,VECN(8));
    this.bullet.sprite.rotation = this.bullet.arg + Math.PI/2;
    this.bullet.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet1AI;



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(4);



class EmitTrail{
  //termフレーム毎にtraiをemitします
  constructor(entity,Trail,emitTerm){
    this.emitTerm = emitTerm;
    this.entity = entity;
    this.Trail = Trail;//クラス渡し
  }
  Do(){
    if(this.entity.frame%this.emitTerm == this.emitTerm-1){
      let p = CPV(this.entity.pos);
      let d = Rand2D(5);
      p = ADV(p,d);
      let v = POV(this.entity.arg+Math.PI,4);
      let trail = new this.Trail(p,v);//引数どうしよ
      __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].addEntity(trail);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EmitTrail;



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drawer_js__ = __webpack_require__(5);






/*bullet1残像*/
class Bullettrail extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    this.Init(pos,vel);
  }
  Init(pos,vel){
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.name = "bullettrail";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
      /*スプライト*/
    this.spid = 0; //12~15
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.trail;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.5;
    this.sprite.scale = VECN((Rand(0.5)+1)/1);
    this.sprite.position = ADV(this.pos,VECN(8));
    //this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }
  Physics(){
    this.pos = ADV(this.pos,this.vel);
    this.vel = MLV(this.vel,VECN(0.9));
  }
  Update(){
    if(this.isAlive){
      //this.sprite.alpha *= 0.9
      this.sprite.scale = ADV(this.sprite.scale,VECN(this.frame/256));
      this.sprite.scale.x *= 0.9;
      this.sprite.scale.y *= 0.9;
      this.Physics();
      this.sprite.position = ADV(this.pos.x,VECN(8));
      this.sprite.texture = this.pattern[this.spid];
      this.spid = Math.floor(this.frame/4);
      if(this.spid >= 6){
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullettrail;



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//全ステージに関するデータ
class StageData{
  static Init(){
    this.StageBackGround = {
      0 : 1,
      1 : 1,
      2 : 1,
      3 : 1,
      4 : 1,
      5 : 1,
      6 : 1,
      7 : 1,
      8 : 1,
      9 : 1,
      10 : 1,
      11 : 1,
      12 : 1,
    }
    this.StageBGM = {
      0 : 0,
      1 : 0,
      2 : "stage5",
      3 : "stage5",
      4 : "stage5",
      5 : "stage5",
      6 : "stage5",
      7 : "stage5",
      8 : "stage5",
      9 : "stage5",
      10 : "stage5",
      11 : "0",
      12 : "0",
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StageData;



/***/ }),
/* 57 */
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
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(4);





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
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AI_enemy2AI_js__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AI_shot_js__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__AI_moveLissajous_js__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Effect_Explosion_explosion2_js__ = __webpack_require__(25);














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
    this.SetParam(__WEBPACK_IMPORTED_MODULE_11__param_js__["a" /* default */].enemy3);
    this.addAI(new __WEBPACK_IMPORTED_MODULE_7__AI_shot_js__["a" /* default */](this));
    this.addAI(new __WEBPACK_IMPORTED_MODULE_8__AI_moveLissajous_js__["a" /* default */](this));
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
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AI_moveReflect_js__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Entity_Enemy_eBullet2_js__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__AI_enemy5AI_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__param_js__ = __webpack_require__(7);














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
    this.SetParam(__WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].enemy5);
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
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_Explosion_explosion2_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_Explosion_stone_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__AI_moveReflect_js__ = __webpack_require__(46);












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
    __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_8__Effect_Explosion_explosion2_js__["a" /* default */](CPV(this.pos),1.5*Math.PI))
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
   if(this.frame%3 == 0){
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
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Entity_Enemy_eBullet2_js__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_Explosion_explosion1_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__AI_enemy5AI_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__param_js__ = __webpack_require__(7);














//playerに踏まれると膨らむ
//膨らんで爆発
class Enemy6 extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.type = ENTITY.ENEMY;
    this.name = "enemy6";
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].enemyPattern.enemy6;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    /*パラメータ*/
    this.addAI(new __WEBPACK_IMPORTED_MODULE_9__AI_enemy5AI_js__["a" /* default */](this,200));
    this.SetParam(__WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].enemy6);
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
    __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_8__Effect_Explosion_explosion1_js__["a" /* default */](this.pos));
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
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__font_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__param_js__ = __webpack_require__(7);







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
const P_BAR = {
  x : -3.5, 
  y : -7, 
};

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
    this.color = 0xCA5148;
    /*child*/
    this.outer = {pos:CPV(pos)};
    this.bar = {pos:ADV(CPV(pos),P_BAR)};
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
    this.InitChildren();


  }
  InitList(){
    let s;
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
  InitChildren(){
    let s;
    //outer
    s = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern.bullet.outer);
    s.position = this.outer.pos; 
    this.container.addChild(s);
    //bar
    let rect = new PIXI.Graphics();
    rect.beginFill(this.color);
    rect.drawRect(this.bar.pos.x,this.bar.pos.y,62,12);
    rect.endFill();
    s = rect;
    //s = Art.SpriteFactory(Art.UIPattern.bullet.bar);
    s.position = this.bar.pos; 
    this.container.addChild(s);
    //icon
    let equip = __WEBPACK_IMPORTED_MODULE_5__param_js__["a" /* default */].player.equip;
    s = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern.bullet.icon[equip]);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);
    this.InitList();
  }
  Push(weaponName){
    let p = CPV(this.wlist.pos); 
    let s = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern.bullet.pop[weaponName]);
    p.x += (this.wlist.list.length-1)*8;
    s.position = p;
    this.container.addChild(s);
    this.wlist.list.push(weaponName);
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
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stagePop_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__font_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Event_messageEvent_js__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Event_eventmanager_js__ = __webpack_require__(3);












const P_TEXT = {
  x:16,
  y:24,
}
const COLUMN = 10;//行間



class Message extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos,signboard){
    super(pos); 
    /*基本情報*/
    this.signboard = signboard;
    this.message = signboard.message;
    this.frame = 0;

    /*child*/
    this.type = "MES";
    this.outer = {
      sprite : __WEBPACK_IMPORTED_MODULE_4__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_4__art_js__["a" /* default */].UIPattern.message.frame), 
    }
    //文字の長さに応じて枠を調整
    this.outer.sprite.scale.x *= 2.6;
    this.outer.sprite.scale.y *= 2.5; //yは固定
    /*スプライト*/
    this.isMultiple = true;
    //枠スプライト追加
    let p = CPV(pos);
    this.outer.sprite.position = p;
    this.container = new PIXI.Container();
    this.container.addChild(this.outer.sprite);
    p = ADV(p,P_TEXT);

    this.OpeningSelection = false;
    this.isRead = true;
    this.page=0;
    //テキスト
    /*
    */
  }
  ReadNextPage(text){
    __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("changeWeapon");
    this.ClearMessage();
    this.EmitEvent();
    if(this.isRead)this.RenderText();
    this.page++;
  }
  ClearMessage(){
    //改ページするために文字だけを消す
    let mes = this.message[this.page];
    let sentence = mes.split("\n");
    for(let i=0;i<sentence.length;i++){
      __WEBPACK_IMPORTED_MODULE_1__uiManager_js__["a" /* default */].removeUI(sentence[i]);
    }
    //これをすると先頭以外の要素が消える
    //つまり枠スプライトを残し他の文字を消す
    this.container.children.length = 1;//は？
  }
  //テキストを表示する
  RenderText(){
    let mes = this.message[this.page];
    let sent = mes.split("\n");
    let sentenceSprite = [];
    this.isRead = true;

    let p = CPV(this.pos);
    p = ADV(p,P_TEXT);
    for(let i = 0;i<sent.length;i++){
      let f = new __WEBPACK_IMPORTED_MODULE_7__font_js__["a" /* default */](p,sent[i],"MES")
        f.container.scale.x = 1;
        f.container.scale.y = 1;
      sentenceSprite.push(f);//テキスト 
      p.y += COLUMN;
    }
    //各行各文字のスプライトを追加
    for(let l of sentenceSprite){
      this.container.addChild(l.container);
    }
  }
  EmitEvent(){
    /*イベント発生用メッセージ*/
    let m = this.message[this.page];
    if(m !== undefined){
      if(m.slice(0,5) == "EVENT"){;
        let event = new __WEBPACK_IMPORTED_MODULE_9__Event_messageEvent_js__["a" /* default */]("OPEN",m);
        __WEBPACK_IMPORTED_MODULE_10__Event_eventmanager_js__["a" /* default */].eventList.push(event);
        //クソポイント
        //ここでメッセージを変更するな
        this.message[this.page] = "はっこうずみ"
        this.page++;
      }//
      if(m.slice(0,6) == "SELECT"){;
        this.OpenSelection();
      }
      if(m.slice(0,3) == "GET"){;
        this.GetWeapon();
        this.page++;
      }
      //指定したページに飛ぶ
      if(m.slice(0,4) == "GOTO"){;
        let page = m.split("\n")[1];
        if(page == "END"){
          this.isRead = false;
          this.CloseMessage();
        }
        else this.page = page;
      }
    }
  }
  GetWeapon(){
    this.page++;
    let weaponName = this.message[this.page]
      cl(this.message[this.page])
      if(!__WEBPACK_IMPORTED_MODULE_5__param_js__["a" /* default */].player.havingWeaponList[weaponName]){
        let text = this.ToJap(weaponName)+"をてにいれた\ncキーでチェンジできるよ↓"; 
        //UIManager.PopMessage(text,"POP");
        //テスト
        __WEBPACK_IMPORTED_MODULE_5__param_js__["a" /* default */].player.havingWeaponList[weaponName] = true;
        __WEBPACK_IMPORTED_MODULE_1__uiManager_js__["a" /* default */].bullet.Push(weaponName);
        let p = {
          x : 64,
          y : 96
        }
        __WEBPACK_IMPORTED_MODULE_1__uiManager_js__["a" /* default */].addUI(new __WEBPACK_IMPORTED_MODULE_2__stagePop_js__["a" /* default */](p,"-" + this.ToJap(weaponName) +"をてにいれた "));//SCORE
      }else{
        let text = "きりかえはc だよ↓"; 
        //     UIManager.PopMessage(text,"POP");
        }
  }
  //武器名を日本語にするだけ
  ToJap(weaponName){
    switch(weaponName){
      case "missile" : return "ミサイル";
      case "laser" : return "レーザー";
      case "weapon4" : return "weapon4";
      case "weapon5" : return "weapon5";
      default : console.warn("Error ToJapWeaponName");
    }
  }
  //選択肢を表示
  OpenSelection(){
    this.OpeningSelection = true;
    let p = CPV(this.pos);
    p.x += 300;
    p.y += 16;
    p.y += COLUMN;

    this.Selector = {
      Init : function(){
        this.cusor.select = this.cusor.item[this.cusor.pointer];
      },
      GetSelection : function(){
        return this.cusor.item[this.cusor.pointer];
      },
      cusor : {
        pos : p,
        item : [
          "はい",
          "いいえ",
        ],
        pointer : 0,//カーソル位置
        font : new __WEBPACK_IMPORTED_MODULE_7__font_js__["a" /* default */](p,"→","MES"),
        select : null,
        Move : function(dir){
          __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("changeWeapon");
          if(dir == "UP") this.pointer--;
          if(dir == "DOWN") this.pointer++;
          this.pointer = clamp(this.pointer,0,this.item.length-1);
          this.font.container.position.y = 0 + COLUMN*this.pointer;
        },
      }
    };
    this.Selector.Init();

    let f;
    this.Selector.container = new PIXI.Container();
    this.Selector.container.addChild(this.Selector.cusor.font.container);
    p.x += 16;
    for(let item of this.Selector.cusor.item){
      f = new __WEBPACK_IMPORTED_MODULE_7__font_js__["a" /* default */](p,item,"MES");
      this.Selector.container.addChild(f.container);
      p.y += COLUMN;
    }
    this.container.addChild(this.Selector.container);
  }
  //選択肢決定
  Select(){
    this.OpeningSelection = false;
    //決め打ち
    switch(this.Selector.GetSelection()){
      case "はい" : this.page = 2 ; break;
      case "いいえ" : this.page = 4;break;
    };
  }
  CloseMessage(){
    this.signboard.isRead = false;
    this.signboard.isNear = false;
    __WEBPACK_IMPORTED_MODULE_8__game_js__["a" /* default */].scene.PopSubState();
    __WEBPACK_IMPORTED_MODULE_1__uiManager_js__["a" /* default */].removeUI(this);
  }
  Update(){
    if( __WEBPACK_IMPORTED_MODULE_6__input_js__["a" /* default */].isKeyClick(KEY.X)){
      if(this.OpeningSelection){
        this.Select();
      }
      if(this.page < this.message.length){
        this.ReadNextPage();
      }else{
        this.CloseMessage();
      }
    }
    if(this.OpeningSelection){
      if( __WEBPACK_IMPORTED_MODULE_6__input_js__["a" /* default */].isKeyClick(KEY.DOWN)){
        this.Selector.cusor.Move("DOWN");
      }
      if( __WEBPACK_IMPORTED_MODULE_6__input_js__["a" /* default */].isKeyClick(KEY.UP)){
        this.Selector.cusor.Move("UP");
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Message;



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__font_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Event_quitGameEvent_js__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__drawer_js__ = __webpack_require__(5);










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
    __WEBPACK_IMPORTED_MODULE_8__drawer_js__["a" /* default */].SetFilter([]);
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
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AI_animator_js__ = __webpack_require__(27);






class Signpop extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.name = "signpop";
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.signpop;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_4__AI_animator_js__["a" /* default */](this,true,4,4));
  }
  Update(){
    this.ExecuteAI();
    this.sprite.position = this.pos;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Signpop;



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_backEntity_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_wall_js__ = __webpack_require__(36);
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
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fadeEvent_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__drawer_js__ = __webpack_require__(5);







class GameOverEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(){
    super();
    function* gen(){
      //if(!Game.debug)Game.stage = Game.continuePoint;
      let frame = 0;
      __WEBPACK_IMPORTED_MODULE_1__eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_2__fadeEvent_js__["a" /* default */]("fadeout"));

      __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("stageChange");
      //Audio.PlayBGM("stage5",0.2);
      //if(Game.debug)Audio.PlayBGM("stage5",0.0);


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
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__weapon1_js__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weapon2_js__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__weapon3_js__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__weapon4_js__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__weapon5_js__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__ = __webpack_require__(6);









class WeaponManager{
  static Init(){
    /*singleton list*/
    /*武器のインスタンスを作成*/
    this.weapons = {
      missile : new __WEBPACK_IMPORTED_MODULE_1__weapon1_js__["a" /* default */](),
      laser : new __WEBPACK_IMPORTED_MODULE_2__weapon2_js__["a" /* default */](),
      normal : new __WEBPACK_IMPORTED_MODULE_3__weapon3_js__["a" /* default */](),
      weapon4 : new __WEBPACK_IMPORTED_MODULE_4__weapon4_js__["a" /* default */](),
      weapon5 : new __WEBPACK_IMPORTED_MODULE_5__weapon5_js__["a" /* default */]()
    };
    /*selectBoxの選択*/
    this.select;
  }

  /*プレイヤーの参照を受け取って武器を変更*/
  static ChangeWeapon(player,name){
    __WEBPACK_IMPORTED_MODULE_0__audio_js__["a" /* default */].PlaySE("changeWeapon",0);
    __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__["a" /* default */].bullet.ChangeWeapon(name);
    player.weapon = this.weapons[name];
    __WEBPACK_IMPORTED_MODULE_6__param_js__["a" /* default */].player.equip = name;
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = WeaponManager;



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(5);





/*bullet3残像*/
class BulletTrail2 extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    this.Init(pos,vel);
  }
  Init(pos,vel){
    /*基本情報*/
    this.name = "bullettrail2";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
      /*スプライト*/
    this.spid = 0; //12~15
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.trail2;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.anchor.set(0.5);
    this.sprite.scale = VECN(Rand(0.5)+1);
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Physics(){
    this.pos = ADV(this.pos,this.vel);
    this.vel = MLV(this.vel,VECN(0.9));
  }


  Update(){
    if(this.isAlive){
      this.sprite.scale = ADV(this.sprite.scale,VECN(-this.frame/128));
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
/* harmony export (immutable) */ __webpack_exports__["a"] = BulletTrail2;



/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);



class DistanceField{
  static Init(){
    let test = new PIXI.Sprite(__WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].test);
    let width = test.width;
    let height = test.height;//怪しい
    test.scale.set(8);
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].addContainer(test,"ENTITY");

    //画像から直接pickしてきたもの
    this.extract = __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].Renderer.plugins.extract.pixels(test);

    for(let i = 0;i<this.extract.length/4;i++){
      this.extract[i] = this.extract[i*4];
    }

    //バイナリ値
    this.binaryField = new Array(width);
    for(let i=0;i<width;i++){
      this.binaryField[i]=new Array(height);
    }
    for(let y=0;y<height;y++){
      for(let x=0;x<width;x++){
        this.binaryField[y][x]=this.extract[width*y+x];
      }
    }

    //距離場
    this.distanceFiled = DistanceField.GenerateDistanceField(this.binaryField);
  }

  //field上の座標posでの壁までの最短距離
  static GridDistance(field,pos){
    //true : inner wall
    //false: outside
    let side = (field[pos.y][pos.x]!=0);  

    let d = 999999;
    for(let y=0;y<field.length;y++){
      for(let x=0;x<field[0].length;x++){
        //表ならばウラ、裏ならばオモテ
        let side2 = (field[y][x]!=0)
        if(side != side2){
          let p = vec2(x,y);
          d = Math.min(d,DIST(pos,p));
        }
      }
    }
    //めり込んだ場合は負の値を返す
    if(side)d*=-1;
    return d;
  }
  //binary  :２次元配列 壁の01を表したもの
  //distance:２次元配列 その座標から最短の壁までの距離
  static GenerateDistanceField(binaryField){
    let width = binaryField[0].length;
    let height = binaryField.length;

    let distanceFiled = new Array(height);
    for(let i=0;i<height;i++){
      distanceFiled[i] = new Array(width);
    }

    for(let y=0;y<height;y++){
      for(let x=0;x<width;x++){
        distanceFiled[y][x] = this.GridDistance(binaryField,vec2(x,y));
      }
    }
    return distanceFiled;
  }
  //画像→距離グリッド生成→距離場補間
  static GetDistance(pos){
    let p = this.TransformWorldToFiled(pos);
    //正規化済み
    let uv = {
      x : (pos.x/8 - p.x),
      y : (pos.y/8 - p.y),
    }
    //biliniar補間
    let p0 = this.distanceFiled[p.y][p.x];
    let p1 = this.distanceFiled[p.y][p.x+1];
    let p2 = this.distanceFiled[p.y+1][p.x];
    let p3 = this.distanceFiled[p.y+1][p.x+1];
    let d = p0*(1-uv.x)*(1-uv.y) + p1*uv.y*(1-uv.x) +p2*uv.y*(1-uv.x)    + p3*uv.x*uv.y;
    return d;
  }
  static GetDistanceGrad(pos){
    let p = this.TransformWorldToFiled(pos);
    let pdx = {
      x:pos.x + 1,
      y:pos.y,
    }
    let pdy = {
      x:pos.x,
      y:pos.y + 1,
    }
    //let dx = this.GetDistance(pdx)-this.GetDistance(pos);
    //let dy = this.GetDistance(pdy)-this.GetDistance(pos);
    let d = this.distanceFiled[p.y][p.x];

    let dx = this.distanceFiled[p.y][p.x+1]-d;
    let dy = this.distanceFiled[p.y+1][p.x]-d;
            
    return vec2(dx,dy);
  }


  static TransformWorldToFiled(pos){
    //8 = 16 / magnification
    return {
      x: Math.floor((pos.x)/8),
      y: Math.floor((pos.y)/8),
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DistanceField;



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_mapData_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__fadeEvent_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__param_js__ = __webpack_require__(7);

 









class GameClearEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(){
    super();
    function* gen(){
      //ステータス退避
      __WEBPACK_IMPORTED_MODULE_10__param_js__["a" /* default */].player.status = {
        hp : __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].player.hp,
        bullet : __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].player.bullet,
      }

      let frame = 0;
      __WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */].scene.PushSubState("TRANS");
      __WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */].stage++;
      if(__WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */].stage == 11){
        //Audio.isFadeout=true;
        __WEBPACK_IMPORTED_MODULE_7__audio_js__["a" /* default */].StopBGM();
      }
      __WEBPACK_IMPORTED_MODULE_7__audio_js__["a" /* default */].PlaySE("stageChange");
      __WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__["a" /* default */].PopStage(__WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */].stage);
      __WEBPACK_IMPORTED_MODULE_8__eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_9__fadeEvent_js__["a" /* default */]("fadeout"));
      while(frame < 50){
        frame++;
        yield;
      }


        __WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */].continuePoint = 11;
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameClearEvent;



/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(11);
/*｡+☆.En†rypoinT.☆+｡*/
 

/*拡大方式をニアレストネイバーに*/
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

__WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */].Load();




/***/ }),
/* 74 */
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
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);





//閃光
class Fire2 extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    this.Init(pos,VEC0());
  }
  Init(pos,vel){
    /*基本情報*/
    this.pos = pos;
    this.vel = vel;
    this.name = "fire2";
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
    this.sprite.scale.x *= 0.82;
    this.sprite.scale.y *= 0.82;
    //this.sprite.scale = ADV(this.sprite.scale, VECN(1/(this.frame+4)));
    //this.sprite.alpha = 0.5 - this.frame/40;
    if(this.frame%1==0)this.spid = 1;
    if(this.spid >= 8){
      this.spid = 0;
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
    this.frame++;
    this.sprite.texture = this.pattern[this.spid];
  }
}
/* unused harmony export default */



/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);




//真の背景であり背景オブジェクトではない
class BackGround extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
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
/* harmony export (immutable) */ __webpack_exports__["a"] = BackGround;



/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Effect_bright_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__backEntity_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Effect_signpop_js__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Event_quakeEvent_js__ = __webpack_require__(13);















class Signboard extends __WEBPACK_IMPORTED_MODULE_9__backEntity_js__["a" /* default */]{
  constructor(pos,message,name){
    super(pos,__WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].wallPattern.signboard);
    /*基本情報*/
    this.layer= "ENTITY";
    //なおせ
    this.name = name;
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
    if(name == "signboard") this.tex = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].wallPattern.signboard;//テクスチャ
    if(name == "shop") this.tex = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].wallPattern.shop;//テクスチャ
    this.sprite = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(this.tex);
    this.sprite.position = pos;
    //pop
    let p = CPV(this.pos);
    p.y -= 16;
    this.popup = new __WEBPACK_IMPORTED_MODULE_11__Effect_signpop_js__["a" /* default */](p);
    __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(this.popup);
  }

  Read(){
    this.isRead = true;
    __WEBPACK_IMPORTED_MODULE_8__game_js__["a" /* default */].scene.PushSubState("MES");
    __WEBPACK_IMPORTED_MODULE_10__UI_uiManager_js__["a" /* default */].PopMessage(this);
  }

  Update(){
    //page : 現在のページ番号
    let player = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player;
    if(!this.isRead && this.name == "shop" && this.frame%8 == 0){
      let trail = new __WEBPACK_IMPORTED_MODULE_1__Effect_bright_js__["a" /* default */](ADV(this.pos,Rand2D(16)),Rand2D(0.5));
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(trail);
    }
    if(DIST(player.pos,this.pos) <  16 && player.isAlive){
      player.isCanRead = true;
      if(!this.isRead && __WEBPACK_IMPORTED_MODULE_6__input_js__["a" /* default */].isKeyClick(KEY.X)){
        //UI側にMESSAGEを生成し、以降の入力はそちらで処理
        this.Read();
      }
    }
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Signboard;



/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__font_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__param_js__ = __webpack_require__(7);








const P_AMOUNT = {
  x : 22, 
  y : 4, 
};
//HP Icon
const P_ICON = {
  x : -16, 
  y : 0, 
};
const P_BAR = {
  x : -3.5, 
  y : 1, 
};

class gaugeHP extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "HP"; 
    this.isMultiple = true;
    this.pos = pos;
    /*パラメータ*/
    this.max = __WEBPACK_IMPORTED_MODULE_6__param_js__["a" /* default */].player.maxHp;
    this.color = 0xBB2E5D;
    /*child*/
    this.outer = {pos:CPV(pos)};
    this.bar = {pos:ADV(CPV(pos),P_BAR)};
    this.icon = {pos:ADV(pos,P_ICON)};
    this.amount = new __WEBPACK_IMPORTED_MODULE_5__font_js__["a" /* default */](ADV(pos,P_AMOUNT)," " + this.max,"HP");//数字
    /*スプライト*/
    this.spid = 0;
    this.container = new PIXI.Container();
    this.InitChildren();
  }
  InitChildren(){
    let s;
    //outer
    s = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.HP.outer);
    s.position = this.outer.pos; 
    this.container.addChild(s);
    //bar
    let rect = new PIXI.Graphics();
    rect.beginFill(this.color);
    rect.drawRect(this.bar.pos.x,this.bar.pos.y,62,12);
    rect.endFill();
    s = rect;
    //s = Art.SpriteFactory(Art.UIPattern.HP.bar);
    s.position = this.bar.pos; 
    this.container.addChild(s);
    //icon
    s = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.HP.icon);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);
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
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_Enemy_enemy1_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__font_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__param_js__ = __webpack_require__(7);










const P_AMOUNT = {
  x : 48, 
  y : 4, 
};
//HP Icon
const P_ICON = {
  x : -16, 
  y : 0, 
};

class gaugeBossHP extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "BossHP"; 
    this.isMultiple = true;
    this.pos = pos;
    /*child*/
    this.outer = {pos:CPV(pos)};
    this.bar = {pos:CPV(pos)};
    this.icon = {pos:ADV(pos,P_ICON)};
    let maxHP = __WEBPACK_IMPORTED_MODULE_8__param_js__["a" /* default */].enemy1.hp;//
    /*スプライト*/
    this.spid = 0;
    this.container = new PIXI.Container();
    this.pattern = __WEBPACK_IMPORTED_MODULE_5__art_js__["a" /* default */].UIPattern.HP;//
    let s;
    this.scale = 4;
    P_AMOUNT.x = 16*4*this.scale/2-8;
    this.amount = new __WEBPACK_IMPORTED_MODULE_7__font_js__["a" /* default */](ADV(pos,P_AMOUNT),"" + maxHP,"HP");//数字
    //outer
    s = __WEBPACK_IMPORTED_MODULE_5__art_js__["a" /* default */].SpriteFactory(this.pattern.outer);//
    s.position = this.outer.pos; 
    s.scale.x = this.scale*0.97;
    this.container.addChild(s);
    //bar
    s = __WEBPACK_IMPORTED_MODULE_5__art_js__["a" /* default */].SpriteFactory(this.pattern.bar);
    s.position = this.bar.pos; 
    s.position.x += 0
    s.scale.x = this.scale;
    this.container.addChild(s);
    //icon
    s = __WEBPACK_IMPORTED_MODULE_5__art_js__["a" /* default */].SpriteFactory(this.pattern.icon);
    s.position = this.icon.pos; 
    //this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);
    /*パラメータ*/
    this.max = maxHP;
    /*state*/
    this.isPopIn = true;
    this.isInitialized = false;
    this.initHP = 0;
    this.isUpdater = true;
  }
  SetBar(hp){
    if(this.isInitialized){
      //barの長さを更新
      this.container.children[1].scale.x = this.scale * hp/this.max;
      //HP数字の更新
      this.amount.SetFont(hp);
    }
  }
  Update(){
    if(!this.isInitialized){
      __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlaySE("empty");
      this.container.children[1].scale.x = this.scale * this.initHP/this.max;
      this.initHP+=this.max/50;
      this.amount.SetFont(this.initHP);
      if(this.initHP >= this.max)this.isInitialized = true;
    }
    this.container.position.x = this.pos.x;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = gaugeBossHP;



/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sonic_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__stone_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__stone2_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__flash_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__fire_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__smoke_js__ = __webpack_require__(39);












//爆発エフェクト
class Explosion3 extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    //微妙に左上に寄ってるので中心に
    this.pos = ADV(this.pos,VECN(8));
    /*基本情報*/
    this.frame = 0;
    //this.isNoSprite = true;
    let texture = new PIXI.Graphics();
    this.color = 0x9295b0;
    this.size = 0;
    texture.beginFill(this.color);
    texture.drawCircle(0,0,16);
    texture.endFill();
    this.sprite = texture;
    this.sprite.position = this.pos;
    this.sprite.scale.set(1);
  }
  Bomb(){
  }

  Update(){
    let d = (5 - this.size)*0.1;
    this.size += d;
    this.sprite.scale.set(this.size);
    let t = (this.frame-200)/100;
    this.sprite.alpha = lerp(0,1,t);

    if(this.frame > 300) __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    this.frame++;
  }
}
/* unused harmony export default */



/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__ = __webpack_require__(0);





//衝撃シェーダ
class Shockwave extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    //微妙に左上に寄ってるので中心に
    this.pos = ADV(this.pos,VECN(8));
    /*基本情報*/
    this.frame = 0;
    this.isNoSprite = true;
  }

  Update(){
    __WEBPACK_IMPORTED_MODULE_1__drawer_js__["a" /* default */].Stage.filters[0].uniforms.x = this.pos.x/800; 
    __WEBPACK_IMPORTED_MODULE_1__drawer_js__["a" /* default */].Stage.filters[0].uniforms.y = this.pos.y/640; 
    __WEBPACK_IMPORTED_MODULE_1__drawer_js__["a" /* default */].Stage.filters[0].uniforms.time = this.frame;
    if(this.frame > 300) __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Shockwave;



/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Effect_Explosion_explosion1_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Enemy_enemy1_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Enemy_enemy2_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Enemy_enemy3_js__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Enemy_enemy4_js__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Enemy_enemy5_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Enemy_enemy6_js__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ai_js__ = __webpack_require__(49);
















class Enemy1AI extends __WEBPACK_IMPORTED_MODULE_12__ai_js__["a" /* default */]{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    super(enemy)
  }

  Do(){
    //this.enemy.vel.x = Math.max(-1,Math.min(this.enemy.vel.x,1));
  }
}
/* unused harmony export default */



/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Enemy_eBullet1_js__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio_js__ = __webpack_require__(2);





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
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__param_js__ = __webpack_require__(7);








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
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ai_js__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collision_js__ = __webpack_require__(4);




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
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UI_stagePop_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__fadeEvent_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__param_js__ = __webpack_require__(7);













//指定したBGMを開始する
class BGMStartEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(BGMTitle){
    if(!BGMTitle)console.warn("タイトルを入れて");
    super();
    function* gen(){
    let p = {
      x : 96,
      y : 64
    }
    if(__WEBPACK_IMPORTED_MODULE_8__audio_js__["a" /* default */].PlayingBGM.source!==null) __WEBPACK_IMPORTED_MODULE_8__audio_js__["a" /* default */].PlayBGM(BGMTitle,2.3);
      //Drawer.Stage.filters.push(Drawer.testFilter);
      __WEBPACK_IMPORTED_MODULE_2__UI_uiManager_js__["a" /* default */].addUI(new __WEBPACK_IMPORTED_MODULE_1__UI_stagePop_js__["a" /* default */](p,"^   - どうくつ   ぼす -$" , 7));
      __WEBPACK_IMPORTED_MODULE_2__UI_uiManager_js__["a" /* default */].SetBoss();
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BGMStartEvent;



/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__font_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__param_js__ = __webpack_require__(7);








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
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Event_openWallEvent_js__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__input_js__ = __webpack_require__(14);










//新しくメッセージ枠を開く
function* open(message){
  let e = new __WEBPACK_IMPORTED_MODULE_7__Event_openWallEvent_js__["a" /* default */]();
  __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__["a" /* default */].eventList.push(e);
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
  constructor(eventType , message){
    super(); //特に意味はない
    switch(eventType){
      case "OPEN" : itt = open(message); break;
      default : console.warn("そんなイベントはないよ！")
    }
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MessageEvent;



/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Entity_Effect_Explosion_explosion1_js__ = __webpack_require__(19);









class OpenWallEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(){
    super();
    function* gen(){
      //stage1で開く壁の為 だけ に 作られている!
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].wallList[82]);
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].wallList[80]);
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].wallList[72]);
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].wallList[67]);
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].wallList[61]);
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].wallList[56]);

      let p = {
        x : 160,
        y : 352,
      }
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_7__Entity_Effect_Explosion_explosion1_js__["a" /* default */](p));
      p.y -=32
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_7__Entity_Effect_Explosion_explosion1_js__["a" /* default */](p));
      p.y -=32
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_7__Entity_Effect_Explosion_explosion1_js__["a" /* default */](p));
      let e = new __WEBPACK_IMPORTED_MODULE_6__Event_quakeEvent_js__["a" /* default */](20,0.9);
      __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__["a" /* default */].eventList.push(e);
      __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlaySE("missileHit");
    }
    let itt = gen();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = OpenWallEvent;



/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(3);
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
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__font_js__ = __webpack_require__(20);







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
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__backEntity_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__UI_message_js__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Effect_signpop_js__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__UI_stagePop_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__UI_font_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__UI_gaugeBullet_js__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__Effect_bright_js__ = __webpack_require__(38);




















class Shop extends __WEBPACK_IMPORTED_MODULE_11__backEntity_js__["a" /* default */]{
  constructor(pos,message){
    super(pos,0);
    /*基本情報*/
    this.layer= "ENTITY";
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
    let weaponName = this.message[0];
    if(this.isRead){
      __WEBPACK_IMPORTED_MODULE_10__game_js__["a" /* default */].scene.PushSubState("MES");

      //this.messageの武器を手に入れる
      //もう持っていたら発生しない
      if(!__WEBPACK_IMPORTED_MODULE_9__param_js__["a" /* default */].player.havingWeaponList[weaponName]){
        let text = this.ToJap(weaponName)+"をてにいれた\ncキーでチェンジできるよ↓"; 
        __WEBPACK_IMPORTED_MODULE_12__UI_uiManager_js__["a" /* default */].PopMessage(text,"POP");
        //テスト
        __WEBPACK_IMPORTED_MODULE_9__param_js__["a" /* default */].player.havingWeaponList[weaponName] = true;
        __WEBPACK_IMPORTED_MODULE_12__UI_uiManager_js__["a" /* default */].bullet.Push(weaponName);
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
      __WEBPACK_IMPORTED_MODULE_12__UI_uiManager_js__["a" /* default */].addUI(new __WEBPACK_IMPORTED_MODULE_15__UI_stagePop_js__["a" /* default */](p,"-" + this.ToJap(weaponName) +"をてにいれた "));//SCORE
    }
  }
  //武器名を日本語にするだけ
  ToJap(weaponName){
    switch(weaponName){
      case "missile" : return "ミサイル";
      case "laser" : return "レーザー";
      case "weapon4" : return "weapon4";
      case "weapon5" : return "weapon5";
      default : console.warn("Error ToJapWeaponName");
    }
  }

  Update(){
    //page : 現在のページ番号
    let player = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player;
    if(this.frame%8 == 0){
      let trail = new __WEBPACK_IMPORTED_MODULE_18__Effect_bright_js__["a" /* default */](ADV(this.pos,Rand2D(16)),Rand2D(0.5));
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(trail);
    }
    if(DIST(player.pos,this.pos) <  16 && player.isAlive){
        player.isCanRead = true;
      if( __WEBPACK_IMPORTED_MODULE_6__input_js__["a" /* default */].isKeyClick(KEY.X)){
        this.Read();
      }
    }
    this.frame++;
  }
}
/* unused harmony export default */



/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__timer_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__input_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Stage_mapData_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Stage_stageGen_js__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Event_gameOverEvent_js__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Weapon_weaponManager_js__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Effect_bulletShot_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Effect_Explosion_explosion1_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__Effect_Explosion_explosion2_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__Effect_Explosion_explosion3_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__Effect_weaponIcon_js__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__UI_stagePop_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__Stage_distanceField_js__ = __webpack_require__(71);





























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

//ぽよぽよイベント
class Elast{
  constructor(){
    function* elast(){
      let timer = 30;
      let player = __WEBPACK_IMPORTED_MODULE_9__Stage_entityManager_js__["a" /* default */].player;
      player.sprite.scale.y = 0.6;
      player.sprite.scale.x = 2.0;
      while(timer > 0){
        timer--;
        let difY= 1 - player.sprite.scale.y;
        player.sprite.scale.y += difY*0.2;
        player.sprite.scale.x = 1/player.sprite.scale.y;
        player.sprite.position.x -= 16*(player.sprite.scale.x-1)/2;
        player.sprite.position.y -= 16*(player.sprite.scale.y-1);
        yield;
      }
      player.sprite.scale.y = 1;
      yield;
    } 
    this.func = elast();
  }

  Do(){
    return this.func.next();
  }
}

class Player extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0(),VEC0());
    /*基本情報*/
    let p = CPV(this.pos);
    this.collider = new __WEBPACK_IMPORTED_MODULE_5__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_7__Collision_box_js__["a" /* default */](pos,8,16));//衝突判定の形状
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
    this.pattern = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].playerPattern;
    this.spid = 0 // spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position.x = Math.floor(this.pos.x);
    this.sprite.position.y = Math.floor(this.pos.y);
    /*パラメータ*/
    this.param = __WEBPACK_IMPORTED_MODULE_2__param_js__["a" /* default */].player;
    this.maxHP = __WEBPACK_IMPORTED_MODULE_2__param_js__["a" /* default */].player.maxHp;
    this.hp = this.maxHP;
    this.maxBullet = __WEBPACK_IMPORTED_MODULE_2__param_js__["a" /* default */].player.maxBullet;
    this.bullet = this.maxBullet;
    this.gravity = __WEBPACK_IMPORTED_MODULE_2__param_js__["a" /* default */].player.gravity;
    this.arg = 0;//狙撃角度 0 - 2π
    this.scArg = 0;//スクロール用
    this.toArg = 0;
    this.scPos = VEC0();//スクロール位置
    this.score = this.param.score;
    this.force = VEC0();
    //UIManager.HP.SetBar(this.hp);//HPbarの更新
    //UIManager.bullet.SetBar(this.bullet);//HPbarの更新
    this.vxMax = __WEBPACK_IMPORTED_MODULE_2__param_js__["a" /* default */].player.vxMax;
    this.vyMax = __WEBPACK_IMPORTED_MODULE_2__param_js__["a" /* default */].player.vyMax;
    /*状態*/
    this.state = STATE.WAITING;
    this.weapon = __WEBPACK_IMPORTED_MODULE_16__Weapon_weaponManager_js__["a" /* default */].weapons[this.param.equip];//選択中の武器のインスタンス
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
      this.eventList = [];
  }
  //死亡後に初期状態に回復するため
  ResetStatus(){
    this.param.status={
      hp: this.param.maxHp,
      bullet:this.param.maxBullet,
    }
  }
  //ステージクリア後にStatusを引き継ぐため
  SetStatus(){
    this.hp = this.param.status.hp;
    this.bullet = this.param.status.bullet;
  }

  /*キー入力による移動*/
  Input(){
    /*ジャンプ*/
    if(__WEBPACK_IMPORTED_MODULE_8__input_js__["a" /* default */].isKeyClick(KEY.Z)){

      if(this.isJump == false){
        //なんかバグる
        //EntityManager.addEntity(new Explosion3(CPV(this.pos)));
        this.vel.y = - __WEBPACK_IMPORTED_MODULE_2__param_js__["a" /* default */].player.jumpVel;
        this.isJump = true;
        this.state = STATE.JUMPING;
        // ■ SoundEffect : jump
        __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("jump1");
        //Audio.PlaySE("changeWeapon",-1);
        //effect
        let p = ADV(this.pos,VECY(12));
        let v = {
          x : Rand(1),
          y : Rand(0.4),
        }
        let s = __WEBPACK_IMPORTED_MODULE_25__Stage_pool_js__["a" /* default */].GetSmoke(p,v,1);
        if(s!==false) __WEBPACK_IMPORTED_MODULE_9__Stage_entityManager_js__["a" /* default */].addEntity(s);
      }
    }
    /*空中ジャンプ*/
    //空中でZ押すとbulletを消費してジャンプできる
    if(__WEBPACK_IMPORTED_MODULE_8__input_js__["a" /* default */].isKeyClick(KEY.Z)){
      //this.AirJump();
    }
    /*右向き*/
    if(__WEBPACK_IMPORTED_MODULE_8__input_js__["a" /* default */].isKeyInput(KEY.RIGHT)){
      this.state = STATE.RUNNING;
      this.dir = DIR.R;
      this.isRun = true;
      this.toArg = 0;
      this.acc.x = __WEBPACK_IMPORTED_MODULE_2__param_js__["a" /* default */].player.runVel;
      this.vel.x = Math.max(0 , this.vel.x);
    }
    /*左向き*/
    if(__WEBPACK_IMPORTED_MODULE_8__input_js__["a" /* default */].isKeyInput(KEY.LEFT)){
      this.state = STATE.RUNNING;
      this.dir = DIR.L;
      this.isRun = true;
      this.toArg = Math.PI;
      this.acc.x = -__WEBPACK_IMPORTED_MODULE_2__param_js__["a" /* default */].player.runVel;
      this.vel.x = Math.min(0 , this.vel.x);
    }
    /*上向き*/
    if(__WEBPACK_IMPORTED_MODULE_8__input_js__["a" /* default */].isKeyInput(KEY.UP)){
      //右向き上 or 左向き上
      if(this.dir == DIR.R || this.dir == DIR.UR || this.dir == DIR.DR){
        this.dir = DIR.UR;
      }else if(this.dir == DIR.L || this.dir == DIR.UL || this.dir == DIR.DL){
        this.dir = DIR.UL;
      }
      this.toArg = 3 * Math.PI/2;
    }
    /*下向き*/
    if(__WEBPACK_IMPORTED_MODULE_8__input_js__["a" /* default */].isKeyInput(KEY.DOWN)){
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
    if(__WEBPACK_IMPORTED_MODULE_8__input_js__["a" /* default */].isKeyInput(KEY.X)){
      if(this.isCanRead){
        this.isReading = true;
        this.state = STATE.WAITING;
        return;
      }
      this.weapon.shot(this);
    }
    /*for debug*/
    if(__WEBPACK_IMPORTED_MODULE_8__input_js__["a" /* default */].isKeyClick(KEY.C) && this.isAlive){
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
  AirJump(){
    if(this.state == STATE.FALLING){
      let jumpCost = 20
        if(this.bullet >= jumpCost){
          __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("jump2");
          __WEBPACK_IMPORTED_MODULE_9__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_21__Effect_Explosion_explosion2_js__["a" /* default */](CPV(this.pos),Math.PI*(1/2)));
          __WEBPACK_IMPORTED_MODULE_12__Event_eventmanager_js__["a" /* default */].PushEvent(new __WEBPACK_IMPORTED_MODULE_23__Event_quakeEvent_js__["a" /* default */](20,0.8));
          this.frameShot = this.frame;//最終ショット時刻
            this.vel.y = - __WEBPACK_IMPORTED_MODULE_2__param_js__["a" /* default */].player.jumpVel;
          this.bullet -= 20;
          this.state = STATE.JUMPING;
        }else{
          //足りないとできない
          __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("empty");
          __WEBPACK_IMPORTED_MODULE_9__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_18__Effect_fontEffect_js__["a" /* default */](this.pos,"たりないよ","pop"));
        }
    }
  }
  /*状態からアニメーションを行う*/
  Animation(){
    this.sprite.position = {
      x : Math.floor(this.pos.x-4),
      y : Math.floor(this.pos.y)
    }
    //無敵時間中の点滅
    if(this.isInvincible){
      if(this.frame%4 < 2)this.sprite.alpha = 1;
      else this.sprite.alpha = 0;
    }else{
      this.sprite.alpha = 1;
    }

    this.frame++;
    let state;
    let animWait = Math.floor(__WEBPACK_IMPORTED_MODULE_2__param_js__["a" /* default */].player.animWait/__WEBPACK_IMPORTED_MODULE_1__timer_js__["a" /* default */].timeScale);
    let animRun = Math.floor(__WEBPACK_IMPORTED_MODULE_2__param_js__["a" /* default */].player.animRun/__WEBPACK_IMPORTED_MODULE_1__timer_js__["a" /* default */].timeScale);
    switch(this.state){
      case STATE.WAITING :
        this.spid = (Math.floor(this.frame/animWait))%4
          state = "wait";
          break;
      case STATE.JUMPING :
        this.spid = (Math.floor(this.frame/animRun))%4
          state = "jump";
          break;
      case STATE.FALLING :
        this.spid = (Math.floor(this.frame/animRun))%4;
          state = "fall";
        break;
      case STATE.RUNNING :
        this.spid = (Math.floor(this.frame/animRun))%6;
        state = "run";
        //走り中は画像をちょっとだけ跳ねさせる
        //スプライト位置を動かしているだけなので当たり判定は変化していない
        let a = 2;//振幅
        let l = 9;//周期
        let f = (Math.abs((this.frame%l -l/2))-l/2);
        this.sprite.position.y = this.pos.y - a*4*f*f/l/l;
        if(this.frame%Math.floor(10/__WEBPACK_IMPORTED_MODULE_1__timer_js__["a" /* default */].timeScale) == 0 && this.floor.on){;
          //歩き土埃エフェクト
          let p = ADV(this.pos,VECY(16));
          let v = {
            x : -this.vel.x/2,
            y : -0.3 + Rand(0.1),
          }
          let s = __WEBPACK_IMPORTED_MODULE_25__Stage_pool_js__["a" /* default */].GetSmoke(p,v,0.6);
          if(s!==false) __WEBPACK_IMPORTED_MODULE_9__Stage_entityManager_js__["a" /* default */].addEntity(s);
          //■ SE : foot
          switch(this.floor.under.material){
            case "wall" : __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("landing1",0);break;
            case "steel": __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("landing2",-0.0,0.8);__WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("landing1",-1);break;
            case "wood": __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("landing1",1);break;
            default : console.warn("マテリアルが設定されていません");break;
          }
        }
        break;
        //死亡
        case STATE.DYING:
          this.spid = Math.min(7,(Math.floor((this.frame - this.frameDead)/animRun)));
          state = "dying"
          break;
    }
    if(state == "dying"){
      this.sprite.texture = this.pattern[state][this.spid];
    }else{
      this.sprite.texture = this.pattern[state+this.dir][this.spid];
    }
    //elast
    for(let e of this.eventList){
      if(e.Do().done){
        this.eventList.remove(e);
      }
    }
  }

  //他から呼ばれる系
  /*武器チェンジ*/
  ChangeWeapon(name){
    this.weapon.Reset();
    __WEBPACK_IMPORTED_MODULE_16__Weapon_weaponManager_js__["a" /* default */].ChangeWeapon(this,name);
    __WEBPACK_IMPORTED_MODULE_17__UI_uiManager_js__["a" /* default */].bullet.ChangeWeapon(name);
    //変更先の武器アイコンをpop
    let p = CPV(this.pos);
    p.y-=8;
    __WEBPACK_IMPORTED_MODULE_9__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_24__Effect_weaponIcon_js__["a" /* default */](p,name));
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
      __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("playerDamage");

      //bulletが少ないと防御力がさがる(思いつき)
      //0~1
      /*
      let def = (1 - this.bullet/this.maxBullet)
      atk *= (1 + 30*def*def);
      atk = Math.floor(atk);
      */

      this.hp+=atk;
      //フォントはダメージ数に応じて数字を表示する　
      __WEBPACK_IMPORTED_MODULE_9__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_18__Effect_fontEffect_js__["a" /* default */](this.pos,-atk+"","player"));
      this.hp = Math.max(this.hp,0);
      //ダメージを受けて一定時間無敵になる
      this.isInvincible = true;
      this.frameDamaged = this.frame;
      __WEBPACK_IMPORTED_MODULE_12__Event_eventmanager_js__["a" /* default */].PushEvent(new __WEBPACK_IMPORTED_MODULE_23__Event_quakeEvent_js__["a" /* default */](10,0.6));
    }
  }
  //コイン取得
  GetScore(){
    if(this.isAlive){
      this.score+=1;
      this.param.score = this.score;
      this.bullet += 5;//とりあえずbulletも回復しとくか
      //this.hp += 1;//とりあえずhpも回復しとくか
      this.hp = clamp(this.hp,0,this.maxHP);
      __WEBPACK_IMPORTED_MODULE_17__UI_uiManager_js__["a" /* default */].score.SetScore(this.score);
    }
  }
  /* 衝突判定 */
  Collision(){
    //下からしか通れない物体
    this.floor.on = false;
    this.floor.under = null;
    //壁
    for(let l of __WEBPACK_IMPORTED_MODULE_9__Stage_entityManager_js__["a" /* default */].colliderList){
      if(l == this)continue;
      if(l.coltype == "none")continue;
      let c = __WEBPACK_IMPORTED_MODULE_6__Collision_collision_js__["a" /* default */].on(this,l);
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
              //ぽよぽよイベント
              this.eventList.push(new Elast);
              //着地効果音
              switch(l.material){
                case "wall": __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("landing1",1);break;
                case "steel": __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("landing2",1);__WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("landing1");break;
                case "wood": __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("landing1",1);break;
                default : console.warn(l.material);
              }
              this.isJump = false;
            }
        }
        //Resolve
        switch(l.colType){
          case "through" : 
            //下からのみ通り抜けられる床
            if(c.n.y == -1 && l.pos.y - (this.pos.y - (this.vel.y-l.vel.y) + 8) > 0&& this.vel.y > 0){
              __WEBPACK_IMPORTED_MODULE_6__Collision_collision_js__["a" /* default */].Resolve(this,l);
            }
            break;
          case "wall" : __WEBPACK_IMPORTED_MODULE_6__Collision_collision_js__["a" /* default */].Resolve(this,l);break;
          default : console.warn(l.colType);break;
        /*note : now isHit == false*/
        }
      }//衝突処理ここまで
    }//forここまで
    if(!this.floor.on)this.isJump = true;
  }
  Physics(){
    //動く床に乗っている時
    if(this.floor.on){
      this.pos.x += this.floor.under.vel.x*__WEBPACK_IMPORTED_MODULE_1__timer_js__["a" /* default */].timeScale;  
      this.pos.y += this.floor.under.vel.y*__WEBPACK_IMPORTED_MODULE_1__timer_js__["a" /* default */].timeScale;  
    }
    this.acc.x += this.force.x;
    this.acc.y += this.force.y;
    this.acc.y += this.gravity;
    this.vel.x += this.acc.x*__WEBPACK_IMPORTED_MODULE_1__timer_js__["a" /* default */].timeScale; 
    this.vel.y += this.acc.y*__WEBPACK_IMPORTED_MODULE_1__timer_js__["a" /* default */].timeScale; 
    this.pos.x += this.vel.x*__WEBPACK_IMPORTED_MODULE_1__timer_js__["a" /* default */].timeScale+this.acc.x*this.acc.x*__WEBPACK_IMPORTED_MODULE_1__timer_js__["a" /* default */].timeScale; 
    if(this.isJump)this.pos.y += this.vel.y*__WEBPACK_IMPORTED_MODULE_1__timer_js__["a" /* default */].timeScale+this.acc.y*this.acc.y*__WEBPACK_IMPORTED_MODULE_1__timer_js__["a" /* default */].timeScale; 
    //最大速度制限:
    this.vel.x = clamp(this.vel.x,-this.vxMax, this.vxMax);
    if(this.vel.y > this.vyMax)this.vel.y = this.vyMax;
    //if(this.vel.y < -this.vyMax)this.vel.y = -this.vyMax;
    /*摩擦
     * 地面にいる&&入力がない場合のみ有向*/
     if(this.state == STATE.WAITING){
      this.vel.x *= __WEBPACK_IMPORTED_MODULE_2__param_js__["a" /* default */].player.fliction;
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
     this.pos.x = clamp(this.pos.x , 0 , 16*__WEBPACK_IMPORTED_MODULE_14__drawer_js__["a" /* default */].mapSize.width-8);
     this.pos.y = Math.max(this.pos.y,0);//↑端
     if(this.pos.y > __WEBPACK_IMPORTED_MODULE_14__drawer_js__["a" /* default */].mapSize.height * 16+8)this.Damage(-999);//下端
    this.force.x *= 0.9;
    this.force.y *= 0.9;
    //this.CollisionByDistance();

  }
  CollisionByDistance(){
    if(__WEBPACK_IMPORTED_MODULE_27__Stage_distanceField_js__["a" /* default */].GetDistance(this.pos)<=0){
      let t = 0;
      while(__WEBPACK_IMPORTED_MODULE_27__Stage_distanceField_js__["a" /* default */].GetDistance(this.pos)<=0 && t <16){
        let grad = __WEBPACK_IMPORTED_MODULE_27__Stage_distanceField_js__["a" /* default */].GetDistanceGrad(this.pos);
        let dist = __WEBPACK_IMPORTED_MODULE_27__Stage_distanceField_js__["a" /* default */].GetDistance(this.pos);
        this.pos.x += grad.x;
        this.pos.y += grad.y;
        t ++;
      }
      this.isJump = false;
    }
  }

  ScrollByDir(){
    let d = POV(this.arg,100*po(this.offset));
    let p = ADV(this.pos,d);
    if(__WEBPACK_IMPORTED_MODULE_8__input_js__["a" /* default */].isKeyInput(KEY.SP)) {
      let to = ADV(p,MLV(this.scPos,VECN(-1)));
      this.scPos = ADV(this.scPos , MLV(to,VECN(1/20)));
      this.offset = Math.min(this.offset+0.5,20);
      __WEBPACK_IMPORTED_MODULE_14__drawer_js__["a" /* default */].ScrollOn(this.scPos);
    }else{
      this.scPos = p;
      this.offset = 0;
    }
      __WEBPACK_IMPORTED_MODULE_14__drawer_js__["a" /* default */].SetMagnification(3-po(this.offset)/2);
  }

  Observer(){
    if(this.hp <= 0){
      if(this.isAlive){
        //なおせ
        __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].StopBGM();
        //死亡開始時に一回だけ呼ばれる部分
        this.ResetStatus();
        __WEBPACK_IMPORTED_MODULE_12__Event_eventmanager_js__["a" /* default */].PushEvent(new __WEBPACK_IMPORTED_MODULE_23__Event_quakeEvent_js__["a" /* default */](50,0.9));
        __WEBPACK_IMPORTED_MODULE_9__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_20__Effect_Explosion_explosion1_js__["a" /* default */](CPV(this.pos)));
        __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("bomb",-1.0);
        __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("missileHit");
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
          let g = new __WEBPACK_IMPORTED_MODULE_13__Event_gameOverEvent_js__["a" /* default */]();
          __WEBPACK_IMPORTED_MODULE_12__Event_eventmanager_js__["a" /* default */].PushEvent(g);
        }
        this.isDying = false;
      }
    }
  }

  //bulletのかいふく
  Supply(){
    //最後に撃った時刻から経過するほど早くなる
    let t = (this.frame-this.frameShot);
    if(t<=500 && t%10 == 0) this.bullet++;
    else if(t>500 && t<=1000 && t%5 == 0) this.bullet++;
    else if(t>1000 && t<=1500 && t%3 == 0) this.bullet++;
    else if(t>1500) this.bullet+=2;
    this.bullet = clamp(this.bullet,0,this.maxBullet);
    __WEBPACK_IMPORTED_MODULE_17__UI_uiManager_js__["a" /* default */].bullet.SetBar(this.bullet); //BulletBarの更新
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
    if(this.pos.y < __WEBPACK_IMPORTED_MODULE_11__Stage_stageGen_js__["a" /* default */].checkpoint * 16){
      __WEBPACK_IMPORTED_MODULE_11__Stage_stageGen_js__["a" /* default */].GenerateChunk(__WEBPACK_IMPORTED_MODULE_11__Stage_stageGen_js__["a" /* default */].checkpoint);
    }
    if(this.pos.y > __WEBPACK_IMPORTED_MODULE_11__Stage_stageGen_js__["a" /* default */].wall.left.lastGrid.y * 16){
      this.Damage(-999);
    }
  }
  Debug(){
    if(this.maxHP != 300 && __WEBPACK_IMPORTED_MODULE_8__input_js__["a" /* default */].isKeyClick(KEY.K) && this.isAlive && __WEBPACK_IMPORTED_MODULE_15__game_js__["a" /* default */].debug){
      let p = {
        x : 64,
        y : 96
      }
      __WEBPACK_IMPORTED_MODULE_17__UI_uiManager_js__["a" /* default */].addUI(new __WEBPACK_IMPORTED_MODULE_26__UI_stagePop_js__["a" /* default */](p,"-HPがふえた "));//SCORE
      p.y += 10;
      if(!this.param.havingWeaponList.missile){
        this.param.havingWeaponList.missile = true;
        __WEBPACK_IMPORTED_MODULE_17__UI_uiManager_js__["a" /* default */].bullet.Push("missile");
      }
      if(!this.param.havingWeaponList.laser){
        this.param.havingWeaponList.laser = true;
        __WEBPACK_IMPORTED_MODULE_17__UI_uiManager_js__["a" /* default */].bullet.Push("laser");
      }
      //最大HP変更
      this.param.maxHp = 300;
      __WEBPACK_IMPORTED_MODULE_17__UI_uiManager_js__["a" /* default */].HP.max = 300;
      this.Damage(-999);
      __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlaySE("missileHit");
    }
  }

  Update(){
    if(__WEBPACK_IMPORTED_MODULE_15__game_js__["a" /* default */].debug)this.Debug();
    //player関連のイベントを裁く
      
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
      __WEBPACK_IMPORTED_MODULE_17__UI_uiManager_js__["a" /* default */].HP.SetBar(this.hp);//HPbarの更新
    }
    this.isCanRead = false;
    //this.CreateStage();//マップ生成
    this.ScrollByDir();//向きに応じてスクロール位置を変更
    __WEBPACK_IMPORTED_MODULE_14__drawer_js__["a" /* default */].ScrollOn(this.pos);//プレイヤー中心にスクロール
    this.Observer(); //死亡チェック
    this.Dying();//死亡中
    //無敵時間の有向時間
    if(this.frame - this.frameDamaged > __WEBPACK_IMPORTED_MODULE_2__param_js__["a" /* default */].player.invTime){
      this.isInvincible = false;
    }
    /*パラメータ*/
    this.offset *= 0.99;
    this.Animation();//状態から画像を更新
    /*reset*/
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;




/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_Bullet_bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_Bullet_bullet1_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__weapon_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Entity_Effect_bulletShot_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Entity_Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Entity_Effect_Explosion_explosion1_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Entity_Effect_Explosion_explosion2_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Entity_Effect_lasersight_js__ = __webpack_require__(29);















class Weapon1 extends __WEBPACK_IMPORTED_MODULE_3__weapon_js__["a" /* default */]{
  constructor(){
    super("missile");
    /*基本情報*/
    /*パラメータ*/
    this.param = __WEBPACK_IMPORTED_MODULE_10__param_js__["a" /* default */].weapon1;
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
    let bullet = new __WEBPACK_IMPORTED_MODULE_1__Entity_Bullet_bullet1_js__["a" /* default */](p,this);
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(bullet);
    /* ■ SoundEffect : shot */
    __WEBPACK_IMPORTED_MODULE_5__audio_js__["a" /* default */].PlaySE("missileShot",2);
    /* □ Effect : shot */
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_6__Entity_Effect_bulletShot_js__["a" /* default */](CPV(p),VEC0()));
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_12__Entity_Effect_Explosion_explosion2_js__["a" /* default */](CPV(p),this.arg));
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
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_Bullet_bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_Bullet_bullet2_js__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__weapon_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Entity_Effect_bulletShot_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Entity_Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Entity_Effect_Explosion_explosion1_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Entity_Effect_Explosion_explosion2_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Entity_Effect_lasersight_js__ = __webpack_require__(29);
















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
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_12__Entity_Effect_Explosion_explosion1_js__["a" /* default */](CPV(p)));
    //反動
    //player.vel.x -= v.x/11;
    //if(player.dir == DIR.DR || player.dir == DIR.DL) player.vel.y = -1.2;
    //振動
    __WEBPACK_IMPORTED_MODULE_9__Event_eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_10__Event_quakeEvent_js__["a" /* default */](27,0.8));
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
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AI_bullet2AI_js__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_bulletTrail_js__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__AI_animator_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Effect_Explosion_explosion1_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Effect_Explosion_explosion2_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Effect_Explosion_explosion3_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Stage_pool_js__ = __webpack_require__(12);


















const bullet2 = __WEBPACK_IMPORTED_MODULE_14__param_js__["a" /* default */].bullet2;
const MAX_STEP_COUNT = 30;

//Laser
class Bullet2 extends __WEBPACK_IMPORTED_MODULE_8__bullet_js__["a" /* default */]{
  SetParam(){
    this.hp = __WEBPACK_IMPORTED_MODULE_14__param_js__["a" /* default */].bullet2.hp;//弾丸のHP 0になると消滅
    this.atkMax = __WEBPACK_IMPORTED_MODULE_14__param_js__["a" /* default */].bullet2.atkMax;//攻撃力
    this.atkMin = __WEBPACK_IMPORTED_MODULE_14__param_js__["a" /* default */].bullet2.atkMin;//攻撃力
  }
  constructor(pos,arg,isMarchNext,stepCount){
    super(pos,POV(arg,VEC0()));
    this.Init(pos,arg);
    this.March(isMarchNext,stepCount);
  }
  Init(pos,arg){
    /*基本情報*/
    this.frame = 0;
    this.arg = arg;
    this.isUpdater  =true;
    this.layer = "BACK"//壁に埋めるため
    this.name = "laser";
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].bulletPattern.bullet2;
    this.SetSprite();
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this.collider = new __WEBPACK_IMPORTED_MODULE_1__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_3__Collision_box_js__["a" /* default */](pos,6,6));
    this.SetParam();
    /*AI*/
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_7__AI_bullet2AI_js__["a" /* default */](this));
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_10__AI_animator_js__["a" /* default */](this,false,2,8));
  }
  Explode(){
    const e = new __WEBPACK_IMPORTED_MODULE_13__Effect_Explosion_explosion3_js__["a" /* default */](CPV(this.pos),VEC0());
    __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].addEntity(e);
  }
  Reflect(collisionInfo){
    let i = POV(this.arg,-16);//入射角ベクトル
    let r = reflect(i,collisionInfo.n);
    this.arg = argument(r);
  }
  March(isMarchNext,stepCount){
    //壁にぶつかってなければレーザー光線を進める
    if(stepCount > MAX_STEP_COUNT) return;
    this.stepCount = stepCount;
    /*
     * continnue 無視
     * break ... 貫通
     * return .. 停止
     * */
    for(let collider of __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].colliderList){
      if(collider.name == "player")continue;
      let c = __WEBPACK_IMPORTED_MODULE_2__Collision_collision_js__["a" /* default */].on(this,collider);
      if(c.isHit){
        //木箱 破壊したら貫通
        if(collider.isBreakable){
          collider.Damage(-1);
          this.Explode();
          if(collider.hp > 0)return;
          break;
        }
        //敵 倒せたら貫通
        if(collider.type == "ENEMY"){
          __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_13__Effect_Explosion_explosion3_js__["a" /* default */](CPV(this.pos),this.arg + Math.PI));
          collider.Damage(-RandBET(this.atkMin,this.atkMax));
          if(collider.hp > 0)return;
          break;
        } 
        //鉄 反射
        if(collider.material == "steel") this.Reflect(c);

        __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_12__Effect_Explosion_explosion2_js__["a" /* default */](CPV(this.pos),this.arg + Math.PI));
        return; //壁にぶつかったので停止
      }
    }
    //再帰呼び出し
    let p = ADV(this.pos,POV(this.arg,16));
    let bullet = new Bullet2(p,this.arg,isMarchNext,stepCount+1);
    __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].addEntity(bullet);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet2;



/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Effect_bulletHitWall_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Effect_Explosion_explosion1_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Effect_Explosion_explosion2_js__ = __webpack_require__(25);






class Bullet2AI{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  Observer(){
    if( this.bullet.frame > 20 || this.bullet.hp<=0){
      __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].removeEntity(this.bullet);
    }
  }
  Do(){
    this.Observer();
    this.bullet.sprite.position = ADV(this.bullet.pos,VECN(8));
    this.bullet.sprite.position.x -=4;
    this.bullet.sprite.rotation = this.bullet.arg;

    this.bullet.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet2AI;



/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_Bullet_bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_Bullet_bullet3_js__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__weapon_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Entity_Effect_bulletShot_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Entity_Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Entity_Effect_lasersight_js__ = __webpack_require__(29);















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
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Effect_bullettrail2_js__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__AI_bullet3AI_js__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__AI_horming_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__AI_emitTrail_js__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__AI_animator_js__ = __webpack_require__(27);















//normal bullet
class Bullet3 extends __WEBPACK_IMPORTED_MODULE_10__bullet_js__["a" /* default */]{
  constructor(pos,weapon){
    super(pos,POV(weapon.arg,weapon.speed));
    this.Init(pos,weapon);
  }
  SetParam(){
    this.hp = __WEBPACK_IMPORTED_MODULE_11__param_js__["a" /* default */].bullet3.hp;//弾丸のHP 0になると消滅
    this.atkMin = __WEBPACK_IMPORTED_MODULE_11__param_js__["a" /* default */].bullet3.atkMin;//攻撃力
    this.atkMax = __WEBPACK_IMPORTED_MODULE_11__param_js__["a" /* default */].bullet3.atkMax;//攻撃力
    this.deleteFrameCount = __WEBPACK_IMPORTED_MODULE_11__param_js__["a" /* default */].bullet3.deleteFrameCount;//残存時間
    //this.curve = Param.bullet3.curve;
  }
  Init(pos,weapon){
    /*基本情報*/
    this.frame = 0;
    this.name = "normal";
    this.isUpdater = true;
    this.arg = weapon.arg;
    this.vi = weapon.speed;
    this.isTargetOn = weapon.isTargetOn;
    if(this.isTargetOn) this.targetedEnemy = weapon.target.enemy
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].bulletPattern.bullet3;
    this.SetSprite();
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,4,4));//衝突判定の形状
    this.SetParam();
    let emitTerm = 2;
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_8__AI_bullet3AI_js__["a" /* default */](this));
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_12__AI_emitTrail_js__["a" /* default */](this,__WEBPACK_IMPORTED_MODULE_5__Effect_bullettrail2_js__["a" /* default */],emitTerm));
    //if(weapon.isHorming) this.AIList.push(new Horming(this));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet3;



/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Effect_bulletHitWall_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Effect_bullettrail2_js__ = __webpack_require__(70);







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
    for(let enemy of __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].enemyList){
      if(__WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__["a" /* default */].on(this.bullet,enemy).isHit){
        enemy.Damage( -RandomRange(this.bullet.atkMin,this.bullet.atkMax));
        this.bullet.hp--;
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
              case  "steel": __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("landing3",4,2);break;
              }
            this.bullet.hp = 0;
          }
      }
    }
  }

  Observer(){
    if(this.bullet.hp<=0 ||
      this.bullet.frame > 30) {
      __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].removeEntity(this.bullet);
      __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_2__Effect_bulletHitWall_js__["a" /* default */](CPV(this.bullet.pos)));
    }
  }
  Do(){
    this.collision();
    this.Phisics();
    this.Observer();

    this.bullet.sprite.position = ADV(this.bullet.pos,VECN(8));
    this.bullet.sprite.rotation = this.bullet.arg + Math.PI/2;
    this.bullet.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet3AI;



/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_Bullet_bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_Bullet_bullet4_js__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__weapon_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Entity_Effect_bulletShot_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Entity_Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Entity_Effect_lasersight_js__ = __webpack_require__(29);















//炎
class Weapon4 extends __WEBPACK_IMPORTED_MODULE_4__weapon_js__["a" /* default */]{
  constructor(){
    //ここの名前を忘れずに変更すること
    super("weapon4");
    /*基本情報*/
    /*パラメータ*/
    this.param = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].weapon4;
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
    let bullet = new __WEBPACK_IMPORTED_MODULE_1__Entity_Bullet_bullet4_js__["a" /* default */](p,this);
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(bullet);
    /* ■ SoundEffect : shot */
    __WEBPACK_IMPORTED_MODULE_6__audio_js__["a" /* default */].PlaySE("playerDamage",-0.2);
    //振動
    __WEBPACK_IMPORTED_MODULE_10__Event_eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_11__Event_quakeEvent_js__["a" /* default */](10,0.5));
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Weapon4;



/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AI_animator_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timer_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__AI_bullet4AI_js__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__AI_horming_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Effect_bulletTrail2_js__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Effect_bulletHitWall_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__param_js__ = __webpack_require__(7);

















//normal bullet
class Bullet4 extends __WEBPACK_IMPORTED_MODULE_12__bullet_js__["a" /* default */]{
  constructor(pos,weapon){
    super(pos,POV(weapon.arg,weapon.speed));
    this.Init(pos,weapon);
  }
 SetParam(){
    this.hp = __WEBPACK_IMPORTED_MODULE_15__param_js__["a" /* default */].bullet4.hp;//弾丸のHP 0になると消滅
    this.atkMin = __WEBPACK_IMPORTED_MODULE_15__param_js__["a" /* default */].bullet4.atkMin;//攻撃力
    this.atkMax = __WEBPACK_IMPORTED_MODULE_15__param_js__["a" /* default */].bullet4.atkMax;//攻撃力
    //this.curve = Param.bullet3.curve;
  }
  Init(pos,weapon){
    /*基本情報*/
    this.frame = 0;
    this.name = "weapon4";//これはどこで使われてる?
    this.arg = weapon.arg;
    this.vi = weapon.speed;
    this.vel = POV(this.arg,this.vi);
    this.isTargetOn = weapon.isTargetOn;
    if(this.isTargetOn) this.targetedEnemy = weapon.target.enemy
    this.isUpdater = true;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].bulletPattern.buringFire;
    this.SetSprite();
    this.sprite.alpha = 0.8;
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this.collider = new __WEBPACK_IMPORTED_MODULE_5__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_7__Collision_box_js__["a" /* default */](pos,4,4));
    this.SetParam();
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_10__AI_bullet4AI_js__["a" /* default */](this));
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_1__AI_animator_js__["a" /* default */](this,false,1,4));
    this.SetSize(this.size+Rand(8));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet4;



/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Effect_bulletHitWall_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio_js__ = __webpack_require__(2);





class Bullet4AI{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  Phisics(){
    //this.bullet.vi *= 0.9;
    //this.bullet.vi = length(this.bullet.vel)
    //this.bullet.vel = POV(this.bullet.arg,this.bullet.vi);
    this.bullet.vel.y += 0.1;
    this.bullet.pos.x += this.bullet.vel.x;
    this.bullet.pos.y += this.bullet.vel.y;
    this.bullet.arg = argument(this.bullet.vel); 
  }
  /* 衝突判定 */
  collision(){
    for(let l of __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].enemyList){
      if(__WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__["a" /* default */].on(this.bullet,l).isHit){
        if(Dice(30)==1){
          l.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
        }
  //     this.bullet.hp--;
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      };
    }
      for(let w of __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].wallList){
        let c = __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__["a" /* default */].on(this.bullet,w);
        if(c.isHit || this.bullet.vel > 0){
          __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__["a" /* default */].Resolve(this.bullet,w)
          this.bullet.vel.x = 0;
          //this.bullet.vel = reflect(this.bullet.vel,c.n);
          this.bullet.arg = -Math.PI/2;
        }
      }
  }

  Observer(){
    if(this.bullet.hp<=0 ||
      this.bullet.frame > 330) {
      __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].removeEntity(this.bullet);
    }
  }
  Do(){
    this.Phisics();
    this.collision();
    this.Observer();
    //this.sprite.filters = [Drawer.fireFilter];
    //this.sprite.filters[0].uniforms.frame = this.frame;
    //this.bullet.SetSize(this.bullet.size *1.05);
    this.bullet.sprite.anchor.set(0.5);
    this.bullet.sprite.position = ADV(this.bullet.pos,VECN(8));
    this.bullet.sprite.rotation = this.bullet.arg + Math.PI/2;
    this.bullet.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet4AI;



/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(5);





/*bullet3残像*/
class BulletTrail2 extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    this.Init(pos,vel);
  }
  Init(pos,vel){
    /*基本情報*/
    this.name = "bullettrail2";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
      /*スプライト*/
    this.spid = 0; //12~15
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.trail2;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.anchor.set(0.5);
    this.sprite.scale = VECN(Rand(0.5)+1);
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Physics(){
    this.pos = ADV(this.pos,this.vel);
    this.vel = MLV(this.vel,VECN(0.9));
  }


  Update(){
    if(this.isAlive){
      this.sprite.scale = ADV(this.sprite.scale,VECN(-this.frame/128));
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
/* unused harmony export default */



/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_Bullet_bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_pool_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__weapon_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Entity_Effect_bulletShot_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Entity_Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Event_quakeEvent_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__param_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Entity_Effect_lasersight_js__ = __webpack_require__(29);

//import Bullet4 from '../Entity/Bullet/bullet4.js';//debug













class Weapon3 extends __WEBPACK_IMPORTED_MODULE_3__weapon_js__["a" /* default */]{
  constructor(){
    super("normal");
    /*基本情報*/
    /*パラメータ*/
    this.param = __WEBPACK_IMPORTED_MODULE_11__param_js__["a" /* default */].weapon3;
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
//    let bullet = new Bullet5(p,this);
//    EntityManager.addEntity(bullet);
    /* ■ SoundEffect : shot */
    __WEBPACK_IMPORTED_MODULE_5__audio_js__["a" /* default */].PlaySE("normalShot",-0.6);
    /* □ Effect : shot */
    __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_7__Entity_Effect_bulletShot_js__["a" /* default */](CPV(p),VEC0()));
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
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(5);





//武器チェンジ時のアイコンのポップ
class WeaponIcon extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,name){
    super(pos,VEC0());
    /*基本情報*/
    /*スプライト*/
    this.spid = name;
    this.layer = "FOREENTITY";
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].UIPattern.bullet.pop;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.offSetY = 12;
  }
  Update(){
    this.offSetY*= 0.3;
    this.pos = CPV(__WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].player.pos);
    this.pos.y -= 12;
    this.pos.y -= this.offSetY;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
    if(this.frame>30 || this.spid != __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].player.weapon.name)this.Delete();
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WeaponIcon;



/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Event_gameOverEvent_js__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Event_gameClearEvent_js__ = __webpack_require__(72);












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
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__timer_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_fontEffect_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__wall_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Effect_bulletShot_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Effect_blockDebris_js__ = __webpack_require__(109);













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
    this.colType = "wall";
    this.material = "wood";
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
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AI_animator_js__ = __webpack_require__(27);






//woodboxを壊した時の破片
class BlockDebris extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.name = "blockDebris";
    this.gravity = 0.1;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.blockDebris;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.rotation = Rand(2);
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_4__AI_animator_js__["a" /* default */](this,false,4,4));
  }
  Physics(){
    this.vel.y += this.gravity;
    this.pos = ADV(this.pos,this.vel);
  }
  Update(){
    this.ExecuteAI();
      this.Physics();
      if(this.frame >= 16) __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
      this.sprite.position = ADV(this.pos,VECN(8));
      this.frame++;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BlockDebris;



/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_mapData_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wall_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__backEntity_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_bulletShot_js__ = __webpack_require__(26);











let EntityList = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].entityList;

//トゲ
class Needle extends __WEBPACK_IMPORTED_MODULE_7__wall_js__["a" /* default */]{
  constructor(pos,wall){
    super(pos,wall);
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */]({x:pos.x,y:pos.y},16,16));//衝突判定の形状
    this.name = "needle";
    this.layer = "ENTITY";
    this.isUpdater  =true;
    this.hp = 1;
    //wall parameter
    this.isBreakable = wall.isBreakable;
    this.coltype = "none";
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].wallPattern.steel.entity;
    this.spid = 3; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(wall.texture);//現在表示中のスプライト
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
      if(v >1){
        let damage = Math.floor(v/2) + 1;
        __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player.Damage(-damage);
      }
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
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drawer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UI_uiManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_mapData_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__gameClearEvent_js__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__FadeEvent_js__ = __webpack_require__(112);










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
      __WEBPACK_IMPORTED_MODULE_4__UI_uiManager_js__["a" /* default */].PopStage(); 
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StartStageEvent;



/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__drawer_js__ = __webpack_require__(5);








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
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(3);
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
      if(__WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */].debug) __WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */].scene.ChangeState(STATE.INIT,STATE.STAGE);
      else __WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */].scene.ChangeState(STATE.INIT,STATE.TITLE);
      __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__["a" /* default */].DeleteStage();
      if(__WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */].debug) __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__["a" /* default */].CreateStage(__WEBPACK_IMPORTED_MODULE_2__game_js__["a" /* default */].stage,"ENTER");
      else __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__["a" /* default */].CreateStage(0,"ENTER");


      
      yield ;
    }
    let itt = gen();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StartGameEvent;



/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UI_uiManager_js__ = __webpack_require__(6);
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