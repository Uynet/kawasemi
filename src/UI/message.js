import UI from "./ui.js";
import UIManager from "./uiManager.js";
import StagePop from "./stagePop.js";
import Audio from "../audio.js";
import Art from "../art.js";
import Param from "../param.js";
import Input from "../input.js";
import Font from "./font.js";
import Game from "../game.js";
import MessageEvent from "../Event/messageEvent.js";
import EventManager from "../Event/eventmanager.js";

const P_TEXT = {
  x: 16,
  y: 24
};
const COLUMN = 10; //行間

export default class Message extends UI {
  constructor(pos, signboard) {
    super(pos);
    /*基本情報*/
    this.signboard = signboard;
    this.message = signboard.message;
    this.frame = 0;

    /*child*/
    this.type = "MES";
    this.outer = {
      sprite: Art.CreateSprite(Art.UIPattern.message.frame)
    };
    //文字の長さに応じて枠を調整
    this.outer.sprite.scale.x *= 2.6;
    this.outer.sprite.scale.y *= 2.5; //yは固定
    /*スプライト*/
    this.isMultiple = true;
    //枠スプライト追加
    let p = copy(pos);
    this.outer.sprite.position = p;
    this.sprite = new PIXI.Container();
    this.sprite.addChild(this.outer.sprite);
    p = add(p, P_TEXT);

    this.OpeningSelection = false;
    this.isRead = true;
    this.page = 0;
    //テキスト
    /*
     */
  }
  ReadNextPage(text) {
    Audio.PlaySE("changeWeapon");
    this.ClearMessage();
    this.EmitEvent();
    if (this.isRead) this.RenderText();
    this.page++;
  }
  ClearMessage() {
    //改ページするために文字だけを消す
    let mes = this.message[this.page];
    let sentence = mes.split("\n");
    for (let i = 0; i < sentence.length; i++) {
      UIManager.remove(sentence[i]);
    }
    //これをすると先頭以外の要素が消える
    //つまり枠スプライトを残し他の文字を消す
    this.sprite.children.length = 1; //は？
  }
  //テキストを表示する
  RenderText() {
    let mes = this.message[this.page];
    let sent = mes.split("\n");
    let sentenceSprite = [];
    this.isRead = true;

    let p = copy(this.pos);
    p = add(p, P_TEXT);
    for (let i = 0; i < sent.length; i++) {
      let f = new Font(p, sent[i], "MES");
      f.sprite.scale.x = 1;
      f.sprite.scale.y = 1;
      sentenceSprite.push(f); //テキスト
      p.y += COLUMN;
    }
    //各行各文字のスプライトを追加
    for (let l of sentenceSprite) {
      this.sprite.addChild(l.sprite);
    }
  }
  EmitEvent() {
    /*イベント発生用メッセージ*/
    let m = this.message[this.page];
    if (m !== undefined) {
      if (m.slice(0, 5) == "EVENT") {
        let event = new MessageEvent("OPEN", m);
        EventManager.eventList.push(event);
        //クソポイント
        //ここでメッセージを変更するな
        this.message[this.page] = "はっこうずみ";
        this.page++;
      } //
      if (m.slice(0, 6) == "SELECT") {
        this.OpenSelection();
      }
      if (m.slice(0, 3) == "GET") {
        this.GetWeapon();
        this.page++;
      }
      //指定したページに飛ぶ
      if (m.slice(0, 4) == "GOTO") {
        let page = m.split("\n")[1];
        if (page == "END") {
          this.isRead = false;
          this.CloseMessage();
        } else this.page = page;
      }
    }
  }
  GetWeapon() {
    this.page++;
    let weaponName = this.message[this.page];
    cl(this.message[this.page]);
    if (!Param.player.havingWeaponList[weaponName]) {
      let text =
        this.ToJap(weaponName) + "をてにいれた\ncキーでチェンジできるよ↓";
      //UIManager.PopMessage(text,"POP");
      //テスト
      Param.player.havingWeaponList[weaponName] = true;
      UIManager.bullet.Push(weaponName);
      let p = {
        x: 64,
        y: 96
      };
      UIManager.add(
        new StagePop(p, "-" + this.ToJap(weaponName) + "をてにいれた ")
      ); //SCORE
    } else {
      let text = "きりかえはc だよ↓";
      //     UIManager.PopMessage(text,"POP");
    }
  }
  //武器名を日本語にするだけ
  ToJap(weaponName) {
    switch (weaponName) {
      case "missile":
        return "ミサイル";
      case "laser":
        return "レーザー";
      case "weapon4":
        return "weapon4";
      case "weapon5":
        return "weapon5";
      default:
        console.warn("Error ToJapWeaponName");
    }
  }
  //選択肢を表示
  OpenSelection() {
    this.OpeningSelection = true;
    let p = copy(this.pos);
    p.x += 300;
    p.y += 16;
    p.y += COLUMN;

    this.Selector = {
      Init: function() {
        this.cusor.select = this.cusor.item[this.cusor.pointer];
      },
      GetSelection: function() {
        return this.cusor.item[this.cusor.pointer];
      },
      cusor: {
        pos: p,
        item: ["はい", "いいえ"],
        pointer: 0, //カーソル位置
        font: new Font(p, "→", "MES"),
        select: null,
        Move: function(dir) {
          Audio.PlaySE("changeWeapon");
          if (dir == "UP") this.pointer--;
          if (dir == "DOWN") this.pointer++;
          this.pointer = clamp(this.pointer, 0, this.item.length - 1);
          this.font.sprite.position.y = 0 + COLUMN * this.pointer;
        }
      }
    };
    this.Selector.Init();

    let f;
    this.Selector.sprite = new PIXI.Container();
    this.Selector.sprite.addChild(this.Selector.cusor.font.sprite);
    p.x += 16;
    for (let item of this.Selector.cusor.item) {
      f = new Font(p, item, "MES");
      this.Selector.sprite.addChild(f.sprite);
      p.y += COLUMN;
    }
    this.sprite.addChild(this.Selector.sprite);
  }
  //選択肢決定
  Select() {
    this.OpeningSelection = false;
    //決め打ち
    switch (this.Selector.GetSelection()) {
      case "はい":
        this.page = 2;
        break;
      case "いいえ":
        this.page = 4;
        break;
    }
  }
  CloseMessage() {
    this.signboard.isRead = false;
    this.signboard.isNear = false;
    Game.state.transit("main");
    UIManager.remove(this);
  }
  Update() {
    if (Input.isKeyClick(KEY.UP)) {
      if (this.OpeningSelection) {
        this.Select();
      }
      if (this.page < this.message.length) {
        this.ReadNextPage();
      } else {
        this.CloseMessage();
      }
    }
    if (this.OpeningSelection) {
      if (Input.isKeyClick(KEY.DOWN)) {
        this.Selector.cusor.Move("DOWN");
      }
      if (Input.isKeyClick(KEY.UP)) {
        this.Selector.cusor.Move("UP");
      }
    }
  }
}
