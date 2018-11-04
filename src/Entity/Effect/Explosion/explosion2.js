import EFFECT from '../effect.js';
import Art from '../../../art.js';
import EntityManager from '../../../Stage/entityManager.js';
import Pool from '../../../Stage/pool.js';
import Explosion from "./explosion.js";

const stoneIntence = 15;

//爆発エフェクト
export default class Explosion2 extends Explosion{
  constructor(pos,arg){
    super(pos,vec0());
    this.arg = arg;
    /*基本情報*/
    this.frame = 0;
    this.isNoSprite = true;
  }
  Bomb(){
    /*stone*/
    for(let i = 0;i<8;i++){
      let arg = this.arg + Rand(0.7);
      let intence = stoneIntence + Rand(8);
      let v = fromPolar(arg,intence);
      Pool.addEntityForm("stone",copy(this.pos),v);
    }
    /*smoke*/
    for(let j = 0;j<6;j++){
      let v = {
        x : Rand(4),
        y : Rand(1)
      }
      Pool.addEntityForm("smoke",copy(this.pos),v,1 + Rand(0.2)); 
    }
    this.Delete();
  }
}
