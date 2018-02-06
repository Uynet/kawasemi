import Enemy from './enemy.js';
import EFFECT from './effect.js';
import Art from '../art.js';
import EntityManager from '../Stage/entityManager.js';
import Util from '../util.js';
import Drawer from '../drawer.js';

/*bullet1残像*/
export default class BulletBlur extends EFFECT{
  constructor(pos){
    super(pos,{x:0,y:0});
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.name = "blur";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
      /*スプライト*/
      this.spid = 12; //12~15
    this.tex = Art.bulletPattern[this.spid];
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = this.pos;
  }

  Update(){
    if(this.isAlive){
      this.sprite.texture = Art.bulletPattern[this.spid];
      this.spid = 12 + Math.floor(this.frame/2);
      if(this.spid >= 16){
        //消える時に一回だけ呼ばれる
        if(this.isAlive){
          this.spid = 15;
          
          EntityManager.removeEntity(this);
          this.isAlive = false
        }
      }
      this.frame++;
    }
  }
}
