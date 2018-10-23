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
function* open(message){
  let e = new OpenWallEvent();
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
  constructor(eventType , message){
    super(); //特に意味はない
    switch(eventType){
      case "OPEN" : itt = open(message); break;
      default : console.warn("そんなイベントはないよ！")
    }
    this.func = itt;
  }
}
