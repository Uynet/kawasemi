class Entity{
  constructor(pos){
    this.pos = pos;
    this.sprite;
    this.type;//enum
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
