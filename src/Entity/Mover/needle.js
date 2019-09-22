import Art from "../../art.js";
import Audio from "../../audio.js";
import Box from "../../Collision/box.js";
import Collider from "../../Collision/collider.js";
import Collision from "../../Collision/collision.js";
import EntityManager from "../../Stage/entityManager.js";
import BulletShot from "../Effect/bulletShot.js";
import Wall from "../wall.js";

let EntityList = EntityManager.entityList;

//トゲ
export default class Needle extends Wall {
  constructor(pos, wall) {
    super(pos, wall);
    /*基本情報*/
    this.collider = new Collider(
      SHAPE.BOX,
      new Box({ x: pos.x, y: pos.y }, 16, 16)
    ); //衝突判定の形状
    this.name = "needle";
    this.layer = "ENTITY";
    this.isUpdater = true;
    this.hp = 1;
    //wall parameter
    this.isBreakable = wall.isBreakable;
    this.coltype = "none";
    /*スプライト*/
    this.pattern = Art.wallPattern.steel.entity;
    this.spid = 3; //spriteIndex 現在のスプライト番号
    this.sprite = Art.Sprite(wall.texture); //現在表示中のスプライト
    this.sprite.position = this.pos;
  }
  //自分がダメージを食らう
  Damage(atk) {
    this.hp += atk;
  }

  //プレイヤーにダメージ
  Hurt() {
    let player = EntityManager.player;
    let c = Collision.on(this, player);
    if (c.isHit) {
      //ダメージ
      //速度が大きい程ダメージ大きい
      let v = player.vel.x * player.vel.x + player.vel.y * player.vel.y;
      if (v > 1) {
        let damage = Math.floor(v / 2) + 1;
        EntityManager.player.Damage(damage);
      }
      //反動
      //player.vel.y = -6 * c.n.y;
      //player.vel.x = -6 * c.n.x;
    }
  }

  Update() {
    this.sprite.position = this.pos;

    this.Hurt();
    /*observer*/
    if (this.hp <= 0) {
      EntityManager.removeEntity(this);
      let p = copy(this.pos);
      EntityManager.addEntity(new BulletShot(p, vec0()));
      Audio.PlaySE("blockBreak");
    }
  }
}
