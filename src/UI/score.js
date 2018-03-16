import UI from './ui.js';
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';

//score Icon
const P_ICON = {
  x : 36, 
  y : -4, 
};

export default class Score extends UI{
  constructor(pos){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "SCORE"; 
    this.isMultiple = true;
    this.pos = pos;
    //child
    this.icon = {pos:ADV(pos,P_ICON)};
    this.amount = new Font(pos,"    0","SCORE");//数字
    //スプライト
    this.spid = 0;
    this.container = new PIXI.Container();
    let s;
    //icon
    s = Art.SpriteFactory(Art.UIPattern.score.icon);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);
  }
  SetScore(score){
    this.amount.SetFont(score);
  }
  Update(){
    //this.amount.container.position = this.pos
    this.amount.Update();
    /*nothing to do*/
  }
}
