import UI from './ui.js';
import UIManager from './uiManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Timer from '../timer.js';
import Util from '../util.js';

 export default class UIWeaponIcon extends UI{
   constructor(name){
     super(Art.UIPattern.wEq1,UI_.WEQUIP); 
     this.name = name;
   }
 }
