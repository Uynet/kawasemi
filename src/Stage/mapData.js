import EntityManager from './entityManager.js'
import Entity from '../Entity/entity.js'
import Wall from '../Entity/wall.js'
import Mover from '../Entity/mover.js'
import Player from '../Entity/player.js'
import Teki1 from '../Entity/teki1.js'
import Game from '../Game.js'

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
      xhr.open('GET','resource/map/stage'+stageNo+'.json',true);
      xhr.onload = ()=>{
        let jsonObj = JSON.parse(xhr.responseText);
        //BackGroundの読み込み
        this.data = jsonObj.layers[0].data;
        this.width = jsonObj.layers[0].width;
        this.height = jsonObj.layers[0].height;
        resolve();
      }
      xhr.send(null);
      this.stageNo = stageNo;
    });
  }

  static async CreateStage(stageNo){
    await this.Load(stageNo);

    for(let y = 0;y<this.height;y++){
      for(let x = 0;x<this.width;x++){
        switch(this.data[this.width*y + x]){
          case TILE.SPACE :
            /*nothing to do*/
            break;
          case TILE.WALL :
            EntityManager.addEntity(new Wall({x:16*x,y:16*y}));
            break;
 case TILE.PLAYER :
   EntityManager.addEntity(new Player({x:16*x,y:16*y}));
   break;
 case TILE.ENEMY :
   EntityManager.addEntity(new Teki1({x:16*x,y:16*y}));
   break;
 default : 
   console.warn("タイルセットに未実装のチップが使用されています");
        }
      }
    }
    return;
  }

  /*現在開かれているステージを削除*/
  DeleteStage(){
  }
}
