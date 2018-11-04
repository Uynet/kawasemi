import EFFECT from '../effect.js';
import Drawer from "../../../drawer.js";
import Art from '../../../art.js';
import EntityManager from '../../../Stage/entityManager.js';

//衝撃シェーダ
export default class Shockwave extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.frame = 0;
    this.isNoSprite = true;
  }

  Update(){
    Drawer.Stage.filters = [Drawer.testFilter];
    Drawer.Stage.filters[0].uniforms.x = this.pos.x/800; 
    Drawer.Stage.filters[0].uniforms.y = this.pos.y/640; 
    Drawer.Stage.filters[0].uniforms.time = this.frame;
    if(this.frame > 100) this.Delete();
    this.frame++;
  }
}
