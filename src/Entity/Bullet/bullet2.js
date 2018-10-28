import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import EventManager from '../../Event/eventmanager.js';
import QuakeEvent from '../../Event/quakeEvent.js';
import Bullet2AI from './../AI/bullet2AI.js';
import Bullet from './bullet.js';
import BulletTrail from '../Effect/bulletTrail.js';
import Explosion1 from '../Effect/explosion1.js';
import Explosion2 from '../Effect/explosion2.js';
import Explosion3 from '../Effect/explosion3.js';
import Param from '../../param.js';
import Audio from '../../audio.js';
import Pool from '../../Stage/pool.js';

const bullet2 = Param.bullet2;
const MAX_STEP_COUNT = 30;

//Laser
export default class Bullet2 extends Bullet{
  SetParam(){
    this.hp = Param.bullet2.hp;//弾丸のHP 0になると消滅
    this.atkMax = Param.bullet2.atkMax;//攻撃力
    this.atkMin = Param.bullet2.atkMin;//攻撃力
  }
  constructor(pos,arg,isMarchNext,stepCount){
    super(pos,POV(arg,VEC0()));
    this.Init(pos,arg);
    this.March(isMarchNext,stepCount);
  }
  Init(pos,arg){
    /*基本情報*/
    this.frame = 0;
    this.arg = arg;
    this.isUpdater  =true;
    this.layer = "BACK"//壁に埋めるため
    this.name = "laser";
    /*スプライト*/
    this.pattern = Art.bulletPattern.bullet2;
    this.SetSprite();
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this.collider = new Collider(SHAPE.BOX,new Box(pos,6,6));
    this.SetParam();
    /*AI*/
    this.AIList.push(new Bullet2AI(this));
  }
  Explode(){
    const e = new Explosion3(CPV(this.pos),VEC0());
    EntityManager.addEntity(e);
  }
  Reflect(collisionInfo){
    let i = POV(this.arg,-16);//入射角ベクトル
    let r = reflect(i,collisionInfo.n);
    this.arg = argument(r);
  }
  March(isMarchNext,stepCount){
    //壁にぶつかってなければレーザー光線を進める
    if(stepCount > MAX_STEP_COUNT) return;
    this.stepCount = stepCount;
    /*
     * continnue 無視
     * break ... 貫通
     * return .. 停止
     * */
    for(let collider of EntityManager.colliderList){
      if(collider.name == "player")continue;
      let c = Collision.on(this,collider);
      if(c.isHit){
        //木箱 破壊したら貫通
        if(collider.isBreakable){
          collider.Damage(-1);
          this.Explode();
          if(collider.hp > 0)return;
          break;
        }
        //敵 倒せたら貫通
        if(collider.type == "ENEMY"){
          EntityManager.addEntity(new Explosion3(CPV(this.pos),this.arg + Math.PI));
          collider.Damage(-RandBET(this.atkMin,this.atkMax));
          if(collider.hp > 0)return;
          break;
        } 
        //鉄 反射
        if(collider.material == "steel") this.Reflect(c);

        EntityManager.addEntity(new Explosion2(CPV(this.pos),this.arg + Math.PI));
        return; //壁にぶつかったので停止
      }
    }
    //再帰呼び出し
    let p = ADV(this.pos,POV(this.arg,16));
    let bullet = new Bullet2(p,this.arg,isMarchNext,stepCount++);
    EntityManager.addEntity(bullet);
  }

  Update(){
    this.ExecuteAI();
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
