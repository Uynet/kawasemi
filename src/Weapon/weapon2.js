import Bullet from '../Entity/bullet.js';
import EntityManager from '../Stage/entityManager.js';
import Weapon from './weapon.js';

export default class Weapon1 extends Weapon{
  /* ammunition : 弾薬数 */
  constructor(){
    super("1","10");
  }
  shot(player){
      for(let i = 0;i<8;i++){
        let vi = 5 + 5 * Math.random();
        let v = {
          x: vi * Math.cos(player.arg+ (Math.random()-0.5)/5),
          y: vi * Math.sin(player.arg+ (Math.random()-0.5)/5)
        }
        //bulletの出現位置
        let p = {
          x: player.pos.x + 5 * Math.cos(player.arg),
          y: player.pos.y + 5 * Math.sin(player.arg),
        }
        let bullet = new Bullet(p,v);
        EntityManager.addEntity(bullet);
      }
      this.ammunition--;
  }
}
