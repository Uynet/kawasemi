import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import EventManager from '../../Event/eventmanager.js';
import QuakeEvent from '../../Event/quakeEvent.js';
import Bullet2AI from './../AI/bullet2AI.js';
import Bullet from './bullet.js';
import BulletBlur from '../Effect/bulletBlur.js';
import Explosion1 from '../Effect/explosion1.js';
import Param from '../../param.js';
import Audio from '../../audio.js';

const bullet2 = Param.bullet2;

//Laser
export default class Bullet2 extends Bullet{
  constructor(pos,arg,weapon){
    super(pos,POV(arg,VEC0()));
    /*基本情報*/
    this.frame = 0;
    this.arg = arg;
    this.isUpdater  =true;
    this.layer = "BACK"//壁に埋めるため
    /*スプライト*/
    this.pattern = Art.bulletPattern.bullet2;
    this.spid = 0;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    this.sprite.anchor.set(0.5);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this.sprite.alpha = 0.7;
    /*コライダ*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,4,4));//衝突判定の形状
    /*パラメータ*/
    this.hp = Param.bullet2.hp;//弾丸のHP 0になると消滅
    this.atkMax = Param.bullet2.atkMax;//攻撃力
    this.atkMin = Param.bullet2.atkMin;//攻撃力
    /*AI*/
    this.AIList = [];
    this.AIList.push(new Bullet2AI(this));
  }

  Update(){
    for (let AI of this.AIList){
      AI.Do();
    }
    if(this.frame%2 == 0){
      this.spid = Math.min(this.spid+1,7);
    }
    /*observer*/
    //HP || 経過時間
    if( this.frame > 10 || this.hp<=-99){
      EntityManager.removeEntity(this);
    }
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.position.x -=4;
    this.sprite.rotation = this.arg;
    this.sprite.texture = this.pattern[this.spid];

    this.frame++;
  }
}
