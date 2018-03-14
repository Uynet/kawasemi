import EntityManager from './entityManager.js'
import Entity from '../Entity/entity.js'
import Wall from '../Entity/wall.js'
import BackEntity from '../Entity/backEntity.js';
import BackGround from '../Entity/backGround.js';
import Signboard from '../Entity/signboard.js';
import Player from '../Entity/player.js'
import Enemy1 from '../Entity/Enemy/enemy1.js'
import Enemy2 from '../Entity/Enemy/enemy2.js'
import Enemy3 from '../Entity/Enemy/enemy3.js'
import Enemy4 from '../Entity/Enemy/enemy4.js'
import Goal from '../Entity/goal.js'
import Game from '../game.js'
import Art from '../art.js'
import Drawer from '../drawer.js';
import Woodbox from '../Entity/woodbox.js';
import Needle from '../Entity/needle.js';
import StageGen from './stageGen.js';
/*マップデータ*/
export default class MapData{
  constructor(){
    this.stageNo;
    this.entityData;
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
        //entityの読み込み
        this.entityData = this.jsonObj.layers[0].data;
        //objの読み込み(今は看板だけ)
        this.objData = this.jsonObj.layers[1].objects;
        this.width = this.jsonObj.layers[0].width;
        this.height = this.jsonObj.layers[0].height;
        resolve();
      }
      xhr.send(null);
      this.stageNo = stageNo;
    });
  }

  /* state 
   * ENTER : 新しいステージに入った時
   * RESET : 死んでやり直す時
   */
  static async CreateStage(stageNo,state){
    await this.Load(stageNo);
    //背景の生成
    //if(state == "ENTER")
    this.AddBackGround();
    //entityの生成
    /*タイルに割り当てるtype
     * 1 : 壁
     * 2 : 背景*/
    let wallTiletype = this.jsonObj.tilesets[0].tileproperties;
    let moverTiletype = this.jsonObj.tilesets[1].tileproperties;
    let entity;
    let ID;//tiledに対応漬けられているID

    for(let y = 0;y<this.height;y++){
      for(let x = 0;x<this.width;x++){
        ID = this.entityData[this.width*y + x]-1;
        //tiledのIDがjsonデータより1小さいので引く
        if(ID == -1)continue;//空白はjsonで0なので(引くと)-1となる
        if(!wallTiletype[ID])cl(x + "  " + y)
        switch(wallTiletype[ID].type){
          case TILE.WALL :
            //直せ
            if(wallTiletype[ID].name == "woodbox"){
              entity = new Woodbox({x:16*x,y:16*y});
            }else{
              entity = new Wall({x:16*x,y:16*y},ID);
            }
            EntityManager.addEntity(entity);
            break;
          case TILE.BACK :
            entity = new BackEntity({x:16*x,y:16*y},MapData.Tile(ID).texture);
            EntityManager.addEntity(entity); break;
          case TILE.FORE :
            entity = new BackEntity({x:16*x,y:16*y},MapData.Tile(ID).texture);
            entity.layer = "FORE";
            EntityManager.addEntity(entity); break;
          case TILE.NEEDLE :
            entity = new Needle({x:16*x,y:16*y},MapData.Tile(ID).texture);
            EntityManager.addEntity(entity);
            break;
          default : 
            console.warn("タイルセットに未実装のチップが使用されています ID : " + wallTiletype[ID].type);
        }
      }
    }
    //wallのソート
    EntityManager.SortWallList();

    let obj;
    //objectの生成
    for(let i = 0;i < this.objData.length;i++){
      ID = this.objData[i].gid;
        let objx = this.objData[i].x;
        let objy = this.objData[i].y -16 ;//なぜかyだけずれるので引く
        let p = {x:objx , y:objy};
        switch(ID){
          case 161 :
            obj = new Player(p);
            break;
          case 162 :
            let message = this.objData[i].properties;
            obj = new Signboard(p,message);
            break;
          case 163 :
            obj = new Goal(p);
            break;
          case 169 :
            obj = new Enemy1(p);
            break;
          case 170 :
            obj = new Enemy2(p);
            break;
          case 171 :
            obj = new Enemy3(p);
            break;
          case 172 :
            obj = new Enemy4(p);
            break;
      }
            EntityManager.addEntity(obj);
    }
    let p = CPV(EntityManager.player.pos);
    Drawer.ScrollSet(p);
  }

  /*マップデータを消して作り直す*/
  static RebuildStage(){
    MapData.DeleteStage();
    let state = "RESET";
    MapData.CreateStage(Game.stage,state);
  }

  /*現在開かれているステージを削除*/
  static DeleteStage(){
    while(EntityManager.entityList.length > 0){
      EntityManager.removeEntity(EntityManager.entityList[0]);
    }
    StageGen.Init();
  }
  //壁タイルの対応
  //タイルIDを渡すとテクスチャを返す
  static Tile(i){
    let wall = Art.wallPattern;
    let out = Art.wallPattern.edge.out;
    let inner = Art.wallPattern.edge.inner;
    let steel = Art.wallPattern.steel;
    let needle = Art.wallPattern.needle;
    //戻り値データ
    let tex;//テクスチャ
    let material = "wall";//材質
    switch(i){
      //Bigblock
      case 82 : tex = wall.bigBlock[0];break;
      case 83 : tex = wall.bigBlock[1];break;
      case 90 : tex = wall.bigBlock[2];break;
      case 91 : tex = wall.bigBlock[3];break;
      //block
      case 84 : tex = wall.block;break;
      case 85 : tex = wall.HPBlock;break;
      case 86 : tex = wall.bulletBlock;break;
      //edge in
      case 49 : tex = inner[0];break;
      case 51 : tex = inner[1];break;
      case 65 : tex = inner[2];break;
      case 67 : tex = inner[3];break;
      //edge out
      case 52:tex = out[0];break;
      case 53:tex = out[1];break;
      case 54:tex = out[2];break;
      case 60:tex = out[3];break;
      case 62:tex = out[4];break;
      case 68:tex = out[5];break;
      case 69:tex = out[6];break;
      case 70:tex = out[7];break;
      //steel
      case 72:tex = steel.entity[0];material = "steel";break; 
      case 73:tex = steel.entity[1];material = "steel";break; 
      case 74:tex = steel.entity[2];material = "steel";break; 
      case 75:tex = steel.entity[3];material = "steel";break; 
      case 76:tex = steel.back[0];material = "steel";break;
      case 77:tex = steel.back[1];material = "steel";break;
      case 78:tex = steel.back[2];material = "steel";break;
      case 79:tex = steel.back[3];material = "steel";break;
      //signboard
      case 4 :tex = Art.wallPattern.signboard;break;
        //needle
      case 8 : tex = needle[0];break;
      case 9 : tex = needle[1];break;
      case 10 : tex = needle[2];break;
      case 11 : tex = needle[3];break;
  }
    return {
      material : material,
      texture : tex,
    }
  }

  //背景を追加
  static AddBackGround(){
    let back;
    let w = 20;
    let h = 20;
    for(let y = 0;y<h;y++){
      for(let x = 0;x<w;x++){
        let tex = Art.wallPattern.steel.backGround[0];
        let p = {
          x : (x - w/2)*32,
          y : (y - h/2)*32
        }
        EntityManager.addEntity(new BackGround(CPV(p),tex));
      }
    }
  }
}
