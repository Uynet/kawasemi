import Bullet from '../Entity/Bullet/bullet.js';
import Bullet1 from '../Entity/Bullet/bullet1.js';
import EntityManager from '../Stage/entityManager.js';
import Pool from '../Stage/pool.js';
import Weapon from './weapon.js';
import Art from '../art.js';
import Audio from '../audio.js';
import BulletShot from '../Entity/Effect/bulletShot.js';
import FontEffect from '../Entity/Effect/fontEffect.js';
import EventManager from '../Event/eventmanager.js';
import QuakeEvent from '../Event/quakeEvent.js';
import Param from '../param.js';
import Explosion1 from '../Entity/Effect/explosion1.js';
import Explosion2 from '../Entity/Effect/explosion2.js';
import Lasersight from '../Entity/Effect/lasersight.js';

export default class Weapon1 extends Weapon{
  constructor(){
    super("missile");
    /*基本情報*/
    /*パラメータ*/
    this.param = Param.weapon1;
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
      //shot時刻
      player.frameShot = player.frame;
      //playerの弾薬が残っていなければ打てない
      if(player.bullet < this.cost){
        EntityManager.addEntity(new FontEffect(player.pos,"たりないよ","pop"));
          Audio.PlaySE("empty");
      }else{

        //弾薬消費
        player.bullet -= this.cost;
        console.assert(player.bullet >=0 );

        this.arg = player.arg;
        let p = {
          x: player.pos.x -4 + 10 * Math.cos(this.arg),
          y: player.pos.y + 10 * Math.sin(this.arg),
        }
        let bullet = Pool.GetMissile(p,this);
        //let bullet = new Bullet1(p,this);
        EntityManager.addEntity(bullet);
        /* ■ SoundEffect : shot */
        Audio.PlaySE("missileShot",2);
        /* □ Effect : shot */
        EntityManager.addEntity(new BulletShot(CPV(p),VEC0()));
        EntityManager.addEntity(new Explosion2(CPV(p),this.arg));
        //反動
        //player.vel.x -= v.x/11;
        let v = POV(this.arg,this.speed);
        player.acc.y -= Math.max(v.y/5,0);
        //if(player.dir == DIR.DR || player.dir == DIR.DL) player.vel.y = -1.2;
        //振動
        //EventManager.eventList.push(new QuakeEvent(8,2));
      }
    }
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
