'use strict'
import Drawer from '../drawer.js';
import Target from '../Entity/target.js';

/*エンティティマネージャ*/
export default class EntityManager{
  static Init(){
    this.entityList = [];//全Entityのリスト
    this.enemyList = [];//敵のリスト
    this.wallList = [];//壁のリスト
    this.player;//プレイヤーのインスタンス
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
      case ENTITY.EFFECT :
        Drawer.addContainer(entity.sprite,"FORE");
        break;
      case ENTITY.WALL :
        this.wallList.push(entity);
        Drawer.addContainer(entity.sprite,"ENTITY");
        break;
      case ENTITY.GOAL :
        Drawer.addContainer(entity.sprite,"ENTITY");
        break;
      default : 
        if(entity.type!="BULLET"){
        }
        Drawer.addContainer(entity.sprite,"ENTITY");

    }
    this.entityList.push(entity); 
  }

  /*Entityをリストから削除する*/
  static removeEntity(entity){
    let i = this.entityList.indexOf(entity);
    this.entityList.splice(i,1);

    switch(entity.type){
      case ENTITY.PLAYER :
        this.player = null;
        Drawer.removeContainer(entity.sprite,"ENTITY");
        break;
      case ENTITY.ENEMY :
        //敵リストから排除
        i = this.enemyList.indexOf(entity);
        this.enemyList.splice(i,1);
        Drawer.removeContainer(entity.sprite,"ENTITY");
        break;
      case ENTITY.EFFECT :
        Drawer.removeContainer(entity.sprite,"FORE");
        break;
      case ENTITY.WALL :
        //壁リストから排除
        i = this.wallList.indexOf(entity);
        this.wallList.splice(i,1);
        Drawer.removeContainer(entity.sprite,"ENTITY");
        break;
      default :
        if(entity.type!="BULLET"){
        }
        Drawer.removeContainer(entity.sprite,"ENTITY");
        break;
    }
  }
  /*Entityの更新*/
  static Update(){
    for(let l of this.entityList){
      l.Update(); 
    }
  }
}
