import Drawer from '../drawer.js';

/*エンティティマネージャ*/
export default class EntityManager{
  static Init(){
    this.entityList = [];
    this.player;//プレイヤーのインスタンス
  }
  /*Entityをリストに登録*/
  static addEntity(entity){
    //各entityの参照を保持する
    switch(entity.type){
      case ENTITY.PLAYER :
        this.player = entity;
        break;
        // add more...
    }
    this.entityList.push(entity); 
    //Entityコンテナにスプライトを追加
    Drawer.addContainer(entity.sprite,"ENTITY");
  }

  /*Entityをリストから削除*/
  static removeEntity(entity){
    let i = this.entityList.indexOf(entity);
    Drawer.removeContainer(entity.sprite,"ENTITY");
    //Entityコンテナからスプライトを排除
    this.entityList.splice(i,1);
  }
  /*Entityの更新*/
  static Update(){
    for(let l of this.entityList){
      l.Update(); 
    }
  }
}
