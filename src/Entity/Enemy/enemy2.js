import Enemy from './enemy.js';
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Enemy2AI from '../AI/enemy2AI.js';
import ReflectOnCollision from '../AI/ReflectOnCollision.js';
import UIManager from '../../UI/uiManager.js'
import FontEffect from '../Effect/fontEffect.js';
import Coin from '../Mover/coin.js';
import EventManager from '../../Event/eventmanager.js';
import QuakeEvent from '../../Event/quakeEvent.js';
import Param from '../../param.js';

export default class Enemy2 extends Enemy{
  constructor(pos){
    super(pos,vec0());
    this.name = "enemy2";
    /*パラメータ*/
    this.BasicEnemyInit();
    this.vel = Rand2D(1);
    this.addAI(new ReflectOnCollision(this));
    this.addAnimator(true,2,4);
  }
}
