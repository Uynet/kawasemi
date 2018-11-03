import Enemy from '../Enemy/enemy.js';
import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';

/*Targetクラス*/
export default class Target extends EFFECT{
  constructor(enemy){
    //このposは参照型なので常にenemyを追尾している
    super(enemy.pos,VEC0());
    this.ofset = enemy.size/2;
    this.ofsetPos = ADV(this.pos , vec2(this.ofset));
    /*基本情報*/
    this.name = "target";
    /*スプライト*/
    this.pattern = Art.bulletPattern.target;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.enemy = enemy;//ロックしているenemyの情報
  }

  Update(){
    this.sprite.anchor.set(0.5);
    this.sprite.rotation = this.frame/50;
    //シュッてなるやつ
    this.sprite.scale = vec2(1.5 + 1.5/(this.frame+1)); //ゼロ除算回避
    this.ofsetPos = ADV(this.pos , vec2(this.ofset));
    this.sprite.position = this.ofsetPos;
    this.frame++;
  }
}
