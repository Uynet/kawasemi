import Enemy from './Enemy/enemy.js';
import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import Util from '../util.js';

export default class Bullet extends Enemy{
  constructor(pos,vel){
    super(pos,vel);
    /*パラメータ*/
    this.hp;//弾丸のHP 0になると消滅
    this.atk;//攻撃力
    this.length;//これは武器がもつ?
    this.launchedPos = {x:pos.x,y:pos.y};//射出された座標 射程距離の計算に必要 
    this.type = ENTITY.BULLET;
  }
}
