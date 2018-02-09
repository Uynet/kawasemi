import UI from './ui.js';
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Timer from '../timer.js';
import Util from '../util.js';

export default class UIBullet extends UI{
  constructor(pos,name){
    super(pos);
    /*基本情報*/
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
    this.type = UI_.BULLET;;
    /*スプライト*/
    switch (name){
      case "frame" : 
        this.spid = 0;
        break;
      case "bar" :
        this.spid = 1;
        break;
    }
    this.tex = Art.UIPattern.bullet[this.spid];
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = this.pos;
    this.name = name;
    this.max = 100;//EntityManager.player.maxbullet;
  }
  UpdateBar(bullet){
    if(this.name == "bar"){
      /*debug*/
      if(!EntityManager.player){
        console.warn("player undefined");
      }else{
        this.sprite.scale.x = bullet/this.max;
        UIManager.bullet.font.UpdateFont(bullet);
      }
    }
  }
  Update(){
  }
}
