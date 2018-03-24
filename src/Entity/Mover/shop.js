import Entity from '../entity.js';
import Art from '../../art.js';
import Audio from '../../audio.js';
import Collider from '../../Collision/collider.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Input from '../../input.js';
import EventManager from '../../Event/eventmanager.js';
import QuakeEvent from '../../Event/quakeEvent.js';
import Param from '../../param.js';
import Game from '../../game.js';
import BackEntity from '../backEntity.js';
import UIManager from '../../UI/uiManager.js';
import Message from '../../UI/message.js';
import Signpop from '../Effect/signpop.js';
import StagePop from '../../UI/stagePop.js';
import Font from '../../UI/font.js';
import GaugeBullet from '../../UI/gaugeBullet.js';

export default class Shop extends BackEntity{
  constructor(pos,message){
    super(pos,0);
    /*基本情報*/
    this.layer= "BACK";
    this.name = "shop";
    this.isUpdater = true;
      /* 固有情報
       * message : 複数のページからなる文章
       * text : 1つのページの文章
       * sentense : 1行の文章
       * font : 1文字
       * */
       //オブジェクトを配列に変換?
    this.message = [];
    for(let l in message){
      this.message.push(message[l]);
    }
    this.page = 0;//現在のページ番号
    this.isRead = false;//会話中かどうか
    /*スプライト*/
    this.tex = Art.wallPattern.shop;//テクスチャ
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = pos;
    //pop
    let p = CPV(this.pos);
    p.y -= 16;
    this.popup = new Signpop(p);
    EntityManager.addEntity(this.popup);

  }
  Read(){
    this.isRead = !this.isRead;
    let weapon = this.message[0];
    if(this.isRead){
      Game.scene.PushSubState("MES");

      //this.messageの武器を手に入れる
      //もう持っていたら発生しない
      if(!Param.player.havingWeaponList[weapon]){
        let text = this.ToJap(weapon)+"をてにいれた\ncキーでチェンジできるよ↓"; 
        UIManager.PopMessage(text,"POP");
        //テスト
        Param.player.havingWeaponList[weapon] = true;
        UIManager.bullet.Push(weapon);
      }else{
        let text = "きりかえはc だよ↓"; 
        UIManager.PopMessage(text,"POP");
      }
    }
    else{
      Game.scene.PopSubState();
      UIManager.CloseMessage();//枠を閉じる

      let p = {
        x : 64,
        y : 96
      }
      UIManager.addUI(new StagePop(p,"-" + this.ToJap(weapon) +"をてにいれた "));//SCORE
    }
  }
  //武器名を日本語にするだけ
  ToJap(weapon){
    switch(weapon){
      case "missile" : return "ミサイル";
      case "laser" : return "レーザー";
      default : cl("po"); 
    }
  }

  Update(){
    //page : 現在のページ番号
    let player = EntityManager.player;
    if(DIST(player.pos,this.pos) <  16 && player.isAlive){
        player.isCanRead = true;
      if( Input.isKeyClick(KEY.X)){
        this.Read();
      }
    }
  }
}
