import Drawer from "../drawer.js";
import StagePop from "./stagePop.js";
import Menu from "./menu.js";
import Game from "../game.js";

const CONTINUEPOINT_STAGENUM = 11;
const BOSS_STAGENUM = 12;

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
    let list = [];
    UIManager.UIList.forEach(e => {
      if (e.type == name) list.push(e);
      e.children.forEach(child => {
        if (child.type == name) list.push(child);
      });
    });
    return list;
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
