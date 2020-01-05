import Drawer from "../drawer.js";
import StagePop from "./stagePop.js";
import GaugeHP from "./gaugeHP.js";
import GaugeBullet from "./gaugeBullet.js";
import WeaponList from "./weaponList.js";
import Font from "./font.js";
import Menu from "./menu.js";
import Score from "./score.js";
import Game from "../game.js";

const CONTINUEPOINT_STAGENUM = 11;
const BOSS_STAGENUM = 12;

const POS_HP = vec2(8, 0); //HP
const POS_BULLET = vec2(POS_HP.x, POS_HP.y + 16); //bullet
const POS_SCORE = vec2(208, POS_HP.y + 8); //score
let POS_MENU = vec2(104, 48); //Menu
/*UIクラス*/
export default class UIManager {
  static Init() {
    this.UIList = []; //UI全部のリスト
  }
  static PopStage(stage) {
    let p = {
      x: 96,
      y: 72
    };
    switch (Game.stage) {
      case CONTINUEPOINT_STAGENUM:
        UIManager.add(new StagePop(p, "^- こんてぃにゅーぽいんと -$"));
        break;
      case BOSS_STAGENUM:
        break;
      default:
        UIManager.add(new StagePop(p, "^-すてーじ " + Game.stage + "-$")); //SCORE
    }
  }
  static find(name) {
    return UIManager.UIList.filter(e => e.type == name);
  }
  /*タイトルでのUI配置に変更*/
  static SetTitle() {
    let p1 = vec2(96, 64);
    let p2 = vec2(p1.x, p1.y + 10);
    let p3 = vec2(p1.x - 8, p2.y + 48);
    let p4 = vec2(32, 200);
    UIManager.add(new Font(p1, "さいはてどろっぷ", "MES")); //SCORE
    UIManager.add(new Font(p2, "- ver0.33 -", "MES")); //SCORE
    UIManager.add(new Font(p3, "Press Any Key", "MES")); //SCORE
    UIManager.add(new Font(p4, "+ 2018-2019 uynet", "MES")); //SCORE
  }
  /*ステージ中でのUI配置に変更*/
  static SetStage() {
    UIManager.add(new GaugeHP(POS_HP)); //HP
    UIManager.add(new GaugeBullet(POS_BULLET)); //BULLET
    UIManager.add(new WeaponList(POS_BULLET)); //WList;
    UIManager.add(new Score(POS_SCORE)); //SCORE
  }
  //メニューを開く
  static SetMenu() {
    Drawer.SetFilter([Drawer.testFilter]);
    UIManager.add(new Menu(add(POS_MENU, VECY(16))));
  }
  //UIをすべて削除
  static Clean() {
    while (this.UIList.length > 0) {
      this.remove(this.UIList[0]);
    }
    let filters = [];
    Drawer.SetFilter(filters);
  }

  //UIをリストに登録
  static add(ui) {
    let layer = ui.layer;
    if (!layer) layer = "UI";

    UIManager.UIList.push(ui);
    //スプライトの追加
    if (!ui.isNoSprite) {
      Drawer.add(ui.sprite, layer);
    }
  }
  /*UIをリストから削除*/
  //参照の開放をする
  static remove(ui) {
    let layer = ui.layer;
    if (!layer) layer = "UI";
    UIManager.UIList.remove(ui);
    Drawer.remove(ui.sprite, layer);
  }
  /*UIの更新*/
  static Update() {
    for (let UI of UIManager.UIList) {
      UI.Update();
    }
  }
}
