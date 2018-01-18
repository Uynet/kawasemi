import Bullet from '../Entity/bullet.js';
import EntityManager from '../Stage/entityManager.js';

export default class Weapon{
  /* ammunition : 弾薬数 */
  constructor(name,ammunition){
    this.name = name;
    this.ammunition = ammunition;
  }
  shot(player){ }
}
