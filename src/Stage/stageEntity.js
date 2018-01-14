import Drawer from '../drawer.js';
/*エンティティのリスト*/
export default class StageEntity{
  static Init(){
    this.entityList = [];
  }
  static getEntityList(){
    return this.entityList;
  }

  /*Entityをリストに登録*/
  static addEntity(entity){
    this.entityList.push(entity); 
    Drawer.addStage(entity.sprite);
  }

  /*Entityをリストから削除*/
  static removeEntity(entity){
    let i = this.entityList.indexOf(entity);
    Drawer.removeStage(entity.sprite);
    this.entityList.splice(i,1);
  }

  /*Entityの更新*/
  static UpdateEntity(){
    for(let l of this.entityList){
      l.Update(); 
    }
  }
}
