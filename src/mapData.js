/*マップデータ*/
class MapData{
  constructor(){
    this.stageNo;
    this.data = 111;
    this.width;
    this.height;
  }

  Load(stageNo){
    return new Promise((resolve)=>{
      let xhr = new XMLHttpRequest();
      xhr.open('GET','resource/map.json',true);
      xhr.onreadystatechange = ()=>{
        if(xhr.responseText!=""){
          /*TODO 1回しか実行されないように */
          if(po==0){
            let jsonObj = JSON.parse(xhr.responseText);
            this.data = jsonObj.layers[0].data;
            this.width = jsonObj.layers[0].width;
            this.height = jsonObj.layers[0].height;
            po++;
          }
          resolve();
        }
      }
      xhr.send(null);
      this.stageNo = stageNo;
    });
  }

  async CreateStage(stageNo){
    await this.Load();

    for(let mapY = 0;mapY<this.height;mapY++){
      for(let mapX = 0;mapX<this.width;mapX++){
        switch(this.data[10*mapY + mapX]){
          case 0 :
            /*nothing to do*/
            break;
          case 1 :
            stageEntity.addEntity(new Wall({x:32*mapX,y:32*mapY}));
            break;
          case 2 :
            stageEntity.addEntity(new Player({x:32*mapX,y:32*mapY}));
            break;
        }
      }
    }
    return;
  }
}
