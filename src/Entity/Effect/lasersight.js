import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Drawer from '../../drawer.js';

export default class Lasersight extends EFFECT{
  constructor(pos,arg){
    super(pos,VEC0());
    /*基本情報*/
    this.name = "lasersight";
    this.layer = "BACK";
    this.arg = arg;
    /*スプライト*/
    this.spid = 0; //12~15
    this.frame = 0;
    this.pattern = Art.bulletPattern.lasersight;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.x = 1;
    this.sprite.aplha = 0.1;
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }
  Delete(){
    EntityManager.removeEntity(this);
  }
  Rotate(player,weapon){
    this.arg = player.arg;
    this.pos = CPV(ADV(player.pos,POV(player.arg,8)));
    if(weapon.isTargetOn && Math.abs(player.arg - player.toArg < 5)){
      this.sprite.scale.x = DIST(weapon.target.enemy.pos,player.pos)/16 -0.5;
    }else this.sprite.scale.x = 16;
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    this.spid = 0;
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.position.x -= 4;
    this.sprite.position = ADV(this.sprite.position,POV(this.arg,8*this.sprite.scale.x));
    this.sprite.rotation = this.arg;
  }
}
