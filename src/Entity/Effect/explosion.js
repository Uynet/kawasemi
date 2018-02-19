import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Util from '../../util.js';

//爆発エフェクト
export default class Explosion extends EFFECT{
  constructor(name,pos,vel){
    if(!vel) vel = Util.vec0;
    if(name == "stone" || name == "smoke"){
      super(pos,vel);
      //次のparticleを生成するかの変数
      this.isNext = false;
    }
    else{
      super(pos,{x:0,y:0});
    }
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.name = name;
    //閃光,火球,飛散物,煙
    this.pattern = Art.bulletPattern.explosion[this.name];
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
  }

  Update(){
    //this.sprite.texture = this.pattern[this.spid];
    this.sprite.anchor.set(0.5);
    switch(this.name){
      case "flash" :
      this.sprite.scale.x = 1+Util.Rand(1);
      this.sprite.scale.y = this.sprite.scale.x;
      this.sprite.alpha = 0.4;
      if(this.frame == 2){
        EntityManager.removeEntity(this);
      }
      break;
      case "fire" :
        let a = 10;
        this.pos = Util.advec(this.pos,this.vel);
        this.sprite.scale.x += 1/(this.frame+4);
        this.sprite.scale.y = this.sprite.scale.x;
        this.sprite.alpha = 0.5 - this.frame/20;
      if(this.frame == 8){
        EntityManager.removeEntity(this);
      }
      break;
      case "stone" :
        //減速
        this.vel.x *= 0.9;
        this.vel.y *= 0.9;
        this.pos.y += 0.3;//重力
        //this.pos = Util.advec(this.pos,this.vel);
        this.sprite.alpha -= 0.02;
        //再帰
        if(this.sprite.alpha > 0 && this.isNext){
          //生成は最初の一回のみ
          this.isNext = false;
          let p = Util.advec(this.pos,this.vel);
          this.sprite.scale.x *= 0.8;
          this.sprite.scale.y = this.sprite.scale.x;
          let stone = new Explosion("stone",p,this.vel);
          //次の石 : 小さく薄く
          stone.sprite.scale.x = this.sprite.scale.x;
          stone.sprite.scale.y = this.sprite.scale.y;
          stone.sprite.alpha = this.sprite.alpha;
          EntityManager.addEntity(stone);
        }
        if(this.frame == 1)this.isNext = true;
        //持続時間
        if(this.frame > 3)EntityManager.removeEntity(this);
      break;
      case "smoke" :
        let b = 10;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.sprite.scale.x = 10/(this.frame+5);
        this.sprite.scale.y = this.sprite.scale.x;
        this.sprite.alpha -= 0.03;
      if(this.frame == 40){
        EntityManager.removeEntity(this);
      }
      break;
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
