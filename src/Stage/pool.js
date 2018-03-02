import EntityManager from './entityManager.js';
import Stone from '../Entity/Effect/stone.js';
import BulletBlur from '../Entity/Effect/bulletBlur.js';
import Smoke from '../Entity/Effect/smoke.js';
import Fire from '../Entity/Effect/fire.js';
import Bullet1 from '../Entity/bullet1.js';
import Horming from '../Entity/AI/horming.js';
import Bullet1AI from '../Entity/AI/bullet1AI.js';
import Collider from '../Collision/collider.js';
import Box from '../Collision/box.js';
/*Object Pool*/
export default class Pool{
  static Init(){
    this.unusedStones = [];
    for(let i = 0;i<500;i++){
      this.unusedStones.push(new Stone(VEC0(),VEC0()));
    }
    this.unusedSmokes = [];
    for(let i = 0;i<80;i++){
      this.unusedSmokes.push(new Smoke(VEC0(),VEC0(),0));
    }
    this.unusedFires = [];
    for(let i = 0;i<100;i++){
      this.unusedFires.push(new Fire(VEC0(),VEC0()));
    }
    this.unusedBulletBlurs = [];
    for(let i = 0;i<300;i++){
      this.unusedBulletBlurs.push(new BulletBlur(VEC0(),VEC0()));
    }
    this.unusedMissiles = [];
    for(let i = 0;i<100;i++){
      this.unusedMissiles.push(new Bullet1(VEC0(),"weapon"));
    }
  }
  static GetBulletBlur(pos,vel){
    if(this.unusedBulletBlurs.length > 0){
    let s = this.unusedBulletBlurs.pop();
    s.isAlive = true;//消えたらfalse
    s.pos = pos;
    s.vel = vel;
    s.frame = 0;
    s.spid = 0;
    s.sprite.alpha = 0.5;
    s.sprite.scale.set(Rand(0.5)+1);
    s.sprite.position = ADV(s.pos,VECN(8));
    return s;
    }else{
      return false;
    }
  }
  static RemoveBulletBlur(s){
    this.unusedBulletBlurs.push(s);
    EntityManager.removeEntity(s);
  }
  static GetMissile(pos,weapon){
    if(this.unusedMissiles.length > 0){
      let s = this.unusedMissiles.pop();
      s.arg = weapon.arg;
      s.vi = weapon.speed;
      s.pos = pos;
      s.vel = POV(s.arg,s.vi);
      s.frame = 0;
      s.isTargetOn = weapon.isTargetOn;
      s.AIList.push(new Bullet1AI(s));
      if(s.isTargetOn) s.targetedEnemy = weapon.target.enemy;
      if(weapon.isHorming) s.AIList.push(new Horming(s));
      return s;
    }else{
      return false;
    }
  }
  static RemoveMissile(s){
    this.unusedMissiles.push(s);
    EntityManager.removeEntity(s);
  }
  static GetStone(pos,vel){
    if(this.unusedStones.length > 0){
    let s = this.unusedStones.pop();
    s.pos = pos;
    s.vel = vel;
    s.frame = 0;
    s.isNext = false;
    s.sprite.alpha = 1;
    s.sprite.scale.set(1);
    return s;
    }else{
      return false;
    }
  }
  static RemoveStone(s){
    this.unusedStones.push(s);
    EntityManager.removeEntity(s);
  }
  static GetSmoke(pos,vel,size){
    if(this.unusedSmokes.length>0){
      /*constructor*/
      let s = this.unusedSmokes.pop();
      s.pos = pos;
      s.vel = vel;
      s.frame = 0;
      //sprite
      s.spid = 0;
      s.sprite.alpha = 1;
      s.sprite.scale.set(size/5);
      return s;
    }
    else{
      return false;
    }
  }
  static RemoveSmoke(s){
    this.unusedSmokes.push(s);
    EntityManager.removeEntity(s);
  }
  static GetFire(pos,vel){
    if(this.unusedFires.length < 10)cl("!");
    if(this.unusedFires.length>0){
      /*constructor*/
      let s = this.unusedFires.pop();
      s.pos = pos;
      s.vel = vel;
      s.frame = 0;
      //sprite
      s.spid = 0;
      s.sprite.alpha = 1;
      s.sprite.scale.set(1);
      return s;
    }else{
      cl("fire");
    }
  }
  static RemoveFire(s){
    this.unusedFires.push(s);
    EntityManager.removeEntity(s);
  }
}
