import Entity from './entity.js';
import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Circle from '../Collision/circle.js';
import Box from '../Collision/box.js';
import EntityManaer from '../Stage/entityManager.js';

let VEC0 = {x:0,y:0};

export default class Wall extends Entity{
  constructor(pos,tex){
    super(pos,{x:0,y:0});
    this.type = ENTITY.WALL;
    this.tex = tex
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = pos;
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
  }
  Update(){
    /*nothing to do*/
    let player = EntityManaer.player;
    this.sprite.position = this.pos;
  }
}
