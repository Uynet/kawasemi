import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Drawer from '../../drawer.js';

export default class Lasersight extends EFFECT{
  constructor(pos,arg){
    super(pos,vec0());
    /*基本情報*/
    this.name = "lasersight";
    this.layer = "BACK";
    this.arg = arg;
    /*スプライト*/
    this.pattern = Art.bulletPattern.lasersight;
    this.BasicEffectInit();
    this.sprite.anchor.set(0.5);
    this.sprite.scale.x = 1;
    this.sprite.aplha = 0.05;
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }
  Rotate(player,weapon){
    this.arg = player.arg;
    this.pos = copy(add(player.spilit.pos,fromPolar(player.arg,8)));
    if(weapon.isTargetOn){
      let LaserLength = DIST(weapon.target.enemy.pos,player.spilit.pos);
      let offset = Math.tan(Math.abs(player.arg - player.toArg))*LaserLength;
      if(weapon.target.size/2 > offset) this.sprite.scale.x = LaserLength/16-0.5;
    }else this.sprite.scale.x = 16;
  }
  Update(){
    this.sprite.position = add(this.pos,vec2(8));
    this.sprite.position.x -= 4;
    this.sprite.position = add(this.sprite.position,fromPolar(this.arg,8*this.sprite.scale.x));
    this.sprite.rotation = this.arg;
  }
}
