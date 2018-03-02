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
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_Effect_target_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timer_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Entity_Effect_stone_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Entity_Effect_smoke_js__ = __webpack_require__(28);






/*エンティティマネージャ*/
class EntityManager{
  static Init(){
    this.entityList = [];//全Entityのリスト
    this.enemyList = [];//敵のリスト(moverList?)
    this.wallList = [];//壁のリスト
    this.player;//プレイヤーのインスタンス
    this.updaterList = [];//更新が必要なEntity

    this.entityIndex = 0;
  }

  /*Entityをリストに登録*/
  static addEntity(entity){
    //各entityの参照を保持する
    this.entityList[this.entityIndex] = entity; 
    this.entityIndex++;
    //更新が必要なEntityのみリストに追加
    switch(entity.type){
      case ENTITY.PLAYER : this.player = entity; break;
      case ENTITY.ENEMY : this.enemyList.push(entity); break;
      case ENTITY.WALL : this.wallList.push(entity); break;
    }

    if(entity.isMultiple) __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].addContainer(entity.container,entity.layer);
    else if(entity.isNoSprite);
    else __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].addContainer(entity.sprite,entity.layer);
  }

  /*Entityをリストから削除する*/
  static removeEntity(entity){
    switch(entity.type){
      case ENTITY.PLAYER : this.player = null; break;
      case ENTITY.ENEMY :
        let i = this.enemyList.indexOf(entity);
        this.enemyList.splice(i,1);
        break;
      case ENTITY.WALL :
        let j = this.wallList.indexOf(entity);
        this.wallList.splice(j,1);
        break;
    }
    let k = this.entityList.indexOf(entity);
    this.entityList.splice(k,1);
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
  /*メッセージイベント中にアニメーションだけ行う*/
  static Animation(){
    for(let i=0;i<this.entityIndex;i++){
      let l = this.entityList[i];
      //playerはアニメーションのみ
      if(l.type == ENTITY.PLAYER){
        l.Animation(); 
      }
      //看板は読めるようにする
      if(l.name == "signboard") {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(10);


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
      wIcon : {
        w1 : [
        PIXI.Texture.fromFrame('weapon10.png'),
        PIXI.Texture.fromFrame('weapon11.png'),
        ],
        w2 : [
        PIXI.Texture.fromFrame('weapon12.png'),
        PIXI.Texture.fromFrame('weapon13.png'),
        ],
        w3 : [
        PIXI.Texture.fromFrame('weapon14.png'),
        PIXI.Texture.fromFrame('weapon15.png'),
        ]
      },
      HP : [
        PIXI.Texture.fromFrame('HP00.png'),
        PIXI.Texture.fromFrame('HP01.png'),
        PIXI.Texture.fromFrame('HP02.png'),
      ],
      bullet : {
        outer : PIXI.Texture.fromFrame('UI70.png'),
        bar : PIXI.Texture.fromFrame('UI76.png'),
        icon : {
          missile : PIXI.Texture.fromFrame('UI7a.png'),
          laser : PIXI.Texture.fromFrame('UI7b.png'),
        },
      },
      message : {
        frame : PIXI.Texture.fromFrame('UI80.png'),
      }
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
      lasersight : [
        PIXI.Texture.fromFrame('bullet20.png'),
      ],
      target : [
        PIXI.Texture.fromFrame('bullet30.png'),//Target
      ],
      shot : [
        PIXI.Texture.fromFrame('bullet40.png'),//bullet shot
        PIXI.Texture.fromFrame('bullet41.png'),//bullet shot
        PIXI.Texture.fromFrame('bullet42.png'),//bullet shot
        PIXI.Texture.fromFrame('bullet43.png'),//bullet shot
      ],
      hitWall : [
        PIXI.Texture.fromFrame('bullet50.png'),//bullet hit at wall
        PIXI.Texture.fromFrame('bullet51.png'),//bullet hit at wall
        PIXI.Texture.fromFrame('bullet52.png'),//bullet hit at wall
        PIXI.Texture.fromFrame('bullet53.png'),//bullet hit at wall
      ],
      blur : [ 
        PIXI.Texture.fromFrame('bullet60.png'),//bullet blur
        PIXI.Texture.fromFrame('bullet61.png'),//bullet blur
        PIXI.Texture.fromFrame('bullet62.png'),//bullet blur
        PIXI.Texture.fromFrame('bullet63.png') //bullet blur
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
        sonic :[
          PIXI.Texture.fromFrame('bullet70.png'),//sonic
          PIXI.Texture.fromFrame('bullet71.png'),//sonic
          PIXI.Texture.fromFrame('bullet72.png'),//sonic
          PIXI.Texture.fromFrame('bullet73.png') //sonic
        ]
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
      enemy2 : [
        PIXI.Texture.fromFrame('enemy10.png'),
        PIXI.Texture.fromFrame('enemy11.png'),
        PIXI.Texture.fromFrame('enemy12.png'),
        PIXI.Texture.fromFrame('enemy13.png')
      ],
      //壊せる木箱
      woodbox : [
        PIXI.Texture.fromFrame('enemy10.png')
      ]
    }
    this.wallPattern = {
      block : PIXI.Texture.fromFrame('wall00.png'),//未使用
      goal : PIXI.Texture.fromFrame('wall01.png'),//ゴール
      signboard : PIXI.Texture.fromFrame('wall02.png'),//看板
      needle : [
        PIXI.Texture.fromFrame('wall10.png'),//∧
        PIXI.Texture.fromFrame('wall11.png'),//>
        PIXI.Texture.fromFrame('wall12.png'),//<
        PIXI.Texture.fromFrame('wall13.png'),//V
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
          PIXI.Texture.fromFrame('wall76.png'),//
          PIXI.Texture.fromFrame('wall84.png'),//
          PIXI.Texture.fromFrame('wall85.png'),//
          PIXI.Texture.fromFrame('wall86.png')//
        ],
      },
      //鉄骨
      steel : {
        //entity
        entity : [
        PIXI.Texture.fromFrame('wall90.png'),
        PIXI.Texture.fromFrame('wall91.png'),
        PIXI.Texture.fromFrame('wall92.png'),
        PIXI.Texture.fromFrame('wall93.png'),
        ],
        //backentity
        back : [
        PIXI.Texture.fromFrame('wall94.png'),
        PIXI.Texture.fromFrame('wall95.png'),
        PIXI.Texture.fromFrame('wall96.png'),
        PIXI.Texture.fromFrame('wall97.png'),
        ],
        //back
        backGround : [
        PIXI.Texture.fromFrame('wallA0.png'),
        ],
      }
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
        .load((loader,resources)=>Art.Load(resources)).onComplete.add(res));
  }

  static SpriteFactory(texture){
    return new PIXI.Sprite(texture);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Art;





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_js__ = __webpack_require__(7);


//便利関数
class Util{
  static Init(){
  }

  /*easing functionの連想配列的な*/
  /* out : easeout */
  static easefunc(type){
    switch(type){
      case "out" :
        return (x)=>{return Math.sqrt(x)};
        break;
      default :
        console.warn("easing function");
        break;
    }
  }

  static distance(p1,p2){
    return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
  }

  /*ベクトル系*/
  //ベクトルの正規化
  static nomalize(v){
    let a = Math.sqrt(v.x * v.x + v.y * v.y);
    v.x /= a;
    v.y /= a;
    return v;
  }
  //ベクトルの加算
  static advec(v1,v2){
    return {x:v1.x + v2.x ,y:v1.y + v2.y};
  }
  //廃止予定
  static Rand(d){
    return 2 * d * (Math.random()-0.5);
  }
  //廃止予定
  static Rand2D(d){
    let p = {
      x:this.Rand(d),
      y:this.Rand(d)
    }
    return p;
  }

  //配列の最大値を取るインデックス番号を返す
  //最大値が複数あると一番最後の番号が帰ってくる
  static maxIndex(arr){
    let max = arr[0];
    let maxI = 0;
    for(let i = 1;i<arr.length;i++){
      if(max < arr[i]){
        max = arr[i];
        maxI = i;
      }
    }
    return maxI;
  }
  static minIndex(arr){
    let min = arr[0];
    let minI = 0;
    for(let i = 1;i<arr.length;i++){
      if(min > arr[i]){
        min = arr[i];
        minI = i;
      }
    }
    return minI;
  }


  static quad(x){
    return x*x;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Util;



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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weaponIcon_js__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__HP_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bullet_js__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__font_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__message_js__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__menu_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__ = __webpack_require__(0);










//HP
const P_HP = {
  x : -32, 
  y : 160
};
//bullet
const P_BUL = {
  x : P_HP.x, 
  y : P_HP.y+16, 
};
//score
const P_SCORE = {
  x : 224,
  y : P_BUL.y, 
}
//message
const P_MES = {
  x:40,
  y:35
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
    this.WeaponIconList = [];//武器アイコンのリスト
    this.HP;
    this.bullet;
    this.score;
    this.message;
    this.menu;
  }

  /*タイトルでのUI配置に変更*/
  static SetTitle(){
    this.PopMessage("PRESS SPACE","POP");
  }
  /*ステージ中でのUI配置に変更*/
  static SetStage(){
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_3__HP_js__["a" /* default */](P_HP));//HP
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_4__bullet_js__["a" /* default */](P_BUL));//BULLET
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_5__font_js__["a" /* default */](P_SCORE,"0","SCORE"));//SCORE
  }
  //フィルタ
  static SetFilter(filters){
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].entityContainer.filters = filters;
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].backContainer.filters = filters;
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].backGroundContainer.filters = filters;
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].foreContainer.filters = filters;
  }
  //メニューを開く
  static SetMenu(){
    UIManager.SetFilter([__WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].noiseFilter]);
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_7__menu_js__["a" /* default */](ADV(P_MENU,{x:0,y:16})));
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
    if(type == "POP"){
      UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_6__message_js__["a" /* default */](P_MES,text));//枠
    }else if(type == "PAGE"){
      this.message.Page(text);
    }
  }
  static CloseMessage(){
    UIManager.removeUI(this.message);
  }

  //UIをリストに登録
  static addUI(ui){
    this.UIList.push(ui); 
    switch (ui.type){
      case "HP" : this.HP = ui; break;
      case "BULLET" : this.bullet = ui; break;
      case "SCORE" : this.score = ui;break;
      case "MES" : this.message = ui;break;
      case "MENU" : this.menu = ui;break;
      default : console.warn(ui);
    }
    //スプライトの追加
    if(ui.isMultiple){
      //複スプライト
        __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].addContainer(ui.container,"UI");
    }else{
      //単スプライト
      __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].addContainer(ui.sprite,"UI");
    }
  }
  /*UIをリストから削除*/
  //参照の開放をする
  static removeUI(ui){
    let i = this.UIList.indexOf(ui);
    //要素の子であるFontはリストに無いため参照を消さない
    if(i != -1) this.UIList.splice(i,1);
    if(ui.isMultiple){
      //複数スプライトを持つオブジェクト
        __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].removeContainer(ui.container,"UI");
    }else{
      //単スプライト
      __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].removeContainer(ui.sprite,"UI");
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(2);


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
      if(__WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].distance(circ1.pos,circ2.pos) < circ1.r + circ2.r){
        isHit = true;
        n = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].nomalize({x:circ1.pos.x-circ2.pos.x , y:circ1.pos.y-circ2.pos.y});
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
        let maxI = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].maxIndex(meri);
        let minI = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].minIndex(meri);
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(12);


//これ継承してる意味ある？？
class EFFECT extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos,vel){
    if(!vel) vel = VEC0();
    super(pos,vel);
    this.type = ENTITY.EFFECT;
    this.layer = "ENTITY";
    this.isUpdater = true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EFFECT;



/***/ }),
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_pool_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_mapData_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Event_startStageEvent_js__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Event_startGameEvent_js__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event_scene_js__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__UI_font_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Weapon_weaponManager_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__drawer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__timer_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__param_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__UI_menu_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__audio_js__ = __webpack_require__(17);



















class Game{
  static Init(){
    /*audioとartはinitしない*/
    __WEBPACK_IMPORTED_MODULE_15__param_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_11__drawer_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_1__Stage_pool_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_13__timer_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_14__util_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_9__Weapon_weaponManager_js__["a" /* default */].Init();

    /*initialize Game state*/
    Game.stage = 0;//現在のステージ番号
    Game.scene = new __WEBPACK_IMPORTED_MODULE_6__Event_scene_js__["a" /* default */]();

    //Gameにタイトル画面状態をプッシュ
    let event = new __WEBPACK_IMPORTED_MODULE_5__Event_startGameEvent_js__["a" /* default */]();
    __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__["a" /* default */].PushEvent(event);

    Game.Run();
  }

  static async Load(){
    await __WEBPACK_IMPORTED_MODULE_10__art_js__["a" /* default */].LoadTexture();
    await __WEBPACK_IMPORTED_MODULE_17__audio_js__["a" /* default */].Load();
    Game.Init();
  }

  //タイトル画面中の処理
  static UpdateTitle(){
    if(__WEBPACK_IMPORTED_MODULE_12__input_js__["a" /* default */].isKeyClick(KEY.SP)){
      let event = new __WEBPACK_IMPORTED_MODULE_4__Event_startStageEvent_js__["a" /* default */]();
      __WEBPACK_IMPORTED_MODULE_3__Event_eventmanager_js__["a" /* default */].PushEvent(event);
    }
  }

  //ステージ中の処理
  static UpdateStage(){
    /*Entityの更新*/
     __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].Update();
     __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__["a" /* default */].Update();

     /*ポーズ状態に遷移*/
     if(__WEBPACK_IMPORTED_MODULE_12__input_js__["a" /* default */].isKeyClick(KEY.C) && __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].player.isAlive){
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

  static UpdateSeq(){
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input_js__ = __webpack_require__(13);




let PIXI_WIDTH = 800; let PIXI_HEIGHT = 600;
let size = 1; 
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
    this.filterContainer = new PIXI.Container();//画面遷移フィルター
    this.foreContainer = new PIXI.Container();//手前に表示する 文字エフェクトなど
    this.UIContainer = new PIXI.Container();//UI

    this.app.stage.addChild(this.backGroundContainer);
    this.app.stage.addChild(this.backContainer);
    this.app.stage.addChild(this.entityContainer);
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
    this.filterContainer.scale = po;
    $("#pixiview").append(this.Renderer.view);

    //フィルタ
    this.blurFilter = new PIXI.filters.BlurFilter();
    this.blurFilter.blur = 2;
    this.noiseFilter = new PIXI.filters.NoiseFilter(0.5);
    //this.sepia =filter = new PIXI.filters.SepiaFilter();
    //this.tiltShiftFilter = new PIXI.filters.TiltShiftFilter()
    //this.sepiaFilter = new PIXI.filters.SepiaFilter();
    //this.sepiaFilter.sepia = 0.5;

  }

  /*コンテナにスプライトを追加*/
  static addContainer(sprite,CONTAINER,id){
    switch (CONTAINER){
      case "UI" :
        this.UIContainer.addChild(sprite);
        break;
      case "FILTER":
        this.filterContainer.addChild(sprite);
        break;
      case "ENTITY":
        this.entityContainer.addChild(sprite);
        break;
      case "FORE":
        this.foreContainer.addChild(sprite);
        break;
      case "BACK":
        this.backContainer.addChild(sprite);
        break;
      case "BG":
        this.backGroundContainer.addChild(sprite);
        break;
      default :
        console.warn(CONTAINER);
    }
  }

  /*コンテナからスプライトを削除*/
  static removeContainer(sprite,CONTAINER){//,id){
    switch (CONTAINER){
      case "UI" :
        this.UIContainer.removeChild(sprite);
        break;
      case "ENTITY":
        this.entityContainer.removeChild(sprite);
        break;
      case "FILTER":
        this.filterContainer.removeChild(sprite);
        break;
      case "FORE":
        this.foreContainer.removeChild(sprite);
        break;
      case "BACK":
        this.backContainer.removeChild(sprite);
        break;
      case "BG":
        this.backGroundContainer.removeChild(sprite);
        break;
      default :
        console.warn("container");
    }
  }

  /* プレイヤー中心にスクロール*/
  static ScrollOn(pos){
    let centerX = BET(-700,this.magnification*(- pos.x-8 + 400/this.magnification),-64);
    let centerY = this.magnification*(- pos.y-8 + 300/this.magnification);
    let toX = this.entityContainer.x + ( centerX - this.entityContainer.x )/8;
    let toY = this.entityContainer.y + ( centerY - this.entityContainer.y )/8;
    //背景レイヤ
    //スクロールが遅い
    this.backGroundContainer.x = Math.floor(toX/4);
    this.backGroundContainer.y = Math.floor(toY/4);
    //Entityレイヤ
    this.backContainer.x = toX;
    this.backContainer.y = toY;
    this.entityContainer.x = toX;
    this.entityContainer.y = toY;
    this.foreContainer.x = toX*4/3;
    this.foreContainer.y = toY*4/3;
    //UIは動かない

  }
  /*スクロール位置を一瞬で移動させる*/
  static ScrollSet(pos){
    let centerX = this.magnification*(- (pos.x-8) + 400/this.magnification);
    let centerY = this.magnification*(- (pos.y-8) + 300/this.magnification);
    this.backContainer.x = Math.floor(centerX);
    this.backContainer.y = Math.floor(centerY);
    this.entityContainer.x = Math.floor(centerX);
    this.entityContainer.y = Math.floor(centerY);
    this.foreContainer.x = Math.floor(centerX);
    this.foreContainer.y = Math.floor(centerY);
  }

  static Quake(diff){
    this.Stage.x += diff.x;
    this.Stage.y += diff.y;
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = Drawer;



/***/ }),
/* 12 */
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
    this.type;
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_js__ = __webpack_require__(7);


let inputedKeyList = (new Array(256)).fill(false);
let clickedKeyList = (new Array(256)).fill(false);
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
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Input;

/*receive input event*/
$(document).on("keydown",(e)=> {
  clickedKeyList[event.keyCode] = false;
  if(!inputedKeyList[event.keyCode]){
    clickedKeyList[event.keyCode] = true;
    timer = __WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* default */].timer;
  }
  inputedKeyList[event.keyCode] = true;
  //上下キーを封じる
  if(e.keyCode==KEY.UP || e.keyCode == KEY.DOWN || e.keyCode == KEY.SP) event.preventDefault();
});
$(document).on("keyup",(e)=> {
  clickedKeyList[event.keyCode] = false;
  inputedKeyList[event.keyCode] = false;
});



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_Effect_stone_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_Effect_bulletBlur_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entity_Effect_smoke_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Entity_Effect_fire_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Entity_bullet1_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Entity_AI_horming_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Entity_AI_bullet1AI_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Collision_box_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Weapon_weaponManager_js__ = __webpack_require__(37);











/*Object Pool*/
class Pool{
  static Init(){
    this.unused = {
      stones : [],
      smokes : [],
      fires : [],
      bulletblurs : [],
      missiles : [],
    }
    for(let i = 0;i<500;i++){
      this.unused.stones.push(new __WEBPACK_IMPORTED_MODULE_1__Entity_Effect_stone_js__["a" /* default */](VEC0(),VEC0()));
    }
    for(let i = 0;i<80;i++){
      this.unused.smokes.push(new __WEBPACK_IMPORTED_MODULE_3__Entity_Effect_smoke_js__["a" /* default */](VEC0(),VEC0(),0));
    }
    for(let i = 0;i<100;i++){
      this.unused.fires.push(new __WEBPACK_IMPORTED_MODULE_4__Entity_Effect_fire_js__["a" /* default */](VEC0(),VEC0()));
    }
    for(let i = 0;i<300;i++){
      this.unused.bulletblurs.push(new __WEBPACK_IMPORTED_MODULE_2__Entity_Effect_bulletBlur_js__["a" /* default */](VEC0(),VEC0()));
    }
    for(let i = 0;i<100;i++){
      this.unused.missiles.push(new __WEBPACK_IMPORTED_MODULE_5__Entity_bullet1_js__["a" /* default */](VEC0(),WeaponManaer.weaponList[0]));
    }
  }
  static GetBulletBlur(pos,vel){
    if(this.unused.bulletblurs.length > 0){
    let s = this.unused.bulletblurs.pop();
    s.isAlive = true;//消えたらfalse
    s.pos = pos;
    s.vel = vel;
    s.frame = 0;
    s.spid = 0;
    s.sprite.alpha = 0.5;
    s.sprite.scale.set(Rand(0.5)+1);
    s.sprite.position = ADV(s.pos,VECN(8));
    return s;
    }else{
      return false;
    }
  }
  static GetMissile(pos,weapon){
    if(this.unused.missiles.length > 0){
      let s = this.unused.missiles.pop();
      s.arg = weapon.arg;
      s.vi = weapon.speed;
      s.pos = pos;
      s.vel = POV(s.arg,s.vi);
      s.frame = 0;
      s.isTargetOn = weapon.isTargetOn;
      s.AIList.push(new __WEBPACK_IMPORTED_MODULE_7__Entity_AI_bullet1AI_js__["a" /* default */](s));
      if(s.isTargetOn) s.targetedEnemy = weapon.target.enemy;
      if(weapon.isHorming) s.AIList.push(new __WEBPACK_IMPORTED_MODULE_6__Entity_AI_horming_js__["a" /* default */](s));
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
      case "missile" : this.unused.missiles.push(s);break;
      default :console.warn(s.name);
    }
    __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].removeEntity(s);
  }
  static GetStone(pos,vel){
    if(this.unused.stones.length > 0){
    let s = this.unused.stones.pop();
    s.pos = pos;
    s.vel = vel;
    s.frame = 0;
    s.isNext = false;
    s.sprite.alpha = 1;
    s.sprite.scale.set(1);
    return s;
    }else{
      return false;
    }
  }
  static GetSmoke(pos,vel,size){
    if(this.unused.smokes.length>0){
      /*constructor*/
      let s = this.unused.smokes.pop();
      s.pos = pos;
      s.vel = vel;
      s.frame = 0;
      //sprite
      s.spid = 0;
      s.sprite.alpha = 1;
      s.sprite.scale.set(size/5);
      return s;
    }
    else{
      return false;
    }
  }
  static GetFire(pos,vel){
    if(this.unused.fires.length < 10)cl("!");
    if(this.unused.fires.length>0){
      /*constructor*/
      let s = this.unused.fires.pop();
      s.pos = pos;
      s.vel = vel;
      s.frame = 0;
      //sprite
      s.spid = 0;
      s.sprite.alpha = 1;
      s.sprite.scale.set(1);
      return s;
    }else{
      cl("fire");
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pool;



/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//パラメータ管理クラス
class Param{
  static Init(){
    this.player = {
      JUMP_VEL : 5,//ジャンプ力
      RUN_VEL : 0.4,//はしり速度
      GRAVITY : 0.15,
      HP : 100,
      BULLET : 100,
      FLICTION : 0.7,
      INV_TIME : 5,//無敵時間
      
      ANIM_RUN : 4,
      ANIM_WAIT : 7,

      VX_MAX : 3,
      VY_MAX : 8
    }
    this.ENEMY1 = {
      HP : 5,
      ATK_MAX : 10,
      ATK_MIN : 5,
      GRAVITY : 0.1
    }
    this.ENEMY2 = {
      HP : 50,
      ATK_MAX : 10,
      ATK_MIN : 5,
      GRAVITY : 0.1,
      COIN : 3
    }
    this.weapon1 = {
      //status
      agi : 16,
      cost : 3,
      speed : 10, 
      length : 180,
      //optional
      isTarget : true,
      isHorming : false,
      isLasersight : true,
    }
    this.weapon11 = {
      agi : 2,
      cost : 3,
      speed : 0.0001, 
      length : 180,
    }
    this.weapon2 = {
      agi : 20,
      cost : 10,
      length : 300,
      //optional
      isTarget : true,
     // isHorming : false,
      isLasersight : true,
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
      atkMax : 10,
      atkMin : 5,
      hp : 99999,
    }
  }
  GetParam(entity){
    return this.weapon1;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Param;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//サウンド管理
class Audio{
  static Init(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.BGM = {
      stage1:null,
      stage2:null,
      stage3:null,
    } 
    this.SE = {
      jump1 : null,
      jump2 : null,
      coin1 : null,
      coin2 : null,
      enemyDamage : null,
      missileShot : null,
      missileHit : null,
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
          this.context.decodeAudioData(req.response,(buffer)=>{this.SE[name] = buffer});
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
  static PlayBGM(name){
    let buffer = this.BGM[name];
    let source = this.context.createBufferSource(); // source を作成
    source.buffer = buffer; // buffer をセット
    source.connect(this.context.destination); // context に connect
    source.loop = true; // 再生
    let gainNode = this.context.createGain();
    // Connect the source to the gain node.
    source.connect(gainNode);
    // Connect the gain node to the destination.
    gainNode.connect(this.context.destination);
    gainNode.gain.value = 1;
    source.start(0);
  };
  static PlaySE(name){
    let buffer = this.SE[name];
    let source = this.context.createBufferSource(); // source を作成
    source.buffer = buffer; // buffer をセット
    source.connect(this.context.destination); // context に connect
    source.loop = false; // 再生
    source.start(0);
  };
  static async Load() {
    this.Init();
    //this.LoadSound('src/resource/BGM/boss.mp3');
    //!ココで読み込むnameはファイル名に統一すること!
    this.LoadBGM('stage1');
    this.LoadBGM('stage2');

    this.LoadSE('jump1');
    this.LoadSE('jump2');//空中ジャンプ
    this.LoadSE('coin1');
    this.LoadSE('coin2');//コイン反射
    this.LoadSE('targetOn');//照準
    this.LoadSE('playerDamage');
    this.LoadSE('enemyDamage');
    this.LoadSE('missileHit');
    this.LoadSE('missileShot');
  };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Audio;
;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drawer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Collision_box_js__ = __webpack_require__(9);








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
    this.type = ENTITY.EFFECT;
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
/* 19 */
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drawer_js__ = __webpack_require__(11);




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
      while(frame < time){
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_js__ = __webpack_require__(2);








class Bullet extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.layer = "ENTITY";
    this.isMultiple = false;
    /*パラメータ*/
    this.hp;//弾丸のHP 0になると消滅
    this.atk;//攻撃力
    this.length;//これは武器がもつ?

    this.isUpdater  =true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sonic_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stone_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__flash_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__fire_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__smoke_js__ = __webpack_require__(28);










//爆発エフェクト
class Explosion1 extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    //微妙に左上に寄ってるので中心に
    this.pos = ADV(this.pos,VECN(8));
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.frame = 0;
    this.isNoSprite = true;
  }
  Bomb(){
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_4__sonic_js__["a" /* default */](this.pos));
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
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(fire);
    }
    for(let i =0;i<3;i++){
      let p = ADV(this.pos,Rand2D(16));
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_6__flash_js__["a" /* default */](this.pos));
    }
  }

  Update(){
    //爆発して自分は消える
    this.Bomb();
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Explosion1;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drawer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_js__ = __webpack_require__(19);
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
    /*スプライト*/
    this.str = str; //0~9
    this.container = new PIXI.Container();
    //0埋めをするかしないか
    switch(this.type){
      case "HP" :
      case "BULLET" :
      case "MES" :
      case "MENU" :
        this.isPadding = true;
        this.d = this.str.length;//桁数
          break;
      case "SCORE" :
        this.isPadding = false;
        this.d = 6;//決め打ち
          break;
        defaut :
        console.warn(this.type);
    }
    this.SetPos(this.pos);
  };

  //HP,BULLETの表示用
  //HP,BULLETの中から呼ばれている
  UpdateFont(value){
    //phys
    //文字列型にすること
    this.str = value + "";
    //0埋め
    if(this.isPadding){
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
    //000は特殊
    if(this.str == "ゐゐ0")this.str = "ゐゐゐ";
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
      sprite.position = this.pos;
      this.container.addChild(sprite);
      pos.x += space;
    };
  }

  //UIManagerから直接呼ばれているのはScoreのみ(それも廃止予定
  //各UIの内部から呼ぶ必要がある
  Update(){
  };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Font;
;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_entity_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_wall_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entity_backEntity_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Entity_backGround_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Entity_signboard_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Entity_player_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Entity_Enemy_enemy1_js__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Entity_Enemy_enemy2_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Entity_goal_js__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__game_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__drawer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Entity_woodbox_js__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Entity_needle_js__ = __webpack_require__(71);















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
        this.entityData = this.jsonObj.layers[0].data;
        //objの読み込み(今は看板だけ)
        this.objData = this.jsonObj.layers[1].objects;
        this.width = this.jsonObj.layers[0].width;
        this.height = this.jsonObj.layers[0].height;
        resolve();
      }
      xhr.send(null);
      this.stageNo = stageNo;
    });
  }

  /* state 
   * ENTER : 新しいステージに入った時
   * RESET : 死んでやり直す時
   */
  static async CreateStage(stageNo,state){
    await this.Load(stageNo);
    //背景の生成
    //if(state == "ENTER")
    //this.AddBackGround();
    //this.AutoStageCreate();
    //entityの生成
    /*タイルに割り当てるtype
     * 1 : 壁
     * 2 : 背景*/
    let wallTiletype = this.jsonObj.tilesets[0].tileproperties;
    let moverTiletype = this.jsonObj.tilesets[1].tileproperties;
    let entity;
    let ID;//tiledに対応漬けられているID

    for(let y = 0;y<this.height;y++){
      for(let x = 0;x<this.width;x++){
        ID = this.entityData[this.width*y + x]-1;
        //tiledのIDがjsonデータより1小さいので引く
        if(ID == -1)continue;//空白はjsonで0なので(引くと)-1となる
        switch(wallTiletype[ID].type){
          case TILE.WALL :
            //直せ
            if(wallTiletype[ID].name == "woodbox"){
              entity = new __WEBPACK_IMPORTED_MODULE_13__Entity_woodbox_js__["a" /* default */]({x:16*x,y:16*y});
            }else{
              entity = new __WEBPACK_IMPORTED_MODULE_2__Entity_wall_js__["a" /* default */]({x:16*x,y:16*y},MapData.WallTile(ID));
            }
            __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(entity);
            break;
          case TILE.BACK :
            entity = new __WEBPACK_IMPORTED_MODULE_3__Entity_backEntity_js__["a" /* default */]({x:16*x,y:16*y},MapData.WallTile(ID));
            __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(entity); break;
          case TILE.FORE :
            entity = new __WEBPACK_IMPORTED_MODULE_3__Entity_backEntity_js__["a" /* default */]({x:16*x,y:16*y},MapData.WallTile(ID));
            entity.layer = "FORE";
            __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(entity); break;
          case TILE.NEEDLE :
            entity = new __WEBPACK_IMPORTED_MODULE_14__Entity_needle_js__["a" /* default */]({x:16*x,y:16*y},MapData.WallTile(ID));
            __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(entity);
            break;
          default : 
            console.warn("タイルセットに未実装のチップが使用されています ID : " + wallTiletype[ID].type);
        }
      }
    }
    let obj;
    //objectの生成
    for(let i = 0;i < this.objData.length;i++){
      ID = this.objData[i].gid;
        let objx = this.objData[i].x;
        let objy = this.objData[i].y -16 ;//なぜかyだけずれるので引く
        let p = {x:objx , y:objy};
        switch(ID){
          case 161 :
            obj = new __WEBPACK_IMPORTED_MODULE_6__Entity_player_js__["a" /* default */](p);
            __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(obj);
            break;
          case 162 :
            let message = this.objData[i].properties;
            obj = new __WEBPACK_IMPORTED_MODULE_5__Entity_signboard_js__["a" /* default */](p,message);
            __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(obj);
            break;
          case 163 :
            obj = new __WEBPACK_IMPORTED_MODULE_9__Entity_goal_js__["a" /* default */](p);
            __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(obj);
            break;
          case 169 :
            obj = new __WEBPACK_IMPORTED_MODULE_7__Entity_Enemy_enemy1_js__["a" /* default */](p);
            __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(obj);
            break;
          case 170 :
            obj = new __WEBPACK_IMPORTED_MODULE_8__Entity_Enemy_enemy2_js__["a" /* default */](p);
            __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(obj);
            break;
      }
    }
    __WEBPACK_IMPORTED_MODULE_12__drawer_js__["a" /* default */].ScrollSet(__WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].player.pos);
  }

  /*マップデータを消して作り直す*/
  static RebuildStage(){
    MapData.DeleteStage();
    let state = "RESET";
    MapData.CreateStage(__WEBPACK_IMPORTED_MODULE_10__game_js__["a" /* default */].stage,state);
  }

  /*現在開かれているステージを削除*/
  static DeleteStage(){
    while(__WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].entityList.length > 0){
      __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].removeEntity(__WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].entityList[0]);
    }
  }
  //壁タイルの対応
  //タイルIDを渡すとテクスチャを返す
  static WallTile(i){
    let out = __WEBPACK_IMPORTED_MODULE_11__art_js__["a" /* default */].wallPattern.edge.out;
    let inner = __WEBPACK_IMPORTED_MODULE_11__art_js__["a" /* default */].wallPattern.edge.inner;
    let steel = __WEBPACK_IMPORTED_MODULE_11__art_js__["a" /* default */].wallPattern.steel;
    let needle = __WEBPACK_IMPORTED_MODULE_11__art_js__["a" /* default */].wallPattern.needle;
    switch(i){
      //edge in
      case 49 : return inner[0];
      case 51 : return inner[1];
      case 65 : return inner[2];
      case 67 : return inner[3];
      //edge out
      case 52:return out[0];
      case 53:return out[1];
      case 54:return out[2];
      case 60:return out[3];
      case 62:return out[4];
      case 68:return out[5];
      case 69:return out[6];
      case 70:return out[7];
      //steel
      case 72:return steel.entity[0]; 
      case 73:return steel.entity[1]; 
      case 74:return steel.entity[2]; 
      case 75:return steel.entity[3]; 
      case 76:return steel.back[0];
      case 77:return steel.back[1];
      case 78:return steel.back[2];
      case 79:return steel.back[3];
      //signboard
      case 4 :return __WEBPACK_IMPORTED_MODULE_11__art_js__["a" /* default */].wallPattern.signboard;
        //needle
      case 8 : return needle[0];
      case 9 : return needle[1];
      case 10 : return needle[2];
      case 11 : return needle[3];
  }
    console.warn(i);
    return __WEBPACK_IMPORTED_MODULE_11__art_js__["a" /* default */].wallPattern.block;
  }

  //背景を追加
  static AddBackGround(){
    let back;
    let w = 20;
    let h = 20;
    for(let y = 0;y<h;y++){
      for(let x = 0;x<w;x++){
        let tex = __WEBPACK_IMPORTED_MODULE_11__art_js__["a" /* default */].wallPattern.steel.backGround[0];
        let p = {
          x : (x - w/2)*32,
          y : (y - h/2)*32
        }
        __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_4__Entity_backGround_js__["a" /* default */](CPV(p),tex));
      }
    }
  }

  static AutoStageCreate(){
    //うねうね
    let grid = {
      x : 12,
      y : this.height,
    }
    let dist;//移動距離
    let dir = "U";//移動方向 
    let dim = "R";//U,UR,R,DR,D,DL,L,UL
    function dimToID(dim){
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
    let dirs = ["R","D","L","U"];
    function rot(dir,side){
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
    };

    function dirToV(dir){
      switch(dir){
        case "R": return {x:1,y:0};break;
        case "D": return {x:0,y:1};break;
        case "L": return {x:-1,y:0};break;
        case "U": return {x:0,y:-1};break;
      }
    }
    //回す
    //置く
    //すすめる
    
    //left
      let leftSide = 8;
      let rightSide = 16;
    for(let i=0;i<100;i++){
      dim = rot(dir,"R");
      //rot
      if(Dice(2)==0 || grid.x < leftSide || grid.x > rightSide){
        let side;
        if(Dice(2)==0)side = "R";
        else side = "L";

        //区間指定
        if(dir == "L")side = "R";
        if(dir == "R")side = "L";
        if(grid.x<leftSide && this.dir == "U")side = "R";
        if(grid.x>rightSide && this.dir == "U")side = "L";
        if(dir =="U" && side =="L") dim = "URO";
        if(dir =="U" && side =="R") dim = "DRI";
        //if(dir =="D" && side =="L") dim = "URO";
        //if(dir =="D" && side =="R") dim = "DRI";
        if(dir =="R") dim = "DRO";
        if(dir =="L") dim = "URI";
        dir = rot(dir,side);
      }
      //put
      let ID = dimToID(dim);
      let entity = new __WEBPACK_IMPORTED_MODULE_2__Entity_wall_js__["a" /* default */](MLV(VECN(16),grid),MapData.WallTile(ID));
      __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(entity);
      //fill
      if(dir == "U"){
        let i = grid.x-1;
        /*
        while(i>0){
          let back = new BackEntity({x:16*i,y:16*(grid.y)},MapData.WallTile(79));
          EntityManager.addEntity(back);
          i--;
        }
        */
      }
      //step
      grid = ADV(grid,dirToV(dir));
    }
    //right
    grid = {
      x : 20,
      y : this.height,
    }
    dir = "U";//移動方向 
    dim = "L";//U,UR,R,DR,D,DL,L,UL
      leftSide = 18;
      rightSide = 25;
    for(let i=0;i<100;i++){
      dim = rot(dir,"L");
      //rot
      if(Dice(2)==0 || grid.x > rightSide || grid.x < leftSide){
        let side;
        if(Dice(2)==0)side = "R";
        else side = "L";

        //区間指定
        if(dir == "L")side = "R";
        if(dir == "R")side = "L";
        if(grid.x<leftSide && this.dir == "U")side = "R";
        if(grid.x>rightSide && this.dir == "U")side = "L";
        if(dir =="U" && side =="L") dim = "DLI";
        if(dir =="U" && side =="R") dim = "ULO";
        //if(dir =="D" && side =="L") dim = "URO";
        //if(dir =="D" && side =="R") dim = "DRI";
        if(dir =="R") dim = "ULI";
        if(dir =="L") dim = "DLO";
        dir = rot(dir,side);
      }
      //put
      let ID = dimToID(dim);
      let entity = new __WEBPACK_IMPORTED_MODULE_2__Entity_wall_js__["a" /* default */](MLV(VECN(16),grid),MapData.WallTile(ID));
      __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(entity);
      //fill
      if(dir == "U"){
        let i = grid.x+1;
        /*
        while(i<32){
          let back = new BackEntity({x:16*i,y:16*(grid.y)},MapData.WallTile(79));
          EntityManager.addEntity(back);
          i++;
        }
        */
      }
      //step
      grid = ADV(grid,dirToV(dir));
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MapData;



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_js__ = __webpack_require__(2);





/*bullet1発射した時のエフェクト*/
class BulletShot extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.type = ENTITY.EFFECT;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Enemy_enemy_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_js__ = __webpack_require__(2);






/*Targetクラス*/
class Target extends __WEBPACK_IMPORTED_MODULE_1__effect_js__["a" /* default */]{
  constructor(enemy){
    super(enemy.pos,VEC0());
    /*基本情報*/
    this.type = ENTITY.EFFECT;
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_js__ = __webpack_require__(2);






//火花?
class Stone extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.name = "stone";
    this.frame = 0;
    this.isNext = false;
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.explosion.stone;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
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
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_js__ = __webpack_require__(2);






class Sonic extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel,size){
    super(pos,vel);
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.name = "smoke";
    this.frame = 0;
    this.size = size;//煙の大きさ 浮力にも関わってくる
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.explosion.smoke;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.x = this.size/5;
    this.sprite.scale.y = this.size/5;
  }

  Update(){
    let b = 10;
    this.pos = ADV(this.pos,this.vel);
    this.vel.x *= (1-this.frame/10);
    if(this.vel.y > 0) this.vel.y *= 0.9;
    this.sprite.scale = VECN(10/(this.frame+5));
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_js__ = __webpack_require__(2);





class Sonic extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/ this.type = ENTITY.EFFECT;
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.explosion.sonic;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
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
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sonic;



/***/ }),
/* 30 */
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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sonic_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__stone_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__flash_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__fire_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__smoke_js__ = __webpack_require__(28);











//爆発エフェクト
class Explosion2 extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,arg){
    super(pos,VEC0());
    //微妙に左上に寄ってるので中心に
    this.pos = ADV(this.pos,VECN(8));
    this.arg = arg;
    this.vi = 15;
    /*基本情報*/
    this.type = ENTITY.EFFECT;
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
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Effect_fontEffect_js__ = __webpack_require__(18);





class Enemy extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.type = ENTITY.ENEMY;
    this.isUpdater = true;
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
    __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlaySE("enemyDamage");
    this.hp += atk;
    //ダメージをポップ
    __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_3__Effect_fontEffect_js__["a" /* default */](this.pos,-atk+"","enemy"));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__drawer_js__ = __webpack_require__(11);







/*bullet1残像*/
class BulletBlur extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.name = "bulletblur";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
      /*スプライト*/
    this.spid = 0; //12~15
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.blur;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.5;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_pool_js__ = __webpack_require__(14);





//閃光
class Fire extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.name = "fire";
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.explosion.fire;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_js__ = __webpack_require__(2);





/*bullet1壁にぶつかった時した時のエフェクト*/
class BulletHitWall extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.type = ENTITY.EFFECT;
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
/* unused harmony export default */



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_js__ = __webpack_require__(2);





//閃光
class Flash extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].bulletPattern.explosion.flash;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.2;
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Update(){
    //this.sprite.texture = this.pattern[this.spid];
    this.sprite.alpha *=0.8;
    this.sprite.scale = VECN(2);
    if(this.frame == 4){
      __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Flash;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__weapon1_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__weapon2_js__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weapon3_js__ = __webpack_require__(75);




class WeaponManager{
  static Init(){
    /*singleton list*/
    /*武器のインスタンスを作成*/
    this.weaponList = [
      new __WEBPACK_IMPORTED_MODULE_0__weapon1_js__["a" /* default */](),
      new __WEBPACK_IMPORTED_MODULE_1__weapon2_js__["a" /* default */](),
      new __WEBPACK_IMPORTED_MODULE_2__weapon3_js__["a" /* default */]()
    ];
    /*selectBoxの選択*/
    this.select;
  }

  /*プレイヤーの参照を受け取って武器を変更*/
  static ChangeWeapon(player,name){
    switch (name){
      case "1":
        player.weapon = this.weaponList[0];
        break;
      case "2":
        player.weapon = this.weaponList[1];
        break;
      case "3":
        player.weapon = this.weaponList[2];
        break;
    }
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = WeaponManager;



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entity_Effect_target_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Entity_Effect_lasersight_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__audio_js__ = __webpack_require__(17);








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
  shot(player){ }
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
          DIST_C(l.pos , player.pos) < DIST_C(this.target.pos,player.pos)){
          //今のロック先を解除して
          if(this.isTargetOn){
            __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].removeEntity(this.target);
            this.isTargetOn = false;
          }
          //targetを追加する
          this.target = new __WEBPACK_IMPORTED_MODULE_3__Entity_Effect_target_js__["a" /* default */](l);
          __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].addEntity(this.target);
          __WEBPACK_IMPORTED_MODULE_5__audio_js__["a" /* default */].PlaySE("targetOn");
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
      effect = new __WEBPACK_IMPORTED_MODULE_4__Entity_Effect_lasersight_js__["a" /* default */](p,player.toArg);
      __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].addEntity(effect);
      this.lasersight = effect;
      this.isLaserOn = true;
    }else{
      this.lasersight.Rotate(player,this);
    }
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = Weapon;



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drawer_js__ = __webpack_require__(11);






class Lasersight extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,arg){
    super(pos,VEC0());
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.name = "lasersight";
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
      this.sprite.scale.x = __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].distance(weapon.target.enemy.pos,player.pos)/16 -0.5;
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
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_circle_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);







class Wall extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos,tex){
    super(pos,VEC0());
    /*基本情報*/
    //this.name = name; 必要になったら
    this.type = ENTITY.WALL;
    this.layer = "ENTITY";
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.isUpdater = false;
    /*スプライト*/
    this.tex = tex
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.tex);
    this.sprite.position = pos;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Wall;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_circle_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);







//背景オブジェクト 何もしない
class BackEntity extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos,tex){
    super(pos,VEC0());
    this.layer = "BACK";
    this.isUpdater = false;
    this.tex = tex
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.tex);
    this.sprite.position = pos;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BackEntity;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_pool_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Event_quakeEvent_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__AI_bullet1AI_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__AI_horming_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Effect_bulletBlur_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Effect_explosion1_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__param_js__ = __webpack_require__(16);

















const bullet1 = __WEBPACK_IMPORTED_MODULE_15__param_js__["a" /* default */].bullet1;

/*bullet1クラス*/
//Missile
class Bullet1 extends __WEBPACK_IMPORTED_MODULE_11__bullet_js__["a" /* default */]{
  constructor(pos,weapon){
    super(pos,POV(weapon.arg,weapon.speed));
    //super(VEC0(),VEC0());
    /*基本情報*/
    this.frame = 0;
    this.arg = weapon.arg;
    this.vi = weapon.speed;
    this.isTargetOn = weapon.isTargetOn;
    //if(this.isTargetOn) this.targetedEnemy = weapon.target.enemy
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
    this.atk = __WEBPACK_IMPORTED_MODULE_15__param_js__["a" /* default */].bullet1.atkMax;//攻撃力
    this.curve = __WEBPACK_IMPORTED_MODULE_15__param_js__["a" /* default */].bullet1.curve;
    this.type = ENTITY.BULLET;
    /*AI*/
    this.AIList = [];
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_9__AI_bullet1AI_js__["a" /* default */](this));
    //if(weapon.isHorming) this.AIList.push(new Horming(this));
  }

  Update(){
    /*□Effect BulletBulr*/
    if(this.frame%1 == 0){
      let p = CPV(this.pos);
      let d = ADV(Rand2D(5),POV(this.frame,3))
      p = ADV(p,d);
      let v = POV(this.arg+Math.PI,4);
      let blur = __WEBPACK_IMPORTED_MODULE_6__Stage_pool_js__["a" /* default */].GetBulletBlur(p,v);
      if(blur)__WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(blur);
    }
    this.arg += Rand(0.2);
    for (let AI of this.AIList){
      AI.Do();
    }
    /*observer*/
    //HP || 経過時間
    if(this.hp<=0 ||
      this.frame > 100) {
      __WEBPACK_IMPORTED_MODULE_6__Stage_pool_js__["a" /* default */].Remove(this);
      //EntityManager.removeEntity(this);
      __WEBPACK_IMPORTED_MODULE_7__Event_eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_8__Event_quakeEvent_js__["a" /* default */](6,3));//ゆれ
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_14__Effect_explosion1_js__["a" /* default */](CPV(this.pos)));
      __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlaySE("missileHit");
    }
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.rotation = this.arg + Math.PI/2;
    this.sprite.texture = this.pattern[this.spid];

    this.spid = (this.spid+0)%4;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet1;



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Effect_bulletHitWall_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__timer_js__ = __webpack_require__(7);






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
        l.Damage(-this.bullet.atk - Math.floor(99*Math.random()) );
        this.bullet.hp--;
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      };
    }
    for(let l of __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].wallList){
      if(__WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__["a" /* default */].on(this.bullet,l).isHit){
        //breakable object
        if(l.name == "woodbox"){
          /* ■ SoundEffect : hitWood */
          l.Damage(-this.bullet.atk );
          this.bullet.hp--;
          //wall
          }else{
            /* ■ SoundEffect : hitWall */
            this.bullet.hp = 0;
          }
          /* □ Effect : Exp */
      }
    }
  }

  Do(){
    this.collision();
    this.Phisics();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet1AI;



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_js__ = __webpack_require__(2);




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
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__font_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Event_quitGameEvent_js__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__drawer_js__ = __webpack_require__(11);











const COLUMN = 12;
const INDENT = {x:-8,y:0};
 
class Menu extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos){
    super(pos); 
    /*基本情報*/
    this.type = "MENU";
    this.isMultiple = true;
    let p = CPV(pos);
    this.title = new __WEBPACK_IMPORTED_MODULE_5__font_js__["a" /* default */]({x:p.x,y:p.y + -1 * COLUMN},"-PAUSE-","MENU"),
    this.index = 0;
    this.items = [
      new __WEBPACK_IMPORTED_MODULE_5__font_js__["a" /* default */]({x:p.x + 0,y:p.y + 1 * COLUMN},"さいかい","MENU"),
      new __WEBPACK_IMPORTED_MODULE_5__font_js__["a" /* default */]({x:p.x + 0,y:p.y + 2 * COLUMN},"ぶき","MENU"),
      new __WEBPACK_IMPORTED_MODULE_5__font_js__["a" /* default */]({x:p.x + 0,y:p.y + 3 * COLUMN},"やめる","MENU"),
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
    __WEBPACK_IMPORTED_MODULE_6__game_js__["a" /* default */].scene.PopSubState();
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
    if(__WEBPACK_IMPORTED_MODULE_3__input_js__["a" /* default */].isKeyClick(KEY.C) || __WEBPACK_IMPORTED_MODULE_3__input_js__["a" /* default */].isKeyClick(KEY.X)|| __WEBPACK_IMPORTED_MODULE_3__input_js__["a" /* default */].isKeyClick(KEY.SP)){
      switch(this.items[this.index].str){
        case "さいかい" : 
          this.Close();
          break;
        case "ぶき" : break;
        case "やめる" :
          this.Close();
          let qe  = new __WEBPACK_IMPORTED_MODULE_8__Event_quitGameEvent_js__["a" /* default */]();
          __WEBPACK_IMPORTED_MODULE_7__Event_eventmanager_js__["a" /* default */].eventList.push(qe);
          break;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Menu;



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fadeEvent_js__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_js__ = __webpack_require__(10);





class GameOverEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(){
    super();
    function* gen(){
      let frame = 0;
      __WEBPACK_IMPORTED_MODULE_1__eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_2__fadeEvent_js__["a" /* default */]("fadeout"));

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
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__drawer_js__ = __webpack_require__(11);








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
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AI_enemy2AI_js__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AI_moveReflect_js__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_fontEffect_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__coin_js__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Event_quakeEvent_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__param_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Effect_explosion2_js__ = __webpack_require__(31);

















let ENEMY2 = {
  HP : 5,
  ATK_MAX : 10,
  ATK_MIN : 5,
  GRAVITY : 0.1,
  COIN : 3
}

let EntityList = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].entityList;

class Enemy2 extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0(),VEC0());
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.frame = 0;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].enemyPattern.enemy2;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    ENEMY2 = __WEBPACK_IMPORTED_MODULE_14__param_js__["a" /* default */].ENEMY2;
    this.addAI(new __WEBPACK_IMPORTED_MODULE_7__AI_moveReflect_js__["a" /* default */](this));
    this.atkMax = ENEMY2.ATK_MAX;
    this.hp = ENEMY2.HP;
    this.gravity = ENEMY2.GRAVITY;
    this.coin = ENEMY2.COIN;
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
  Die(){
    this.isAlive = false;
      //死ぬ時にコイン
      for(let i = 0;i<this.coin;i++){
        __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_10__coin_js__["a" /* default */]({x:this.pos.x,y:this.pos.y}));
      }
      //EventManager.eventList.push(new QuakeEvent(5));//ゆれ
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(this);
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_15__Effect_explosion2_js__["a" /* default */](this.pos));
  }
  //プレイヤーにダメージを与える
  Hurt(){
    let player = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player; 
    let c = __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,player);
    if(c.isHit && c.n.y != 1){
      //ダメージ
      let damage = this.atkMax  +  Math.floor(-this.vel.y * Math.random());
      if(!player.isInvincible) player.Damage(-damage);
    }
  }


  Physics(){
    if(this.floor.on){
      this.pos.x += this.floor.under.vel.x;
      //this.pos.y += this.floor.under.vel.y;
    }
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.acc.y = 0;
    this.acc.x = 0;
    //最大速度制限
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
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(10);
/*｡+☆.En†rypoinT.☆+｡*/
 

/*拡大方式をニアレストネイバーに*/
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
__WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */].Load();



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_bullet1_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_Effect_target_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_pool_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__weapon_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__audio_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Entity_Effect_bulletShot_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__timer_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Entity_Effect_fontEffect_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Event_quakeEvent_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__param_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Entity_Effect_explosion1_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Entity_Effect_explosion2_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__Entity_Effect_flash_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Entity_Effect_sonic_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Entity_Effect_lasersight_js__ = __webpack_require__(39);






















class Weapon1 extends __WEBPACK_IMPORTED_MODULE_5__weapon_js__["a" /* default */]{
  constructor(){
    super("1");
    /*基本情報*/
    /*パラメータ*/
    this.param = __WEBPACK_IMPORTED_MODULE_15__param_js__["a" /* default */].weapon1;
    this.agi = this.param.agi;//間隔
    this.cost = this.param.cost;
    this.speed = this.param.speed;//弾速
    this.length = this.param.length;//射程距離
    /*option*/
    this.isTarget = this.param.isTarget;
    this.isHorming = this.param.isHorming;
    this.isLasersight = this.param.isLasersight;
  }
  shot(player){
    //最後に撃ってからframeまで停止
    if((player.frame - player.frameShot) > this.agi){
      //shot時刻
      player.frameShot = player.frame;
      //playerの弾薬が残っていなければ打てない
      if(player.bullet < this.cost){
        __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_12__Entity_Effect_fontEffect_js__["a" /* default */](player.pos,"たりないよ","pop"));
      }else{

        //弾薬消費
        player.bullet -= this.cost;
        console.assert(player.bullet >=0 );

        this.arg = player.arg;
        let p = {
          x: player.pos.x -4 + 10 * Math.cos(this.arg),
          y: player.pos.y + 10 * Math.sin(this.arg),
        }
        let bullet = __WEBPACK_IMPORTED_MODULE_4__Stage_pool_js__["a" /* default */].GetMissile(p,this);
        //let bullet = new Bullet1(p,this);
        __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(bullet);
        /* ■ SoundEffect : shot */
        __WEBPACK_IMPORTED_MODULE_7__audio_js__["a" /* default */].PlaySE("missileShot");
        /* □ Effect : shot */
        __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_10__Entity_Effect_bulletShot_js__["a" /* default */](CPV(p),VEC0()));
        __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_17__Entity_Effect_explosion2_js__["a" /* default */](CPV(p),this.arg));
        //反動
        //player.vel.x -= v.x/11;
        let v = POV(this.arg,this.speed);
        player.acc.y -= Math.max(v.y/5,0);
        //if(player.dir == DIR.DR || player.dir == DIR.DL) player.vel.y = -1.2;
        //振動
        //EventManager.eventList.push(new QuakeEvent(8,2));
      }
    }
  }
  Update(player){
    if(this.isTarget) this.Target(player);
    if(this.isLasersight) this.Lasersight(player);
  }
  Reset(){
    if(this.isTarget)__WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].removeEntity(this.target);
    if(this.isLasersight)__WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].removeEntity(this.lasersight);
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
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__timer_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_js__ = __webpack_require__(2);







 
class WeaponIcon extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos,name){
    super(pos); 
    /*基本情報*/
    this.type = "WICON";
    this.tex;
    switch(name){
      case "1" : this.tex = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern.wIcon.w1[0] ; break;
      case "2" : this.tex = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern.wIcon.w2[0] ; break;
      case "3" : this.tex = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern.wIcon.w3[0] ; break;
    }
    this.name = name;
    this.index = 0;
    /*スプライト*/
    this.sprite = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(this.tex);
    this.sprite.position = this.pos;
  }
  Update(){
    this.pos.x++; 
    this.sprite.position = this.pos;
  }
}
/* unused harmony export default */



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__font_js__ = __webpack_require__(23);








const P_AMOUNT = {
  x : 22, 
  y : 4, 
};
//HP Icon
const P_ICON = {
  x : -16, 
  y : 0, 
};

class HP extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos,name){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "HP"; 
    this.isMultiple = true;
    this.name = name;
    this.pos = pos;
    /*child*/
    this.outer = {pos:CPV(pos)};
    this.bar = {pos:CPV(pos)};
    this.icon = {pos:ADV(pos,P_ICON)};
    this.amount = new __WEBPACK_IMPORTED_MODULE_6__font_js__["a" /* default */](ADV(pos,P_AMOUNT),"100","HP");//数字
    /*スプライト*/
    this.spid = 0;
    this.container = new PIXI.Container();
    let s;
    //outer
    s = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.HP[this.spid]);
    s.position = this.outer.pos; 
    this.container.addChild(s);
    this.spid++;
    //bar
    s = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.HP[this.spid]);
    s.position = this.bar.pos; 
    this.container.addChild(s);
    this.spid++;
    //icon
    s = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.HP[this.spid]);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //amount
    //向こうの配列も動いているっぽい
    this.container.addChild(this.amount.container);
    /*パラメータ*/
    this.max = 100;//EntityManager.player.maxHP;
    /*state*/
    this.isPopIn = true;
  }
  UpdateBar(hp){
    //barの長さを更新
    this.container.children[1].scale.x = hp/this.max;
    //HP数字の更新
    this.amount.UpdateFont(hp);
  }
  Update(){
    if(this.isPopIn){
      let to  = (56-this.pos.x);
      this.pos.x += to/8;
    }
    if(this.pos.x > 56){
      this.pos.x = 56;
      this.isPopIn = false;
    }
    this.container.position.x = this.pos.x;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HP;



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__font_js__ = __webpack_require__(23);








const P_AMOUNT = {
  x : 22, 
  y : 4, 
};
//HP Icon
const P_ICON = {
  x : -16, 
  y : 0, 
};

class Bullet extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(pos,name){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "BULLET"; 
    this.isMultiple = true;
    this.name = name;
    this.pos = pos;
    /*child*/
    this.outer = {pos:CPV(pos)};
    this.bar = {pos:CPV(pos)};
    this.icon = {pos:ADV(pos,P_ICON)};
    this.amount = new __WEBPACK_IMPORTED_MODULE_6__font_js__["a" /* default */](ADV(pos,P_AMOUNT),"100","BULLET");//数字

    //pos
    /*スプライト*/
    this.spid = 0;
    this.container = new PIXI.Container();
    let s;
    //outer
    s = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.bullet.outer);
    s.position = this.outer.pos; 
    this.container.addChild(s);
    this.spid++;
    //bar
    s = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.bullet.bar);
    s.position = this.bar.pos; 
    this.container.addChild(s);
    this.spid++;
    //icon
    s = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.bullet.icon.missile);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);
    /*パラメータ*/
    this.max = 100;
  }
  UpdateBar(bullet){
    //barの長さを更新
    this.container.children[1].scale.x = bullet/this.max;
    //bullet数字の更新
    this.amount.UpdateFont(bullet);
  }
  ChangeWeapon(name){
    //アイコンを武器に変更
    switch(name){
      case "1": this.container.children[2].texture = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.bullet.icon.missile;
      break;
      case "2": this.container.children[2].texture = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern.bullet.icon.laser;
      break;
    }
  }
  Update(){
    let to  = (56-this.pos.x);
    this.pos.x += to/8;
    this.container.position.x = this.pos.x;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet;



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__font_js__ = __webpack_require__(23);







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
      this.sentence.push(new __WEBPACK_IMPORTED_MODULE_5__font_js__["a" /* default */](p,sent[i],"MES"));//テキスト 
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
      this.sentence.push(new __WEBPACK_IMPORTED_MODULE_5__font_js__["a" /* default */](p,sent[i],"MES"));//テキスト 
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
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_mapData_js__ = __webpack_require__(24);






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
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(12);
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
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_circle_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Event_messageEvent_js__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__game_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__backEntity_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Effect_signpop_js__ = __webpack_require__(59);
















class Signboard extends __WEBPACK_IMPORTED_MODULE_11__backEntity_js__["a" /* default */]{
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
    this.popup = new __WEBPACK_IMPORTED_MODULE_13__Effect_signpop_js__["a" /* default */](p);
    __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(this.popup);
  }
  Read(){
    if(!this.isRead){
      this.isRead = true;
      let event = new __WEBPACK_IMPORTED_MODULE_9__Event_messageEvent_js__["a" /* default */](this.message[this.page],"POP");
      __WEBPACK_IMPORTED_MODULE_8__Event_eventmanager_js__["a" /* default */].eventList.push(event);
      this.page++;
    }else{
      /*イベント発生用メッセージ*/
      //イベントを発生させてページを読み進める
      //テスト用イベント(死ぬ)
      if(this.message[this.page] == "EVENT"){;
        //第一引数いらんのでは?
        let event = new __WEBPACK_IMPORTED_MODULE_9__Event_messageEvent_js__["a" /* default */](this.message[this.page],"EVENT");
        __WEBPACK_IMPORTED_MODULE_8__Event_eventmanager_js__["a" /* default */].eventList.push(event);
        this.page++;
      }
      if(this.page < this.message.length){
        let event = new __WEBPACK_IMPORTED_MODULE_9__Event_messageEvent_js__["a" /* default */](this.message[this.page],"PAGE");
        __WEBPACK_IMPORTED_MODULE_8__Event_eventmanager_js__["a" /* default */].eventList.push(event);
        this.page++;
        //続きがあれば読む
        }else{
          //なければ終了
          __WEBPACK_IMPORTED_MODULE_10__game_js__["a" /* default */].scene.PopSubState();
          __WEBPACK_IMPORTED_MODULE_12__UI_uiManager_js__["a" /* default */].CloseMessage();//枠を閉じる
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
    let player = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player;
    if(__WEBPACK_IMPORTED_MODULE_6__util_js__["a" /* default */].distance(player.pos,this.pos) <  16 && player.isAlive){
      if( __WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyClick(KEY.SP)){
        this.Read();
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Signboard;



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__ = __webpack_require__(0);






//新しくメッセージ枠を開く
function* pop(text){
  __WEBPACK_IMPORTED_MODULE_3__game_js__["a" /* default */].scene.PushSubState("MES");
  __WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__["a" /* default */].PopMessage(text,"POP");
  yield ;
}
//メッセージをスクロールする
function* page(text){
  __WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__["a" /* default */].PopMessage(text,"PAGE");
  yield ;
}
//イベントを発生させる
function* event(){
  let e = new QuakeEvent(5,10);
  __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].player.Damage(-999);
  __WEBPACK_IMPORTED_MODULE_2__eventmanager_js__["a" /* default */].eventList.push(e);
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
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drawer_js__ = __webpack_require__(11);






class Signpop extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.type = ENTITY.EFFECT;
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
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__param_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Collision_box_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Event_event_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Event_gameOverEvent_js__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__drawer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__game_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Weapon_weaponManager_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Effect_fontEffect_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__Effect_bulletShot_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Effect_explosion1_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Effect_explosion2_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__Event_quakeEvent_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__Enemy_enemy2_js__ = __webpack_require__(48);
























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
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.maxHP = __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.HP;
    this.hp = this.maxHP;
    this.maxBullet = __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.BULLET;
    this.bullet = this.maxBullet;
    this.gravity = __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.GRAVITY;
    this.arg = 0;//狙撃角度 0 - 2π
    this.scArg = 0;//スクロール用
    this.toArg = 0;
    this.scPos = VEC0();//スクロール位置

    this.vxMax = __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.VX_MAX;
    this.vyMax = __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.VY_MAX;
    /*状態*/
    this.state = STATE.WAITING;
    this.weapon = __WEBPACK_IMPORTED_MODULE_15__Weapon_weaponManager_js__["a" /* default */].weaponList[0];//選択中の武器のインスタンス
    this.weapon.Init();
    this.dir = DIR.R;//向き
    this.score = 0;
    /*フラグ*/
    this.isJump = false;//空中にいるか
    this.isRun = false;//走っているか
    this.isAlive = true;//
    this.isInvincible = false//無敵時間
    this.isNearBoard = false;
    /*床の親子関係*/
    this.floor = {
      on : false,//乗っているか
      under : null,//自分の下
    }
  }
  /*キー入力による移動*/
  Input(){
    /*ジャンプ*/
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyInput(KEY.Z)){
      if(this.isJump == false){
        this.vel.y = - __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.JUMP_VEL;
        this.isJump = true;
        this.state = STATE.JUMPING;
        // ■ SoundEffect : jump
        __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("jump1");
      }
    }
    /*空中ジャンプ*/
    //空中でZ押すとbulletを消費してジャンプできる
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyClick(KEY.Z)){
      if(this.state == STATE.FALLING){
        let jumpCost = 20
          if(this.bullet >= jumpCost){
            __WEBPACK_IMPORTED_MODULE_3__audio_js__["a" /* default */].PlaySE("jump2");
            __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_20__Effect_explosion2_js__["a" /* default */](CPV(this.pos),Math.PI*(1/2)));
            __WEBPACK_IMPORTED_MODULE_10__Event_eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_21__Event_quakeEvent_js__["a" /* default */](20,5));
            this.frameShot = this.frame;//最終ショット時刻
              this.vel.y = - __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.JUMP_VEL;
            this.bullet -= 20;
            this.state = STATE.JUMPING;
          }else{
            //足りないとできない
            __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_17__Effect_fontEffect_js__["a" /* default */](this.pos,"たりないよ","pop"));
          }
      }
    }
    /*右向き*/
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyInput(KEY.RIGHT)){
      this.state = STATE.RUNNING;
      this.dir = DIR.R;
      this.isRun = true;
      this.toArg = 0;
      this.acc.x = __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.RUN_VEL;
    }
    /*左向き*/
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyInput(KEY.LEFT)){
      this.state = STATE.RUNNING;
      this.dir = DIR.L;
      this.isRun = true;
      this.toArg = Math.PI;
      this.acc.x = -__WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.RUN_VEL;
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
    //看板が近くにあれば優先
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
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyInput(KEY.X)){
      this.weapon.shot(this);
    }
    /*for debug*/
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyInput(KEY.J)){
      this.Damage(-999);
    }
    if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyInput(KEY.K) && this.frame%10 == 0){
      let p = {
        x:this.pos.x,
        y:this.pos.y - 32
      }
      //EntityManager.addEntity(new Enemy2(p));
    }
  }

  /*状態からアニメーションを行う*/
  Animation(){
    this.frame++;
    switch(this.state){
      case STATE.WAITING :
        this.spid = (Math.floor(this.frame/__WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.ANIM_WAIT))%4
          switch(this.dir){
            case DIR.R : this.sprite.texture = this.pattern.waitR[this.spid]; break;
            case DIR.L : this.sprite.texture = this.pattern.waitL[this.spid]; break;
            case DIR.UR : this.sprite.texture = this.pattern.waitUR[this.spid]; break;
            case DIR.UL : this.sprite.texture = this.pattern.waitUL[this.spid]; break;
            case DIR.DR : this.sprite.texture = this.pattern.waitDR[this.spid]; break;
            case DIR.DL : this.sprite.texture = this.pattern.waitDL[this.spid]; break;
          }
          break;
      case STATE.JUMPING :
        this.spid = (Math.floor(this.frame/__WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.ANIM_RUN))%4
          switch(this.dir){
            case DIR.R : this.sprite.texture = this.pattern.jumpR[this.spid]; break;
            case DIR.L : this.sprite.texture = this.pattern.jumpL[this.spid]; break;
            case DIR.UR : this.sprite.texture = this.pattern.jumpUR[this.spid]; break;
            case DIR.UL : this.sprite.texture = this.pattern.jumpUL[this.spid]; break;
            case DIR.DR : this.sprite.texture = this.pattern.jumpDR[this.spid]; break;
            case DIR.DL : this.sprite.texture = this.pattern.jumpDL[this.spid]; break;
          }
          break;
      case STATE.FALLING :
        this.spid = (Math.floor(this.frame/__WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.ANIM_RUN))%4;
        switch(this.dir){
          case DIR.R : this.sprite.texture = this.pattern.fallR[this.spid]; break;
          case DIR.L : this.sprite.texture = this.pattern.fallL[this.spid]; break;
          case DIR.UR : this.sprite.texture = this.pattern.fallUR[this.spid]; break;
          case DIR.UL : this.sprite.texture = this.pattern.fallUL[this.spid]; break;
          case DIR.DR : this.sprite.texture = this.pattern.fallDR[this.spid]; break;
          case DIR.DL : this.sprite.texture = this.pattern.fallDL[this.spid]; break;
        }
        break;
      case STATE.RUNNING :
        this.spid = (Math.floor(this.frame/__WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.ANIM_RUN))%6;
        switch(this.dir){
          case DIR.R : this.sprite.texture = this.pattern.runR[this.spid]; break;
          case DIR.L : this.sprite.texture = this.pattern.runL[this.spid]; break;
          case DIR.UR : this.sprite.texture = this.pattern.runUR[this.spid]; break;
          case DIR.UL : this.sprite.texture = this.pattern.runUL[this.spid]; break;
          case DIR.DR : this.sprite.texture = this.pattern.runDR[this.spid]; break;
          case DIR.DL : this.sprite.texture = this.pattern.runDL[this.spid]; break;
        }
        //走り中は画像をちょっとだけ跳ねさせる
        //スプライト位置を動かしているだけなので当たり判定は変化していない
        let a = 2;//振幅
        let l = 9;//周期
        let f = (Math.abs((this.frame%l -l/2))-l/2);
        this.sprite.position.y = this.pos.y - a*4*f*f/l/l;
        if(a*4*f*f/l/l == 0 ){;
          //■ SE : foot
        }

        break;
        //死亡
        case STATE.DYING:
          this.spid = Math.min(7,(Math.floor((this.frame - this.frameDead)/__WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.ANIM_RUN)));
          this.sprite.texture = this.pattern.dying[this.spid];
          break;
    }
  }

  //他から呼ばれる系
  /*武器チェンジ*/
  ChangeWeapon(name){
    this.weapon.Reset();
    __WEBPACK_IMPORTED_MODULE_15__Weapon_weaponManager_js__["a" /* default */].ChangeWeapon(this,name);
    __WEBPACK_IMPORTED_MODULE_16__UI_uiManager_js__["a" /* default */].bullet.ChangeWeapon(name);
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
      this.hp+=atk;
      //フォントはダメージ数に応じて数字を表示する　
      __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_17__Effect_fontEffect_js__["a" /* default */](this.pos,-atk+"","player"));
      this.hp = Math.max(this.hp,0);
      //ダメージを受けて一定時間無敵になる
      this.isInvincible = true;
      this.frameDamaged = this.frame;
      __WEBPACK_IMPORTED_MODULE_10__Event_eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_21__Event_quakeEvent_js__["a" /* default */](5,2));
    }
  }
  //コイン取得
  GetScore(){
    if(this.isAlive){
      this.score+=1;
      this.bullet += 5;//とりあえずbulletも回復しとくか
      __WEBPACK_IMPORTED_MODULE_16__UI_uiManager_js__["a" /* default */].score.UpdateFont(this.score);
    }
  }
  /* 衝突判定 */
  Collision(){
    //下からしか通れない物体
      this.floor.on = false;
      this.floor.under = null;
    for(let l of __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__["a" /* default */].enemyList){
      let c = __WEBPACK_IMPORTED_MODULE_5__Collision_collision_js__["a" /* default */].on(this,l);
      if(c.isHit){
        /* 衝突応答*/
        /*フラグの解除*/

        //床との衝突
        if(c.n.y == -1){
          this.isJump = false;
          __WEBPACK_IMPORTED_MODULE_5__Collision_collision_js__["a" /* default */].Resolve(this,l);
          this.floor.on = true;
          this.floor.under = l;
        }
        /*note : now isHit == false*/
      }
    }
    //壁
    for(let l of __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__["a" /* default */].wallList){
      let c = __WEBPACK_IMPORTED_MODULE_5__Collision_collision_js__["a" /* default */].on(this,l);
      if(c.isHit){
        /* 衝突応答*/
        /*フラグの解除*/

        //床との衝突
        if(c.n.y == -1){
          this.isJump = false;
        }
        __WEBPACK_IMPORTED_MODULE_5__Collision_collision_js__["a" /* default */].Resolve(this,l);
        /*note : now isHit == false*/
      }
    }
  }
  Physics(){
    //動く床に乗っている時
    if(this.floor.on){
      this.vel.x += this.floor.under.acc.x; 
      this.vel.y += this.floor.under.acc.y; 
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
       this.vel.x *= __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.FLICTION;
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
  if(this.isDying){       //まだ死んでない  
    if(this.frame - this.frameDead < 50){
      this.isDying = true;
    }else{
      //完全に死んだ
      //完全死亡時に一回だけ呼ばれる部分
      if(this.isDying){
        //this.state = STATE.DEAD
        let g = new __WEBPACK_IMPORTED_MODULE_12__Event_gameOverEvent_js__["a" /* default */]();
        __WEBPACK_IMPORTED_MODULE_10__Event_eventmanager_js__["a" /* default */].eventList.push(g);
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
  else if(t>100 && t<=150 && t%3 == 0) this.bullet++
  else if(t>150) this.bullet++;
  this.bullet = BET(0,this.bullet,this.maxBullet);
}

SetArg(arg){
  let d = this.toArg - this.arg;
  if(d > Math.PI)d -= 2*Math.PI;
  if(d < -Math.PI)d += 2*Math.PI;
  this.arg += d*0.2;
}

  Update(){
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
        __WEBPACK_IMPORTED_MODULE_16__UI_uiManager_js__["a" /* default */].bullet.UpdateBar(this.bullet); //BulletBarの更新
        __WEBPACK_IMPORTED_MODULE_16__UI_uiManager_js__["a" /* default */].HP.UpdateBar(this.hp);//HPbarの更新
      }
      /*for debug*/
      if(__WEBPACK_IMPORTED_MODULE_7__input_js__["a" /* default */].isKeyClick(KEY.K)){
        /*
        switch(this.weapon.name){
          case  "1" : this.ChangeWeapon("2");break;
          case  "2" : this.ChangeWeapon("1");break;
        }
        */
      }
      
      this.ScrollByDir();//向きに応じてスクロール位置を変更
      __WEBPACK_IMPORTED_MODULE_13__drawer_js__["a" /* default */].ScrollOn(this.pos);//プレイヤー中心にスクロール
      this.Observer(); //死亡チェック
      this.Dying();//死亡中
      //無敵時間の有向時間
      if(this.frame - this.frameDamaged > __WEBPACK_IMPORTED_MODULE_1__param_js__["a" /* default */].player.INV_TIME){
        this.isInvincible = false;
      }
      this.sprite.position = {
      x : this.pos.x-4,
      y : this.pos.y
    }
    /*パラメータ*/
    this.offset *= 0.99;
    this.Animation();//状態から画像を更新
    /*reset*/
    this.isNearBoard = false;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;




/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timer_js__ = __webpack_require__(7);






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
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timer_js__ = __webpack_require__(7);






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
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__entity_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_bulletHitWall_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_getCoin_js__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Effect_brightCoin_js__ = __webpack_require__(65);












let player;
//コイン
class Coin extends __WEBPACK_IMPORTED_MODULE_7__entity_js__["a" /* default */]{
  constructor(pos){
    player = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player;
    super(pos,{x:Rand(2),y:-3});
    /*基本情報*/
    this.frame = 0;
    this.e = 0.9;
    this.isUpdater = true;    
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].enemyPattern.coin;
    this.spid = 0;
    this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    /*コライダ*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,9,9));//衝突判定の形状
    /*パラメータ*/
    this.gravity = 0.3;
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
    if(__WEBPACK_IMPORTED_MODULE_6__util_js__["a" /* default */].distance(this.pos,player.pos)<48){
      let vec = __WEBPACK_IMPORTED_MODULE_6__util_js__["a" /* default */].nomalize({
        x : player.pos.x - this.pos.x,
        y : player.pos.y - this.pos.y
      });
      this.pos.x += 5 * vec.x;
      this.pos.y += 5 * vec.y;
      if(__WEBPACK_IMPORTED_MODULE_6__util_js__["a" /* default */].distance(this.pos,player.pos)<10){
        __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* default */].PlaySE("coin1");
        __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_9__Effect_getCoin_js__["a" /* default */](this.pos,{x:0,y:0}));
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
    if(this.frame%(8 + Math.floor(__WEBPACK_IMPORTED_MODULE_6__util_js__["a" /* default */].Rand(1))) == 0){
      let p = __WEBPACK_IMPORTED_MODULE_6__util_js__["a" /* default */].advec(this.pos,__WEBPACK_IMPORTED_MODULE_6__util_js__["a" /* default */].Rand2D(5));
      console.assert(p);
      __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_10__Effect_brightCoin_js__["a" /* default */](p));
    }
    //Collision
    this.Collision();
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
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_js__ = __webpack_require__(2);





class GetCoin extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos){
    super(pos,{x:0,y:0});
    /*基本情報*/
    this.type = ENTITY.EFFECT;
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
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effect_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_js__ = __webpack_require__(2);





class BrightCoin extends __WEBPACK_IMPORTED_MODULE_0__effect_js__["a" /* default */]{
  constructor(pos,vel){
    //velが渡されなければ0を渡す
    super(pos,vel);
    /*基本情報*/
    this.type = ENTITY.EFFECT;
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
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AI_enemy1AI_js__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Effect_fontEffect_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__param_js__ = __webpack_require__(16);












let EntityList = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].entityList;

class Enemy1 extends __WEBPACK_IMPORTED_MODULE_0__enemy_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0(),VEC0());
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.frame = 0;
    this.type = ENTITY.ENEMY;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].enemyPattern.enemy1;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.addAI(new __WEBPACK_IMPORTED_MODULE_6__AI_enemy1AI_js__["a" /* default */](this));
    this.atkMax = __WEBPACK_IMPORTED_MODULE_9__param_js__["a" /* default */].ENEMY1.ATK_MAX;
    this.hp = __WEBPACK_IMPORTED_MODULE_9__param_js__["a" /* default */].ENEMY1.HP;
    this.gravity = __WEBPACK_IMPORTED_MODULE_9__param_js__["a" /* default */].ENEMY1.GRAVITY;
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
  }
  //死ぬ
  Die(){
    this.isAlive = false;
    __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].removeEntity(this);
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
  //プレイヤーにダメージを与える
  Hurt(){
    let player = __WEBPACK_IMPORTED_MODULE_5__Stage_entityManager_js__["a" /* default */].player; 
    let c = __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,player);
    if(c.isHit && c.n.y != 1){
      //ダメージ
      let damage = this.atkMax  +  Math.floor(-this.vel.y * Math.random());
      if(!player.isInvincible)player.Damage(-damage);
    }
  }


  Physics(){
    if(this.floor.on){
      this.pos.x += this.floor.under.vel.x;
    //  this.pos.y += this.floor.under.vel.y;
    }
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.acc.y = this.gravity;
  }
  Animation(){
    this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
    this.frame++;
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
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy1;



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timer_js__ = __webpack_require__(7);






class Enemy1AI{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    this.enemy = enemy;
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
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_circle_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Collision_box_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__game_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Event_gameOverEvent_js__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Event_gameClearEvent_js__ = __webpack_require__(69);













class Goal extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos){
    super(pos);
    this.layer = "ENTITY";
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].wallPattern.goal);
    this.sprite.position = pos;
    this.collider = new __WEBPACK_IMPORTED_MODULE_2__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_6__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    /*固有*/
    this.isgoal = false;//??
    this.isUpdater = true;
  }
  Update(){
    if(__WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,__WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].player).isHit){
      /*ステージ遷移処理*/
      if(!this.isgoal){
        let g = new __WEBPACK_IMPORTED_MODULE_10__Event_gameClearEvent_js__["a" /* default */]();
        __WEBPACK_IMPORTED_MODULE_9__Event_eventmanager_js__["a" /* default */].eventList.push(g);
        this.isgoal = true;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Goal;



/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_mapData_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__drawer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__fadeEvent_js__ = __webpack_require__(47);










class GameClearEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(){
    super();
    function* gen(){
      __WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */].scene.PushSubState("TRANS");
      __WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */].stage++;
      __WEBPACK_IMPORTED_MODULE_7__eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_8__fadeEvent_js__["a" /* default */]("fadeout"));
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameClearEvent;



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_box_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__timer_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Effect_fontEffect_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__wall_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_bulletShot_js__ = __webpack_require__(25);











let EntityList = __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].entityList;

//壊せる木箱
class WoodBox extends __WEBPACK_IMPORTED_MODULE_8__wall_js__["a" /* default */]{
  constructor(pos){
    super(pos,__WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].enemyPattern.woodbox[0]);
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_1__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_3__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.type = ENTITY.WALL;
    this.name = "woodbox";
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
  }

  Update(){
    this.sprite.position = this.pos;

    /*observer*/
    if(this.hp<=0){
      __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].removeEntity(this);
      let p = {
        x : this.pos.x,
        y : this.pos.y
      }
      __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_9__Effect_bulletShot_js__["a" /* default */](p,VEC0()));
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WoodBox;



/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_box_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__timer_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Effect_fontEffect_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__wall_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__backEntity_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Effect_bulletShot_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__param_js__ = __webpack_require__(16);













let EntityList = __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].entityList;

//トゲ
class Needle extends __WEBPACK_IMPORTED_MODULE_9__backEntity_js__["a" /* default */]{
  constructor(pos,tex){
    super(pos,tex);
    /*基本情報*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_1__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_3__Collision_box_js__["a" /* default */]({x:pos.x+4,y:pos.y+12},8,8));//衝突判定の形状
    this.name = "needle";
    this.layer = "ENTITY";
    this.isUpdater  =true;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].wallPattern.steel.entity;
    this.spid = 3; //spriteIndex 現在のスプライト番号
    //this.pattern = Art.wallPattern.needle;
    //this.tex = this.pattern[0];
    this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(this.tex);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.hp = 1;
    this.atkMax = 4;
    this.atkMin = 1;
    /*フラグ*/
    this.isAlive = true;
  }
  //自分がダメージを食らう
  Damage(atkMax){
    this.hp += atkMax;
  }

  //プレイヤーにダメージ
  Hurt(){
    let player = __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].player; 
    let c = __WEBPACK_IMPORTED_MODULE_2__Collision_collision_js__["a" /* default */].on(this,player);
    if(c.isHit){
      //ダメージ
      //速度が大きい程ダメージ大きい
      let v = player.vel.x * player.vel.x + player.vel.y * player.vel.y;
      if(v >1){
        let damage = Math.floor(v);
        __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].player.Damage(-damage);
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
      __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].removeEntity(this);
      let p = CPV(this.pos);
      __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_10__Effect_bulletShot_js__["a" /* default */](p,VEC0()));
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Needle;



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_bullet2_js__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_Effect_target_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__weapon_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__art_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__UI_uiManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Entity_Effect_bulletShot_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__timer_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Entity_Effect_fontEffect_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Event_quakeEvent_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__param_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Entity_Effect_explosion1_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Entity_Effect_sonic_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Entity_Effect_lasersight_js__ = __webpack_require__(39);


















const DIR = {
  UR : "UR",
  UL : "UL",
  DR : "DR",
  DL : "DL",
  R : "R",
  L : "L",
};

class Weapon2 extends __WEBPACK_IMPORTED_MODULE_4__weapon_js__["a" /* default */]{
  constructor(){
    super("2");
    /*基本情報*/
    this.target;
    this.isTargetOn = false;//照準が発生しているか
    this.lasersight;
    this.isLaserOn = false;
    /*パラメータ*/
    this.param = __WEBPACK_IMPORTED_MODULE_13__param_js__["a" /* default */].weapon2;
    this.agi = this.param.agi;//間隔
    this.cost = this.param.cost;
    this.speed = this.param.speed;//弾速
    this.length = this.param.length;//射程距離
    /*オプション*/
    this.isTarget = this.param.isTarget;
    this.isLasersight = this.param.isLasersight;

  }

  shot(player){
    //最後に撃ってからframeまで停止
    if((player.frame - player.frameShot) > this.agi){
      //shot時刻
      player.frameShot = player.frame;
      //playerの弾薬が残っていなければ打てない
      if(player.bullet < this.cost){
        __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_10__Entity_Effect_fontEffect_js__["a" /* default */](player.pos,"たりないよ","pop"));
      }else{

        //弾薬消費
        player.bullet -= this.cost;

        let arg = player.arg;
        let p = ADV(POV(arg,32),CPV(player.pos));
        let bullet;
        __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_14__Entity_Effect_explosion1_js__["a" /* default */](CPV(p)));
        for(let i = 0;i<16;i++){
          p = ADV(player.pos,POV(arg,16*(i+1)));
          bullet = new __WEBPACK_IMPORTED_MODULE_1__Entity_bullet2_js__["a" /* default */](p,arg,this.target);
          __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(bullet);
        }
        /* ■ SoundEffect : shot */
        /* □ Effect : shot */
        __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_8__Entity_Effect_bulletShot_js__["a" /* default */](CPV(p),VEC0()));
        __WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_14__Entity_Effect_explosion1_js__["a" /* default */](CPV(p)));
        //反動
        //player.vel.x -= v.x/11;
        //if(player.dir == DIR.DR || player.dir == DIR.DL) player.vel.y = -1.2;
        //振動
        __WEBPACK_IMPORTED_MODULE_11__Event_eventmanager_js__["a" /* default */].eventList.push(new __WEBPACK_IMPORTED_MODULE_12__Event_quakeEvent_js__["a" /* default */](17,5));
      }
    }
  }
  Update(player){
    if(this.isTarget) this.Target(player);
    if(this.isLasersight) this.Lasersight(player);
  }
  Reset(){
    if(this.isTarget)__WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].removeEntity(this.target);
    if(this.isLasersight)__WEBPACK_IMPORTED_MODULE_3__Stage_entityManager_js__["a" /* default */].removeEntity(this.lasersight);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_box_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Event_eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Event_quakeEvent_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AI_bullet2AI_js__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Effect_bulletBlur_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Effect_explosion1_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__param_js__ = __webpack_require__(16);














const bullet2 = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].bullet2;

//Laser
class Bullet2 extends __WEBPACK_IMPORTED_MODULE_8__bullet_js__["a" /* default */]{
  constructor(pos,arg,weapon){
    super(pos,POV(arg,VEC0()));
    /*基本情報*/
    this.frame = 0;
    this.arg = arg;
    this.isUpdater  =true;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].bulletPattern.bullet2;
    this.spid = 0;
    this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    this.sprite.anchor.set(0.5);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this.sprite.alpha = 0.7;
    /*コライダ*/
    this.collider = new __WEBPACK_IMPORTED_MODULE_1__Collision_collider_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_3__Collision_box_js__["a" /* default */](pos,4,4));//衝突判定の形状
    /*パラメータ*/
    this.hp = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].bullet2.hp;//弾丸のHP 0になると消滅
    this.atkMax = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].bullet2.atkMax;//攻撃力
    this.atkMin = __WEBPACK_IMPORTED_MODULE_12__param_js__["a" /* default */].bullet2.atkMin;//攻撃力
    /*AI*/
    this.AIList = [];
    this.AIList.push(new __WEBPACK_IMPORTED_MODULE_7__AI_bullet2AI_js__["a" /* default */](this));
  }

  Update(){
    for (let AI of this.AIList){
      AI.Do();
    }
    /*observer*/
    //HP || 経過時間
    if( this.frame > 10 || this.hp<=0){
      __WEBPACK_IMPORTED_MODULE_4__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.position.x -=4;
    this.sprite.rotation = this.arg;
    this.sprite.texture = this.pattern[this.spid];

    this.spid = (this.spid+1)%8;
    this.frame++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet2;



/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Effect_bulletHitWall_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__timer_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Effect_explosion1_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Effect_explosion2_js__ = __webpack_require__(31);








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
        this.bullet.hp = 0;
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      }
    }
    for(let l of __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].wallList){
      if(__WEBPACK_IMPORTED_MODULE_1__Collision_collision_js__["a" /* default */].on(this.bullet,l).isHit){
        //breakable object
        if(l.name == "woodbox"){
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_bullet_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weapon_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(1);





class Weapon3 extends __WEBPACK_IMPORTED_MODULE_2__weapon_js__["a" /* default */]{
  /* ammunition : 弾薬数 */
  constructor(){
    super("1",10,30);
    this.clock = 0;//最後に撃った時刻
    this.speed = 10;
    this.length = 170;//射程距離
  }
  shot(player){
      for(let i = 0;i<1;i++){
        let vi = 0 + 5 * Math.random();
        let v = {
          x: vi * Math.cos(player.arg),
          y: vi * Math.sin(player.arg)
        }
        //bulletの出現位置
        let p = {
          x: player.pos.x + 5 * Math.cos(player.arg),
          y: player.pos.y + 5 * Math.sin(player.arg),
        }
        let bullet = new __WEBPACK_IMPORTED_MODULE_0__Entity_bullet_js__["a" /* default */](p,v,__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].unkoTexture);
        __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].addEntity(bullet);
      }
      this.ammunition--;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Weapon3;



/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__eventmanager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage_mapData_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__audio_js__ = __webpack_require__(17);






/*タイトル画面からゲーム開始画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
class StartStageEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(){
    super(1);
    function* gen(){
      __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* default */].PlayBGM("stage1");
      __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */].scene.PushSubState("TRANS");
      /*ここでマップをロード*/
      __WEBPACK_IMPORTED_MODULE_3__Stage_mapData_js__["a" /* default */].DeleteStage();
      __WEBPACK_IMPORTED_MODULE_3__Stage_mapData_js__["a" /* default */].CreateStage(__WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */].stage,"ENTER");
      //ここで非同期
      __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */].scene.ChangeState(STATE.TITLE,STATE.STAGE);
      __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */].scene.PopSubState("TRANS");
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StartStageEvent;



/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__eventmanager_js__ = __webpack_require__(3);




/*初期状態タイトル画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
class StartGameEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  constructor(){
    super(1);
    function* gen(){
      __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */].scene.ChangeState(STATE.INIT,STATE.TITLE);
      yield ;
    }
    let itt = gen();
    this.func = itt;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StartGameEvent;



/***/ }),
/* 78 */
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