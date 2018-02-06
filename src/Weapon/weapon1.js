import Bullet from '../Entity/bullet.js';
import Bullet1 from '../Entity/bullet1.js';
import Target from '../Entity/target.js';
import EntityManager from '../Stage/entityManager.js';
import Weapon from './weapon.js';
import Art from '../art.js';
import UIManager from '../UI/uiManager.js';
import Util from '../util.js';
import BulletShot from '../Entity/bulletShot.js';
import Timer from '../timer.js';

export default class Weapon1 extends Weapon{
  constructor(){
    super("1");
    /*基本情報*/
    this.frame = 0;//最後に撃った時刻
    this.target;
    this.isTargetOn = false;//照準が発生しているか
    /*パラメータ*/
    this.agi = 6;//間隔
    this.speed = 6;//弾速
    this.length = 180;//射程距離
  }

  //敵が視界に入っているか
  isSeen(player,enemy){
    return  player.dir == DIR.UP && (player.pos.y-enemy.pos.y)/Math.abs((player.pos.x-enemy.pos.x)) > 1
      || player.dir == DIR.DOWN && (player.pos.y-enemy.pos.y)/Math.abs((player.pos.x-enemy.pos.x)) <-1
        || player.dir == DIR.RIGHT && (player.pos.x-enemy.pos.x)/Math.abs((player.pos.y-enemy.pos.y)) <-1
          || player.dir == DIR.LEFT && (player.pos.x-enemy.pos.x)/Math.abs((player.pos.y-enemy.pos.y)) >1
  }

  Target(player){
    console.assert(this.isTargetOn == (this.target === undefined))
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
    if(this.frame % this.agi == 0){
        let vi = this.speed;
        let v = {
          x: vi * Math.cos(player.arg + (Math.random()-0.5)/5),
          y: vi * Math.sin(player.arg + (Math.random()-0.5)/5)
        }
        let p = {
          x: player.pos.x + 5 * Math.cos(player.arg),
          y: player.pos.y + 5 * Math.sin(player.arg),
        }
        let bullet = new Bullet1(p,v);
        bullet.atk = 1;
        EntityManager.addEntity(bullet);
        /* ■ SoundEffect : shot */
        /* □ Effect : shot */
        EntityManager.addEntity(new BulletShot(p,{x:0,y:0}));
        //反動
        player.vel.x -= v.x/11;
        player.vel.y -= v.y/4;
    }
    this.frame++;
  }
}
