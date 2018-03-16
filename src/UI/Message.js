import UI from './ui.js';
import UIManager from './uiManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';

const P_TEXT = VECN(8);//テキストの相対位置
const COLUMN = 10;//行間

export default class Message extends UI{
  constructor(pos,text){
    super(pos); 
    /*基本情報*/
    this.text = text;
    let sent = this.text.split("\n");
    this.sentence = [];//Font
      this.type = "MES";
    /*child*/
    this.outer = {
      sprite : Art.SpriteFactory(Art.UIPattern.message.frame), 
    }
    //文字の長さに応じて枠を調整
    this.outer.sprite.scale.x *= 1.5;
    this.outer.sprite.scale.y *= 1.5; //yは固定
    /*スプライト*/
    this.isMultiple = true;
    //枠スプライト追加
    let p = CPV(pos);
    this.outer.sprite.position = p;
    this.container = new PIXI.Container();
    this.container.addChild(this.outer.sprite);
    p = ADV(p,P_TEXT);
    //テキスト
    for(let i = 0;i<sent.length;i++){
      this.sentence.push(new Font(p,sent[i],"MES"));//テキスト 
      p.y += COLUMN;
    }
    //各行各文字のスプライトを追加
    for(let l of this.sentence){
      this.container.addChild(l.container);
    }
  }
  Page(text){
    //改ページするために文字だけを消す
    for(let i=0;i<this.sentence.length;i++){
      UIManager.removeUI(this.sentence[i]);
    }
    //これをすると先頭以外の要素が消える
    //つまり枠スプライトを残し他の文字を消す
    this.container.children.length = 1;//は？
      //新しい文字
      this.text = text;
    let sent = this.text.split("\n");
    this.sentence = [];//Font
      let p = CPV(this.pos);
    p = ADV(p,P_TEXT);
    //テキスト
    for(let i = 0;i<sent.length;i++){
      this.sentence.push(new Font(p,sent[i],"MES"));//テキスト 
      p.y += COLUMN;
    }
    //各行各文字のスプライトを追加
    for(let l of this.sentence){
      this.container.addChild(l.container);
    }
    UIManager.addUI(this);
  }
  Update(){
  }
}
