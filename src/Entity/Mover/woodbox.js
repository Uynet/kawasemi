import Art from '../../art.js';
import Audio from '../../audio.js'
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import UIManager from '../../UI/uiManager.js'
import Timer from '../../timer.js';
import FontEffect from '../Effect/fontEffect.js';
import Wall from '../wall.js';
import BulletShot from '../Effect/bulletShot.js';
import BlockDebris from '../Effect/blockDebris.js';

let EntityList = EntityManager.entityList;

//壊せる木箱
export default class WoodBox extends Wall{
  constructor(pos){
    super(pos,Art.enemyPattern.woodbox[0]);
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.type = "WALL";
    this.name = "woodbox";
    this.isBreakable = true;//破壊可能
    this.isUpdater = true;
    /*スプライト*/
    this.pattern = Art.wallPattern.steel.entity;
    this.spid = 3; //spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.hp = 1;
    /*フラグ*/
    this.isAlive = true;
  }
  //自分がダメージを食らう
  Damage(atkMax){
    this.hp += atkMax;
       Audio.PlaySE("blockBreak");
  }

  Update(){
    this.sprite.position = this.pos;

    /*observer*/
    if(this.hp<=0){
      EntityManager.removeEntity(this);
      let p = CPV(this.pos);
      EntityManager.addEntity(new BulletShot(p,VEC0()));
      let v;
      for(let i = 0;i<2 ;i++){
        v = {
          x : Rand(1) + (2*i-1),//←と→に飛ばす
          y : -1-Rand(3)/5,
        }
        EntityManager.addEntity(new BlockDebris(p,v));
      }
     
    }
  }
}
