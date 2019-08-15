import Art from '../art.js';
import UI from './ui.js';
/*文字*/
const small = [
  ",",".","!","l","i","j","っ","ぁ","ぃ","ぅ","ぇ","ぉ",
]
export default class Font extends UI{
  //strは表示する文字(今は数字のみ)
  constructor(pos,str,type){
    super(pos);   
    /*基本情報*/
    this.type = type;
    this.name = "font";
    this.isAlive = true;//消えたらfalse
    this.frame = 0;//stagepopでしか使ってない
    /*スプライト*/
    this.str = str; //0~9
    this.sprite = new PIXI.Container();
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
    this.Carning();
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
        this.sprite.children[i].texture = Art.font[spid];
    };
  };
  Move(pos){
    /*
    */
    cl(this.pos)
    cl(pos)
    /*TODO コンテナ*/
      this.pos = copy(pos);
    for(let i=0;i<this.sprite.children.length;i++){
     // this.sprite.position.x = pos.x;
     // this.sprite.position.y = pos.y;
     // this.sprite.children[i].position = pos;
     // this.sprite.children[i].position.x += 10 * i;
    }
  }

  PushText(str){
    let spid = str + "";//str型にすること
    let tex = Art.font[spid];
    let sprite = new PIXI.Sprite(tex);
    let pos = copy(this.pos);
    pos.x += this.d * 9;
    sprite.position = pos;
    this.sprite.addChild(sprite);
    this.d++;
  }
  ChangeText(text){
    this.sprite.children = [];
    this.sprite.removeChild();
    this.str = text;
    this.d = this.str.length;
    this.pos = vec2(0); //フォント関係でバグったら多分ここが原因
    this.Carning();
  }

  SetPos(pos){
    this.pos = copy(pos);
    this.sprite.position.x = pos.x;
    this.sprite.position.y = pos.y;
  }
  //文字の幅を揃える
  Carning(){
    let space;
    let sprite;
    let tex;
    let pos = copy(this.pos); 
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
      this.sprite.addChild(sprite);
      pos.x += space;
    };
  }
  Update(){
    this.frame++;
  };
};
