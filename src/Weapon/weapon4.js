import Audio from "../audio.js";
import Bullet4 from "../Entity/Bullet/bullet4.js";
import EventManager from "../Event/eventmanager.js";
import QuakeEvent from "../Event/quakeEvent.js";
import Param from "../param.js";
import EntityManager from "../Stage/entityManager.js";
import Weapon from "./weapon.js";

//炎
export default class Weapon4 extends Weapon {
  constructor() {
    //ここの名前を忘れずに変更すること
    super("fire");
    /*基本情報*/
    /*パラメータ*/
    this.param = Param.fire;
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
    let p = add(player.spilit.pos, vec2(8, 0));
    let bullet = new Bullet4(p, this);
    EntityManager.addEntity(bullet);
    /* ■ SoundEffect : shot */
    Audio.PlaySE("playerDamage", -0.2);
    //振動
    EventManager.eventList.push(new QuakeEvent(10, 0.5));
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
