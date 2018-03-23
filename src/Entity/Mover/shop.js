import Entity from '../entity.js';
import Art from '../../art.js';
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
    if(this.isRead){
      Game.scene.PushSubState("MES");
      let p = {
        x : 80,
        y : 136,
      }
      let P_MES = {
        x:64,
        y:128
      }
      let text = "ミサイルを 100G でかう?"; 
      UIManager.PopMessage(text,"SELECT");
      //テスト
      Param.player.havingWeaponList.laser = true;
    }
    else{
      Game.scene.PopSubState();
      UIManager.CloseMessage();//枠を閉じる
    }
  }

  Update(){
    //page : 現在のページ番号
    let player = EntityManager.player;
    if(DIST(player.pos,this.pos) <  16 && player.isAlive){
        player.isCanRead = true;
      if( Input.isKeyClick(KEY.DOWN)){
        this.Read();
      }
    }
  }
}
