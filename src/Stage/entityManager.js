import Drawer from '../drawer.js';
import Target from '../Entity/target.js';

/*エンティティマネージャ*/
export default class EntityManager{
  static Init(){
    this.entityList = [];//全Entityのリスト
    this.enemyList = [];//敵のリスト
    this.player;//プレイヤーのインスタンス
    this.addEntity(new Target({x:-999,y:-999}));//targetのインスタンス
  }
  /*Entityをリストに登録*/
  static addEntity(entity){
    //各entityの参照を保持する
    switch(entity.type){
      case ENTITY.PLAYER :
        this.player = entity;
        Drawer.addContainer(entity.sprite,"ENTITY");
        break;
      case ENTITY.ENEMY :
        this.enemyList.push(entity);
        Drawer.addContainer(entity.sprite,"ENTITY");
        break;
      case ENTITY.TARGET :
        this.target = entity;
        Drawer.addContainer(entity.sprite,"FORE");
        cl(entity);
        break;
      default : 
        Drawer.addContainer(entity.sprite,"ENTITY");
    }
    this.entityList.push(entity); 
  }

  /*Entityをリストから削除*/
  static removeEntity(entity){
    let i = this.entityList.indexOf(entity);
    this.entityList.splice(i,1);

    switch(entity.type){
      case ENTITY.ENEMY :
        let i = this.enemyList.indexOf(entity);
        this.enemyList.splice(i,1);
        Drawer.removeContainer(entity.sprite,"ENTITY");
        break;
      case ENTITY.TARGET :
        Drawer.removeContainer(entity.sprite,"FORE");
        break;
      default :
        Drawer.removeContainer(entity.sprite,"ENTITY");
    }
  }
  /*Entityの更新*/
  static Update(){
    for(let l of this.entityList){
      l.Update(); 
    }
  }
}
