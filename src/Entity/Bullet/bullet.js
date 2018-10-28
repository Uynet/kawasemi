import Entity from '../entity.js';
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';

export default class Bullet extends Entity{
  SetSprite(){
    this.spid = 0;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
  }
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.layer = "ENTITY";
    this.isMultiple = false;
    this.type = "MOVER";

    this.isUpdater  =true;
    this.AIList = [];
  }
  Update(){
    this.ExecuteAI();
  }
}
