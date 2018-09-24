import UI from './ui.js';
import UIManager from './uiManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';
import Game from "../game.js";
import MessageEvent from '../Event/messageEvent.js';
import EventManager from "../Event/eventmanager.js";

const P_TEXT = VECN(8);//テキストの相対位置
const COLUMN = 10;//行間

export default class Message extends UI{
  constructor(pos,signboard){
    super(pos); 
    /*基本情報*/
    this.signboard = signboard;
    this.message = signboard.message;
    this.frame = 0;

    /*child*/
    this.type = "MES";
    this.outer = {
      sprite : Art.SpriteFactory(Art.UIPattern.message.frame), 
    }
    //文字の長さに応じて枠を調整
    this.outer.sprite.scale.x *= 4.0;
    this.outer.sprite.scale.y *= 2.5; //yは固定
    /*スプライト*/
    this.isMultiple = true;
    //枠スプライト追加
    let p = CPV(pos);
    this.outer.sprite.position = p;
    this.container = new PIXI.Container();
    this.container.addChild(this.outer.sprite);
    p = ADV(p,P_TEXT);

    this.page=0;
    //テキスト
    /*
    */
  }
  ReadNextPage(text){
    this.ClearMessage();
    this.EmitEvent();
    this.RenderText();
    this.page++;
  }
  ClearMessage(){
    //改ページするために文字だけを消す
    let mes = this.message[this.page];
    let sentence = mes.split("\n");
    for(let i=0;i<sentence.length;i++){
      UIManager.removeUI(sentence[i]);
    }
    //これをすると先頭以外の要素が消える
    //つまり枠スプライトを残し他の文字を消す
    this.container.children.length = 1;//は？
  }
  //テキストを表示する
  RenderText(){
    let mes = this.message[this.page];
    let sent = mes.split("\n");
    let sentenceSprite = [];
    this.isRead = true;

    let p = CPV(this.pos);
    p = ADV(p,P_TEXT);
    for(let i = 0;i<sent.length;i++){
      let f = new Font(p,sent[i],"MES")
      sentenceSprite.push(f);//テキスト 
      p.y += COLUMN;
    }
    //各行各文字のスプライトを追加
    for(let l of sentenceSprite){
      this.container.addChild(l.container);
    }
  }
  EmitEvent(){
    /*イベント発生用メッセージ*/
    let m = this.message[this.page];
    if(m !== undefined){
      if(m.slice(0,5) == "EVENT"){;
        let event = new MessageEvent("OPEN",m);
        EventManager.eventList.push(event);
        //クソポイント
        //ここでメッセージを変更するな
        this.message[this.page] = "はっこうずみ"
        this.page++;
      }//
      if(m.slice(0,6) == "SELECT"){;
        let event = new MessageEvent(m,"SELECT");
        EventManager.eventList.push(event);
      }
    }
  }
  CloseMessage(){
    this.signboard.isRead = false;
    this.signboard.isNear = false;
    Game.scene.PopSubState();
    UIManager.removeUI(this);
  }
  Update(){
    if( Input.isKeyClick(KEY.X)){
      if(this.page < this.message.length){
        this.ReadNextPage();
      }else{
        this.CloseMessage();
      }
    }
    this.frame++;
  }
}
