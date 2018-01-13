import Drawer from '../drawer.js';
/*エンティティのリスト*/
export default class StageEntity{
  static Init(){
    this.entityList = [];
  }
  static getEntityList(){
    return this.entityList;
    console.log(this.entityList);
  }

  //Entityをリストに登録
  static addEntity(entity){
    this.entityList.push(entity); 
    Drawer.addStage(entity.sprite);
  }

  static removeEntity(entity){
    let i = this.entityList.indexOf(entity);
    console.log(entity.sprite);
    Drawer.removeStage(entity.sprite);
    this.entityList.splice(i,1);
  }

  static UpdateEntity(){
    for(let l of this.entityList){
      l.Update(); 
    }
  }
}
