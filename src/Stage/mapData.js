import EntityManager from './entityManager.js'
import Entity from '../Entity/entity.js'
import Wall from '../Entity/wall.js'
import Mover from '../Entity/mover.js'
import Player from '../Entity/player.js'
import Teki1 from '../Entity/teki1.js'
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
    let tileType = this.jsonObj.tilesets[0].tileproperties;
    let entity;
    let ID;//tiledに対応漬けられているID

    for(let y = 0;y<this.height;y++){
      for(let x = 0;x<this.width;x++){
        ID = this.data[this.width*y + x]-1;
        if(ID == -1)continue;//SPACE
        switch(tileType[this.data[this.width*y + x]-1].type){
          case TILE.WALL :
            entity = new Wall({x:16*x,y:16*y},MapData.WallTile(ID));
            EntityManager.addEntity(entity);
            break;
          case TILE.PLAYER :
            EntityManager.addEntity(new Player({x:16*x,y:16*y}));
            break;
          case TILE.ENEMY :
            EntityManager.addEntity(new Teki1({x:16*x,y:16*y}));
            break;
          case TILE.GOAL :
            EntityManager.addEntity(new Goal({x:16*x,y:16*y}));
            break;
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
      cl(WeaponManager.weaponList[0].isTargetOn);
      WeaponManager.weaponList[0].isTargetOn = false;
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
    switch(i){
      case 52:return Art.wallPattern[13];
      case 53:return Art.wallPattern[14];
      case 54:return Art.wallPattern[15];
      case 60:return Art.wallPattern[20];
      case 62:return Art.wallPattern[22];
      case 68:return Art.wallPattern[27];
      case 69:return Art.wallPattern[28];
      case 70:return Art.wallPattern[29];
  }
    console.warn(i);
    return Art.wallPattern[0];
  }
}
