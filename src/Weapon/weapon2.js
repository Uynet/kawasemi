import Bullet from '../Entity/Bullet/bullet.js';
import Bullet2 from '../Entity/Bullet/bullet2.js';
import EntityManager from '../Stage/entityManager.js';
import Weapon from './weapon.js';
import Art from '../art.js';
import Audio from '../audio.js';
import UIManager from '../UI/uiManager.js';
import BulletShot from '../Entity/Effect/bulletShot.js';
import FontEffect from '../Entity/Effect/fontEffect.js';
import EventManager from '../Event/eventmanager.js';
import QuakeEvent from '../Event/quakeEvent.js';
import Param from '../param.js';
import Explosion1 from '../Entity/Effect/explosion1.js';
import Explosion2 from '../Entity/Effect/explosion2.js';
import Lasersight from '../Entity/Effect/lasersight.js';

const DIR = {
  UR : "UR",
  UL : "UL",
  DR : "DR",
  DL : "DL",
  R : "R",
  L : "L",
};

export default class Weapon2 extends Weapon{
  constructor(){
    super("laser");
    /*基本情報*/
    this.target;
    this.isTargetOn = false;//照準が発生しているか
    this.lasersight;
    this.isLaserOn = false;
    /*パラメータ*/
    this.param = Param.weapon2;
    this.agi = this.param.agi;//間隔
    this.cost = this.param.cost;
    this.speed = this.param.speed;//弾速
    this.length = this.param.length;//射程距離
    /*オプション*/
    this.isTarget = this.param.isTarget;
    this.isLasersight = this.param.isLasersight;

  }
  Set(player){
    let arg = player.arg;
    let p = ADV(POV(arg,16),CPV(player.pos));
    let bullet;
    //再帰的に生成
    p = ADV(player.pos,POV(arg,16));
    bullet = new Bullet2(p,arg,true,0);
    EntityManager.addEntity(bullet);
    /* ■ SoundEffect : shot */
    Audio.PlaySE("laserShot",0.7);
    /* □ Effect : shot */
    EntityManager.addEntity(new BulletShot(CPV(p),VEC0()));
    EntityManager.addEntity(new Explosion1(CPV(p)));
    //反動
    //player.vel.x -= v.x/11;
    //if(player.dir == DIR.DR || player.dir == DIR.DL) player.vel.y = -1.2;
    //振動
    EventManager.eventList.push(new QuakeEvent(17,5));
  }
  Update(player){
    if(this.isTarget) this.Target(player);
    if(this.isLasersight) this.Lasersight(player);
  }
  Reset(){
    if(this.isTargetOn)EntityManager.removeEntity(this.target);
    if(this.isLasersight)EntityManager.removeEntity(this.lasersight);
    this.Init();
  }
  Option(option,value){
    switch(option){
      case "isHorming" : this.isHorming = value ;break;
      case "isLasersight" : this.isLasersight = value ;break;
      case "isTarget" : this.isTarget = value ;break;
      default : console.warn(option);
    }
  }
}
