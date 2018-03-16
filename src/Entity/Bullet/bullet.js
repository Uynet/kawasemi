import Entity from '../entity.js';
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';

export default class Bullet extends Entity{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.layer = "ENTITY";
    this.isMultiple = false;
    this.type = "MOVER";
    /*パラメータ*/
    this.hp;//弾丸のHP 0になると消滅
    this.atk;//攻撃力
    this.length;//これは武器がもつ?

    this.isUpdater  =true;
  }
}
