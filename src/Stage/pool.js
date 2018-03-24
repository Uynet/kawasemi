import EntityManager from './entityManager.js';
import Stone from '../Entity/Effect/stone.js';
import BulletBlur from '../Entity/Effect/bulletBlur.js';
import Smoke from '../Entity/Effect/smoke.js';
import Fire from '../Entity/Effect/fire.js';
import Bullet1 from '../Entity/Bullet/bullet1.js';
import Horming from '../Entity/AI/horming.js';
import Bullet1AI from '../Entity/AI/bullet1AI.js';
import Collider from '../Collision/collider.js';
import Box from '../Collision/box.js';
import Param from '../param.js';
import Sonic from '../Entity/Effect/sonic.js';
import Flash from '../Entity/Effect/flash.js';
/*Object Pool*/
export default class Pool{
  static Init(){
    this.unused = {
      stones : [],
      smokes : [],
      fires : [],
      bulletblurs : [],
      sonics : [],
      flashes : [],
      missiles : [],
    }
    for(let i = 0;i<1000;i++){
      this.unused.stones.push(new Stone(VEC0(),VEC0()));
    }
    for(let i = 0;i<80;i++){
      this.unused.smokes.push(new Smoke(VEC0(),VEC0(),0));
    }
    for(let i = 0;i<100;i++){
      this.unused.fires.push(new Fire(VEC0(),VEC0()));
    }
    for(let i = 0;i<50;i++){
      this.unused.sonics.push(new Sonic(VEC0()));
    }
    for(let i = 0;i<50;i++){
      this.unused.flashes.push(new Flash(VEC0()));
    }
    for(let i = 0;i<300;i++){
      this.unused.bulletblurs.push(new BulletBlur(VEC0(),VEC0()));
    }
    for(let i = 0;i<100;i++){
      this.unused.missiles.push(new Bullet1(VEC0(),"dummyWeapon"));
    }
  }
  static GetBulletBlur(pos,vel){
    if(this.unused.bulletblurs.length > 0){
    let s = this.unused.bulletblurs.pop();
    s.Init(pos,vel);
    return s;
    }else{
      return false;
    }
  }
  static GetMissile(pos,weapon){
    if(this.unused.missiles.length > 0){
      let s = this.unused.missiles.pop();
      s.Init(pos,weapon);
      //param
      s.hp = Param.bullet1.hp;//弾丸のHP 0になると消滅
      //phys
      s.arg = weapon.arg;
      s.vi = weapon.speed;
      s.pos = pos;
      s.vel = POV(s.arg,s.vi);
      //basic
      s.frame = 0;
      //collider
      s.collider.hitbox.pos = s.pos;
      //AI
      s.isTargetOn = weapon.isTargetOn;
      s.AIList[0].bullet = s;
      if(s.isTargetOn) s.targetedEnemy = weapon.target.enemy;
      //if(weapon.isHorming) s.AIList.push(new Horming(s));
      return s;
    }else{
      return false;
    }
  }
  static Remove(s){
    let listname;
    switch(s.name){
      case "bulletblur" : this.unused.bulletblurs.push(s);break;
      case "fire" : this.unused.fires.push(s);break;
      case "stone" : this.unused.stones.push(s);break;
      case "smoke" : this.unused.smokes.push(s);break;
      case "sonic" : this.unused.sonics.push(s);break;
      case "flash" : this.unused.flashes.push(s);break;
      case "missile" : this.unused.missiles.push(s);break;
      default :console.warn(s.name);
    }
    EntityManager.removeEntity(s);
  }
  static GetFlash(pos,vel){
    if(this.unused.flashes.length > 0){
    let s = this.unused.flashes.pop();
    s.Init(pos,vel);
    return s;
    }else{
      return false;
    }
  }
  static GetSonic(pos,vel){
    if(this.unused.sonics.length > 0){
    let s = this.unused.sonics.pop();
    s.Init(pos,vel);
    return s;
    }else{
      return false;
    }
  }
  static GetStone(pos,vel){
    if(this.unused.stones.length > 0){
    let s = this.unused.stones.pop();
    s.Init(pos,vel);
    return s;
    }else{
      return false;
    }
  }
  static GetSmoke(pos,vel,size){
    if(this.unused.smokes.length>0){
      /*constructor*/
      let s = this.unused.smokes.pop();
      s.Init(pos,vel,size);
      return s;
    }
    else{
      return false;
    }
  }
  static GetFire(pos,vel){
    if(this.unused.fires.length>0){
      /*constructor*/
      let s = this.unused.fires.pop();
      s.Init(pos,vel);
      return s;
    }else{
      return false;
    }
  }
}
