import Audio from "../audio.js";
import Bullet3 from "../Entity/Bullet/bullet3.js";
import BulletShot from "../Entity/Effect/bulletShot.js";
import Param from "../param.js";
import EntityManager from "../Stage/entityManager.js";
import Weapon from "./weapon.js";

export default class Weapon3 extends Weapon {
  constructor() {
    super("normal");
    /*基本情報*/
    /*パラメータ*/
    this.param = Param.weapon3;
    this.agi = this.param.agi; //間隔
    this.cost = this.param.cost;
    this.speed = this.param.speed; //弾速
    this.length = this.param.length; //射程距離
    /*option*/
    this.isTarget = this.param.isTarget;
    this.isHorming = this.param.isHorming;
    this.isLasersight = this.param.isLasersight;
  }
  Set(player) {
    this.arg = player.arg;
    let p = copy(player.spilit.pos);
    let p2 = add(player.spilit.pos, vec2(8, 8));
    let bullet = new Bullet3(p2, this);
    EntityManager.addEntity(bullet);
    /* ■ SoundEffect : shot */
    //Audio.PlaySE("normalShot", -0.6);
    Audio.PlaySE("clack1", -0.6);
    /* □ Effect : shot */
    EntityManager.addEntity(new BulletShot(copy(p), vec0()));
    //振動
    //EventManager.eventList.push(new QuakeEvent(8,2));
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
