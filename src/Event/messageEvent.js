import Event from './event.js';
import Audio from '../audio.js';
import UIManager from '../UI/uiManager.js';
import EventManager from './eventmanager.js';
import Game from '../game.js';
import EntityManager from '../Stage/entityManager.js';
import QuakeEvent from '../Event/quakeEvent.js';
import Explosion1 from '../Entity/Effect/explosion1.js';

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
//突貫工事クソイベントなので必ず直すこと
function* event(){
  let e = new QuakeEvent(5,10);
  //stage1で開く壁の為 だけ に 作られている!
  EntityManager.removeEntity(EntityManager.wallList[93]);
  let p = {
    x : 160,
    y : 352,
  }
  EntityManager.addEntity(new Explosion1(p));
  EventManager.eventList.push(e);
  Audio.PlaySE("missileHit");
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
