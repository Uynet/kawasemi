import UI from './ui.js';
import Audio from "../audio.js";
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';
import Game from '../game.js';


export default class StagePop extends UI{
  constructor(pos,text,interval){
    //interval ... 文字の出る速さ
    super(pos);
    if(!interval){
      this.interval = 3;
    }else{
      this.interval = interval;
    }
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "PUSH";
    this.isMultiple = true;
    pos.x -= (text.length)*8/2;
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
    if(this.frame%this.interval == 0){
      this.diff = 4;
      this.i = Math.min(this.i+1,this.d-1);
      let str = this.text[this.i];
      if(str != " " && str != "$"){
        //Audio.PlaySE("empty",-0.5);
        //Audio.PlaySE("changeWeapon",-0.1);
      }
      this.textObject.PushText(str);
    }
    this.diff *= 0.3;
    let p = CPV(this.pos);
    p.y += this.diff;

    this.textObject.SetPos(p);

    if(this.frame>this.text.length * this.interval) this.container.alpha -= 0.01;
    if(this.frame>300)UIManager.removeUI(this);
    this.frame ++;
  }
}
