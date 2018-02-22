import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import MapData from '../Stage/mapData.js';
import EventManager from './eventmanager.js';
import QuakeEvent from './quakeEvent.js';
import Game from '../Game.js';
import EntityManager from '../Stage/entityManager.js';

//新しくメッセージ枠を開く
function* pop(text){
  Game.isMes = true;
  UIManager.PopMessage(text,"POP");
  yield ;
}
//メッセージをスクロールする
function* page(text){
  Game.isMes = true;
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
  //1 : new message 
  //2 : scrll page
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
