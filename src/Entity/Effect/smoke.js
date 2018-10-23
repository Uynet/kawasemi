import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Pool from '../../Stage/pool.js';
import Collision from "../../Collision/collision.js";
import Collider from '../../Collision/collider.js';
import Box from '../../Collision/box.js';

export default class Smoke extends EFFECT{
  constructor(pos,vel,size){
    super(pos,vel);
  }
  Init(pos,vel,size){
    /*基本情報*/
    this.pos = pos;
    this.vel = vel;
    this.name = "smoke";
    this.frame = 0;
    this.size = size;//煙の大きさ 浮力にも関わってくる
    this.collider = new Collider(SHAPE.BOX,new Box(pos,32,32));//衝突判定の形状
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.explosion.smoke;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.alpha = 0.6;
    this.sprite.position = this.pos;
    this.sprite.scale.set(0.0);
    this.sprite.anchor.set(0.5);
    this.e = 0.4;
    this.sprite.blendMode = PIXI.BLEND_MODES.DARKEN;

  }

  Update(){
    let b = 10;
    this.pos = ADV(this.pos,this.vel);
    this.vel.x *= 0.91;
    this.vel.y *= 0.91;
    let d = this.size - this.sprite.scale.x;
    this.sprite.scale.x += d * 0.1;
    this.sprite.scale.y += d * 0.1;
    //this.sprite.rotation += Math.PI/32
    let l = this.spid*8+10;
    if(this.frame%20 == 19)this.sprite.alpha -= 0.1;
    if(this.frame%l == l-1)this.spid++;
    if(this.frame == 400 || this.spid >= 8){
      this.spid = 0;
      Pool.Remove(this);
    }
    this.sprite.position = this.pos;

    this.sprite.texture = this.pattern[this.spid];
    this.frame++;
  }
}
