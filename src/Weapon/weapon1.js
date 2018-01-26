import Bullet from '../Entity/bullet.js';
import Bullet1 from '../Entity/bullet1.js';
import EntityManager from '../Stage/entityManager.js';
import Weapon from './weapon.js';
import Art from '../art.js';

export default class Weapon1 extends Weapon{
  /* ammunition : 弾薬数 */
  constructor(){
    super("1",10,10);
    this.clock = 0;//最後に撃った時刻
    this.speed = 10;
    this.length = 120;//射程距離
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
