import Drawer from '../drawer.js';
import UI from './ui.js';
import Input from '../input.js';
import Timer from '../timer.js';
import UIWeaponIcon from './uiWeaponIcon.js';
import UIWeaponEquip from './uiWeaponEquip.js';
import UISelectBox from './uiSelectBox.js';
import UIHP from './uiHP.js';
import EntityManager from '../Stage/entityManager.js';

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
         this.HP;
    /*各UIの初期化を行う
     * 一度初期化したUIを消す際には
     * ステージから外さず画面外にプールさせる*/
    UIManager.addUI(new UIWeaponIcon("1"));//武器1のサブアイコン
    UIManager.addUI(new UIWeaponIcon("2"));//武器2のサブアイコン
    UIManager.addUI(new UIWeaponIcon("3"));//武器3のサブアイコン
    UIManager.addUI(new UISelectBox());//セレクトボックス
    UIManager.addUI(new UIWeaponEquip("po"));//武器1のメインアイコン(?)
    UIManager.addUI(new UIHP("frame"));//HP
    UIManager.addUI(new UIHP("bar"));//HP

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
     EntityManager.player.ChangeWeapon(this.selectBox.select.name);
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
