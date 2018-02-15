import Enemy from './enemy.js';
import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import Bullet1AI from './AI/bullet1AI.js';
import Bullet from './bullet.js';
import BulletBlur from './Effect/bulletBlur.js';
import Util from '../util.js';

/*bullet1クラス*/
export default class Bullet1 extends Bullet{
  constructor(pos,vel){
    super(pos,vel,{x:0,y:0});
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
    this.hp = 10;//弾丸のHP 0になると消滅
    this.atk = 1;//攻撃力
    this.length = 180;//これは武器がもつ?
    this.launchedPos = {x:pos.x,y:pos.y};//射出された座標 射程距離の計算に必要 
    this.type = ENTITY.BULLET;
    /*AI*/
    this.AIList = [];
    this.AIList.push(new Bullet1AI(this));
  }

  Update(){
    /*□Effect BulletBulr*/
    if(this.frame%1 == 0){
      let p ={
        x:this.pos.x,// + 10 * (Math.random()-0.5),
        y:this.pos.y// + 10 *(Math.random()-0.5)
      }
      let v ={
        x:0 * 3 * (Math.random()-0.5),
        y:0 * 3 *(Math.random()-0.5)
      }
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
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
