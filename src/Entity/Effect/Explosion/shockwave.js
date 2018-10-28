import EFFECT from '../effect.js';
import Drawer from "../../../drawer.js";
import Art from '../../../art.js';
import EntityManager from '../../../Stage/entityManager.js';

//衝撃シェーダ
export default class Shockwave extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    //微妙に左上に寄ってるので中心に
    this.pos = ADV(this.pos,VECN(8));
    /*基本情報*/
    this.frame = 0;
    this.isNoSprite = true;
  }

  Update(){
    Drawer.Stage.filters[0].uniforms.x = this.pos.x/800; 
    Drawer.Stage.filters[0].uniforms.y = this.pos.y/640; 
    Drawer.Stage.filters[0].uniforms.time = this.frame;
    if(this.frame > 300) EntityManager.removeEntity(this);
    this.frame++;
  }
}
