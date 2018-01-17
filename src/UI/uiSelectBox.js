import UI from './ui.js';
import UIManager from './uiManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Timer from '../timer.js';

let shift = false;

/*イテレータ*/
let it;
let openIt;
/*
 * d : 必要時間
 * b : 開始点
 * c : 移動量*/
 let ease = function*(d,b,c){
   let x = 0;
   let s = Timer.timer;//開始時点の時刻
     let f = (x)=>{return Math.sqrt(x)};
   while(x < 1){
     x = (Timer.timer - s)/d;
     yield b + c*f(x);
   }
   yield b + c;
 }
 export default class UISelectBox extends UI{
   constructor(){
     super(Art.selectboxTexture,1); 
     this.select = UIManager.WeaponIconList[0];//選択中の武器
   }
   on(icon){
     this.select = icon;
   }
   Input(){
     if(Input.isKeyClick(KEY.RIGHT)){
       if(!shift){
         shift = true;
         it = ease(2,this.sprite.x,20);
       }
     }
     if(Input.isKeyClick(KEY.LEFT)){
       if(!shift){
         shift = true;
         it = ease(2,this.sprite.x,-20);
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
 }
