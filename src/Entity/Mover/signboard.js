import Entity from '../entity.js';
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Input from '../../input.js';
import EventManager from '../../Event/eventmanager.js';
import MessageEvent from '../../Event/messageEvent.js';
import Game from '../../game.js';
import BackEntity from '../backEntity.js';
import UIManager from '../../UI/uiManager.js';
import Signpop from '../Effect/signpop.js';
import QuakeEvent from '../../Event/quakeEvent.js';


export default class Signboard extends BackEntity{
  constructor(pos,message){
    super(pos,Art.wallPattern.signboard);
    /*基本情報*/
    this.layer= "BACK";
    this.name = "signboard";
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
    this.tex = Art.wallPattern.signboard;//テクスチャ
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = pos;
    //pop
    let p = CPV(this.pos);
    p.y -= 16;
    this.popup = new Signpop(p);
    EntityManager.addEntity(this.popup);
  }
  Read(){
    if(!this.isRead){
      this.isRead = true;
      let event = new MessageEvent(this.message[this.page],"POP");
      EventManager.eventList.push(event);
      this.page++;
    }else{
      /*イベント発生用メッセージ*/
      //イベントを発生させてページを読み進める
      //最初のイベントせんよう
      if(this.message[this.page] == "EVENT"){;
        let event = new MessageEvent(this.message[this.page],"EVENT");
        EventManager.eventList.push(event);
        //クソポイント
        //ここでメッセージを変更するな
        this.message = ["..."];
        this.page++;
      }
      if(this.page < this.message.length){
        let event = new MessageEvent(this.message[this.page],"PAGE");
        EventManager.eventList.push(event);
        this.page++;
        //続きがあれば読む
        }else{
          //なければ終了
          Game.scene.PopSubState();
          UIManager.CloseMessage();//枠を閉じる
          this.isRead = false;
          this.isNear = false;
          this.page = 0;
          this.popup;
        }
    }
  }

  Update(){
    //メッセージ文が"EVENT"ならばイベントを発生させる
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
