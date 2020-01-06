import Art from "../../art.js";
import Audio from "../../audio.js";
import Box from "../../Collision/box.js";
import Collider from "../../Collision/collider.js";
import Collision from "../../Collision/collision.js";
import EventManager from "../../Event/eventmanager.js";
import QuakeEvent from "../../Event/quakeEvent.js";
import Param from "../../param.js";
import EntityManager from "../../Stage/entityManager.js";
import BasicAI from "../AI/Basic/basicAI.js";
import BasicEnemyAI from "../AI/Basic/basicEnemyAI.js";
import Explosion3 from "../Effect/Explosion/explosion3.js";
import FontEffect from "../Effect/fontEffect.js";
import Entity from "../entity.js";
import Coin from "../Mover/coin.js";

export default class Enemy extends Entity {
  constructor(pos, vel) {
    super(pos, vel);
    /*基本情報*/
    this.size = 16;
    this.type = ENTITY.ENEMY;
    this.isUpdater = true;
    this.colType = "through";
    this.material = "wall";
    this.isBreakable = true;
    /*固有情報*/
    this.AIList = []; //AIの配列
    /*レイヤー*/
    this.layer = "ENTITY";
    /*床の親子関係*/
    this.floor = {
      on: false,
      under: null
    };
    this.force = vec0();
    this.addAI(new BasicAI(this));
    this.addAI(new BasicEnemyAI(this));
  }
  BasicEnemyInit(size) {
    /*基本情報*/
    if (!size) size = 16;
    this.collider = new Collider(SHAPE.BOX, new Box(this.pos, size, size));
    /*床の親子関係*/
    this.floor = {
      on: false,
      under: null
    };
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    this.SetParam(Param[this.name]);
    /*スプライト*/
    this.pattern = Art.enemyPattern[this.name];
    console.log(this.name);
    this.sprite = Art.Sprite(this.pattern[this.spid]); //現在表示中のスプライト
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
    this.e = 0;
  }
  BasicEnemyPhysics() {
    if (this.floor.on) {
      this.pos.x += this.floor.under.vel.x;
      //this.pos.y += this.floor.under.vel.y;
    }
    if (this.gravity) this.acc.y += this.gravity;
    this.BasicPhysics();
    //最大速度制限
  }
  //自分がダメージを食らう
  Damage(atk) {
    Audio.PlaySE("enemyDamage", -0.7);
    this.hp += atk;
    //ダメージをポップ
    EntityManager.addEntity(new FontEffect(this.pos, -atk + "", "enemy"));
  }
  //プレイヤーにダメージを与える
  Hurt() {
    let player = EntityManager.player;
    let c = Collision.on(this, player);
    if (c.isHit && c.n.y != 1) {
      //ダメージ
      let damage = RandomRange(this.atkMin, this.atkMax);
      if (!player.isInvincible) player.Damage(damage);
    }
    //プレイヤーに衝突応答
  }
  OnDying() {
    this.Die();
  }
  //しぬ
  Die() {
    this.isAlive = false;
    //死ぬ時にコイン
    for (let i = 0; i < this.coin; i++) {
      EntityManager.addEntity(new Coin({ x: this.pos.x, y: this.pos.y }));
    }
    EventManager.eventList.push(new QuakeEvent(15, 0.4)); //ゆれ
    EntityManager.removeEntity(this);
    EntityManager.addEntity(new Explosion3(this.pos));
  }
  //衝突判定
  Collision() {
    let list = EntityManager.colliderList;
    for (let i = 0; i < list.length; i++) {
      let l = list[i];
      if (l == this) continue;
      let c = Collision.on(this, l);
      if (c.isHit) this.OnCollision(c, l);
    }
  }
  OnCollision(c, entity) {
    if (entity.type == ENTITY.ENEMY) this.OnCollisionEnemy(c, entity);
    else if (entity.type == ENTITY.WALL) this.OnCollisionWall(c, entity);
  }
}
