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
    this.type = ENTITY.EFFECT;
    this.frame = 0;
    this.isNoSprite = true;
  }
  Bomb(){
    EntityManager.addEntity(new Sonic(this.pos));
    //stone(というか火花?)
    for(let i = 0;i<8;i++){
      let v = Rand2D(30);
      let stone = Pool.GetStone(CPV(this.pos),v);
      EntityManager.addEntity(stone);
    }
    //smoke
    for(let i = 0;i<2;i++){
      let smoke = Pool.GetStone(CPV(this.pos),{x:Rand(8),y:-1});
      EntityManager.addEntity(smoke);
    }
    for(let i =0;i<3;i++){
      let v = Rand2D(16);
      let p = ADV(v,this.pos);
      let fire = Pool.GetFire(p,VEC0());
      EntityManager.addEntity(fire);
    }
    for(let i =0;i<3;i++){
      let p = ADV(this.pos,Rand2D(16));
      EntityManager.addEntity(new Flash(this.pos));
    }
  }

  Update(){
    //爆発して自分は消える
    this.Bomb();
    EntityManager.removeEntity(this);
  }
}
