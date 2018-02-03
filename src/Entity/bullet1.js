import Mover from './mover.js';
import Enemy from './enemy.js';
import Art from '../art.js';
import CollisionShape from '../Collision/collisionShape.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import TestAI from './AI/testAI.js';
import Util from '../util.js';
import Bullet1AI from './AI/bullet1AI.js';
import Bullet from './bullet.js';
import BulletBlur from './bulletBlur.js';

/*bullet1クラス*/
export default class Bullet1 extends Bullet{
  constructor(pos,vel){
    super(pos,vel,{x:0,y:0});
    /*基本情報*/
    this.frame = 0;
    /*スプライト*/
    this.tex = Art.bulletPattern[0];
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = pos;
    /*コライダ*/
    this.collisionShape = new CollisionShape(SHAPE.BOX,new Box(pos,8,8));//衝突判定の形状
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
    for (let AI of this.AIList){
      AI.Do();
    }
    /*□Effect BulletBulr*/
    if(this.frame%2 == 0){
      EntityManager.addEntity(new BulletBlur(this.pos,{x:0,y:0}));
    }
    this.frame++;
  }
}
