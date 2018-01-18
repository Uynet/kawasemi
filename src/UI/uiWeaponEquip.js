import UI from './ui.js';
import UIManager from './uiManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Timer from '../timer.js';
import Util from '../util.js';
 export default class UIWeaponIcon extends UI{

   constructor(name){
     super(Art.weaponEquip,2); 
     this.name = name;
   }
 }
