import EFFECT from '../effect.js';
import Drawer from "../../../drawer.js";
import Art from '../../../art.js';
import EntityManager from '../../../Stage/entityManager.js';
import Pool from '../../../Stage/pool.js';
import Stone2 from './stone2.js';
import Explosion from "./explosion.js";

//爆発エフェクト
export default class Explosion1 extends Explosion{
  constructor(pos,vel){
    super(pos,vel);
    this.particleNum = {
      stone : 14,
      smoke : 8,
      fire : 3,
      flash : 1,
    }
  }
  Jam(){
    let sonic = Pool.Get("sonic",this.pos,vec0());
    if(sonic!==false)this.Pack(sonic);
    //stone(というか火花?)
    for(let i = 0;i<this.particleNum.stone;i++){
      let arg = Rand(Math.PI);
      let v = fromPolar(arg,8);
      this.Pack(new Stone2(copy(this.pos),v));
    }
    //smoke
    for(let i = 0;i<this.particleNum.smoke;i++){
      let arg = Rand(Math.PI);
      let v = fromPolar(arg,Rand(3));
      let smoke = Pool.Get("smoke",copy(this.pos),v,2+Rand(1));
      if(smoke!== false)this.Pack(smoke);
    }
    for(let i =0;i<this.particleNum.fire;i++){
      let p = this.diffuse(24);
      let fire = Pool.Get("fire",p,vec0());
      if(fire!== false)this.Pack(fire);
    }
    for(let i =0;i<this.particleNum.flash;i++){
      let flash = Pool.Get("flash",this.pos,vec0());
      if(flash!== false)this.Pack(flash);
    }
  }
  GetParticle(name){
    for(let i =0;i<this.particleNum[name];i++){
      let flash = Pool.Get(name,this.pos,vec0());
      if(flash!== false)this.Pack(flash);
    }
  }
  Bomb(){
    this.Collision();
    this.Delete();
    this.Jam();
    this.GunPowder.forEach(e=>{
      e.addEntity();
    })
  }
  Collision(){
    for(let entity of EntityManager.colliderList){
      if(entity.isBreakable && dist(this.pos,entity.pos) < 32){
        entity.Damage(-RandomRange(5,8));
      };
    }
  }

  Update(){
    this.Bomb();
  }
}
