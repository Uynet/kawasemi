import Enemy from './enemy.js';
import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import Bullet1AI from './AI/bullet1AI.js';
import Bullet from './bullet.js';
import BulletBlur from './Effect/bulletBlur.js';
import Timer from '../timer.js';

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
    this.hp = 1;//弾丸のHP 0になると消滅
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
        x:this.pos.x + 10 * (Math.random()-0.5),
        y:this.pos.y + 10 *(Math.random()-0.5)
      }
      let v ={
        x:3 * (Math.random()-0.5),
        y:3 *(Math.random()-0.5)
      }
      EntityManager.addEntity(new BulletBlur(p,v),Timer.timer);
    }
    for (let AI of this.AIList){
      AI.Do();
    }
    this.frame++;
  }
}
