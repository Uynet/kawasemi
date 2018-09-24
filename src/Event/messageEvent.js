import Event from './event.js';
import Audio from '../audio.js';
import UIManager from '../UI/uiManager.js';
import EventManager from './eventmanager.js';
import Game from '../game.js';
import EntityManager from '../Stage/entityManager.js';
import QuakeEvent from '../Event/quakeEvent.js';
import Explosion1 from '../Entity/Effect/explosion1.js';
import OpenWallEvent from '../Event/openWallEvent.js';
import Input from "../input.js";

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

function* event(text){
  //5 = "EVENT".length
  let eventMessage = text.split("\n")[0];
  let e;
  switch(eventMessage){
    case "EVENTOpenWall" : e = new OpenWallEvent(); break;
    case "EVENTSelect" :  e = new OpenWallEvent(); break;
    default : cl("missing event:"+eventMessage);
  }
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
      case "EVENT": itt = event(text); break;
    }
    this.func = itt;
  }
}
