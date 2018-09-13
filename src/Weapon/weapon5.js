import Bullet from '../Entity/Bullet/bullet.js';
import Bullet3 from '../Entity/Bullet/bullet3.js';
import Bullet1 from '../Entity/Bullet/bullet1.js';
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
import Sonic from '../Entity/Effect/sonic.js';

//バリア?
export default class Weapon5 extends Weapon{
  constructor(){
    //ここの名前を忘れずに変更すること
    super("weapon5");
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
  shot(player){
    //最後に撃ってからframeまで停止
    if((player.frame - player.frameShot) > this.agi){
    let e = new Explosion1(player.pos);
    EntityManager.addEntity(e);
      //shot時刻
      player.frameShot = player.frame;
      //playerの弾薬が残っていなければ打てない
      //弾薬消費
      player.bullet -= this.cost;
      player.bullet = Math.max(0,player.bullet);

      this.arg = player.arg;
    }
  }
  Update(player){
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
