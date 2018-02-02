import Mover from './mover.js';
import Enemy from './enemy.js';
import Art from '../art.js';
import CollisionShape from '../Collision/collisionShape.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import TestAI from './AI/testAI.js';
import Util from '../util.js';
import Bullet from './bullet.js';

/*bullet1クラス*/
export default class Target extends Bullet{
  constructor(pos,enemy){
    super(pos,{x:0,y:0});
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    /*スプライト*/
    this.tex = Art.bulletPattern[3];
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.lock = enemy;//ロックしているenemyの情報
  }

  Update(){
    //これいる？
    this.sprite.position = this.pos;
  }
}
