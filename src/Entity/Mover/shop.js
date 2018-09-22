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
import BrightCoin from "../Effect/brightCoin.js";

export default class Shop extends BackEntity{
  constructor(pos,message){
    super(pos,0);
    /*基本情報*/
    this.layer= "ENTITY";
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
    let weaponName = this.message[0];
    if(this.isRead){
      Game.scene.PushSubState("MES");

      //this.messageの武器を手に入れる
      //もう持っていたら発生しない
      if(!Param.player.havingWeaponList[weaponName]){
        let text = this.ToJap(weaponName)+"をてにいれた\ncキーでチェンジできるよ↓"; 
        UIManager.PopMessage(text,"POP");
        //テスト
        Param.player.havingWeaponList[weaponName] = true;
        UIManager.bullet.Push(weaponName);
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
      UIManager.addUI(new StagePop(p,"-" + this.ToJap(weaponName) +"をてにいれた "));//SCORE
    }
  }
  //武器名を日本語にするだけ
  ToJap(weaponName){
    switch(weaponName){
      case "missile" : return "ミサイル";
      case "laser" : return "レーザー";
      case "weapon4" : return "weapon4";
      case "weapon5" : return "weapon5";
      default : console.warn("Error ToJapWeaponName");
    }
  }

  Update(){
    //page : 現在のページ番号
    let player = EntityManager.player;
    if(this.frame%8 == 0){
      let trail = new BrightCoin(ADV(this.pos,Rand2D(16)),Rand2D(0.5));
      EntityManager.addEntity(trail);
    }
    if(DIST(player.pos,this.pos) <  16 && player.isAlive){
        player.isCanRead = true;
      if( Input.isKeyClick(KEY.X)){
        this.Read();
      }
    }
    this.frame++;
  }
}
