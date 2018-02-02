import Bullet from '../Entity/bullet.js';
import Bullet1 from '../Entity/bullet1.js';
import Target from '../Entity/target.js';
import EntityManager from '../Stage/entityManager.js';
import Weapon from './weapon.js';
import Art from '../art.js';
import UIManager from '../UI/uiManager.js';

export default class Weapon1 extends Weapon{
  constructor(){
    super("1",10,10);
    this.clock = 0;//最後に撃った時刻
    this.target = {x:-999,y:-999};//照準
    /*parameter*/
    this.agi = 10;
    this.speed = 6;
    this.length = 180;//射程距離
  }
  /*一番近い敵に照準をあわせる*/
  Target(player){
    this.target = {x:-999,y:-999};//照準
    for(let l of EntityManager.enemyList){
      if(Math.abs(l.pos.x - player.pos.x) < 100){
        //座標系に注意
        player.arg = Math.atan((l.pos.y-player.pos.y)/(l.pos.x-player.pos.x));
        if(player.pos.x > l.pos.x ) player.arg += Math.PI;
        this.target = l.pos;
      }
    }
    EntityManager.target.pos = this.target;
  }
  shot(player){
    //最後に撃ってからclockまで停止
    if(this.clock % this.agi == 0){
      for(let i = 0;i<1;i++){
        let vi = this.speed;
        let v = {
          x: vi * Math.cos(player.arg),
          y: vi * Math.sin(player.arg)
        }
        //bulletの出現位置
        let p = {
          x: player.pos.x + 5 * Math.cos(player.arg),
          y: player.pos.y + 5 * Math.sin(player.arg),
        }
        let bullet = new Bullet1(p,v);
        EntityManager.addEntity(bullet);
      }
      this.ammunition--;
    }
    this.clock++;
  }
}
