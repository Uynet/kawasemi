import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Pool from '../../Stage/pool.js';
import Sonic from './sonic.js';
import Stone from './stone.js';
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
    if(sonic)EntityManager.addEntity(sonic);
    //stone(というか火花?)
    for(let i = 0;i<8;i++){
      let v = Rand2D(30);
      let stone = Pool.GetStone(CPV(this.pos),v);
      if(stone)EntityManager.addEntity(stone);
    }
    //smoke
    for(let i = 0;i<2;i++){
      let smoke = Pool.GetStone(CPV(this.pos),{x:Rand(8),y:-1});
      if(smoke)EntityManager.addEntity(smoke);
    }
    for(let i =0;i<3;i++){
      let v = Rand2D(16);
      let p = ADV(v,this.pos);
      let fire = Pool.GetFire(p,VEC0());
      if(fire)EntityManager.addEntity(fire);
    }
    for(let i =0;i<3;i++){
      let p = ADV(this.pos,Rand2D(16));
      let flash = Pool.GetFlash(this.pos,VEC0());
      if(flash)EntityManager.addEntity(flash);
    }
  }
  Collision(){
    for(let l of EntityManager.enemyList){
      if(DIST(this.pos,l.pos) < 32){
        l.Damage(-RandBET(50,99));
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
    this.Bomb();
    this.Collision();
    EntityManager.removeEntity(this);
  }
}
