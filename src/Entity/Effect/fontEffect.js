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
    super(copy(pos),v);
    /*基本情報*/
    this.fonttype = fonttype;
    this.name = "FontEffect";
    this.isAlive = true;//消えたらfalse
    this.isMultiple = true;//このEntityは複数スプライトを持つか
    /*スプライト*/
    this.str = str; //0~9
    this.container = new PIXI.Container();
    this.strLength = this.str.length;//桁数
    for(let i = 0;i<this.strLength;i++){
      let spid = this.str[i] + "";//str型にすること
      let texture;
      switch(this.fonttype){
        case "player" : texture = Art.font[spid + "r"]; break;
        case "enemy" : texture = Art.font[spid]; break;
        default : console.warn(this.fonttype); 
      }
      let sp =  Art.CreateSprite(texture) ;
      sp.position = {x:this.pos.x + i*6,y:this.pos.y};
      this.container.addChild(sp);
    }
    this.gravity = 0.2;
  }


  Update(){
    //phys
    this.pos = add(this.pos,this.vel);
    this.vel.y += this.gravity;
    for(let i = 0;i<this.strLength;i++){
      //ここはあとで書き直す
      //というか別クラスにする
      if(this.fonttype == "pop"){
        cl("uno")
        this.container.children[i].position = {x:this.pos.x + i * 9,y:this.pos.y};
      }else{
        this.container.children[i].position = {x:this.pos.x + i * 6,y:this.pos.y};
      }
    }
    if(this.frame > 30) this.container.alpha -=0.05; 
    if(this.frame > 90) this.Delete();
    this.frame++;
  }
}
