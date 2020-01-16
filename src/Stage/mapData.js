import Art from "../art.js";
import Audio from "../audio.js";
import Drawer from "../drawer.js";
import BackEntity from "../Entity/backEntity.js";
import BackGround from "../Entity/backGround.js";
import Enemy1 from "../Entity/Enemy/enemy1.js";
import Enemy2 from "../Entity/Enemy/enemy2.js";
import Enemy3 from "../Entity/Enemy/enemy3.js";
import Enemy4 from "../Entity/Enemy/enemy4.js";
import Enemy5 from "../Entity/Enemy/enemy5.js";
import Enemy6 from "../Entity/Enemy/enemy6.js";
import Enemy7 from "../Entity/Enemy/enemy7.js";
import Goal from "../Entity/Mover/goal.js";
import Needle from "../Entity/Mover/needle.js";
import Player from "../Entity/Mover/player.js";
import Shop from "../Entity/Mover/shop.js";
import Signboard from "../Entity/Mover/signboard.js";
import Woodbox from "../Entity/Mover/woodbox.js";
import Wall from "../Entity/wall.js";

import EventTrigger1 from "../Entity/EventTrigger/eventTrigger1.js";
import EventTrigger2 from "../Entity/EventTrigger/eventTrigger2.js";
import EventTrigger3 from "../Entity/EventTrigger/eventTrigger3.js";
import EventTrigger4 from "../Entity/EventTrigger/eventTrigger4.js";
import EventTrigger5 from "../Entity/EventTrigger/eventTrigger5.js";

import EntityManager from "./entityManager.js";
import Pool from "./pool.js";
import StageData from "./stageData.js";
import GenerateWall from "./generateWall.js";
/*マップデータ*/
export default class MapData {
  constructor() {
    this.entityData;
    this.width;
    this.height;
  }

  /*マップデータを読み込む*/
  static Load(stageNo) {
    return new Promise(resolve => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "src/resource/map/stage" + stageNo + ".json", true);
      xhr.onload = () => {
        this.jsonObj = JSON.parse(xhr.responseText);
        //entityの読み込み
        this.backEntityData = this.jsonObj.layers[1].data;
        this.entityData = this.jsonObj.layers[2].data;
        this.foreEntityData = this.jsonObj.layers[3].data;
        this.foreData = this.jsonObj.layers[4].data;
        //objの読み込み(今は看板だけ)
        this.objData = this.jsonObj.layers[0].objects;
        this.width = this.jsonObj.layers[1].width;
        this.height = this.jsonObj.layers[1].height;
        //Drawerにマップの大きさを渡す
        Drawer.SetMap(this.width, this.height);
        resolve();
      };
      xhr.send(null);
      this.stageNo = stageNo;
    });
  }
  static CreateEntityLayer(layer) {
    let wallTiletype = this.jsonObj.tilesets[0].tileproperties;
    let entity;
    let ID; //tiledに対応しているID

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        ID = this[layer][this.width * y + x] - 1;
        //tiledのIDがjsonデータより1小さいので引く
        if (ID == -1) continue; //空白はjsonで0なので(引くと)-1となる
        if (!wallTiletype[ID]) cl(x + "  " + y);
        let p = { x: 16 * x, y: 16 * y }; //座標を変換
        switch (wallTiletype[ID].type) {
          case TILE.WALL:
            switch (wallTiletype[ID].name) {
              case "woodbox":
                entity = new Woodbox(p);
                break;
              case "needle":
                entity = new Needle(p, GenerateWall.WallData(ID, layer, x, y));
                break;
              default:
                entity = new Wall(p, GenerateWall.WallData(ID, layer, x, y));
            }
            break;
          case TILE.BACK:
            entity = new BackEntity(p, GenerateWall.WallData(ID, layer, x, y));
            switch (layer) {
              case "backEntityData":
                entity.layer = "BACK";
                break;
              case "entityData":
                entity.layer = "ENTITY";
                break;
              case "foreData":
                entity.layer = "FORE";
                break;
              case "foreEntityData":
                entity.layer = "FOREENTITY";
                break;
              default:
                console.warn("れいやーエラー:" + layer);
            }
            break;
          default:
            console.warn("未実装:" + wallTiletype[ID].type);
        }
        EntityManager.addEntity(entity);
      }
    }
  }

  static CreateObjectLayer() {
    let obj;
    let ID;

    for (let i = 0; i < this.objData.length; i++) {
      ID = this.objData[i].gid;
      let p = {
        x: this.objData[i].x,
        y: this.objData[i].y - 16 //なぜかyだけずれるので引く
      };
      let message;
      switch (ID) {
        case 161:
          obj = new Player(p);
          obj.SetStatus();
          break;
        case 162:
          message = this.objData[i].properties;
          obj = new Signboard(p, message, "signboard");
          break;
        case 163:
          obj = new Goal(p);
          break;
        case 164:
          //TODO:fix
          message = this.objData[i].properties;
          //obj = new Signboard(p,message,"shop");
          //obj = new Signboard(p,message,"signboard");
          obj = new Shop(p, message);
          break;
        case 169:
          obj = new Enemy1(p);
          break;
        case 170:
          obj = new Enemy2(p);
          break;
        case 171:
          obj = new Enemy3(p);
          break;
        case 172:
          obj = new Enemy4(p);
          break;
        case 173:
          obj = new Enemy5(p);
          break;
        case 174:
          obj = new Enemy6(p);
          break;
        case 177:
          obj = new Enemy7(p);
          break;
        case 193:
          obj = new EventTrigger1(p);
          break;
        case 194:
          obj = new EventTrigger2(p);
          break;
        case 195:
          obj = new EventTrigger3(p);
          break;
        case 196:
          obj = new EventTrigger4(p);
          break;
        case 197:
          obj = new EventTrigger5(p);
          break;
      }
      EntityManager.addEntity(obj);
    }
  }

  static async CreateStage(stageNo, callback) {
    const vol = name => {
      if (name == "stage8") return 3.5;
      if (name == "stage7") return 3.5;
      if (name == "stage5") return 0.7;
      if (name == "title") return 0.7;
      else return 1.0;
    };
    //BGM再生
    const title = StageData.getStageBGM(stageNo);
    if (Audio.PlayingBGM.name != title) {
      Audio.StopBGM();
      Audio.PlayBGM(title, vol(title));
    }

    await this.Load(stageNo);
    //背景の生成
    //let BG = StageData.StageBackGround[stageNo];
    let BG = 1;
    this.AddBackGround(BG);
    //entityの生成
    this.CreateEntityLayer("backEntityData");
    this.CreateEntityLayer("entityData");
    this.CreateEntityLayer("foreEntityData");
    this.CreateEntityLayer("foreData");
    this.CreateObjectLayer();
    let p;
    if (stageNo >= 1) {
      p = copy(EntityManager.player.pos);
    } else {
      p = {
        x: 240,
        y: 128
      };
    }
    Drawer.ScrollSet(p);
    if (callback) callback();
  }

  /*現在開かれているステージを削除*/
  static DeleteStage() {
    while (EntityManager.entityList.length > 0) {
      //poolしている物はリストに無いので開放
      switch (EntityManager.entityList[0].name) {
        case "bulletblur":
        case "fire":
        case "smoke":
        case "sonic":
        case "flash":
        case "missile":
        case "stone":
          Pool.Remove(EntityManager.entityList[0]);
          break;
        default:
          EntityManager.removeEntity(EntityManager.entityList[0]);
      }
    }
  }
  static MapToWorldPos(x, y) {
    return new Vec2(16 * x, 16 * y);
  }
  //背景を追加
  static AddBackGround(BG) {
    let back;
    let w = 24;
    let h = 16;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let tex = Art.wallPattern.backGround[BG];
        let p = {
          x: (x - w / 2) * 32,
          y: (y - h / 2) * 32
        };
        EntityManager.addEntity(new BackGround(copy(p), tex));
      }
    }
  }
}
