import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Drawer from '../../drawer.js';

//武器チェンジ時のアイコンのポップ
export default class WeaponIcon extends EFFECT{
  constructor(pos,name){
    super(pos,VEC0());
    /*基本情報*/
    /*スプライト*/
    this.spid = name;
    this.layer = "FOREENTITY";
    this.pattern = Art.UIPattern.bullet.pop;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.offSetY = 12;
  }
  Update(){
    this.offSetY*= 0.3;
    this.pos = CPV(EntityManager.player.pos);
    this.pos.y -= 12;
    this.pos.y -= this.offSetY;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
    if(this.frame>30 || this.spid != EntityManager.player.weapon.name)this.Delete();
    this.frame++;
  }
}
