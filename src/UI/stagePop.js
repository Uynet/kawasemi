import UI from './ui.js';
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';
import Game from '../game.js';


export default class StagePop extends UI{
  constructor(pos,text){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "PUSH";
    this.isMultiple = true;
    this.pos = pos;
    this.frame = 0;
    //文字
    this.i = 0;
    this.text = text;
    this.d = this.text.length;
    this.textObject = new Font(pos,"","MES");
    //スプライト
    this.spid = 0;
    this.container = new PIXI.Container();
    //text
    this.container.addChild(this.textObject.container);
    this.diff = 0;//文字のズレ
  }

  //1文字ずつ出ていって消える
  Update(){
    if(this.frame%3 == 0){
      this.diff = 4;
      this.i = Math.min(this.i+1,this.d-1);
      let str = this.text[this.i];
      this.textObject.PushText(str);
    }
    this.diff *= 0.3;
    let p = CPV(this.pos);
    p.y += this.diff;

    this.textObject.SetPos(p);

    if(this.frame>70) this.container.alpha -= 0.01;
    if(this.frame>300)UIManager.removeUI(this);
    this.frame ++;
  }
}
