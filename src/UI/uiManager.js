import Drawer from '../drawer.js';
import UI from './ui.js';
import Input from '../input.js';
import Timer from '../timer.js';
import UIWeaponIcon from './uiWeaponIcon.js';
import UIWeaponEquip from './uiWeaponEquip.js';
import UISelectBox from './uiSelectBox.js';
import UIHP from './uiHP.js';
import EntityManager from '../Stage/entityManager.js';


const HPF = {
  x : 56, 
  y : 8, 
};
const HPB = {
  x : 56, 
  y : 8, 
};
const WEQ = {
  x : 8, 
  y : 8, 
};

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
    this.HPframe;
    /*各UIの初期化を行う
     * 一度初期化したUIを消す際には
     * ステージから外さず画面外にプールさせる*/
    //UIManager.addUI(new UIWeaponIcon("1"));//武器1のサブアイコン
    //UIManager.addUI(new UIWeaponIcon("2"));//武器2のサブアイコン
    //UIManager.addUI(new UIWeaponIcon("3"));//武器3のサブアイコン
    //UIManager.addUI(new UISelectBox());//セレクトボックス
   }

   /*タイトルでのUI配置に変更*/
   static SetTitle(){
     UIManager.addUI(new UIWeaponEquip(HPB,"po"));//武器1のメインアイコン(?)
     cl(this.weaponEquip);
   }
   static CleanTitle(){
     cl(this.weaponEquip);
     UIManager.removeUI(this.weaponEquip);
   }

   /*ステージ中でのUI配置に変更*/
   static SetStage(){
     /*武器アイコン*/
     /*
     for(let l of this.WeaponIconList){
       l.sprite.position.x = -32;
       l.sprite.position.y =  WICON_Y;
     }
     */
        /*セレクトボックス*/
        //this.selectBox.sprite.position.x = -32;
        //this.selectBox.sprite.position.y = WICON_Y-3;
        /*装備中の武器*/
        UIManager.addUI(new UIWeaponEquip(WEQ,"po"));//武器1のメインアイコン(?)
        /*HP*/
        UIManager.addUI(new UIHP(HPF,"frame"));//HP
        UIManager.addUI(new UIHP(HPB,"bar"));//HP
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
       //HP
       case UI_.HP :
         if(ui.name == "bar") {
           this.HP = ui;
         }
         else if(ui.name == "frame"){
           this.HPframe = ui;
         }
         break;
       default :
         console.warn(ui);
     }
     Drawer.addContainer(ui.sprite,"UI");
   }
   /*UIをリストから削除*/
   //参照の開放をする
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
