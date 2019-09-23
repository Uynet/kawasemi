import Audio from "../audio.js";
import Bullet1 from "../Entity/Bullet/bullet1.js";
import BulletShot from "../Entity/Effect/bulletShot.js";
import Explosion2 from "../Entity/Effect/Explosion/explosion2.js";
import Param from "../param.js";
import EntityManager from "../Stage/entityManager.js";
import Weapon from "./weapon.js";

export default class Weapon1 extends Weapon {
  constructor() {
    super("missile");
    /*基本情報*/
    /*パラメータ*/
    this.param = Param.weapon1;
    this.agi = this.param.agi; //間隔
    this.cost = this.param.cost;
    this.speed = this.param.speed; //弾速
    this.length = this.param.length; //射程距離
    /*option*/
    this.isTarget = this.param.isTarget;
    this.isHorming = this.param.isHorming;
    this.isLasersight = this.param.isLasersight;
  }
  shot(player) {
    super.shot(player);
  }
  //装填
  Set(player) {
    let p = {
      x: player.spilit.pos.x - 4 + 10 * Math.cos(this.arg),
      y: player.spilit.pos.y + 10 * Math.sin(this.arg)
    };
    let bullet = new Bullet1(p, this);
    EntityManager.addEntity(bullet);
    /* ■ SoundEffect : shot */
    Audio.PlaySE("missileShot", 2);
    /* □ Effect : shot */
    EntityManager.addEntity(new BulletShot(copy(p), vec0()));
    EntityManager.addEntity(new Explosion2(copy(p), this.arg));
  }
  Update(player) {
    if (this.isTarget) this.Target(player);
    if (this.isLasersight) this.Lasersight(player);
  }
  Option(option, value) {
    switch (option) {
      case "isHorming":
        this.isHorming = value;
        break;
      case "isLasersight":
        this.isLasersight = value;
        break;
      case "isTarget":
        this.isTarget = value;
        break;
      default:
        console.warn(option);
    }
  }
}
