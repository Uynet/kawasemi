import UI from './ui.js';
import UIManager from './uiManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Timer from '../timer.js';
import Util from '../util.js';

let shift = false;

/*イテレータ*/
let it;

 export default class UISelectBox extends UI{
   constructor(){
     super(Art.selectboxTexture,UI_.SELBOX); 
     this.selectID = 0;
     this.select = UIManager.WeaponIconList[this.selectID];//選択中の武器
   }
   on(icon){
     this.select = icon;
   }
   Input(){
     if(Input.isKeyClick(KEY.RIGHT)){
       if(!shift && this.selectID < UIManager.WeaponIconList.length-1){
         shift = true;
         this.selectID++;
         this.select = UIManager.WeaponIconList[this.selectID];//選択中の武器
         it = Util.ease(2,this.sprite.x,20,"out");
       }
     }
     if(Input.isKeyClick(KEY.LEFT)){
       if(!shift && this.selectID > 0){
         shift = true;
         this.selectID--;
         this.select = UIManager.WeaponIconList[this.selectID];//選択中の武器
         it = Util.ease(2,this.sprite.x,-20,"out");
       }
     }
   }
   Update(){
     /*TODO 入力先読みにする*/
     this.Input();
     if(shift){
       if(!it.next().done) {
         this.sprite.x = it.next().value;
       }else{
         shift = false;
       }
     }
   }
   GetSelectedWeapon(){
     return UIList[3];
   }
 }
