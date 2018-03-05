import Bullet from '../Entity/bullet.js';
import Bullet2 from '../Entity/bullet2.js';
import Target from '../Entity/Effect/target.js';
import EntityManager from '../Stage/entityManager.js';
import Weapon from './weapon.js';
import Art from '../art.js';
import UIManager from '../UI/uiManager.js';
import Util from '../util.js';
import BulletShot from '../Entity/Effect/bulletShot.js';
import Timer from '../timer.js';
import FontEffect from '../Entity/Effect/fontEffect.js';
import EventManager from '../Event/eventmanager.js';
import QuakeEvent from '../Event/quakeEvent.js';
import Param from '../param.js';
import Explosion1 from '../Entity/Effect/explosion1.js';
import Sonic from '../Entity/Effect/sonic.js';
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

  shot(player){
    //最後に撃ってからframeまで停止
    if((player.frame - player.frameShot) > this.agi){
      //shot時刻
      player.frameShot = player.frame;
      //playerの弾薬が残っていなければ打てない
      if(player.bullet < this.cost){
        EntityManager.addEntity(new FontEffect(player.pos,"たりないよ","pop"));
      }else{

        //弾薬消費
        player.bullet -= this.cost;

        let arg = player.arg;
        let p = ADV(POV(arg,32),CPV(player.pos));
        let bullet;
        EntityManager.addEntity(new Explosion1(CPV(p)));
        for(let i = 0;i<16;i++){
          p = ADV(player.pos,POV(arg,16*(i+1)));
          bullet = new Bullet2(p,arg,this.target);
          EntityManager.addEntity(bullet);
        }
        /* ■ SoundEffect : shot */
        /* □ Effect : shot */
        EntityManager.addEntity(new BulletShot(CPV(p),VEC0()));
        EntityManager.addEntity(new Explosion1(CPV(p)));
        //反動
        //player.vel.x -= v.x/11;
        //if(player.dir == DIR.DR || player.dir == DIR.DL) player.vel.y = -1.2;
        //振動
        EventManager.eventList.push(new QuakeEvent(17,5));
      }
    }
  }
  Update(player){
    if(this.isTarget) this.Target(player);
    if(this.isLasersight) this.Lasersight(player);
  }
  Reset(){
    if(this.isTarget)EntityManager.removeEntity(this.target);
    if(this.isLasersight)EntityManager.removeEntity(this.lasersight);
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
