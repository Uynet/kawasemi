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
    this.ofsetPos = ADV(this.pos , VECN(this.ofset));
    /*基本情報*/
    this.name = "target";
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.target;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.alpha = 1;
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.enemy = enemy;//ロックしているenemyの情報
      this.spid = 0;
  }

  Update(){
    //これいる？
    this.sprite.anchor.set(0.5);
    this.sprite.rotation = this.frame/50;
    //シュッてなるやつ
    //ゼロ除算回避
    this.sprite.scale = VECN(1.5 + 1.5/(this.frame+1));
    this.ofsetPos = ADV(this.pos , VECN(this.ofset));
    this.sprite.position = this.ofsetPos;
    this.frame++;
  }
}
