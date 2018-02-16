import Entity from './entity.js';
import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Circle from '../Collision/circle.js';
import Box from '../Collision/box.js';
import EntityManaer from '../Stage/entityManager.js';
import Util from '../util.js';
import Input from '../input.js';
import EventManager from '../Event/eventmanager.js';
import MessageEvent from '../Event/messageEvent.js';
import Game from '../Game.js';
import BackGround from './background.js';
import UIManager from '../UI/uiManager.js';


let VEC0 = {x:0,y:0};

export default class Signboard extends BackGround{
  constructor(pos,text){
    super(pos,Art.wallPattern.signboard);
    this.type = ENTITY.BACK;
    this.name = "signboard";
      /*テキスト*/
    this.text = text;
      /*スプライト*/
    this.tex = Art.wallPattern.signboard;//テクスチャ
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = pos;

    this.isPoing = false;//会話中かどうか
  }

  Update(){
    /*nothing to do*/
    let player = EntityManaer.player;
    if(Util.distance(player.pos,this.pos) < 16){
      if( Input.isKeyClick(KEY.SP)){
        if(!Game.isMes){
          let event = new MessageEvent(this.text);
          EventManager.eventList.push(event);
        }else{
          Game.isMes = false;
          UIManager.CloseMessage();
        }
      }
    }
    // this.sprite.position = this.pos;
  }
}
