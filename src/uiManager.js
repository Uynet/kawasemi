import Drawer from './drawer.js';
import UI from './ui.js';
/*UIクラス*/
export default class UIManager{
  static Init(){
    this.UIList = [];
  }
  /*UIのポップアップ*/
  static Open(){
    UIManager.addUI(new UI());
  }
  /*ポップアップの逆(?)*/
  static Close(){
    UIManager.removeUI(this.UIList[0]);
  }

  /*UIをリストに登録*/
  static addUI(ui){
    this.UIList.push(ui); 
    Drawer.addContainer(ui.sprite,"UI");
  }
  /*UIをリストから削除*/
  static removeUI(ui){
    let i = this.UIList.indexOf(ui);
    Drawer.removeContainer(ui.sprite,"UI");
    this.UIList.splice(i,1);
  }
  /*UIの更新*/
  static Update(){
    for(let l of this.uiList){
      l.Update(); 
    }
  }
}
