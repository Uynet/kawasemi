import Bullet from '../Entity/bullet.js';
import EntityManager from '../Stage/entityManager.js';
import Weapon from './weapon.js';
import Art from '../art.js';

export default class Weapon2 extends Weapon{
  /* ammunition : 弾薬数 */
  constructor(){
    super("1",10,40);
    this.clock = 0;//最後に撃った時刻
    this.speed = 10;
    this.length = 80;//射程距離
  }
  shot(player){
      for(let i = 0;i<12;i++){
        let vi = 5 + 5 * Math.random();
        let v = {
          x: vi * Math.cos(player.arg+ (Math.random()-0.5)/3),
          y: vi * Math.sin(player.arg+ (Math.random()-0.5)/3)
        }
        //bulletの出現位置
        let p = {
          x: player.pos.x + 5 * Math.cos(player.arg),
          y: player.pos.y + 5 * Math.sin(player.arg),
        }
        let bullet = new Bullet(p,v,Art.bullet2Texture);
        EntityManager.addEntity(bullet);
      }
      this.ammunition--;
  }
}
