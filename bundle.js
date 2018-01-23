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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game_js__ = __webpack_require__(9);


class Art{
  static Load(resources){
    /*Entity*/
    //cl(PIXI.utils.TextureCache);
    this.playerTexture = PIXI.utils.TextureCache["src/resource/img/player.png"];
    this.wallTexture = PIXI.utils.TextureCache["src/resource/img/wall.png"];
    this.teki2Texture = PIXI.utils.TextureCache["src/resource/img/teki2.png"];
    this.teki3Texture = PIXI.utils.TextureCache["src/resource/img/teki3.png"];
    this.bulletTexture = PIXI.utils.TextureCache["src/resource/img/bullet.png"];
    this.bullet2Texture = PIXI.utils.TextureCache["src/resource/img/bullet2.png"];
    this.unkoTexture = PIXI.utils.TextureCache["src/resource/img/unko.png"];
    /*UI*/
    this.weapon1Texture = PIXI.utils.TextureCache["src/resource/img/weapon1.png"];
    this.weapon2Texture = PIXI.utils.TextureCache["src/resource/img/weapon2.png"];
    this.weapon3Texture = PIXI.utils.TextureCache["src/resource/img/weapon3.png"];
    this.weaponEquip = PIXI.utils.TextureCache["src/resource/img/weaponEquip.png"];
    this.selectboxTexture = PIXI.utils.TextureCache["src/resource/img/selectbox.png"];
    /*Effect*/
    this.darkTexture = PIXI.utils.TextureCache["src/resource/effect/dark.png"];

    /*Pttern*/
    this.playerPattern = [
      PIXI.Texture.fromFrame('player00.png'),
      PIXI.Texture.fromFrame('player01.png'),
      PIXI.Texture.fromFrame('player02.png'),
      PIXI.Texture.fromFrame('player03.png'),
      PIXI.Texture.fromFrame('player10.png'),
      PIXI.Texture.fromFrame('player11.png'),
      PIXI.Texture.fromFrame('player12.png'),
      PIXI.Texture.fromFrame('player12.png'),
      PIXI.Texture.fromFrame('player20.png'),
      PIXI.Texture.fromFrame('player21.png'),
      PIXI.Texture.fromFrame('player22.png'),
      PIXI.Texture.fromFrame('player23.png'),
      PIXI.Texture.fromFrame('player30.png'),
      PIXI.Texture.fromFrame('player31.png'),
      PIXI.Texture.fromFrame('player32.png'),
      PIXI.Texture.fromFrame('player33.png')
    ];
    this.UIPattern = [
      PIXI.Texture.fromFrame('weapon00.png'),
      PIXI.Texture.fromFrame('weapon01.png'),
      PIXI.Texture.fromFrame('weapon02.png'),
      PIXI.Texture.fromFrame('weapon10.png'),
      PIXI.Texture.fromFrame('weapon11.png'),
      PIXI.Texture.fromFrame('weapon12.png'),
      PIXI.Texture.fromFrame('selectbox.png'),
      PIXI.Texture.fromFrame('HP00.png'),
      PIXI.Texture.fromFrame('HP01.png'),
    ];
  }

  static async LoadTexture(){
    let loader = PIXI.loader;
    await new Promise((res)=>loader
      .add('pattern','src/resource/img/playerPattern.json')
      .add('pattern2','src/resource/img/UIPattern.json')
      .add('src/resource/img/player.png')
      .add('src/resource/img/wall.png')
      .add('src/resource/img/teki2.png')
      .add('src/resource/img/teki3.png')
      .add('src/resource/img/bullet.png')
      .add('src/resource/img/bullet2.png')
      .add('src/resource/img/unko.png')
      .add('src/resource/img/weapon1.png')
      .add('src/resource/img/weapon2.png')
      .add('src/resource/img/weapon3.png')
      .add('src/resource/img/weaponEquip.png')
      .add('src/resource/img/selectbox.png')
      .add('src/resource/effect/dark.png')
      .load((loader,resources)=>Art.Load(resources)).onComplete.add(res));
  }

  static SpriteFactory(texture){
    return new PIXI.Sprite(texture);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Art;





/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawer_js__ = __webpack_require__(10);


/*エンティティマネージャ*/
class EntityManager{
  static Init(){
    this.entityList = [];
    this.player;//プレイヤーのインスタンス
  }
  /*Entityをリストに登録*/
  static addEntity(entity){
    //各entityの参照を保持する
    switch(entity.type){
      case ENTITY.PLAYER :
        this.player = entity;
        break;
        // add more...
    }
    this.entityList.push(entity); 
    //Entityコンテナにスプライトを追加
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].addContainer(entity.sprite,"ENTITY");
  }

  /*Entityをリストから削除*/
  static removeEntity(entity){
    let i = this.entityList.indexOf(entity);
    __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].removeContainer(entity.sprite,"ENTITY");
    //Entityコンテナからスプライトを排除
    this.entityList.splice(i,1);
  }
  /*Entityの更新*/
  static Update(){
    for(let l of this.entityList){
      l.Update(); 
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EntityManager;



/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_js__ = __webpack_require__(2);


//便利関数
class Util{
  static Init(){
    /* easing function 
     * d : 必要時間
     * b : 開始点
     * c : 移動量
     * type : 関数を選択 */
    this.ease = function*(d,b,c,type){
      let x = 0;
      let s = __WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* default */].timer;//開始時点の時刻
        let f = Util.easefunc(type);
      while(x < 1){
        x = (__WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* default */].timer - s)/d;
        yield b + c*f(x);
      }
      yield b + c;
    }
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

  //ベクトルの正規化
  static nomalize(v){
    let a = Math.sqrt(v.x * v.x + v.y * v.y);
    v.x /= a;
    v.y /= a;
    return v;
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

  static advec(v1,v2){
    return {x:v1.x + v2.x ,y:v1.y + v2.y};
  }

  static quad(x){
    return x*x;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Util;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_js__ = __webpack_require__(2);


let inputedKeyList = (new Array(256)).fill(false);
let clickedKeyList = (new Array(256)).fill(false);
let unko = 0;

class Input{
  /*押下状態のときtrue*/
  static isKeyInput(key){
    return inputedKeyList[key];
  }
  /*押された瞬間のみture*/
  static isKeyClick(key){
    if(unko == __WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* default */].timer){
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
    unko = __WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* default */].timer;
  }
  inputedKeyList[event.keyCode] = true;
  event.preventDefault();
});
$(document).on("keyup",(e)=> {
  clickedKeyList[event.keyCode] = false;
  inputedKeyList[event.keyCode] = false;
});



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawer_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__timer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__uiWeaponIcon_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__uiWeaponEquip_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__uiSelectBox_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__uiHP_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__ = __webpack_require__(1);










 /*UIクラス*/
 /*TODO リファクタリング*/
 class UIManager{
   static Init(){
     /*
      * 武器アイコン(sub)
      * 武器アイコン(装備中)
      * セレクトボックス
      */
    this.UIList = [];//UI全部のリスト
    this.WeaponIconList = [];//武器アイコンのリスト
      this.selectBox;
    this.weaponEquip;
         this.HP;
    /*各UIの初期化を行う
     * 一度初期化したUIを消す際には
     * ステージから外さず画面外にプールさせる*/
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_4__uiWeaponIcon_js__["a" /* default */]("1"));//武器1のサブアイコン
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_4__uiWeaponIcon_js__["a" /* default */]("2"));//武器2のサブアイコン
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_4__uiWeaponIcon_js__["a" /* default */]("3"));//武器3のサブアイコン
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_6__uiSelectBox_js__["a" /* default */]());//セレクトボックス
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_5__uiWeaponEquip_js__["a" /* default */]("po"));//武器1のメインアイコン(?)
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_7__uiHP_js__["a" /* default */]("frame"));//HP
    UIManager.addUI(new __WEBPACK_IMPORTED_MODULE_7__uiHP_js__["a" /* default */]("bar"));//HP

   }
   /*WeaponIconのポップアップ*/
   static OpenWeapon(){
     for(let i = 0;i<this.WeaponIconList.length;i++){
       this.WeaponIconList[i].index = i;
     }
     this.selectBox.sprite.x = WICON_X-2 + 20 * this.selectBox.selectID;
   }
   /*ポップアップの逆(?)*/
   static CloseWeapon(){
     for(let l of this.WeaponIconList){
      l.sprite.x = -32;
     }
     this.selectBox.sprite.x = -32;
     __WEBPACK_IMPORTED_MODULE_8__Stage_entityManager_js__["a" /* default */].player.ChangeWeapon(this.selectBox.select.name);
   }

   /*UIをリストに登録*/
   static addUI(ui){
     /*TODO リストの重複を排除*/
     this.UIList.push(ui); 
     switch (ui.type){
       //weapon icon
       case UI_.WICON : 
         this.WeaponIconList.push(ui);
         break;
       //selectbox
       case UI_.SELBOX : 
         this.selectBox = ui;
         break;
       //equip
       case UI_.WEQUIP : 
         this.weaponEquip = ui;
         break;
       case UI_.HP :
         this.HP = ui;
         break;
       default :
         console.warn(ui);
     }
     __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].addContainer(ui.sprite,"UI");
   }
   /*UIをリストから削除*/
   static removeUI(ui){
     let i = this.UIList.indexOf(ui);
     __WEBPACK_IMPORTED_MODULE_0__drawer_js__["a" /* default */].removeContainer(ui.sprite,"UI");
     this.UIList.splice(i,1);
   }
   /*UIの更新*/
   static Update(){
     for(let l of UIManager.UIList){
       switch (l.type){
         case UI_.WICON:
           l.Update();
           break;
         case UI_.SELBOX://カーソル移動
           l.Update();
           break;
       }
     }
   }
 }
/* harmony export (immutable) */ __webpack_exports__["a"] = UIManager;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_js__ = __webpack_require__(0);


class UI{
  constructor(UItexture,type){
    this.type = type;
    switch (type){
      /*武器アイコン*/
      case UI_.WICON:
        this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(UItexture);
        this.sprite.position.x = -32;
        this.sprite.position.y = WICON_Y;
        break;
        /*セレクトボックス*/
      case UI_.SELBOX:
        this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(UItexture);
        this.sprite.position.x = -32;
        this.sprite.position.y = WICON_Y-2;
        break;
        /*装備中の武器*/
      case UI_.WEQUIP:
        this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(UItexture);
        this.sprite.position.x = 8;
        this.sprite.position.y = 6;
        break;
        /*HP*/
      case UI_.HP :
        this.sprite = __WEBPACK_IMPORTED_MODULE_0__art_js__["a" /* default */].SpriteFactory(UItexture);
        this.sprite.position.x = 56;
        this.sprite.position.y = 6;
        break;
      default:
        console.warn(this);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UI;



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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(13);


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_mapData_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drawer_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Event_eventmanager_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Event_scene_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__timer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__UI_ui_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__UI_uiSelectBox_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__UI_uiWeaponIcon_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__UI_uiWeaponEquip_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__util_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Weapon_weaponManager_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__input_js__ = __webpack_require__(4);

















let dark;

class Game{
  static Init(){
    __WEBPACK_IMPORTED_MODULE_2__drawer_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_5__Event_scene_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_4__Event_eventmanager_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_6__timer_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_12__util_js__["a" /* default */].Init();
    __WEBPACK_IMPORTED_MODULE_13__Weapon_weaponManager_js__["a" /* default */].Init();


    
    /*TODO どっかに移す*/
    __WEBPACK_IMPORTED_MODULE_1__Stage_mapData_js__["a" /* default */].CreateStage(0);
    /*for debug */
    __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__["a" /* default */].Init();
    Game.pause = false;
    Game.select = false;


    /*TODO EffectManagerを作成*/
    dark = __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].darkTexture);

    Game.Run();
  }

  static async Load(){
    await __WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].LoadTexture();
    Game.Init();
  }

  static Input(){
    if(__WEBPACK_IMPORTED_MODULE_14__input_js__["a" /* default */].isKeyClick(KEY.SP)){
    }
    /*ポーズ */
    if(__WEBPACK_IMPORTED_MODULE_14__input_js__["a" /* default */].isKeyClick(KEY.C)){
      Game.pause = !Game.pause;
      Game.select = !Game.select;
      /*武器選択画面*/
      if(Game.select){
        /*ゲーム画面を暗くする*/
        __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__["a" /* default */].OpenWeapon();
        __WEBPACK_IMPORTED_MODULE_2__drawer_js__["a" /* default */].addContainer(dark,"FILTER");
      }else{
        __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__["a" /* default */].CloseWeapon();
        __WEBPACK_IMPORTED_MODULE_2__drawer_js__["a" /* default */].removeContainer(dark,"FILTER");
      }
    }
  }

  static Update(){
    Game.Input();
    /*
     * 各Entityの位置の更新
     * ポーズ中は停止させる*/
     if(!Game.pause){
       __WEBPACK_IMPORTED_MODULE_0__Stage_entityManager_js__["a" /* default */].Update();
     }
     if(Game.select){
       __WEBPACK_IMPORTED_MODULE_7__UI_uiManager_js__["a" /* default */].Update();
     }

     /*イベントの実行*/
     /*TODO yield*/
     while(__WEBPACK_IMPORTED_MODULE_4__Event_eventmanager_js__["a" /* default */].eventList.length > 0){
       __WEBPACK_IMPORTED_MODULE_4__Event_eventmanager_js__["a" /* default */].eventList.pop().Do();
     }

     __WEBPACK_IMPORTED_MODULE_6__timer_js__["a" /* default */].IncTime();
  }

  static Run(){
    requestAnimationFrame(Game.Run);

    switch(__WEBPACK_IMPORTED_MODULE_5__Event_scene_js__["a" /* default */].state){
      /*更新*/
      case STATE.STAGE :
        Game.Update();
        break;
      default :
        console.warn("unknown state");
    }
    /*描画*/
    __WEBPACK_IMPORTED_MODULE_2__drawer_js__["a" /* default */].Renderer.render(__WEBPACK_IMPORTED_MODULE_2__drawer_js__["a" /* default */].Stage);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;




/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_js__ = __webpack_require__(2);


const PIXI_WIDTH = 800;
const PIXI_HEIGHT = 600;

class Drawer{

  /*setting stage*/
  static Init(){
    this.app = new PIXI.Application(PIXI_WIDTH, PIXI_HEIGHT, {backgroundColor : 0x000000});
    this.Stage = this.app.stage;
      /* コンテナ(レイヤー)は以下の通り
      /* Entityコンテナ:Entityを描画するレイヤ
       * Effectコンテナ:画面に適用するエフェクトを描画するレイヤ
       * UIコンテナ:UIを描画するレイヤ
       * */
    this.entityContainer = new PIXI.Container();//Entity
    this.effectContainer = new PIXI.Container();//エフェクト
    this.UIContainer = new PIXI.Container();//UI

    this.app.stage.addChild(this.entityContainer);
    this.app.stage.addChild(this.effectContainer);
    this.app.stage.addChild(this.UIContainer);
    this.Renderer = new PIXI.autoDetectRenderer(PIXI_WIDTH,PIXI_HEIGHT);

    /*拡大方式をニアレストネイバーに*/
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    /*拡大率*/
    this.magnification = 2;
    this.entityContainer.scale.x = this.magnification;
    this.entityContainer.scale.y = this.magnification;
    this.UIContainer.scale.x = this.magnification;
    this.UIContainer.scale.y = this.magnification;
    this.effectContainer.scale.x = this.magnification;
    this.effectContainer.scale.y = this.magnification;
    $("#pixiview").append(this.Renderer.view);

    /*-----*/
    /*なぜかyieldがstaticにできないのでココにかく*/

    this.Animator = function*(start,num,startTime,rate){
      yield (start + Math.floor((__WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* default */].timer - startTime)/rate))%num;
    }
  }

  /*コンテナにスプライトを追加*/
  static addContainer(sprite,CONTAINER){
    switch (CONTAINER){
      case "UI" :
        this.UIContainer.addChild(sprite);
        break;
      case "ENTITY":
        this.entityContainer.addChild(sprite);
        break;
      case "FILTER":
        this.effectContainer.addChild(sprite);
        break;
    }
  }

  /*コンテナからスプライトを削除*/
  static removeContainer(sprite,CONTAINER){
    switch (CONTAINER){
      case "UI" :
        this.UIContainer.removeChild(sprite);
        break;
      case "ENTITY":
        this.entityContainer.removeChild(sprite);
        break;
      case "FILTER":
        this.effectContainer.removeChild(sprite);
        break;
    }
  }

  /* プレイヤー中心にスクロール*/
  static ScrollOnPlayer(player){
    let centerX = this.magnification*(- player.pos.x-8 + 400/this.magnification);
    let centerY = this.magnification*(- player.pos.y-8 + 300/this.magnification);
    let toX = this.entityContainer.x + ( centerX - this.entityContainer.x )/8;
    let toY = this.entityContainer.y + ( centerY - this.entityContainer.y )/8;
    this.entityContainer.x = Math.floor(toX);
    this.entityContainer.y = Math.floor(toY);
  }

  static Yakudo(mag){
    this.magnification = mag;
    this.entityContainer.scale.x = this.magnification;
    this.entityContainer.scale.y = this.magnification;
    this.effectContainer.scale.x = this.magnification;
    this.effectContainer.scale.y = this.magnification;
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = Drawer;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*矩形*/
class Box{
  //pos:左上の座標
  //width
  //height
  constructor(pos,width,height){
    this.pos = pos;
    this.height = height;
    this.width = width;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Box;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mover_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemy_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collisionShape_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AI_testAI_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util_js__ = __webpack_require__(3);










class Bullet extends __WEBPACK_IMPORTED_MODULE_1__enemy_js__["a" /* default */]{
  constructor(pos,vel,tex){
    super(pos,vel,{x:0,y:0});
    /*スプライト*/
    this.sprite = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(tex);
    this.sprite.position = pos;
    /*コライダ*/
    this.collisionShape = new __WEBPACK_IMPORTED_MODULE_3__Collision_collisionShape_js__["a" /* default */](
      SHAPE.BOX,
      new __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__["a" /* default */](pos,16,16)
    );
    /*パラメータ*/
    this.hp = 1;//弾丸のHP 0になると消滅
    this.atk = 1;//攻撃力
    this.length = 80;//これは武器がもつ?
    this.launchedPos = {x:pos.x,y:pos.y};//射出された座標 射程距離の計算に必要 
    this.type = ENTITY.BULLET;
  }
  /* 衝突判定 */
  collision(){
    /*TODO リスト分割 */
    let EntityList = __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].entityList;

    for(let l of EntityList){
      switch(l.type){
        case ENTITY.ENEMY :
          /*衝突判定*/
          if(__WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__["a" /* default */].on(this,l).isHit){
            l.hp-=this.atk;
            this.hp = 0;
          }
          break;
        case ENTITY.WALL :
          /*衝突判定*/
          if(__WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__["a" /* default */].on(this,l).isHit){
            l.hp-=this.atk;
            this.hp = 0;
          }
          break;
      }
    }
  }

  Phisics(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  Update(){
    this.collision();
    /*
    for (let AI of this.AIList){
      AI.Do();
    }
    */
    this.Phisics();
    this.sprite.position = this.pos;

    /*observer*/
    if(this.hp<=0){
      __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
    //飛行距離判定
    if(__WEBPACK_IMPORTED_MODULE_8__util_js__["a" /* default */].distance(this.pos , this.launchedPos) > this.length){
      __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet;



/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(3);


class Collision{

  /*collisionInfoを返す */
  static on(e1,e2){
    let isHit = false; //衝突したかどうかのbool値
      //ココが怪しい
      //衝突がtrueなら必ず法線が帰ってくるはずなのに
      //プレイヤー側の押し出しの途中で法線が拾えてない(?)事がある

      let n = {x:99999,y:0}; // 押し出すべき方向(法線) 衝突していなければundefined
    /*円同士の衝突判定*/
    if(e1.collisionShape.shape == SHAPE.CIRCLE && e2.collisionShape.shape == SHAPE.CIRCLE){
      let circ1 = e1.collisionShape.hitbox;
      let circ2 = e2.collisionShape.hitbox;
      if(__WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].distance(circ1.pos,circ2.pos) < circ1.r + circ2.r){
        isHit = true;
        n = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].nomalize({x:circ1.pos.x-circ2.pos.x , y:circ1.pos.y-circ2.pos.y});
      }else{
        isHit = false;
      }
      return new CollisionInfo(isHit , n);
    }

    /*矩形同士*/
    /*とりあえず正方形*/
    /*下記途中*/
    if(e1.collisionShape.shape == SHAPE.BOX && e2.collisionShape.shape == SHAPE.BOX){
      let box1 = e1.collisionShape.hitbox;
      let box2 = e2.collisionShape.hitbox;
      if(box1.pos.x < box2.pos.x + box2.height &&
        box2.pos.x < box1.pos.x + box1.height &&
        box1.pos.y < box2.pos.y + box2.width &&
        box2.pos.y < box1.pos.y + box1.width
      ){
        //0 ↓ 0   1
        //1 → 1   0
        //2 ↑ 0   -1
        //3 ← -1  0
        let meri = [
          box2.pos.y+box2.height - box1.pos.y , 
          box2.pos.x+box2.width-box1.pos.x , 
          box1.pos.y+box1.height - box2.pos.y ,
          box1.pos.x+box1.width - box2.pos.x
        ];

        let maxI = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].maxIndex(meri);
        //       console.log(meri);
        isHit = true;
        switch(maxI){
          case 2: n = {x:0 , y:1};break;
          case 3: n = {x:1 , y:0};break;
          case 0:n = {x:0 , y:-1};break;
          case 1:n = {x:-1 , y:0};break;
        }
      }else{
        isHit = false;
      }
      return new CollisionInfo(isHit , n);
    }
    throw new Error("po");
  }

  static push(box1,box2){
    if(Collision.on(this,l).n.x != 0) this.vel.x = 0;
    if(Collision.on(this,l).n.y != 0) this.vel.y = 0;
    while(Collision.on(this,l).isHit){
      this.pos.x += Collision.on(this,l).n.x;
      this.pos.y += Collision.on(this,l).n.y;
    }
    /*note : now isHit == false*/
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Collision;


//衝突判定クラス
class CollisionInfo{
  constructor(isHit,n){
    this.isHit = isHit; // 衝突したかどうか bool
      this.n = n //衝突したならば法線
  }
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_bullet_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(1);



class Weapon{
  /* 
   * ammunition : 弾薬数 
  /* agi : agility*/
  constructor(name,ammunition,agi){
    this.name = name;
    this.ammunition = ammunition;
    this.agi = agi;
  }
  shot(player){ }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Weapon;



/***/ }),
/* 16 */
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
/* 17 */
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
    this.func.apply(this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Event;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__timer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_js__ = __webpack_require__(3);







 
class UIWeaponIcon extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{

  constructor(name){
    let tex;
    switch(name){
      case "1" : tex = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].weapon1Texture;break;
      case "2" : tex = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].weapon2Texture;break;
      case "3" : tex = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].weapon3Texture;break;
    }
    super(tex,UI_.WICON); 
    this.name = name;
    this.index = 0;
  }
  Update(){
       let to = WICON_X + 20*this.index;
       let dif = to - this.sprite.x;
       this.sprite.x += dif * 0.6;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UIWeaponIcon;



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__timer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_js__ = __webpack_require__(3);







 class UIWeaponIcon extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
   constructor(name){
     super(__WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern[0],UI_.WEQUIP); 
     this.name = name;
   }
 }
/* harmony export (immutable) */ __webpack_exports__["a"] = UIWeaponIcon;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__timer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_js__ = __webpack_require__(3);







let shift = false;

/*イテレータ*/
let it;

 class UISelectBox extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
   constructor(){
     super(__WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].UIPattern[6],UI_.SELBOX); 
     this.selectID = 0;
     this.select = __WEBPACK_IMPORTED_MODULE_1__uiManager_js__["a" /* default */].WeaponIconList[this.selectID];//選択中の武器
   }
   on(icon){
     this.select = icon;
   }
   Input(){
     if(__WEBPACK_IMPORTED_MODULE_3__input_js__["a" /* default */].isKeyClick(KEY.RIGHT)){
       if(!shift && this.selectID < __WEBPACK_IMPORTED_MODULE_1__uiManager_js__["a" /* default */].WeaponIconList.length-1){
         shift = true;
         this.selectID++;
         this.select = __WEBPACK_IMPORTED_MODULE_1__uiManager_js__["a" /* default */].WeaponIconList[this.selectID];//選択中の武器
         it = __WEBPACK_IMPORTED_MODULE_5__util_js__["a" /* default */].ease(2,this.sprite.x,20,"out");
       }
     }
     if(__WEBPACK_IMPORTED_MODULE_3__input_js__["a" /* default */].isKeyClick(KEY.LEFT)){
       if(!shift && this.selectID > 0){
         shift = true;
         this.selectID--;
         this.select = __WEBPACK_IMPORTED_MODULE_1__uiManager_js__["a" /* default */].WeaponIconList[this.selectID];//選択中の武器
         it = __WEBPACK_IMPORTED_MODULE_5__util_js__["a" /* default */].ease(2,this.sprite.x,-20,"out");
       }
     }
   }
   Update(){
     /*TODO 入力先読みにする*/
     this.Input();
     if(shift){
       if(!it.next().done) {
         this.sprite.x = it.next().value;
       }else{
         shift = false;
       }
     }
   }
   GetSelectedWeapon(){
     return UIList[3];
   }
 }
/* harmony export (immutable) */ __webpack_exports__["a"] = UISelectBox;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__weapon1_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__weapon2_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weapon3_js__ = __webpack_require__(34);




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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mover_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collisionShape_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_circle_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(11);







class Enemy extends __WEBPACK_IMPORTED_MODULE_0__mover_js__["a" /* default */]{
  constructor(pos,vel,acc){
    super(pos,vel,acc);
    this.type = ENTITY.ENEMY;
    this.hp = 1;
    this.AIList = [];//AIの配列
  }

  addAI(AI){
    this.AIList.push(AI);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy;



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TestAI{
  /*enemyの参照を受け取り関数を実行する*/
  constructor(enemy){
    this.enemy = enemy;
  }
  Do(){
    this.enemy.pos.x--;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TestAI;



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game_js__ = __webpack_require__(9);
/*｡+☆.En†rypoinT.☆+｡*/
 

__WEBPACK_IMPORTED_MODULE_0__Game_js__["a" /* default */].Load();



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entityManager_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity_entity_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Entity_wall_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Entity_mover_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Entity_player_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Entity_teki1_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Game_js__ = __webpack_require__(9);








/*マップデータ*/
class MapData{
  constructor(){
    this.stageNo;
    this.data;
    this.width;
    this.height;
  }

  /*マップデータを読み込む*/
  static Load(stageNo){
    return new Promise((resolve)=>{
      let xhr = new XMLHttpRequest();
      xhr.open('GET','src/resource/map/stage'+stageNo+'.json',true);
      xhr.onload = ()=>{
        let jsonObj = JSON.parse(xhr.responseText);
        //BackGroundの読み込み
        this.data = jsonObj.layers[0].data;
        this.width = jsonObj.layers[0].width;
        this.height = jsonObj.layers[0].height;
        resolve();
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
          case TILE.SPACE :
            /*nothing to do*/
            break;
          case TILE.WALL :
            __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_2__Entity_wall_js__["a" /* default */]({x:16*x,y:16*y}));
            break;
          case TILE.PLAYER :
            __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_4__Entity_player_js__["a" /* default */]({x:16*x,y:16*y}));
            break;
          case TILE.ENEMY :
            __WEBPACK_IMPORTED_MODULE_0__entityManager_js__["a" /* default */].addEntity(new __WEBPACK_IMPORTED_MODULE_5__Entity_teki1_js__["a" /* default */]({x:16*x,y:16*y}));
            break;
          default : 
            console.warn("タイルセットに未実装のチップが使用されています");
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collisionShape_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_circle_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__ = __webpack_require__(11);







class Wall extends __WEBPACK_IMPORTED_MODULE_0__entity_js__["a" /* default */]{
  constructor(pos){
    super(pos);
    this.type = ENTITY.WALL;
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].wallTexture);
    this.sprite.position = pos;
    this.collisionShape = new __WEBPACK_IMPORTED_MODULE_2__Collision_collisionShape_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
  }
  Update(){
    /*nothing to do*/
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Wall;



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mover_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__art_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collision_collisionShape_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_Box_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__input_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Event_eventmanager_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Event_event_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Event_stageResetEvent_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__drawer_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Game_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Weapon_weaponManager_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__timer_js__ = __webpack_require__(2);
















const JUMP_VEL = 7;//ジャンプ速度
const RUN_VEL = 0.5;//はしり速度
const PLAYER_GRAVITY = 0.3;
const PLAYER_HP = 100;
const FLICTION = 0.7;
const POP_PLAYER = -1;

const VX_MAX = 3;
const VY_MAX = 3;

class Player extends __WEBPACK_IMPORTED_MODULE_0__mover_js__["a" /* default */]{
  constructor(pos){
    super(pos,VEC0,{x:0,y:0});
    this.collisionShape = new __WEBPACK_IMPORTED_MODULE_2__Collision_collisionShape_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_4__Collision_Box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.type = ENTITY.PLAYER;
    /*スプライト*/
    this.pattern = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].playerPattern;
    this.spid = 0 // spriteIndex 現在のスプライト番号
    this.sprite = __WEBPACK_IMPORTED_MODULE_1__art_js__["a" /* default */].SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos ;
    /*パラメータ*/
    this.hp = PLAYER_HP;
    this.gravity = PLAYER_GRAVITY;
    this.arg = 0;//狙撃角度 0 - 2π
    /*フラグ*/
    this.isAlive = true;//生きているか
    this.isJump = false;//空中にいるか
    this.isRun = false;//走っているか
    /*状態*/
    this.weapon = __WEBPACK_IMPORTED_MODULE_13__Weapon_weaponManager_js__["a" /* default */].weaponList[0];//選択中の武器のインスタンス
    this.dir = DIR.RIGHT;//向き
  }

  /*キー入力による移動*/
  Input(){
    /*ジャンプ*/
    if(__WEBPACK_IMPORTED_MODULE_5__input_js__["a" /* default */].isKeyInput(KEY.Z)){
      if(this.isJump == false){
        this.vel.y = -JUMP_VEL;
        this.isJump = true;
      }
    }
    /*右向き*/
    if(__WEBPACK_IMPORTED_MODULE_5__input_js__["a" /* default */].isKeyInput(KEY.RIGHT)){
      this.dir = DIR.RIGHT;
      this.isRun = true;
      this.arg = 0;
      this.acc.x = RUN_VEL;
      if(!this.isJump){
        this.isJump = true;
        this.vel.y = POP_PLAYER;
      }
    }

    /*左向き*/
    if(__WEBPACK_IMPORTED_MODULE_5__input_js__["a" /* default */].isKeyInput(KEY.LEFT)){
      this.dir = DIR.LEFT;
      this.isRun = true;
      this.arg = Math.PI;
      this.acc.x = -RUN_VEL;
      if(!this.isJump){
        this.isJump = true;
        this.vel.y = POP_PLAYER;
      }
    }
    /*上向き*/
    if(__WEBPACK_IMPORTED_MODULE_5__input_js__["a" /* default */].isKeyInput(KEY.UP)){
      this.dir = DIR.UP;
      this.arg = -Math.PI/2;
    }
    /*下向き*/
    if(__WEBPACK_IMPORTED_MODULE_5__input_js__["a" /* default */].isKeyInput(KEY.DOWN)){
      this.dir = DIR.DOWN;
      this.arg = Math.PI/2;
    }
    /*shot*/
    if(__WEBPACK_IMPORTED_MODULE_5__input_js__["a" /* default */].isKeyInput(KEY.X)){
      this.weapon.shot(this);
    }
    /*for debug*/
    if(__WEBPACK_IMPORTED_MODULE_5__input_js__["a" /* default */].isKeyInput(KEY.SP)){
      __WEBPACK_IMPORTED_MODULE_11__drawer_js__["a" /* default */].Yakudo();
    }
  }

  /*状態からアニメーションを行う*/
  Animation(){
    switch(this.dir){
      case DIR.RIGHT :
        (this.isRun) ? this.spid = 0 + (Math.floor(__WEBPACK_IMPORTED_MODULE_14__timer_js__["a" /* default */].timer/10))%4
                     : this.spid = 0;
        break;
      case DIR.LEFT :
        (this.isRun) ? this.spid = 4 + (Math.floor(__WEBPACK_IMPORTED_MODULE_14__timer_js__["a" /* default */].timer/10))%4
                     : this.spid = 4;
        break;
      case DIR.UP :
        (this.isRun) ? this.spid = 8 + (Math.floor(__WEBPACK_IMPORTED_MODULE_14__timer_js__["a" /* default */].timer/10))%4
                     : this.spid = 8;
        break;
      case DIR.DOWN :
        (this.isRun) ? this.spid = 12 + (Math.floor(__WEBPACK_IMPORTED_MODULE_14__timer_js__["a" /* default */].timer/10))%4
                     : this.spid = 12;
        break;
    }
    this.sprite.texture = this.pattern[this.spid];
  }

  /*武器チェンジ*/
  ChangeWeapon(name){
    __WEBPACK_IMPORTED_MODULE_13__Weapon_weaponManager_js__["a" /* default */].ChangeWeapon(this,name);
  }

  /* 衝突判定 */
  collision(){
    /*TODO リスト分割 */
    let EntityList = __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].entityList;

    for(let l of EntityList){
      switch(l.type){
        case ENTITY.WALL :
          /*衝突判定*/
          if(__WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l).isHit){
            /* 衝突応答*/
            /*TODO Colクラスに核*/

            /*フラグの解除*/
            if(__WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l).n.y == -1){
              this.isJump = 0;
            }
            /*速度*/
            if(__WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l).n.x != 0) this.vel.x = 0;
            if(__WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l).n.y != 0) this.vel.y = 0;
            /*押し出し*/
            while(__WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l).isHit){
              this.pos.x += __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l).n.x/5;
              this.pos.y += __WEBPACK_IMPORTED_MODULE_3__Collision_collision_js__["a" /* default */].on(this,l).n.y/5;
            }
            /*note : now isHit == false*/
          }
          break;
      }
    }
  }
  Physics(){
    this.pos.x += this.vel.x; 
    this.pos.y += this.vel.y; 
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.vel.y += this.gravity;
    if(this.vel.x > VX_MAX)this.vel.x = VX_MAX;
    if(this.vel.x < -VX_MAX)this.vel.x = -VX_MAX;
    if(this.isJump == false){
      this.vel.x *= FLICTION;
    }
    this.acc.x = 0;

  }

  Update(){
    this.isRun = false;
    this.Input();//入力
    this.Physics();//物理
    this.collision();//衝突
    this.Animation();//状態から画像を更新
    __WEBPACK_IMPORTED_MODULE_11__drawer_js__["a" /* default */].ScrollOnPlayer(this);

    /*observer*/
    if(this.hp <= 0){
      let restartEvent = new __WEBPACK_IMPORTED_MODULE_10__Event_stageResetEvent_js__["a" /* default */](this);
      __WEBPACK_IMPORTED_MODULE_8__Event_eventmanager_js__["a" /* default */].PushEvent(restartEvent);
    }

    this.sprite.position = this.pos;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;




/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*矩形*/
class Box{
  //pos:左上の座標
  //width
  //height
  constructor(pos,width,height){
    this.pos = pos;
    this.height = height;
    this.width = width;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Box;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__ = __webpack_require__(5);



class StageResetEvent extends __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* default */]{
  //プレイヤーから参照を受け取り、
  //「プレイヤーの座標をリセットする関数」を返す
  constructor(player){
    super(1);
    let PositionReset = this.ReturnFunc(player);
    this.func = PositionReset;
  }

  ReturnFunc(player){
    let posreset = () =>{
      player.hp = 100;
      player.pos.x = 32;
      player.pos.y = 64;
      player.vel.x = 0;
      player.vel.y = 0;
      cl(__WEBPACK_IMPORTED_MODULE_1__UI_uiManager_js__["a" /* default */].HP);
      console.log("reset");
    }
    return posreset;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StageResetEvent;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uiManager_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__timer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_js__ = __webpack_require__(3);








const UIPt = {
  HP : 6,
  HPbar : 7,
}

class UIHP extends __WEBPACK_IMPORTED_MODULE_0__ui_js__["a" /* default */]{
  constructor(name){
    switch (name){
      case "frame" : 
        super(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern[7],UI_.HP); 
        break;
      case "bar" :
        super(__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].UIPattern[8],UI_.HP); 
        break;
    }
    this.name = name;
    this.max = 10;
  }
  Bar(hp){
    this.sprite.scale.x = __WEBPACK_IMPORTED_MODULE_2__Stage_entityManager_js__["a" /* default */].player.hp/100;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UIHP;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_bullet_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weapon_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(0);





class Weapon1 extends __WEBPACK_IMPORTED_MODULE_2__weapon_js__["a" /* default */]{
  /* ammunition : 弾薬数 */
  constructor(){
    super("1",10,10);
    this.clock = 0;//最後に撃った時刻
    this.speed = 10;
    this.length = 120;//射程距離
  }
  shot(player){
    //最後に撃ってからclockまで停止
    if(this.clock % this.agi == 0){
      for(let i = 0;i<1;i++){
        let vi = this.speed;
        let v = {
          x: vi * Math.cos(player.arg),
          y: vi * Math.sin(player.arg)
        }
        //bulletの出現位置
        let p = {
          x: player.pos.x + 5 * Math.cos(player.arg),
          y: player.pos.y + 5 * Math.sin(player.arg),
        }
        let bullet = new __WEBPACK_IMPORTED_MODULE_0__Entity_bullet_js__["a" /* default */](p,v,__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].bulletTexture);
        __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].addEntity(bullet);
      }
      this.ammunition--;
    }
    this.clock++;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Weapon1;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_bullet_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weapon_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(0);





class Weapon2 extends __WEBPACK_IMPORTED_MODULE_2__weapon_js__["a" /* default */]{
  /* ammunition : 弾薬数 */
  constructor(){
    super("1",10,40);
    this.clock = 0;//最後に撃った時刻
    this.speed = 10;
    this.length = 80;//射程距離
  }
  shot(player){
      for(let i = 0;i<12;i++){
        let vi = 5 + 5 * Math.random();
        let v = {
          x: vi * Math.cos(player.arg+ (Math.random()-0.5)/3),
          y: vi * Math.sin(player.arg+ (Math.random()-0.5)/3)
        }
        //bulletの出現位置
        let p = {
          x: player.pos.x + 5 * Math.cos(player.arg),
          y: player.pos.y + 5 * Math.sin(player.arg),
        }
        let bullet = new __WEBPACK_IMPORTED_MODULE_0__Entity_bullet_js__["a" /* default */](p,v,__WEBPACK_IMPORTED_MODULE_3__art_js__["a" /* default */].bullet2Texture);
        __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__["a" /* default */].addEntity(bullet);
      }
      this.ammunition--;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Weapon2;



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_bullet_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stage_entityManager_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weapon_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__art_js__ = __webpack_require__(0);





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
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mover_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemy_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__art_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Collision_collisionShape_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AI_testAI_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__UI_uiManager_js__ = __webpack_require__(5);











const ATK_TEKI1 = 1;

class Teki1 extends __WEBPACK_IMPORTED_MODULE_1__enemy_js__["a" /* default */]{
  constructor(pos){
    super(pos,{x:0,y:0},{x:0,y:0});
    this.sprite = __WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].SpriteFactory(__WEBPACK_IMPORTED_MODULE_2__art_js__["a" /* default */].teki3Texture);
    this.sprite.position = pos;
    this.collisionShape = new __WEBPACK_IMPORTED_MODULE_3__Collision_collisionShape_js__["a" /* default */](SHAPE.BOX,new __WEBPACK_IMPORTED_MODULE_5__Collision_box_js__["a" /* default */](pos,16,16));//衝突判定の形状
    this.addAI(new __WEBPACK_IMPORTED_MODULE_7__AI_testAI_js__["a" /* default */](this));
    this.atk = ATK_TEKI1;
  }
  /* 衝突判定 */
  collision(){
    /*TODO リスト分割 */
    let EntityList = __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].entityList;

    for(let l of EntityList){
      switch(l.type){
        case ENTITY.PLAYER :
          /*衝突判定*/
          if(__WEBPACK_IMPORTED_MODULE_4__Collision_collision_js__["a" /* default */].on(this,l).isHit){
            l.hp-=this.atk;
            __WEBPACK_IMPORTED_MODULE_8__UI_uiManager_js__["a" /* default */].HP.Bar();
          }
          break;
      }
    }
  }

  UpdatePosition(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  Update(){
    this.collision();
    for (let AI of this.AIList){
      AI.Do();
    }
    this.UpdatePosition();
    this.sprite.position = this.pos;

    /*observer*/
    if(this.hp<=0){
      this.hp = 1;
      __WEBPACK_IMPORTED_MODULE_6__Stage_entityManager_js__["a" /* default */].removeEntity(this);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Teki1;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*state*/
class Scene{
  static Init(){
    this.stack = [];
    this.state = STATE.STAGE;
  }

  static ChangeState(newState){
    this.state = newState;
  }

  /* 新しい状態をスタックにプッシュして遷移 */
  static PushState(newState){
    this.stack.push(newState);
    this.state = newState();
  }
  /* 現在の状態を抜ける */
  static PopState(){
    /*debug*/
    console.assert(this.stack.length > 0 );
    this.state = this.stack.pop();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scene;



/***/ })
/******/ ]);