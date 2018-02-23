import UI from './ui.js';
import UIManager from './uiManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Timer from '../timer.js';
import Util from '../util.js';

 export default class Message extends UI{
   constructor(pos,name){
    super(pos); 
    /*基本情報*/
    this.name = name;
    this.type = "MES";
    /*スプライト*/
    this.tex = Art.UIPattern.message.frame;
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = this.pos;
   }
   Update(){
     /*nothing to do*/
   }
 }
