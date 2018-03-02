import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import EventManager from './eventmanager.js';
import Game from '../game.js';
import EntityManager from '../Stage/entityManager.js';

//新しくメッセージ枠を開く
function* pop(text){
  Game.scene.PushSubState("MES");
  UIManager.PopMessage(text,"POP");
  yield ;
}
//メッセージをスクロールする
function* page(text){
  UIManager.PopMessage(text,"PAGE");
  yield ;
}
//イベントを発生させる
function* event(){
  let e = new QuakeEvent(5,10);
  EntityManager.player.Damage(-999);
  EventManager.eventList.push(e);
  yield ;
}

let itt;
//メッセージイベント
export default class MessageEvent extends Event{
  //text ... 文章の配列
  //type : 
  //pop : new message 
  //page : scrll page
  //event : trriger event
  constructor(text,type){
    super(); //特に意味はない
    switch(type){
      case "POP" : itt = pop(text); break;
      case "PAGE": itt = page(text); break;
      case "EVENT": itt = event(); break;
    }
    this.func = itt;
  }
}
