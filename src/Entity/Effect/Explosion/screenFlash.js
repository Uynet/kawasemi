import EFFECT from '../effect.js';
import Art from '../../../art.js';
import EntityManager from '../../../Stage/entityManager.js';
import Pool from '../../../Stage/pool.js';

//閃光
export default class ScreenFlash extends EFFECT{
  constructor(pos){
    super(pos,VEC0());
    this.Init(pos);
  }
  Init(pos){
    this.pos = pos;
    /*基本情報*/
    this.frame = 0;
    this.name = "flash"
      this.layer = "FOREENTITY";
    /*スプライト*/
    this.pattern = Art.bulletPattern.screenFlash;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
  }

  Update(){
    this.sprite.scale.x = (4-this.frame)*4;
    this.sprite.scale.y = this.frame*2;
    this.sprite.texture = this.pattern[this.spid];
    this.spid = (this.spid+1)%2 ;
    //this.pos = add(this.pos,Rand2D(20));
    if(this.frame == 4){
      EntityManager.removeEntity(this);
    }
    this.sprite.position = this.pos;
    this.pos.x += 16;
    this.frame++;
  }
}
