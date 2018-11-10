import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import EntityManager from '../../Stage/entityManager.js';
import EventManager from '../../Event/eventmanager.js';
import Bullet2AI from './../AI/bullet2AI.js';
import Bullet from './bullet.js';
import Explosion2 from '../Effect/Explosion/explosion2.js';
import Explosion3 from '../Effect/Explosion/explosion3.js';

const MAX_STEP_COUNT = 30;

//Laser
export default class Bullet2 extends Bullet{
  constructor(pos,arg,stepCount){
    super(pos,fromPolar(arg,vec0()));
    this.Init(pos,arg);
    this.AIList.push(new Bullet2AI(this));
    this.addAnimator(false,2,8);
    this.March(stepCount);
  }
  Init(pos,arg){
    /*基本情報*/
    this.arg = arg;
    this.layer = "BACK"//壁に埋めるため
    this.name = "bullet2";
    this.BasicBulletInit();
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this.SetBoxCollider(6,6);
    /*AI*/
  }
  Explode(){
    const e = new Explosion3(copy(this.pos),vec0());
    e.addEntity();
  }
  Reflect(collisionInfo){
    let i = fromPolar(this.arg,-16);//入射角ベクトル
    let r = reflect(i,collisionInfo.n);
    this.arg = argument(r);
  }
  March(stepCount){
    //壁にぶつかってなければレーザー光線を進める
    if(stepCount > MAX_STEP_COUNT) return;
    this.stepCount = stepCount;
    /*
     * continnue 無視
     * break ... 貫通
     * return .. 停止
     * */
     label:
    for(let collider of EntityManager.colliderList){
      if(collider.name == "player")continue;
      let c = Collision.on(this,collider);
      if(c.isHit){
        //壊せる物体 破壊したら貫通
        if(collider.isBreakable){
          this.Explode();
          collider.Damage(-RandomRange(this.atkMin,this.atkMax));
          if(collider.hp > 0)return;
          else break;
        }
        //鉄 反射
        if(collider.material == "steel") this.Reflect(c);

        EntityManager.addEntity(new Explosion2(copy(this.pos),this.arg + Math.PI));
        return; //壁にぶつかったので停止
      }
    }
    this.GenerateNextLaser(stepCount);
  }
  GenerateNextLaser(stepCount){
    //再帰呼び出し
    let p = add(this.pos,fromPolar(this.arg,16));
    let bullet = new Bullet2(p,this.arg,stepCount+1);
    bullet.addEntity();
  }
}
