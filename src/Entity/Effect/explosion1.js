import EFFECT from './effect.js';
import Drawer from "../../drawer.js";
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Pool from '../../Stage/pool.js';
import Sonic from './sonic.js';
import Stone from './stone.js';
import Stone2 from './stone2.js';
import Flash from './flash.js';
import Fire from './fire.js';
import Smoke from './smoke.js';

//爆発エフェクト
export default class Explosion1 extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    //微妙に左上に寄ってるので中心に
    this.pos = ADV(this.pos,VECN(8));
    /*基本情報*/
    this.frame = 0;
    this.isNoSprite = true;
  }
  Bomb(){
    let sonic = Pool.GetSonic(this.pos,VEC0());
    if(sonic!==false)EntityManager.addEntity(sonic);
    //stone(というか火花?)
    for(let i = 0;i<14;i++){
      let arg = Rand(Math.PI);
      let v = POV(arg,8);
      let stone2 = new Stone2(CPV(this.pos),v);
      EntityManager.addEntity(stone2);
    }
    //smoke
    for(let i = 0;i<8;i++){
      let arg = Rand(Math.PI);
      let v = POV(arg,Rand(3));
      let smoke = Pool.GetSmoke(CPV(this.pos),v,2+Rand(1));
      if(smoke!== false)EntityManager.addEntity(smoke);
    }
    for(let i =0;i<3;i++){
      let v = Rand2D(24);
      let p = ADV(v,this.pos);
      let fire = Pool.GetFire(p,VEC0());
      if(fire!== false)EntityManager.addEntity(fire);
    }
    for(let i =0;i<3;i++){
      let p = ADV(this.pos,Rand2D(16));
      let flash = Pool.GetFlash(this.pos,VEC0());
      if(flash!== false)EntityManager.addEntity(flash);
    }
  }
  Collision(){
    for(let l of EntityManager.enemyList){
      if(DIST(this.pos,l.pos) < 32){
        l.Damage(-RandBET(5,8));
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      };
    }
    for(let w of EntityManager.wallList){
      if(DIST(this.pos,w.pos) < 32){
        //breakable object
        if(w.isBreakable){
          // ■ SoundEffect : hitWood
          w.Damage(-RandBET(50,99));
        }
      }
    }
  }

  Update(){
    //爆発して自分は消える
    if(this.frame == 0){
      this.Bomb();
      this.Collision();
    }
    if(this.frame > 300) EntityManager.removeEntity(this);
    this.frame++;
  }
}
