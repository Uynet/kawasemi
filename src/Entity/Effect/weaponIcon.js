import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Drawer from '../../drawer.js';

//武器チェンジ時のアイコンのポップ
export default class WeaponIcon extends EFFECT{
  constructor(pos,name){
    super(pos,vec0());
    /*基本情報*/
    /*スプライト*/
    this.spid = name;
    this.layer = "FOREENTITY";
    this.pattern = Art.UIPattern.bullet.pop;
    this.BasicEffectInit()
    this.offSetY = 12;
  }
  Update(){
    this.ExecuteAI();
    this.offSetY*= 0.3;
    this.pos = copy(EntityManager.player.pos);
    this.pos.y -= 12;
    this.pos.y -= this.offSetY;
    this.sprite.texture = this.pattern[this.spid];
    if(this.frame>30 || this.spid != EntityManager.player.weapon.name)this.Delete();
  }
}
