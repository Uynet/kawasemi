import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Util from '../../util.js';
import Drawer from '../../drawer.js';
import Collision from '../../Collision/collision.js';
import Collider from '../../Collision/collider.js';
import Box from '../../Collision/box.js';
/*文字*/
export default class FontEffect extends EFFECT{
  //strは表示する文字(今は数字のみ)
  constructor(pos,str,fonttype){
    let v = {
      x:1.5 * (Math.random()-0.5),
      y:-2
    }
    super(CPV(pos),v);
    /*基本情報*/
    this.fonttype = fonttype;
    this.type = ENTITY.EFFECT;
    this.name = "FontEffect";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
    this.e = 0.0;
    /*スプライト*/
    this.str = str; //0~9
    this.sprite = [];//スプライトを配列で持っている
    this.d = this.str.length;//桁数
    this.collider = new Collider(SHAPE.BOX,new Box(pos,8,8));//衝突判定の形状
    for(let i = 0;i<this.d;i++){
      let spid = this.str[i] + "";//str型にすること
      let tex;
      switch(this.fonttype){
        case "player" : tex = Art.font[spid + "r"];
          break;
        case "enemy" : tex = Art.font[spid];
          break;
        case "pop" : tex = Art.font[spid];
      }
      this.sprite[i] = Art.SpriteFactory(tex);
      this.sprite[i].position = {x:this.pos.x + i*6,y:this.pos.y};
    }
    this.gravity = 0.2;
  }

  Collision(){
    //壁とのみ行う 正直無くても良い
    for(let l of EntityManager.wallList){
      let c = Collision.on(this,l);
      if(c.isHit){
        /*速度*/
        /*押し出し*/
        Collision.Resolve(this,l);
        /*note : now isHit == false*/
      }
    }
  }

  Update(){
    this.Collision();
    //phys
    this.pos = ADV(this.pos,this.vel);
    this.vel.y += this.gravity;
    for(let i = 0;i<this.d;i++){
      //ここはあとで書き直す
      //というか別クラスにする
      if(this.fonttype == "pop"){
        this.sprite[i].position = {x:this.pos.x + i * 9,y:this.pos.y};
      }else{
        this.sprite[i].position = {x:this.pos.x + i * 6,y:this.pos.y};
      }
    }
    for(let i = 0;i<this.d;i++){
      if(this.frame > 30){
        this.sprite[i].alpha -=0.05; 
      }
    }
    if(this.frame > 90){
      EntityManager.removeEntity(this);
    }
    this.frame++;
  }
}
