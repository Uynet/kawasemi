import Entity from '../entity.js';
import Bright from "../Effect/bright.js";
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Input from '../../input.js';
import EventManager from '../../Event/eventmanager.js';
import Game from '../../game.js';
import BackEntity from '../backEntity.js';
import UIManager from '../../UI/uiManager.js';
import Signpop from '../Effect/signpop.js';
import QuakeEvent from '../../Event/quakeEvent.js';


export default class Signboard extends BackEntity{
  constructor(pos,message,name){
    super(pos,Art.wallPattern.signboard);
    /*基本情報*/
    this.layer= "ENTITY";
    //なおせ
    this.name = name;
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
    if(name == "signboard") this.tex = Art.wallPattern.signboard;//テクスチャ
    if(name == "shop") this.tex = Art.wallPattern.shop;//テクスチャ
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = pos;
    //pop
    let p = copy(this.pos);
    p.y -= 16;
    this.popup = new Signpop(p);
    EntityManager.addEntity(this.popup);
  }

  Read(){
    this.isRead = true;
    Game.scene.PushSubState("MES");
    UIManager.PopMessage(this);
  }

  Update(){
    //page : 現在のページ番号
    let player = EntityManager.player;
    if(!this.isRead && this.name == "shop" && this.frame%8 == 0){
      let trail = new Bright(add(this.pos,Rand2D(16)),Rand2D(0.5));
      EntityManager.addEntity(trail);
    }
    if(DIST(player.pos,this.pos) <  16 && player.isAlive){
      player.isCanRead = true;
      if(!this.isRead && Input.isKeyClick(KEY.X)){
        //UI側にMESSAGEを生成し、以降の入力はそちらで処理
        this.Read();
      }
    }
    this.frame++;
  }
}
