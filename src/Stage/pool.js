'use strict'
import EntityManager from './entityManager.js';
import Stone from '../Entity/Effect/stone.js';
import Smoke from '../Entity/Effect/smoke.js';
import Fire from '../Entity/Effect/fire.js';
/*エンティティマネージャ*/
export default class Pool{
  static Init(){
    /*Object Pool*/
    this.unusedStones = [];
    for(let i = 0;i<800;i++){
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
  }
  static GetStone(pos,vel){
    if(this.unusedStones.length < 10)cl("!");
    let s = this.unusedStones.pop();
    s.pos = pos;
    s.vel = vel;
    s.frame = 0;
    s.isNext = false;
    s.sprite.alpha = 1;
    s.sprite.scale.set(1);
    return s;
  }
  static RemoveStone(s){
    this.unusedStones.push(s);
    EntityManager.removeEntity(s);
  }
  static GetSmoke(pos,vel,size){
    if(this.unusedSmokes.length < 10)cl("!");
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
