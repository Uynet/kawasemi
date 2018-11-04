import Entity from "../entity.js";
import BasicEffectPhysics from "../AI/basicEffectPhysics.js";
import BasicAI from "../AI/basicAI.js";
import Art from "../../art.js";

//これ継承してる意味ある？？
export default class EFFECT extends Entity{
  constructor(pos,vel){
    if(!vel) vel = vec0();
    super(pos,vel);
    this.type = "MOVER";
    this.layer = "ENTITY";
    this.isUpdater = true;
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
}
