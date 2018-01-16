import Drawer from '../drawer.js';
/*エンティティのリスト*/
export default class EntityManager{
  static Init(){
    this.entityList = [];
  }
  static getEntityList(){
    return this.entityList;
  }

  /*Entityをリストに登録*/
  static addEntity(entity){
    this.entityList.push(entity); 
    Drawer.addContainer(entity.sprite,"ENTITY");
  }

  /*Entityをリストから削除*/
  static removeEntity(entity){
    let i = this.entityList.indexOf(entity);
    Drawer.removeContainer(entity.sprite,"ENTITY");
    this.entityList.splice(i,1);
  }

  /*Entityの更新*/
  static Update(){
    for(let l of this.entityList){
      l.Update(); 
    }
  }
}
