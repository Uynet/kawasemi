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


let VEC0 = {x:0,y:0};

export default class Signboard extends Entity{
  constructor(pos,tex){
    super(pos,{x:0,y:0});
    this.type = ENTITY.BG
    this.tex = tex
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = pos;

    this.isPoing = false;//会話中かどうか
  }

  Update(){
    /*nothing to do*/
    let player = EntityManaer.player;
    if(Util.distance(player.pos,this.pos) < 10){
        if(Input.isKeyClick(KEY.UP)){
          let event = new MessageEvent();
          EventManager.eventList.push(event);
        }
    }
    // this.sprite.position = this.pos;
  }
}
