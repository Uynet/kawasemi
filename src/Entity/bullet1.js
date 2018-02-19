import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import EventManager from '../Event/eventmanager.js';
import QuakeEvent from '../Event/quakeEvent.js';
import Bullet1AI from './AI/bullet1AI.js';
import Bullet from './bullet.js';
import BulletBlur from './Effect/bulletBlur.js';
import BrightCoin from'./Effect/brightCoin.js';
import Util from '../util.js';
import Sonic from './Effect/sonic.js';
import Explosion from './Effect/explosion.js';

/*bullet1クラス*/
export default class Bullet1 extends Bullet{
  constructor(pos,vel){
    super(pos,vel,VEC0());
    /*基本情報*/
    this.frame = 0;
    /*スプライト*/
    this.pattern = Art.bulletPattern.bullet1;
    this.spid = 0;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    /*コライダ*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,4,4));//衝突判定の形状
    /*パラメータ*/
    this.hp = 1;//弾丸のHP 0になると消滅
    this.atk = 99;//攻撃力
    this.length = 180;//これは武器がもつ?
    this.launchedPos = CPV(pos);//射出された座標 射程距離の計算に必要 
    this.type = ENTITY.BULLET;
    /*AI*/
    this.AIList = [];
    this.AIList.push(new Bullet1AI(this));
  }

  //爆発
  Explosion(){
    for(let i = 0;i<8;i++){
      let v = Util.Rand2D(30);
      EntityManager.addEntity(new Sonic(this.pos));
      EntityManager.addEntity(new Explosion("stone",CPV(this.pos),v));
    }
    for(let j = 0;j<2;j++){
      EntityManager.addEntity(new Explosion("smoke",CPV(this.pos),{x:1-j*2,y:-0.6}));
    }
    for(let i =0;i<3;i++){
      let v = Util.Rand2D(32);
      let p = ADV(v,this.pos);
      EntityManager.addEntity(new Explosion("fire",p));
    }
    for(let i =0;i<3;i++){
      let p = ADV(this.pos,Util.Rand2D(16));
      EntityManager.addEntity(new Explosion("flash",p));
    }
  }
  Update(){
    /*□Effect BulletBulr*/
    if(this.frame%1 == 0){
      let p = CPV(this.pos);
      let v = VEC0();
      EntityManager.addEntity(new BulletBlur(p,v));
    }
    for (let AI of this.AIList){
      AI.Do();
    }
    /*observer*/
    //HP || 飛行距離
    if(this.hp<=0 ||
      this.frame > 100 || 
      Util.distance(this.pos , this.launchedPos) > this.length){
      EntityManager.removeEntity(this);
      EventManager.eventList.push(new QuakeEvent(6));//ゆれ
      this.Explosion();
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
