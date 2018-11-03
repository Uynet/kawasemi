import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Drawer from '../../drawer.js';
import Animator from "../AI/animator.js";

export default class Signpop extends EFFECT{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.name = "signpop";
    /*スプライト*/
    this.pattern = Art.bulletPattern.signpop;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.addAnimator(true,4,4);
  }
  Update(){
    this.ExecuteAI();
    this.frame++;
  }
}
