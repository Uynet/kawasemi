import Entity from './entity.js';
import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Collision from '../Collision/collision.js';
import EntityManager from '../Stage/entityManager.js';
import Circle from '../Collision/circle.js';
import Box from '../Collision/box.js';
import Game from '../Game.js';
import GameOverEvent from '../Event/gameOverEvent.js';
import EventManager from '../Event/eventmanager.js';


export default class Goal extends Entity{
  constructor(pos){
    super(pos);
    this.type = ENTITY.GOAL;
    this.sprite = Art.SpriteFactory(Art.wallPattern[1]);
    this.sprite.position = pos;
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.isgoal = false;//??
  }
  Update(){
    if(Collision.on(this,EntityManager.player).isHit){
      /*ステージ遷移処理*/
      if(!this.isgoal){
        Game.stage++;
        let g = new GameOverEvent();
        EventManager.eventList.push(g);
        this.isgoal = true;
      }
    }
  }
}
