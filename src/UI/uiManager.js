import Drawer from "../drawer.js";
import Audio from "../audio.js";
import StagePop from "./stagePop.js";
import GaugeHP from "./gaugeHP.js";
import GaugeBossHP from "./gaugeBossHP.js";
import GaugeBullet from "./gaugeBullet.js";
import WeaponList from "./weaponList.js";
import Font from "./font.js";
import Message from "./message.js";
import Menu from "./menu.js";
import Score from "./score.js";
import Game from "../game.js";
import Shop from "./shop.js";

import LoadingComponent from "./Component/loading.js";

const CONTINUEPOINT_STAGENUM = 11;
const BOSS_STAGENUM = 12;

const POS_BossHP = vec2(4, 180); //BossHP
const POS_HP = vec2(8, 0); //HP
const POS_BULLET = vec2(POS_HP.x, POS_HP.y + 16); //bullet
const POS_SCORE = vec2(208, POS_HP.y + 8); //score
const POS_MES = vec2(8, 132); //message
let POS_MENU = vec2(104, 48); //Menu
/*UIクラス*/
export default class UIManager {
  static Init() {
    this.UIList = []; //UI全部のリスト
    this.HP;
    this.BossHP;
    this.bullet;
    this.wlist;
    this.score;
    this.message;
    this.menu;
  }
  static PopStage(stage) {
    let p = {
      x: 96,
      y: 72
    };
    switch (Game.stage) {
      case CONTINUEPOINT_STAGENUM:
        UIManager.addUI(new StagePop(p, "^- こんてぃにゅーぽいんと -$"));
        break;
      case BOSS_STAGENUM:
        break;
      default:
        UIManager.addUI(new StagePop(p, "^-すてーじ " + Game.stage + "-$")); //SCORE
    }
  }

  //call from startbossBattleEvent
  static SetBoss() {
    UIManager.addUI(new GaugeBossHP(POS_BossHP)); //HP
  }
  static SetLoading() {
    UIManager.addUI(new LoadingComponent()); //HP
  }

  /*タイトルでのUI配置に変更*/
  static SetTitle() {
    let p1 = vec2(96, 64);
    let p2 = vec2(p1.x, p1.y + 10);
    let p3 = vec2(p1.x - 8, p2.y + 48);
    let p4 = vec2(32, 200);
    UIManager.addUI(new Font(p1, "さいはてどろっぷ", "MES")); //SCORE
    UIManager.addUI(new Font(p2, "- ver0.31 -", "MES")); //SCORE
    UIManager.addUI(new Font(p3, "Press Any Key", "MES")); //SCORE
    UIManager.addUI(new Font(p4, "+ 2018-2019 uynet", "MES")); //SCORE
  }
  /*ステージ中でのUI配置に変更*/
  static SetStage() {
    UIManager.addUI(new GaugeHP(POS_HP)); //HP
    UIManager.addUI(new GaugeBullet(POS_BULLET)); //BULLET
    UIManager.addUI(new WeaponList(POS_BULLET)); //WList;
    UIManager.addUI(new Score(POS_SCORE)); //SCORE
  }
  //メニューを開く
  static SetMenu() {
    Drawer.SetFilter([Drawer.testFilter]);
    UIManager.addUI(new Menu(add(POS_MENU, VECY(16))));
  }
  //UIをすべて削除
  static Clean() {
    while (this.UIList.length > 0) {
      this.removeUI(this.UIList[0]);
    }
    let filters = [];
    Drawer.SetFilter(filters);
  }
  //メッセージイベント
  /* text : 入力文字列
   * sentence : textを改行文字で区切った配列
   */
  static PopMessage(signboard) {
    UIManager.addUI(new Message(POS_MES, signboard)); //枠
  }
  static EnterShop() {
    UIManager.addUI(new Shop());
  }

  //UIをリストに登録
  static addUI(ui) {
    let layer = ui.layer;
    if (!layer) layer = "UI";

    this.UIList.push(ui);
    switch (ui.type) {
      case "HP":
        this.HP = ui;
        break;
      case "BULLET":
        this.bullet = ui;
        break;
      case "BossHP":
        this.BossHP = ui;
        break;
      case "WEAPON_LIST":
        this.wlist = ui;
        break;
      case "SCORE":
        this.score = ui;
        break;
      case "MES":
        this.message = ui;
        break;
      case "MENU":
        this.menu = ui;
        break;
      case "SHOP":
        this.shop = ui;
        break;
      // case "PUSH" : /*noth*/break;
      // case "COMPONENT" : /*noth*/break;
      // case "OTHER" : /*noth*/break;
      // default : console.warn(ui,ui.type);
    }
    //スプライトの追加
    if (!ui.isNoSprite) {
      Drawer.addContainer(ui.sprite, layer);
    }
  }
  /*UIをリストから削除*/
  //参照の開放をする
  static removeUI(ui) {
    let layer = ui.layer;
    if (!layer) layer = "UI";

    this.UIList.remove(ui);
    Drawer.removeContainer(ui.sprite, layer);
  }
  /*UIの更新*/
  static Update() {
    for (let UI of UIManager.UIList) {
      UI.Update();
    }
  }
}
