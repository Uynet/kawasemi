import Audio from "../../audio.js";
import Box from "../../Collision/box.js";
import Collider from "../../Collision/collider.js";
import Collision from "../../Collision/collision.js";
import Drawer from "../../drawer.js";
import EventManager from "../../Event/eventmanager.js";
import StartBossBattleEvent from "../../Event/StartBossBattleEvent.js";
import ToBeContinuedEvent from "../../Event/toBeContinuedEvent.js";
import Param from "../../param.js";
import EntityManager from "../../Stage/entityManager.js";
import UIManager from "../../UI/uiManager.js";
import Bright from "../Effect/bright.js";
import Explosion1 from "../Effect/Explosion/explosion1.js";
import Explosion3 from "../Effect/Explosion/explosion3.js";
import Explosion5 from "../Effect/Explosion/explosion5.js";
import FontEffect from "../Effect/fontEffect.js";
import Enemy from "./enemy.js";
import Enemy4 from "./enemy4.js";

//enum
const State = {
  INIT: "INIT",
  WAIT: "WAIT",
  JUMP: "JUMP",
  POP: "POP"
};

export default class Enemy1 extends Enemy {
  constructor(pos) {
    super(pos, vec0());
    /*基本情報*/
    this.name = "enemy1";
    this.BasicEnemyInit();
    this.size = 64;
    this.collider = new Collider(SHAPE.BOX, new Box(pos, this.size, this.size));
    /*スプライト*/
    this.sprite.scale.set(this.size / 16);
    //this.sprite.scale.x *= 0.5;
    //this.sprite.position.x += this.size*(1-this.sprite.scale.x/2);
    /*パラメータ*/
    //this.addAI(new Enemy1AI(this));
    this.SetParam(Param.enemy1);
    this.maxHP = this.hp;
    /*フラグ*/
    this.state = State.INIT;
    this.pos.y = -2000;
    this.vel.y = 12;

    this.enemyPop = 3;
    this.addAnimator(true, 6, 4);
  }
  PopEnemy(enemyPop) {
    let p = {
      x: this.pos.x + this.size / 2,
      y: 0
    };
    for (let i = 0; i < enemyPop; i++) {
      let e = new Enemy4(add(p, Rand2D(enemyPop)));
      //ちょっと特殊
      e.AIList[2].dist = 1000;
      // e.coin = Dice(2)+1;
      EntityManager.addEntity(e);
    }
  }
  Explosion() {
    let p = copy(this.pos);
    p.y += this.size;
    p.x += this.size / 2;
    for (let i = 0; i < 2; i++) {
      EntityManager.addEntity(new Explosion1(p, vec2(22 * (i - 0.5), -8)));
    }
  }
  BigExplosion() {
    this.pos.x = 384;
    this.pos.y = Math.min(this.pos.y, 289);
    let p = copy(this.pos);
    p.y += this.size;
    for (let i = 0; i < 4; i++) {
      EntityManager.addEntity(new Explosion1(p, vec2(0, -24 + Rand(8))));
      p.x += this.size / 4;
    }
    p.x = 32;
    for (let i = 0; i < 20; i++) {
      EntityManager.addEntity(new Explosion3(p));
      // EntityManager.addEntity(new Explosion1(p,vec2(0,-24+Rand(8))));
      p.x += 16;
    }
  }
  FirstDrop() {
    Audio.PlaySE("bomb", 0, 0.5);
    //this.PopEnemy(12);
    this.state = "POP";
    this.Landing();
    let e = new StartBossBattleEvent("boss");
    this.Quake(99000000, 0.99, true);
    let p = copy(this.pos);
    p.x += this.size / 2;
    p.y += this.size;
    let exp5 = new Explosion5(p);
    exp5.addEntity();
    this.BigExplosion();

    EventManager.Add(e);
  }
  Drop() {
    this.pos.y = 0;
    this.state = "DROP";
  }
  Jump() {
    this.Quake(10, 0.99);
    this.vel.y = -3.8;
    this.acc.y = -4.3;
    this.state = "JUMP";
    let p = add(this.pos, vec2(-20, 90));
    //  Audio.PlaySE("enemy5Shot");
    Audio.PlaySE("landing2", 1.6);
  }
  Waiting() {
    //たまにジャンプする
    this.Jump();
  }
  Poping() {
    Audio.PlaySE("landing3", 1);
    this.vel.y = clamp(this.vel.y * -0.3, -1, 0);
    this.vel.x *= 0.4;
    if (this.vel.y > -0.05) {
      this.state = "WAIT";
    }
  }
  Landing() {
    //プレイヤーが斥力を受ける
    let f = {
      x: this.pos.x + this.size / 2 < EntityManager.player.pos.x ? 0.1 : -0.1,
      y: -0.6
    };
    //ジャンプ中は影響を受けない
    if (EntityManager.player.isJump) {
      f.x *= 0;
      f.y = -0.3;
    }
    EntityManager.player.AddForce(f);
    for (let e of EntityManager.enemyList) {
      if (e == this) continue;
      f = { x: this.pos.x + this.size / 2 < e.pos.x ? 0.3 : -0.3, y: -0.7 };
      e.AddForce(f);
    }

    if (this.hp / this.maxHP < 0.5) this.enemyPop = 5;
    if (this.hp / this.maxHP < 0.2) this.enemyPop = 7;
    if (Rand(1) < 0) this.PopEnemy(this.enemyPop);

    let p = copy(this.pos);
    p.y += this.size;
    this.acc.x = 0;
    this.Quake(10, 0.97);
    this.Quake(40, 0.97, true);
    Audio.PlaySE("missileHit", 2);
    this.Explosion();
    //EntityManager.addEntity(new Shockwave(p));
  }
  Jumping() {
    //着地
    this.Landing();
    this.state = "POP";
  }
  //衝突判定
  Collision() {
    for (let l of EntityManager.wallList) {
      if (l == this) continue;
      let c = Collision.on(this, l);
      if (c.isHit) {
        /* 衝突応答*/
        if (c.n.x != 0) this.vel.x = 0;
        //地面との衝突
        if (c.n.y == -1 && this.vel.y > 0) {
          switch (this.state) {
            case "WAIT":
              this.Waiting();
              break;
            case "JUMP":
              this.Jumping();
              break;
            case "POP":
              this.Poping();
              break;
            case "DROP":
              this.FirstDrop();
              break;
          }
        }
        /*押し出し*/
        this.pos.x += c.n.x * c.depth;
        this.pos.y += c.n.y * c.depth;
        /*note : now isHit == false*/
      }
    }
  }
  //プレイヤーにダメージ
  Hurt() {
    let player = EntityManager.player;
    let c = Collision.on(this, player);
    //潰されたとき
    if (c.isHit && c.n.y == -1) {
      //ダメージ
      let damage = RandomRange(this.atkMin, this.atkMax);
      if (!player.isInvincible) player.Damage(damage);
    }
    //横から当たると弾く
    if (c.isHit && c.n.y != 1) {
      player.vel.x = -c.n.x * 10;
    }
  }
  Damage(atk) {
    if (this.state != "INIT") {
      Audio.PlaySE("enemyDamage", -0.7);
      this.hp = Math.max(this.hp + atk, 0);
      //ダメージをポップ
      EntityManager.addEntity(new FontEffect(this.pos, atk + "", "enemy"));
      //this.SetSize(lerp(96,192,this.hp/this.maxHP));
      const BossHP = UIManager.find("BossHP")[0];
      if (BossHP) BossHP.SetBar(this.hp);
    }
  }

  ClampPos() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = 0;
    }
    if (this.pos.x > 16 * Drawer.mapSize.width) {
      this.posx = 16 * Drawer.mapSize.width;
      this.vel.x = 0;
    }
  }
  OnDying() {
    this.Die();
    this.Quake(30, 0.99);
    Audio.PlaySE("stageChange", 1, 0.8);
    Audio.PlaySE("bomb", 1, 0.6);
    Audio.StopBGM();
    //ボスを倒すとtobe continued..みたいなのがでて終わる
    EventManager.Add(new ToBeContinuedEvent());
  }
  Update() {
    this.ExecuteAI();
    if (this.state == "INIT") {
      let player = EntityManager.player;
      this.pos.y = -100;
      if (player.pos.x > 300) this.Drop();
      this.pos.x = player.pos.x + 96;
    }
    if (this.state == "DROP") {
      let player = EntityManager.player;
      this.pos.x = 384;
      this.pos.y = Math.min(this.pos.y, 289);
      let p = copy(this.pos);
      p.x += this.size / 2 - 8;
      for (let i = 0; i < 2; i++) {
        if (i == 1) EntityManager.addEntity(new Explosion3(p));
        let bright = new Bright(p, Rand2D(2));
        bright.sprite.scale.set(2);
        bright.addEntity();
        p.y -= 3;
      }
    }
    if (this.state == "JUMP") {
      //プレイヤー側に寄る
      this.acc.x =
        this.pos.x + this.size / 2 < EntityManager.player.pos.x ? 0.01 : -0.01;
      this.vel.x = Math.max(-1, Math.min(this.vel.x, 1));
      if (this.vel.y > 0) {
        //落下は急加速
        this.vel.y *= 1 + Math.abs(this.vel.y) / 20;
        this.vel.y = Math.min(this.vel.y, 12);
      } else {
        //ゆっくり減速
        this.vel.y *= 0.95;
      }
    }
    this.Collision();
    this.ClampPos();
  }
}
