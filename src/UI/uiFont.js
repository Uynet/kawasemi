import Art from '../art.js';
import Drawer from '../drawer.js';
import UI from './ui.js';
import Input from '../input.js';
/*文字*/
export default class UIFont extends UI{
  //strは表示する文字(今は数字のみ)
  constructor(pos,str,fonttype){
    super({x:pos.x,y:pos.y});
    /*基本情報*/
    //HPとBulletでtypeを分ける必要がある
    
    this.type;
    this.space;
    if(fonttype == "HP"){
      this.type = UI_.HP;
      this.space = 7;
    }else if(fonttype == "BULLET"){
      this.type = UI_.BULLET;
      this.space = 7;
    }else if(fonttype == "MES"){
      this.type = "MES";
      this.space = 9;
    };

    this.name = "font";
    this.isAlive = true;//消えたらfalse
      /*スプライト*/
    this.str = str; //0~9
    this.sprite = [];//スプライトを配列で持っている
    this.d = this.str.length;//桁数
    for(let i = 0;i<this.d;i++){
      let spid = this.str[i] + "";//str型にすること
      let tex = Art.font[spid];
    this.sprite[i] = Art.SpriteFactory(tex);
    this.sprite[i].position = {x:this.pos.x + i*this.space,y:this.pos.y};
    };
  };

  UpdateFont(hp){
    //phys
    //文字列型にすること
    this.str = hp + "";
    //0埋め
    while(this.str.length <3){
      //スペースの代わりに欠番フォント(ゐ)を使っている←クソ
    this.str = "ゐ" + this.str;
    };
    //000は特殊
    if(this.str == "ゐゐ0")this.str = "ゐゐゐ";
    for(let i = 0;i<this.d;i++){
      let spid = this.str[i] + "";//str型にすること
      this.sprite[i].texture = Art.font[spid];
    };
  };

  Update(){
    /*nothing to do*/
  };
};
