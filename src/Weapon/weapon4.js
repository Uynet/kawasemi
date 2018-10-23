import Bullet from '../Entity/Bullet/bullet.js';
import Bullet4 from '../Entity/Bullet/bullet4.js';
import EntityManager from '../Stage/entityManager.js';
import Pool from '../Stage/pool.js';
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

//炎
export default class Weapon4 extends Weapon{
  constructor(){
    //ここの名前を忘れずに変更すること
    super("weapon4");
    /*基本情報*/
    /*パラメータ*/
    this.param = Param.weapon4;
    this.agi = this.param.agi;//間隔
    this.cost = this.param.cost;
    this.speed = this.param.speed;//弾速
    this.length = this.param.length;//射程距離
    /*option*/
    this.isTarget = this.param.isTarget;
    this.isHorming = this.param.isHorming;
    this.isLasersight = this.param.isLasersight;
  }
  Set(player){
    this.arg = player.arg;
    let p = {
      x: player.pos.x -4 + 10 * Math.cos(this.arg),
      y: player.pos.y + 10 * Math.sin(this.arg),
    }
    let bullet = new Bullet4(p,this);
    EntityManager.addEntity(bullet);
    /* ■ SoundEffect : shot */
    Audio.PlaySE("playerDamage",-0.2);
    //振動
    EventManager.eventList.push(new QuakeEvent(10,0.5));
  }
  Update(player){
    if(this.isTarget) this.Target(player);
    if(this.isLasersight) this.Lasersight(player);
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
