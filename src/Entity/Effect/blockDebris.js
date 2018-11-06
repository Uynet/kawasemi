import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Drawer from '../../drawer.js';
import Animator from "../AI/animator.js";

//woodboxを壊した時の破片
export default class BlockDebris extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.name = "blockDebris";
    this.gravity = 0.1;
    this.patternName = "blockDebris"
    this.pattern = Art.bulletPattern[this.patternName];
    this.BasicEffectInit();
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.rotation = Rand(2);
    this.addBasic(); 
    this.addAnimator(false,4,4);
  }
}
