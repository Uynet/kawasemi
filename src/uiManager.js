import Drawer from './drawer.js';
/*UIクラス*/
export default class UIManager{
  static Init(){
    this.UIList = [];
  }
  static Pop(){
  }
  /*UIをリストに登録*/
  static addUI(ui){
    this.UIList.push(ui); 
    Drawer.addStage(ui.sprite);
  }
  /*UIをリストから削除*/
  static removeUI(ui){
    let i = this.UIList.indexOf(ui);
    Drawer.removeStage(ui.sprite);
    this.UIList.splice(i,1);
  }
  /*UIの更新*/
  static Update(){
    for(let l of this.uiList){
      l.Update(); 
    }
  }
}
