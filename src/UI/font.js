import Art from '../art.js';
import Drawer from '../drawer.js';
import UI from './ui.js';
import Input from '../input.js';
/*文字*/
let small = [
  ",",".","!","l","i","j","っ","ぁ","ぃ","ぅ","ぇ","ぉ",
]
export default class Font extends UI{
  //strは表示する文字(今は数字のみ)
  constructor(pos,str,type){
    super(CPV(pos));
    /*基本情報*/
    this.type = type;
    this.name = "font";
    this.isAlive = true;//消えたらfalse
    this.isMultiple = true;
    this.frame = 0;//stagepopでしか使ってない
    /*スプライト*/
    this.str = str; //0~9
    this.container = new PIXI.Container();
    //0埋めをするかしないか
    switch(this.type){
      case "MENU" :
        this.layer = "FILTER";
      case "HP" :
      case "BULLET" :
      case "MES" :
        this.isPadding = true;
        this.d = this.str.length;//桁数
          break;
      case "SCORE" :
        this.isPadding = false;
        this.d = 5;//決め打ち
          break;
        defaut :
        console.warn(this.type);
    }
    this.SetPos(this.pos);
  };

  //HP,BULLETの表示用
  //HP,BULLETの中から呼ばれている
  SetFont(value){
    //phys
    //文字列型にすること
    this.str = value + "";
    //0埋め
    if(this.isPadding){
      if(this.str == "0")this.str = "ゐ";
      while(this.str.length < this.d){
        //スペースの代わりに欠番フォント(ゐ)を使っている←クソ
        this.str = "ゐ" + this.str;
      }
    }else if(!this.isPadding){
      while(this.str.length < this.d){
        //スペース(ゑ)
        this.str = " " + this.str;
      }
    }
    for(let i = 0;i<this.d;i++){
      let spid = this.str[i] + "";//str型にすること
        this.container.children[i].texture = Art.font[spid];
    };
  };
  Move(pos){
    /*TODO コンテナ*/
    for(let i=0;i<this.container.children.length;i++){
      this.container.children[i].position = pos;
      this.container.children[i].position.x += 10 * i;
    }
  }

  PushText(str){
    let spid = str + "";//str型にすること
    let tex = Art.font[spid];
    let sprite = new PIXI.Sprite(tex);
    let pos = CPV(this.pos);
    pos.x += this.d * 9;
    sprite.position = pos;
    this.container.addChild(sprite);
    this.d++;
  }
  ChangeText(text,pos){
    this.container.children = [];
    this.str = text; //0~9
    this.d = this.str.length;//桁数
    this.SetPos(CPV(pos));
  }

  SetPos(pos){
    let space;
    let sprite;
    let tex;
    for(let i = 0;i<this.d;i++){
      let spid = this.str[i] + "";//str型にすること
      tex = Art.font[spid];
      //文字コードを比較している
      //日本語以降は半角として識別
      let s = this.str[i];
      if(s > "z"){
        space = 9;
      }else if( small.indexOf(s) >= 0 ) {
        space = 4;
      } else{
        space = 7;
      }
      sprite = new PIXI.Sprite(tex);
      sprite.position = pos;
      this.container.addChild(sprite);
      pos.x += space;
    };
  }

  //各UIの内部から呼ぶ必要がある
  Update(){
    this.frame++;
  };
};
