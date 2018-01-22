import Bullet from '../Entity/bullet.js';
import EntityManager from '../Stage/entityManager.js';

export default class Weapon{
  /* 
   * ammunition : 弾薬数 
  /* agi : agility*/
  constructor(name,ammunition,agi){
    this.name = name;
    this.ammunition = ammunition;
    this.agi = agi;
  }
  shot(player){ }
}
