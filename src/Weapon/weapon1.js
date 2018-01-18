import Bullet from '../Entity/bullet.js';
import EntityManager from '../Stage/entityManager.js';
import Weapon from './weapon.js';
import Art from '../art.js';

export default class Weapon1 extends Weapon{
  /* ammunition : 弾薬数 */
  constructor(){
    super("1","10");
  }
  shot(player){
      for(let i = 0;i<1;i++){
        let vi = 16 + 5 * Math.random();
        let v = {
          x: vi * Math.cos(player.arg),
          y: vi * Math.sin(player.arg)
        }
        //bulletの出現位置
        let p = {
          x: player.pos.x + 5 * Math.cos(player.arg),
          y: player.pos.y + 5 * Math.sin(player.arg),
        }
        let bullet = new Bullet(p,v,Art.bulletTexture);
        EntityManager.addEntity(bullet);
      }
      this.ammunition--;
  }
}
