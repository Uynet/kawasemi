class Entity{
  constructor(pos){
    this.pos = pos;
    this.sprite;

    //衝突判定の形状
    this.shape;
  }
}


/*singleton*/
class StageEntity{
  constructor(){
    this.EntityList = []; 
  }

  //Entityをリストに登録
  addEntity(entity){
    this.EntityList.push(entity); 
    Drawer.addStage(entity.sprite);
  }

}
