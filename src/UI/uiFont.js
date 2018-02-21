import Art from '../art.js';
import Drawer from '../drawer.js';
import UI from './ui.js';
import Input from '../input.js';
/*文字*/
export default class UIFont extends UI{
  //strは表示する文字(今は数字のみ)
  constructor(pos,str,type){
    super(CPV(pos));
    /*基本情報*/
    //HPとBulletでtypeを分ける必要がある
    this.type = type;
    this.name = "font";
    this.isAlive = true;//消えたらfalse
      /*スプライト*/
    this.str = str; //0~9
    this.sprite = [];//スプライトを配列で持っている
    this.d = this.str.length;//桁数
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
      let p = this.pos;
      this.sprite[i] = Art.SpriteFactory(tex);
      this.sprite[i].position = p;
      p.x += space;
    };
  };

  //HP,BULLETの表示用
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
