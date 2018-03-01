import Entity from '../entity.js';
import Audio from '../../audio.js';
import EntityManager from '../../Stage/entityManager.js';
import FontEffect from '../Effect/fontEffect.js';

export default class Enemy extends Entity{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.type = ENTITY.ENEMY;
    this.isUpdater = true;
    /*固有情報*/
    this.AIList = [];//AIの配列
    /*レイヤー*/
    this.layer = "ENTITY";
  }
  addAI(AI){
    this.AIList.push(AI);
  }
  //自分がダメージを食らう
  Damage(atk){
    Audio.PlaySE("enemyDamage");
    this.hp += atk;
    //ダメージをポップ
    EntityManager.addEntity(new FontEffect(this.pos,-atk+"","enemy"));
  }
}
