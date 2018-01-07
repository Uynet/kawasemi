import StageEntity from './Stage/stageEntity.js'
import Entity from './Entity/entity.js'
import Wall from './Entity/wall.js'
import Mover from './Entity/Mover/mover.js'
import Player from './Entity/Mover/player.js'
import Game from './Game.js'

/*マップデータ*/
export default class MapData{
  constructor(){
    this.stageNo;
    this.data;
    this.width;
    this.height;
  }

  static Load(stageNo){
    return new Promise((resolve)=>{
      let xhr = new XMLHttpRequest();
      xhr.open('GET','resource/map/stage'+stageNo+'.json',true);
      xhr.onreadystatechange = ()=>{
        if(xhr.responseText!=""){
          /*TODO 1回しか実行されないように */
          let jsonObj = JSON.parse(xhr.responseText);
          this.data = jsonObj.layers[0].data;
          this.width = jsonObj.layers[0].width;
          this.height = jsonObj.layers[0].height;
          resolve();
        }
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
          case 0 :
            /*nothing to do*/
            break;
          case 1 :
            StageEntity.addEntity(new Wall({x:32*x,y:32*y}));
            break;
 case 2 :
   StageEntity.addEntity(new Player({x:32*x,y:32*y}));
   break;
        }
      }
    }
    return;
  }

  /*現在開かれているステージを削除*/
  DeleteStage(){
  }
}
