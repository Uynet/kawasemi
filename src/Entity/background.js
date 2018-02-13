import Entity from './entity.js';
import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Circle from '../Collision/circle.js';
import Box from '../Collision/box.js';
import EntityManaer from '../Stage/entityManager.js';

let VEC0 = {x:0,y:0};

//背景オブジェクト 何もしない
export default class Background extends Entity{
  constructor(pos,tex){
    super(pos,{x:0,y:0});
    this.type = ENTITY.BACK;
    this.tex = tex
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = pos;
  }
  Update(){
    /*nothing to do*/
    //this.sprite.position = this.pos;
  }
}
