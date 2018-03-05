import Drawer from '../drawer.js';
import UI from './ui.js';
import GaugeHP from './gaugeHP.js';
import GaugeBullet from './gaugeBullet.js';
import Font from './font.js';
import Message from './message.js';
import Menu from './menu.js';
import Score from './score.js';
import EntityManager from '../Stage/entityManager.js';

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
  x : 216,
  y : P_BUL.y + 8, 
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
export default class UIManager{
  static Init(){
    this.UIList = [];//UI全部のリスト
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
    UIManager.addUI(new GaugeHP(P_HP));//HP
    UIManager.addUI(new GaugeBullet(P_BUL));//BULLET
    //UIManager.addUI(new Font(P_SCORE,"0","SCORE"));//SCORE
    UIManager.addUI(new Score(P_SCORE));//SCORE
  }
  //フィルタ
  static SetFilter(filters){
    Drawer.entityContainer.filters = filters;
    Drawer.backContainer.filters = filters;
    Drawer.backGroundContainer.filters = filters;
    Drawer.foreContainer.filters = filters;
  }
  //メニューを開く
  static SetMenu(){
    UIManager.SetFilter([Drawer.noiseFilter]);
    UIManager.addUI(new Menu(ADV(P_MENU,{x:0,y:16})));
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
      UIManager.addUI(new Message(P_MES,text));//枠
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
        Drawer.addContainer(ui.container,"UI");
    }else{
      //単スプライト
      Drawer.addContainer(ui.sprite,"UI");
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
        Drawer.removeContainer(ui.container,"UI");
    }else{
      //単スプライト
      Drawer.removeContainer(ui.sprite,"UI");
    }
  }
  /*UIの更新*/
  static Update(){
    for(let l of UIManager.UIList){
      l.Update();
    }
  }
}
