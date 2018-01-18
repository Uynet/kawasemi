import Drawer from '../drawer.js';
import UI from './ui.js';
import Input from '../input.js';
import Timer from '../timer.js';



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
       let to = WICON_X + 20*i;
       let dif = to - this.WeaponIconList[i].sprite.x;
       this.WeaponIconList[i].sprite.x += dif * 0.6;
     }
   }
   /*ポップアップの逆(?)*/
   static CloseWeapon(){
     for(let i = 0;i<this.WeaponIconList.length;i++){
       this.WeaponIconList[i].sprite.x = -32;
     }
     UIManager.removeUI(this.UIList[4]);
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
     UIManager.OpenWeapon();
     for(let l of UIManager.UIList){
       switch (l.type){
         case 0:
           /* */
           break;
         case 1://カーソル移動
           l.Update();
           break;
       }
     }
   }
 }
