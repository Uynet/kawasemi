import Entity from "../entity.js";
import BasicEffectPhysics from "../AI/Basic/basicEffectPhysics.js";
import BasicAI from "../AI/Basic/basicAI.js";
import Art from "../../art.js";

//これ継承してる意味ある？？
export default class EFFECT extends Entity{
  constructor(pos,vel){
    if(!vel) vel = vec0();
    super(pos,vel);
    this.type = "MOVER";
    this.layer = "BACK";
    this.isUpdater = true;
    this.addBasic();
  }
  BasicEffectInit(){
    this.sprite = Art.CreateSprite(this.pattern[this.spid]);
    this.sprite.position = this.pos;
  }
  addBasic(){
    this.addAI(new BasicEffectPhysics(this));
    this.addAI(new BasicAI(this));
  }
  OnDying(){
    this.Delete();
  }
  EffectPhysics(){
    if(this.gravity)this.acc.y += this.gravity;
    this.BasicPhysics();
  }
  ScaleTo(to,rate){
    let d = to - this.sprite.scale.x;
    this.sprite.scale.x += d * rate;
    this.sprite.scale.y += d * rate;
  }
}
