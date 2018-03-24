import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import EventManager from '../../Event/eventmanager.js';
import QuakeEvent from '../../Event/quakeEvent.js';
import Bullet2AI from './../AI/bullet2AI.js';
import Bullet from './bullet.js';
import BulletBlur from '../Effect/bulletBlur.js';
import Explosion1 from '../Effect/explosion1.js';
import Explosion2 from '../Effect/explosion2.js';
import Param from '../../param.js';
import Audio from '../../audio.js';
import Pool from '../../Stage/pool.js';

const bullet2 = Param.bullet2;

//Laser
export default class Bullet2 extends Bullet{
  constructor(pos,arg,isNext,step){
    super(pos,POV(arg,VEC0()));
    /*基本情報*/
    this.frame = 0;
    this.arg = arg;
    this.isUpdater  =true;
    this.layer = "BACK"//壁に埋めるため
      this.name = "laser";
    /*スプライト*/
    this.pattern = Art.bulletPattern.bullet2;
    this.spid = 0;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    this.sprite.anchor.set(0.5);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this.sprite.alpha = 0.7;
    /*コライダ*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,6,6));//衝突判定の形状
    /*パラメータ*/
    this.hp = Param.bullet2.hp;//弾丸のHP 0になると消滅
    this.atkMax = Param.bullet2.atkMax;//攻撃力
    this.atkMin = Param.bullet2.atkMin;//攻撃力
    /*AI*/
    this.AIList = [];
    this.AIList.push(new Bullet2AI(this));

    this.step = step;

    //壁にぶつかってなければレーザー光線を進める
    if(step > 30){
      isNext = false;
    }
    for(let w of EntityManager.colliderList){
      let c = Collision.on(this,w);
      //なおせ　
      if(w.name == "player")continue;
      if(c.isHit){
        if(w.isBreakable) {
          w.Damage(-1);
          let e = new Explosion2(CPV(this.pos),this.arg + Math.PI);
          //e = Pool.GetSmoke(CPV(this.pos),VEC0(),3);
          EntityManager.addEntity(e);
        }
        else if(w.type == "ENEMY"){
          EntityManager.addEntity(new Explosion2(CPV(this.pos),this.arg + Math.PI));
          w.Damage(-RandBET(this.atkMin,this.atkMax));
          }
        else {
          if(w.material == "steel"){
            let i = POV(this.arg,-16);//入射角ベクトル
            //r = i+2n*(i・n)

            let r = ADV(i,MLV(VECN(2),MLV(c.n,VECN(DOT(i,c.n)))));
            this.arg = Math.atan(r.y/r.x);
            //if(r.y<0)this.arg += Math.PI;
          //鉄で反射
          }else{
          //壁にぶつかったので停止
          EntityManager.addEntity(new Explosion2(CPV(this.pos),this.arg + Math.PI));
          isNext = false;
          }
        }
      }
    }
    if(isNext){
      step++;
      let p = ADV(this.pos,POV(this.arg,16));
      let bullet = new Bullet2(p,this.arg,isNext,step);
      EntityManager.addEntity(bullet);
    }
  }

  Update(){
    for (let AI of this.AIList){
    //  AI.Do();
    }
    if(this.frame%2 == 0){
      this.spid = Math.min(this.spid+1,7);
    }
    /*observer*/
    //HP || 経過時間
    if( this.frame > 20 || this.hp<=0){
      EntityManager.removeEntity(this);
    }
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.position.x -=4;
    this.sprite.rotation = this.arg;
    this.sprite.texture = this.pattern[this.spid];

    this.frame++;
  }
}
