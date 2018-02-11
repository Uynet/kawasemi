import EntityManager from './entityManager.js'
import Entity from '../Entity/entity.js'
import Wall from '../Entity/wall.js'
import Background from '../Entity/background.js';
import Signboard from '../Entity/signboard.js';
import Player from '../Entity/player.js'
import Enemy1 from '../Entity/enemy1.js'
import Goal from '../Entity/goal.js'
import Game from '../Game.js'
import Art from '../art.js'
import Drawer from '../drawer.js';
import WeaponManager from '../Weapon/weaponManager.js';
/*マップデータ*/
export default class MapData{
  constructor(){
    this.stageNo;
    this.data;
    this.width;
    this.height;
  }

  /*マップデータを読み込む*/
  static Load(stageNo){
    return new Promise((resolve)=>{
      let xhr = new XMLHttpRequest();
      xhr.open('GET','src/resource/map/stage'+stageNo+'.json',true);
      xhr.onload = ()=>{
        this.jsonObj = JSON.parse(xhr.responseText);
        //BackGroundの読み込み
        this.data = this.jsonObj.layers[0].data;
        this.width = this.jsonObj.layers[0].width;
        this.height = this.jsonObj.layers[0].height;
        resolve();
      }
      xhr.send(null);
      this.stageNo = stageNo;
    });
  }

  static async CreateStage(stageNo){
    await this.Load(stageNo);
    /*タイルに割り当てるtype
     * 1 : 壁
     * 2 : 背景*/
    let tileType = this.jsonObj.tilesets[0].tileproperties;
    let entity;
    let ID;//tiledに対応漬けられているID

    for(let y = 0;y<this.height;y++){
      for(let x = 0;x<this.width;x++){
        ID = this.data[this.width*y + x]-1;
        //tiledのIDとjsonデータがズレてるので1引く
        if(ID == -1)continue;//空白はtiledIDが0なのでjsonで-1となる
        switch(tileType[this.data[this.width*y + x]-1].type){
          case TILE.WALL :
            entity = new Wall({x:16*x,y:16*y},MapData.WallTile(ID));
            EntityManager.addEntity(entity); break;
          case TILE.BG :
            entity = new Background({x:16*x,y:16*y},MapData.WallTile(ID));
            EntityManager.addEntity(entity); break;
            //看板
          case TILE.SIGN :
            entity = new Signboard({x:16*x,y:16*y},MapData.WallTile(ID));
            EntityManager.addEntity(entity); break;
          case TILE.PLAYER : EntityManager.addEntity(new Player({x:16*x,y:16*y})); break;
          case TILE.ENEMY : EntityManager.addEntity(new Enemy1({x:16*x,y:16*y})); break;
          case TILE.GOAL : EntityManager.addEntity(new Goal({x:16*x,y:16*y})); break;
          default : 
            console.warn("タイルセットに未実装のチップが使用されています");
        }
      }
    }
    Drawer.ScrollSet(EntityManager.player.pos);
    return;
  }

  /*マップデータを消して作り直す*/
  static RebuildStage(){
    MapData.DeleteStage();
    MapData.CreateStage(Game.stage);
  }

  /*現在開かれているステージを削除*/
  static DeleteStage(){
    while(EntityManager.entityList.length > 0){
      EntityManager.removeEntity(EntityManager.entityList[0]);
    }
  }
  //壁タイルの対応
  //タイルIDを渡すとテクスチャを返す
  //やばい
  static WallTile(i){
    let out = Art.wallPattern.edge.out;
    let steel = Art.wallPattern.steel;
    switch(i){
      //edge out
      case 52:return out[0];
      case 53:return out[1];
      case 54:return out[2];
      case 60:return out[3];
      case 62:return out[4];
      case 68:return out[5];
      case 69:return out[6];
      case 70:return out[7];
      //steel
      case 72:return steel.entity[0]; 
      case 73:return steel.entity[1]; 
      case 74:return steel.entity[2]; 
      case 75:return steel.entity[3]; 
      case 76:return steel.back[0];
      case 77:return steel.back[1];
      case 78:return steel.back[2];
      case 79:return steel.back[3];
      //signboard
      cl("sig");
      case 4:return Art.wallPattern.signboard;
  }
    console.warn(i);
    return Art.wallPattern.block;
  }
}
