import EFFECT from '../effect.js';
import Drawer from "../../../drawer.js";
import Timer from "../../../timer.js";

//衝撃シェーダ
export default class Shockwave extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.frame = 0;
    this.continuasFrame = this.frame;
    this.isNoSprite = true;
  }

  Update(){
    Drawer.Stage.filters = [Drawer.testFilter];
    Drawer.Stage.filters[0].uniforms.x = this.pos.x/800; 
    Drawer.Stage.filters[0].uniforms.y = this.pos.y/640; 
    Drawer.Stage.filters[0].uniforms.time = this.continuasFrame;
    this.continuasFrame += Timer.GetTimeScale();
    this.frame = Math.floor(this.continuasFrame);
    if(this.frame > 100) this.Delete();
  }
}
