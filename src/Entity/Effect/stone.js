import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Pool from '../../Stage/pool.js';

//火花?
export default class Stone extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
  }
  Init(pos,vel){
    //constructor
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.name = "stone";
    this.frame = 0;
    this.isNext = false;
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.explosion.stone;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.alpha = 1;
    this.sprite.scale.set(1);
    this.sprite.anchor.set(0.5);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Update(){
    this.vel = MLV(this.vel,VECN(0.9)); //減速
    this.pos.y += 0.3;//重力
    //this.pos = Util.advec(this.pos,this.vel);
    this.sprite.position = this.pos;
    this.sprite.alpha -= 0.02;
    //再帰
    if(this.sprite.alpha > 0 && this.isNext){
      //生成は最初の一回のみ
      this.isNext = false;
      this.sprite.scale = MLV(this.sprite.scale,VECN(0.8));
      let p = ADV(this.pos,this.vel);
      let stone = Pool.GetStone(p,this.vel);
      //次の石 : 小さく薄く
      if(stone){
        stone.sprite.scale = this.sprite.scale;
        stone.sprite.alpha = this.sprite.alpha;
        EntityManager.addEntity(stone);
      }
    }
    if(this.frame == 1)this.isNext = true;
    //持続時間
    if(this.frame > 3){
      Pool.Remove(this);
    }
    this.frame++;
  }
}
