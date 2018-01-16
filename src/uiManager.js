import Drawer from './drawer.js';
import UI from './ui.js';
import INPUT from './input.js';
/*UIクラス*/
/*TODO リファクタリング*/
export default class UIManager{
  static Init(){
    /*content
     * HP
     * 武器
     * その他
     */
    this.UIList = [];//UI全部のリスト
    this.WeaponIconList = [];//武器アイコンのリスト

  }
  /*WeaponIconのポップアップ*/
  static OpenWeapon(){
    for(let i = 0;i<this.WeaponIconList.length;i++){
      this.WeaponIconList[i].sprite.x += 20*i;
    }
  }
  /*ポップアップの逆(?)*/
  static CloseWeapon(){
    for(let i = 0;i<this.WeaponIconList.length;i++){
      this.WeaponIconList[i].sprite.x = 32;
    }
  }

  /*UIをリストに登録*/
  static addUI(ui){
    /*TODO リストの重複を排除*/
    this.UIList.push(ui); 
    switch (ui.type){
      case 0 : 
        this.WeaponIconList.push(ui);
        break;
        //add more...
    }
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
      switch (l.type){
        case 0:
          /* */
          break;
        case 1:
          cl(INPUT.isKeyClick(KEY.RIGHT));
          if(INPUT.isKeyClick(KEY.RIGHT)){
            l.sprite.x += 20;
          }
          if(INPUT.isKeyClick(KEY.LEFT)){
            l.sprite.x -= 20;
          }
          break;
      }
    }
  }
}
