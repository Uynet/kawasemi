let po = 0;
class Game{
  static Init(){
    /* class declaration */
    input = new Input();
    util = new Util();
    stageEntity = new StageEntity();
    collision = new Collision();
    /* ------*/

    /*TODO Sceneクラスでやる*/
    state = 0;

    /*TODO どっかに移す*/
    mapData = new MapData();
    mapData.Load(1);
    mapData.CreateStage(1);


    Drawer.InitializeValuables();
    this.Load();
  }

  static Load(){
    Art.LoadTexture();
  }

  static Update(){
    //各Entityの位置の更新
    for(let l of stageEntity.EntityList){
      l.updatePosition(); 
    }
  }
}
