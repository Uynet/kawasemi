import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Drawer from '../../drawer.js';
import Box from '../../Collision/box.js';
/*文字*/
export default class FontEffect extends EFFECT{
  //strは表示する文字(今は数字のみ)
  constructor(pos,str,fonttype){
    let v = {
      x:Rand(1.5),
      y:-2
    }
    super(CPV(pos),v);
    /*基本情報*/
    this.fonttype = fonttype;
    this.name = "FontEffect";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
    this.e = 0.0;
    this.isMultiple = true;//このEntityは複数スプライトを持つか
    /*スプライト*/
    this.str = str; //0~9
    this.container = new PIXI.Container();
    this.d = this.str.length;//桁数
    //this.collider = new Collider(SHAPE.BOX,new Box(pos,8,8));//衝突判定の形状
    for(let i = 0;i<this.d;i++){
      let spid = this.str[i] + "";//str型にすること
      let tex;
      switch(this.fonttype){
        case "player" : tex = Art.font[spid + "r"]; break;
        case "enemy" : tex = Art.font[spid]; break;
        case "pop" : tex = Art.font[spid]; break;
      }
      let sp =  Art.SpriteFactory(tex) ;
      sp.position = {x:this.pos.x + i*6,y:this.pos.y};
      this.container.addChild(sp);
    }
    this.gravity = 0.2;
  }


  Update(){
    //phys
    this.pos = ADV(this.pos,this.vel);
    this.vel.y += this.gravity;
    for(let i = 0;i<this.d;i++){
      //ここはあとで書き直す
      //というか別クラスにする
      if(this.fonttype == "pop"){
        this.container.children[i].position = {x:this.pos.x + i * 9,y:this.pos.y};
      }else{
        this.container.children[i].position = {x:this.pos.x + i * 6,y:this.pos.y};
      }
    }
    for(let i = 0;i<this.d;i++){
      if(this.frame > 30){
        this.container.children[i].alpha -=0.05; 
      }
    }
    if(this.frame > 90){
      EntityManager.removeEntity(this);
    }
    this.frame++;
  }
}
