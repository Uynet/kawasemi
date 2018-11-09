import Enemy from '../Enemy/enemy.js';
import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Audio from "../../audio.js";

/*Targetクラス*/
export default class Target extends EFFECT{
  constructor(enemy){
    Audio.PlaySE("targetOn");
    //このposは参照型なので常にenemyを追尾している
    super(enemy.pos,vec0());
    this.ofset = enemy.size/2;
    this.ofsetPos = add(this.pos , vec2(this.ofset));
    /*基本情報*/
    this.name = "target";
    /*スプライト*/
    this.pattern = Art.bulletPattern.target;
    this.BasicEffectInit();
    /*パラメータ*/
    this.enemy = enemy;//ロックしているenemyの情報
  }

  Update(){
    this.ExecuteAI();
    this.sprite.anchor.set(0.5);
    this.sprite.rotation = this.continuasFrame/50;
    //シュッてなるやつ
    this.sprite.scale = vec2(1.5 + 1.5/(this.continuasFrame+1)); //ゼロ除算回避
    this.ofsetPos = add(this.pos , vec2(this.ofset));
    this.sprite.position = this.ofsetPos;
  }
}
