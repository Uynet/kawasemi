import Entity from './entity.js';
import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Circle from '../Collision/circle.js';
import Box from '../Collision/box.js';
import EntityManaer from '../Stage/entityManager.js';
import Util from '../util.js';
import Input from '../input.js';
import EventManager from '../Event/eventmanager.js';
import MessageEvent from '../Event/messageEvent.js';
import Game from '../Game.js';
import BackEntity from './backEntity.js';
import UIManager from '../UI/uiManager.js';


export default class Signboard extends BackEntity{
  constructor(pos,message){
    super(pos,Art.wallPattern.signboard);
    this.type = ENTITY.BACK;
    this.name = "signboard";
      /*
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
  }

  Update(){
    let player = EntityManaer.player;
    if(Util.distance(player.pos,this.pos) < 16 && player.isAlive){
      //キーを押すと読む
      //メッセージ文が"EVENT"ならばイベントを発生させる
      //page : 現在のページ番号
      if( Input.isKeyClick(KEY.SP)){
        if(!this.isRead){
          this.isRead = true;
          let event = new MessageEvent(this.message[this.page],"POP");
          EventManager.eventList.push(event);
          this.page++;
        }else{
          /*イベント発生用メッセージ*/
          //イベントを発生させてページを読み進める
          //テスト用イベント(死ぬ)
          if(this.message[this.page] == "EVENT"){;
            //第一引数いらんのでは?
            let event = new MessageEvent(this.message[this.page],"EVENT");
            EventManager.eventList.push(event);
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
            this.page = 0;
          }
        }
      }
    }
    // this.sprite.position = this.pos;
  }
}
