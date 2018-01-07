import Drawer from '../drawer.js';
/*エンティティのリスト*/
let EntityList = []; 
export default class StageEntity{
  static getEntityList(){
    return EntityList;
    console.log(EntityList);
  }

  //Entityをリストに登録
  static addEntity(entity){
    let EntityList = StageEntity.getEntityList(); 
    EntityList.push(entity); 
    Drawer.addStage(entity.sprite);
  }
  static spliceEntity(entity){
    /* */
  }
  //末尾のEntityをリストから削除
  static popEntity(){
    EntityList.pop(); 
    Drawer.addStage(entity.sprite);
  }

  static UpdateEntity(){
    let EntityList = StageEntity.getEntityList(); 
    for(let l of EntityList){
      l.updatePosition(); 
    }
  }
}
