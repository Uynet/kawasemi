import Bullet from '../Entity/bullet.js';
import Bullet1 from '../Entity/bullet1.js';
import Target from '../Entity/target.js';
import EntityManager from '../Stage/entityManager.js';
import Weapon from './weapon.js';
import Art from '../art.js';
import UIManager from '../UI/uiManager.js';
import Util from '../util.js';
import BulletShot from '../Entity/bulletShot.js';

export default class Weapon1 extends Weapon{
  constructor(){
    super("1");
    /*基本情報*/
    this.frame = 0;//最後に撃った時刻
    this.target;
    this.isTargetOn = false;//照準が発生しているか
    /*パラメータ*/
    this.agi = 10;//間隔
    this.speed = 6;//弾速
    this.length = 180;//射程距離
  }
  /*向いてる方向+-π/8の中で近い敵に照準をあわせる*/
  Target(player){
    /*とりあえず全探索*/
    for(let l of EntityManager.enemyList){
      //既にロックオンされている敵はスキップ
      if(this.isTargetOn &&
        l == this.target.enemy) continue;
        //射程距離以内かつ
      if(Util.distance(l.pos, player.pos) < this.length){
          //既にロックオンされている敵より近ければ
        if(!this.isTargetOn ||
          Util.distance(l.pos , player.pos) < Util.distance(this.target.pos,player.pos)){
        //今のロック先を解除して
        if(this.isTargetOn){
          EntityManager.removeEntity(this.target);
        }
        //targetを追加する
        this.target = new Target(l);
        EntityManager.addEntity(this.target);
        this.isTargetOn = true;
        }
      }
    }
    if(this.isTargetOn == true){
      //lockしていた敵が消えたら消去
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
        /* ■ SoundEffect : shot */
        let vi = this.speed;
        let v = {
          x: vi * Math.cos(player.arg),
          y: vi * Math.sin(player.arg)
        }
        let p = {
          x: player.pos.x + 5 * Math.cos(player.arg),
          y: player.pos.y + 5 * Math.sin(player.arg),
        }
        let bullet = new Bullet1(p,v);
        EntityManager.addEntity(bullet);
        //エフェクト
        p.x += v.x;
        p.y += v.y;
        EntityManager.addEntity(new BulletShot(p,{x:0,y:0}));
    }
    this.frame++;
  }
}
