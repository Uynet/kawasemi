import Drawer from '../drawer.js';
import UI from './ui.js';
import Input from '../input.js';
import Timer from '../timer.js';
import WeaponIcon from './WeaponIcon.js';
import WeaponEquip from './WeaponEquip.js';
import HP from './HP.js';
import Bullet from './Bullet.js';
import Font from './Font.js';
import Message from './Message.js';

import EntityManager from '../Stage/entityManager.js';

const WEQ = {
  x : 8, 
  y : 160, 
};
//HP outer
const HPF = {
  x : 24, 
  y : 160
};
//HP bar
const HPB = {
  x : HPF.x, 
  y : HPF.y, 
};
//HP font 
const HPFont = {
  x : HPF.x+22, 
  y : HPF.y+4, 
};
//HP Icon
const HPIC = {
  x : HPF.x-16, 
  y : HPF.y, 
};
//bullet outer
const BulF = {
  x : HPF.x, 
  y : HPF.y+16, 
};
//bullet bar
const BulB = {
  x : BulF.x, 
  y : BulF.y, 
};
//Bullet font 
const BulFont = {
  x : BulF.x+22, 
  y : BulF.y+4, 
};
//Bullet icon 
const BulIC = {
  x : BulF.x-16, 
  y : BulF.y, 
};
//score font
const SCORE = {
  x : 224,
  y : BulF.y, 
}
//message
const MES_outer = {
  x:40,
  y:35
}
//
const MES_TEXT = {
  x:MES_outer.x +8,
  y:MES_outer.y +8
}
/*UIクラス*/
export default class UIManager{
  static Init(){
    this.UIList = [];//UI全部のリスト
    this.WeaponIconList = [];//武器アイコンのリスト
    //this.weaponEquip;
    this.HP = {
      bar : undefined,
      outer : undefined,
      font : undefined,
      icon : undefined
    };
    this.bullet = {
      bar : undefined,
      outer : undefined,
      font : undefined,
      icon : undefined
    };
    this.score = {
      font : undefined
    };
    this.message = {
      outer : undefined,
      text : undefined,
      sentence : []
    };
  }

  /*タイトルでのUI配置に変更*/
  static SetTitle(){
    this.PopMessage("タイトルがめん","POP");
    this.Clean();
  }
  //UIをすべて削除
  static Clean(){
    while(this.UIList.length>0){
      this.removeUI(this.UIList[0]);
    }
  }
  /*ステージ中でのUI配置に変更*/
  static SetStage(){
    /*装備中の武器*/
    //UIManager.addUI(new UIWeaponEquip(WEQ,"po"));//武器1のメインアイコン(?)
    /*HP*/
    //UIManager.addUI(new HP(HPF));//

    UIManager.addUI(new HP(HPF,"outer"));//外枠
    UIManager.addUI(new HP(HPB,"bar"));//中
    UIManager.addUI(new Font(HPFont,"100","HP"));//数字
    UIManager.addUI(new HP(HPIC,"icon"));//
    /*bullet*/
    UIManager.addUI(new Bullet(BulF,"outer"));//外枠
    UIManager.addUI(new Bullet(BulB,"bar"));//中
    UIManager.addUI(new Font(BulFont,"100","BULLET"));//数字
    UIManager.addUI(new Bullet(BulIC,"icon"));//
    /*score*/
    UIManager.addUI(new Font(SCORE,"0","SCORE"));//数字
  }
  //メッセージイベント
  /* text : 入力文字列
   * sentence : textを改行文字で区切った配列
   */
  static PopMessage(text,type){
    /*type : 
     * POP 新しくフレームを作る
     * PAGE フレームを作らず改ページのみ
     */
    if(type == "POP"){
      UIManager.addUI(new Message(MES_outer,"outer"));//枠
      //文字の長さに応じて枠を調整
      this.message.outer.sprite.scale.x *= 1.5;
      this.message.outer.sprite.scale.y *= 1.5; //yは固定
    }else if(type == "PAGE"){
      //改ページするために文字だけを消す
      for(let i=0;i<this.message.sentence.length;i++){
        UIManager.removeUI(this.message.sentence[i]);
      }
    }else{
      console.warn("messageEvent");
    }
    let p = CPV(MES_TEXT);
    // sentenceには改行されたテキストの配列が入る
    let sentence = text.split("\n");
    for(let i = 0;i<sentence.length;i++){
      p.y = MES_TEXT.y + i*10;
      UIManager.addUI(new Font(p,sentence[i],"MES"));//テキスト 
    }
  }
  static CloseMessage(){
    for(let i=0;i<this.message.sentence.length;i++){
      UIManager.removeUI(this.message.sentence[i]);
    }
    UIManager.removeUI(this.message.outer);
  }

  /*WeaponIconのポップアップ*/
  /*
   static OpenWeapon(){
   let p = {
   x:16,
   y:16
   }
   UIManager.addUI(new WeaponIcon(p,"1"));//武器1のサブアイコン
   UIManager.addUI(new WeaponIcon(p,"2"));//武器2のサブアイコン
   UIManager.addUI(new WeaponIcon(p,"3"));//武器3のサブアイコン
   }
   //ポップアップの逆(?)
   static CloseWeapon(){
   for(let l of this.WeaponIconList){
   UIManager.removeUI(l);//武器1のサブアイコン
   }
   }
   */

  //UIをリストに登録
  static addUI(ui){
    this.UIList.push(ui); 
    switch (ui.type){
      //weapon icon
      case "WICON" : 
        this.WeaponIconList.push(ui);
        break;
        //equip
        /*
         case "WEQUIP" : 
         this.weaponEquip = ui;
         break;
         */
        //HPゲージ
      case "HP" :
        //this.HP = ui;
        switch(ui.name){
          case "bar": this.HP.bar = ui; break;
          case "outer" : this.HP.outer = ui;break;
          case "font" : this.HP.font = ui;break;
          case "icon" : this.HP.icon = ui;break;
        }
        break;
        //Bulletゲージ
      case "BULLET" :
        switch(ui.name){
          case "bar" : this.bullet.bar = ui;break;
          case "outer" : this.bullet.outer = ui;break;
          case "font" : this.bullet.font = ui;break;
          case "icon" : this.bullet.icon = ui;break;
        }
        break;
        //スコア表示
      case "SCORE" :
        this.score.font = ui;break;
        //メッセージ
      case "MES" : 
        switch(ui.name){
          case "font" : this.message.sentence.push(ui);break;
          case "outer": this.message.outer = ui;break;
        }
        break;
      default :
        console.warn(ui);
    }
    //スプライトの追加
    if(ui.isMultiple){
      //複スプライト
      for(let i = 0;i<ui.sprite.length;i++){
        Drawer.addContainer(ui.sprite[i],"UI");
      }
    }else{
      //単スプライト
      Drawer.addContainer(ui.sprite,"UI");
    }
  }
  /*UIをリストから削除*/
  //参照の開放をする
  static removeUI(ui){
    let i = this.UIList.indexOf(ui);
    this.UIList.splice(i,1);
    if(ui.isMultiple){
      //複数スプライトを持つオブジェクト
      for(let i = 0;i<ui.sprite.length;i++){
        Drawer.removeContainer(ui.sprite[i],"UI");
      }
    }else{
      //単スプライト
      Drawer.removeContainer(ui.sprite,"UI");
    }
  }
  /*UIの更新*/
  static Update(){
    for(let l of UIManager.UIList){
      l.Update();
    }
  }
}
