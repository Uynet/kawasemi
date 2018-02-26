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

const DIR = {
  UR : "UR",
  UL : "UL",
  DR : "DR",
  DL : "DL",
  R : "R",
  L : "L",
};

const SEEN = 2;

let weapon2 = Param.weapon2;

export default class Weapon2 extends Weapon{
  constructor(){
    super("2");
    /*基本情報*/
    this.target;
    this.isTargetOn = false;//照準が発生しているか
      /*パラメータ*/
      weapon2 = Param.weapon2;
      this.agi = weapon2.agi;//間隔
      this.cost = weapon2.cost;
      this.speed = weapon2.speed;//弾速
      this.length = weapon2.length;//射程距離
  }

  //敵が視界に入っているか
  isSeen(player,enemy){
    return (player.dir == DIR.UR || player.dir ==  DIR.UL) && (player.pos.y-enemy.pos.y)/Math.abs((player.pos.x-enemy.pos.x)) > 1
      || (player.dir == DIR.DR || player.dir == DIR.DL) && (player.pos.y-enemy.pos.y)/Math.abs((player.pos.x-enemy.pos.x)) <-1
        || player.dir == DIR.R && (player.pos.x-enemy.pos.x)/Math.abs((player.pos.y-enemy.pos.y)) <-1
          || player.dir == DIR.L && (player.pos.x-enemy.pos.x)/Math.abs((player.pos.y-enemy.pos.y)) >1
  }

  Target(player){
    /*とりあえず全探索*/
    for(let l of EntityManager.enemyList){
      //既にロックオンされている敵が射程外に出たら解除
      if(this.isTargetOn &&
        l == this.target.enemy){
        if(Util.distance(l.pos, player.pos) < this.length
          //各方向+-45度まで許容
          && this.isSeen(player,l)
        ){
          continue;
        }
        EntityManager.removeEntity(this.target);
        this.isTargetOn = false;
        continue;
      }
      //射程距離以内かつ視界
      if(Util.distance(l.pos, player.pos) < this.length && this.isSeen(player,l)
      ){
        //既にロックオンされている敵より近ければ
        if(!this.isTargetOn ||
          Util.distance(l.pos , player.pos) < Util.distance(this.target.pos,player.pos)){
          //今のロック先を解除して
          if(this.isTargetOn){
            EntityManager.removeEntity(this.target);
            this.isTargetOn = false;
          }
          //targetを追加する
          this.target = new Target(l);
          EntityManager.addEntity(this.target,Timer.timer);
          this.isTargetOn = true;
        }
      }
    }
    if(this.isTargetOn == true){
      //lockしていた敵が視界から消えたら消去
      if(!this.target.enemy.isAlive){
        EntityManager.removeEntity(this.target);
        this.isTargetOn = false;
      }else{
        //方向を指定
        player.arg = Math.atan((this.target.pos.y-player.pos.y)/(this.target.pos.x-player.pos.x));
        if(player.pos.x > this.target.pos.x ) player.arg += Math.PI;
      }
    }
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
        let p = ADV(POV(arg,48),CPV(player.pos));
        let bullet;
        EntityManager.addEntity(new Explosion1(CPV(p)));
        for(let i = 0;i<10;i++){
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
        //let v = POV(arg,vi);
        //player.acc.y -= v.y/5;
        //if(player.dir == DIR.DR || player.dir == DIR.DL) player.vel.y = -1.2;
        //振動
        EventManager.eventList.push(new QuakeEvent(17,5));
      }
    }
  }
}
