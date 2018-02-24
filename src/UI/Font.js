import Art from '../art.js';
import Drawer from '../drawer.js';
import UI from './ui.js';
import Input from '../input.js';
/*文字*/
export default class Font extends UI{
  //strは表示する文字(今は数字のみ)
  constructor(pos,str,type){
    super(CPV(pos));
    /*基本情報*/
    this.type = type;
    this.name = "font";
    this.isAlive = true;//消えたらfalse
      this.isMultiple = true;
    /*スプライト*/
    this.str = str; //0~9
      this.sprites = [];//スプライトを配列で持っている
    //0埋めをするかしないか
    switch(this.type){
      case "HP" :
      case "BULLET" :
      case "MES" :
      case "MENU" :
        this.isPadding = true;
        this.d = this.str.length;//桁数
          break;
      case "SCORE" :
        this.isPadding = false;
        this.d = 6;//決め打ち
          break;
        defaut :
        console.warn(this.type);
    }
    this.SetPos(this.pos);
  };

  //HP,BULLETの表示用
  //HP,BULLETの中から呼ばれている
  UpdateFont(hp){
    //phys
    //文字列型にすること
    this.str = hp + "";
    //0埋め
    if(this.isPadding){
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
    //000は特殊
    if(this.str == "ゐゐ0")this.str = "ゐゐゐ";
    for(let i = 0;i<this.d;i++){
      let spid = this.str[i] + "";//str型にすること
        this.sprites[i].texture = Art.font[spid];
    };
  };
  Move(pos){
    /*TODO コンテナ*/
    for(let i=0;i<4;i++){
      this.sprites[0].position = pos;
    }
  }

  SetPos(pos){
    let space;
    for(let i = 0;i<this.d;i++){
      let spid = this.str[i] + "";//str型にすること
        let tex = Art.font[spid];
      //文字コードを比較している
      //日本語以降は半角として識別
      let s = this.str[i];
      if(s > "z"){
        space = 9;
      }else if(
        s == "!" ||
          s == "l" ||
            s == "i" ||
              s == "j"||
                s == "."
      ){
        space = 4;
      } else{
        space = 7;
      }
      this.sprites[i] = Art.SpriteFactory(tex);
      this.sprites[i].position = pos;
      pos.x += space;
    };
  }

  //UIManagerから直接呼ばれているのはScoreのみ(それも廃止予定
  //各UIの内部から呼ぶ必要がある
  Update(){
  };
};
