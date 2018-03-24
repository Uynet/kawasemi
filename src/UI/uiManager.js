import Drawer from '../drawer.js';
import Audio from '../audio.js';
import UI from './ui.js';
import StagePop from './stagePop.js';
import GaugeHP from './gaugeHP.js';
import GaugeBullet from './gaugeBullet.js';
import WeaponList from './WeaponList.js';
import Font from './font.js';
import Message from './message.js';
import Menu from './menu.js';
import Score from './score.js';
import EntityManager from '../Stage/entityManager.js';
import Game from '../game.js';

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
export default class UIManager{
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
    UIManager.addUI(new StagePop(p,"--どうくつ "+Game.stage+"- "));//SCORE
  }

  /*タイトルでのUI配置に変更*/
  static SetTitle(){
    let p1 = {
      x : 96, 
      y : 64,
    }
    UIManager.addUI(new Font(p1,"さいはてどろっぷ","MES"));//SCORE
    let p2 = {
      x : p1.x, 
      y : p1.y+10,
    }
    UIManager.addUI(new Font(p2,"- ver0.1 -","MES"));//SCORE
    let p3 = {
      x : p1.x-8, 
      y : p2.y+48,
    }
    UIManager.addUI(new Font(p3,"Press Any Key","MES"));//SCORE
    let p4 = {
      x : 172, 
      y : 192,
    }
    UIManager.addUI(new Font(p4,"+ 2018 uynet","MES"));//SCORE
  }
  /*ステージ中でのUI配置に変更*/
  static SetStage(){
    UIManager.addUI(new GaugeHP(P_HP));//HP
    UIManager.addUI(new GaugeBullet(P_BUL));//BULLET
    UIManager.addUI(new WeaponList(P_BUL));//WList;
    UIManager.addUI(new Score(P_SCORE));//SCORE
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
    Drawer.entityContainer.aplha = 0.5;
    Drawer.backContainer.filters = filters;
    Drawer.backGroundContainer.filters = filters;
    Drawer.foreContainer.filters = filters;
    Drawer.UIContainer.filters = filters;
  }
  //メニューを開く
  static SetMenu(){
    UIManager.SetFilter([Drawer.testFilter]);
    UIManager.addUI(new Menu(ADV(P_MENU,VECY(16))));
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
    Audio.PlaySE("changeWeapon");
    switch(type){
      case "POP" : 
        UIManager.addUI(new Message(P_MES,text));//枠
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
        Drawer.addContainer(ui.container,layer);
    }else{
      //単スプライト
      Drawer.addContainer(ui.sprite,layer);
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
        Drawer.removeContainer(ui.container,layer);
    }else{
      //単スプライト
      Drawer.removeContainer(ui.sprite,layer);
    }
  }
  /*UIの更新*/
  static Update(){
    for(let l of UIManager.UIList){
      l.Update();
    }
  }
}
