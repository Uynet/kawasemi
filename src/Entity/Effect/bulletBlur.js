import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Util from '../../util.js';
import Drawer from '../../drawer.js';

/*bullet1残像*/
export default class BulletBlur extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.name = "blur";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
      /*スプライト*/
    this.spid = 0; //12~15
    this.pattern = Art.bulletPattern.blur;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
  }

  Update(){
    if(this.isAlive){
      this.sprite.alpha = 3 / (3 + this.frame);
      this.sprite.position.x = this.pos.x+8;
      this.sprite.position.y = this.pos.y+8;
      //pys
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
      this.sprite.texture = this.pattern[this.spid];
      this.spid = Math.floor(this.frame/2);
      if(this.spid >= 4){
        //消える時に一回だけ呼ばれる
        if(this.isAlive){
          this.spid = 4;
          
          EntityManager.removeEntity(this);
          this.isAlive = false
        }
      }
      this.sprite.position = this.pos;
      this.frame++;
    }
  }
}
