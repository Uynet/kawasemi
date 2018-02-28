import Bullet from '../Entity/bullet.js';
import Bullet1 from '../Entity/bullet1.js';
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

export default class Weapon1 extends Weapon{
  constructor(){
    super("1");
    /*基本情報*/
    /*パラメータ*/
    this.param = Param.weapon1;
    this.agi = this.param.agi;//間隔
    this.cost = this.param.cost;
    this.speed = this.param.speed;//弾速
    this.length = this.param.length;//射程距離
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
        console.assert(player.bullet >=0 );

        this.arg = player.arg;
        let p = {
          x: player.pos.x -4 + 10 * Math.cos(this.arg),
          y: player.pos.y + 10 * Math.sin(this.arg),
        }
        let bullet = new Bullet1(p,this.speed,this.arg,this);
        EntityManager.addEntity(bullet);
        /* ■ SoundEffect : shot */
        /* □ Effect : shot */
        EntityManager.addEntity(new BulletShot(CPV(p),VEC0()));
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
}
