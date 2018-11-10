import Entity from '../entity.js';
import Audio from "../../audio.js";
import Art from '../../art.js';
import Param from '../../param.js';
import BasicAI from "../AI/Basic/basicAI.js";
import BasicPhysics from "../AI/Basic/basicPhysics.js";
import Explosion1 from "../Effect/Explosion/explosion1.js";

export default class Bullet extends Entity{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.layer = "ENTITY";
    this.isMultiple = false;
    this.type = "MOVER";
    this.isUpdater  =true;
  }
  addBasic(){
    this.addAI(new BasicAI(this));
    this.addAI(new BasicPhysics(this));
  }
  Explode(type){
    let explosion; 
    if(type == 1)explosion = new Explosion1(copy(this.pos),fromPolar(this.arg,this.vi));
    Audio.PlaySE("missileHit",1);
    explosion.addEntity();
  }
  SetSprite(){
    this.pattern = Art.bulletPattern[this.name];
    this.sprite = Art.CreateSprite(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
  }
  SetArg(){
    this.Set("vel", fromPolar(this.arg,this.vi));
    this.sprite.rotation = this.arg;
  }
  BasicBulletInit(){
    this.SetSprite();
    this.SetParam(Param[this.name]);
  }
}
