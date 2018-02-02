import Bullet from '../Entity/bullet.js';
import Bullet1 from '../Entity/bullet1.js';
import Target from '../Entity/target.js';
import EntityManager from '../Stage/entityManager.js';
import Weapon from './weapon.js';
import Art from '../art.js';
import UIManager from '../UI/uiManager.js';
import Util from '../util.js';

export default class Weapon1 extends Weapon{
  constructor(){
    super("1");
    /*基本情報*/
    this.clock = 0;//最後に撃った時刻
      this.targetList = [];//targetのリスト
    /*パラメータ*/
    this.agi = 10;//間隔
      this.speed = 6;//弾速
    this.length = 180;//射程距離
  }
  /*向いてる方向+-π/8の中で近い敵に照準をあわせる*/
  Target(player){
    /*とりあえず全探索*/
    let target;
    for(let l of EntityManager.enemyList){
      //既にロックオンされている敵はスキップ
      if(this.targetList.length != 0 &&
        l == this.targetList[0].enemy) continue;
        //射程距離以内かつ
      if(Util.distance(l.pos, player.pos) < this.length){
        if(this.targetList.length == 0 ||
          //既にロックオンされている敵より近ければ
          Util.distance(l.pos , player.pos) < Util.distance(this.targetList[0].pos,player.pos)){
          //方向を指定して
          player.arg = Math.atan((l.pos.y-player.pos.y)/(l.pos.x-player.pos.x));
        if(player.pos.x > l.pos.x ) player.arg += Math.PI;
        //今のロック先を解除して
        if(this.targetList.length!= 0){
          EntityManager.removeEntity(this.targetList[0]);
          this.targetList.pop();
        }
        //targetを追加する
        target = new Target(l.pos,l);
        this.targetList.push(target);
        EntityManager.addEntity(target);
        }
      }
    }
    target = void 0;
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
