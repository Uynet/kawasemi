import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Util from '../../util.js';
import Sonic from './sonic.js';
import Stone from './stone.js';
import Flash from './flash.js';
import Fire from './fire.js';
import Smoke from './smoke.js';

//爆発エフェクト
export default class Explosion1 extends EFFECT{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.frame = 0;
    this.isNoSprite = true;
  }
  Bomb(){
    EntityManager.addEntity(new Sonic(this.pos));
    for(let i =0;i<3;i++){
      let p = ADV(this.pos,Util.Rand2D(16));
      EntityManager.addEntity(new Flash(this.pos));
    }
    for(let i = 0;i<8;i++){
      let v = Util.Rand2D(30);
      EntityManager.addEntity(new Stone(CPV(this.pos),v));
    }
    for(let j = 0;j<2;j++){
      EntityManager.addEntity(new Smoke(CPV(this.pos),{x:Rand(8),y:-1}));
    }
    for(let i =0;i<3;i++){
      let v = Util.Rand2D(16);
      let p = ADV(v,this.pos);
      EntityManager.addEntity(new Fire(p));
    }
  }

  Update(){
    //爆発して自分は消える
    this.Bomb();
    EntityManager.removeEntity(this);
  }
}
