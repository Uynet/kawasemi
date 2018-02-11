import Drawer from '../drawer.js';
import UI from './ui.js';
import Input from '../input.js';
import Timer from '../timer.js';
import UIWeaponIcon from './uiWeaponIcon.js';
import UIWeaponEquip from './uiWeaponEquip.js';
import UISelectBox from './uiSelectBox.js';
import UIHP from './uiHP.js';
import UIBullet from './uiBullet.js';
import UIFont from './uiFont.js';

import EntityManager from '../Stage/entityManager.js';

const WEQ = {
  x : 8, 
  y : 1, 
};
//HP frame
const HPF = {
  x : WEQ.x + 48, 
  y : WEQ.y, 
};
//HP bar
const HPB = {
  x : HPF.x, 
  y : HPF.y, 
};
//HP font 
const HPFont = {
  x : HPF.x+22, 
  y : HPF.y+4, 
};
//HP Icon
const HPIC = {
  x : HPF.x-16, 
  y : HPF.y, 
};
//bullet frame
const BulF = {
  x : HPF.x, 
  y : HPF.y+16, 
};
//bullet bar
const BulB = {
  x : BulF.x, 
  y : BulF.y, 
};
//Bullet font 
const BulFont = {
  x : BulF.x+22, 
  y : BulF.y+4, 
};
//Bullet icon 
const BulIC = {
  x : BulF.x-16, 
  y : BulF.y, 
};

//message
const MES = {
  x:70,
  y:150
}
/*UIクラス*/
/*TODO リファクタリング*/
export default class UIManager{
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
    //オブジェクトの初期化分からん
    this.HP = {
      bar : undefined,
      frame : undefined,
      font : undefined,
      icon : undefined
    };
    this.bullet = {
      bar : undefined,
      frame : undefined,
      font : undefined,
      icon : undefined
    };
    this.message = {
      frame : undefined,
      text : undefined
    }
  }

  /*タイトルでのUI配置に変更*/
  static SetTitle(){
    UIManager.addUI(new UIWeaponEquip(HPB,"po"));//武器1のメインアイコン(?)
  }
  static CleanTitle(){
    UIManager.removeUI(this.weaponEquip);
  }

  /*ステージ中でのUI配置に変更*/
  static SetStage(){
    /*装備中の武器*/
    UIManager.addUI(new UIWeaponEquip(WEQ,"po"));//武器1のメインアイコン(?)
    /*HP*/
    UIManager.addUI(new UIHP(HPF,"frame"));//外枠
    UIManager.addUI(new UIHP(HPB,"bar"));//中
    UIManager.addUI(new UIFont(HPFont,"100","HP"));//数字
    UIManager.addUI(new UIHP(HPIC,"icon"));//
    /*bullet*/
    UIManager.addUI(new UIBullet(BulF,"frame"));//外枠
    UIManager.addUI(new UIBullet(BulB,"bar"));//中
    UIManager.addUI(new UIFont(BulFont,"100","BULLET"));//数字
    UIManager.addUI(new UIBullet(BulIC,"icon"));//
  }

  //メッセージイベント
  static PopMessage(str){
    //UIManager.addUI(new UIFont(HPFont,"100","HP"));//数字
    UIManager.addUI(new UIFont(MES,str,"MES"));//武器1のメインアイコン(?)
  }
  static CloseMessage(){
    UIManager.removeUI(this.message.text);
  }

  /*WeaponIconのポップアップ*/
  //持っている武器の数だけアイコンをpop
  //持っている武器の情報はどうやって保持する?
  static OpenWeapon(){
    let p = {
      x:16,
      y:16
    }
    UIManager.addUI(new UIWeaponIcon(p,"1"));//武器1のサブアイコン
    UIManager.addUI(new UIWeaponIcon(p,"2"));//武器2のサブアイコン
    UIManager.addUI(new UIWeaponIcon(p,"3"));//武器3のサブアイコン
    //UIManager.addUI(new UISelectBox());//セレクトボックス
    //for(let i = 0;i<this.WeaponIconList.length;i++){
    //this.WeaponIconList[i].index = i;
    //}
    // this.selectBox.sprite.x = WICON_X-2 + 20 * this.selectBox.selectID;
    }
  /*ポップアップの逆(?)*/
  static CloseWeapon(){
    for(let l of this.WeaponIconList){
      UIManager.removeUI(l);//武器1のサブアイコン
    }
    // this.selectBox.sprite.x = -32;
    //EntityManager.player.ChangeWeapon(this.selectBox.select.name);
    }

  /*UIをリストに登録*/
  static addUI(ui){
    this.UIList.push(ui); 
    switch (ui.type){
      //weapon icon
      case UI_.WICON : 
        this.WeaponIconList.push(ui);
        break;
        //selectbox
        case UI_.SELBOX : 
          break;
          //equip
          case UI_.WEQUIP : 
            this.weaponEquip = ui;
            break;
            //HPゲージ
            case UI_.HP :
              if(ui.name == "bar") {
                this.HP.bar = ui;
              }else if(ui.name == "frame"){
                this.HP.frame = ui;
              }else if(ui.name == "font"){
                this.HP.font = ui;
              }else if(ui.name == "icon"){
                this.HP.icon = ui;
              }
              break;
              //Bulletゲージ
              case UI_.BULLET :
              if(ui.name == "bar") {
                this.bullet.bar = ui;
              }else if(ui.name == "frame"){
                this.bullet.frame = ui;
              }else if(ui.name == "font"){
                this.bullet.font = ui;
              }else if(ui.name == "icon"){
                this.bullet.icon = ui;
              }
              break;
 case "MES" : 
   this.message.text = ui;
   break;
 default :
   console.warn(ui);
    }
    //fontはスプライトを複数持っているので特別
    if(ui.name == "font"){
      for(let i = 0;i<ui.sprite.length;i++){
        Drawer.addContainer(ui.sprite[i],"UI");
      }
    }else{
      Drawer.addContainer(ui.sprite,"UI");
    }
  }
  /*UIをリストから削除*/
  //参照の開放をする
  static removeUI(ui){
    let i = this.UIList.indexOf(ui);
    this.UIList.splice(i,1);
    //複数スプライトを持つオブジェクト
    if(ui.name == "font"){
      for(let i = 0;i<ui.sprite.length;i++){
        Drawer.removeContainer(ui.sprite[i],"UI");
      }
    //単スプライト
    }else{
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
