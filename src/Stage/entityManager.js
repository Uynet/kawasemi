'use strict'
import Drawer from '../drawer.js';
import Target from '../Entity/target.js';
import Timer from '../timer.js';
/*エンティティマネージャ*/
let ya = 0;
let yu = 0;
export default class EntityManager{
  static Init(){
    this.entityList = [];//全Entityのリスト
    this.enemyList = [];//敵のリスト
    this.wallList = [];//壁のリスト
    this.player;//プレイヤーのインスタンス
    this.effectList = []//本当はいらないけど何故か消えないバグがあるから..
  }
  /*Entityをリストに登録*/
  static addEntity(entity){
    //各entityの参照を保持する
    this.entityList.push(entity); 
    switch(entity.type){
      //プレイヤー
      case ENTITY.PLAYER :
        this.player = entity;
        Drawer.addContainer(entity.sprite,"ENTITY");
        break;
        //敵
      case ENTITY.ENEMY : 
        this.enemyList.push(entity);
        Drawer.addContainer(entity.sprite,"ENTITY");
        break;
        //エフェクト
      case ENTITY.EFFECT :
        this.effectList.push(entity);
        Drawer.addContainer(entity.sprite,"FORE");
        break;
        //壁
      case ENTITY.WALL :
        this.wallList.push(entity);
        Drawer.addContainer(entity.sprite,"ENTITY");
        break;
        //ゴール?
      case ENTITY.GOAL :
        Drawer.addContainer(entity.sprite,"ENTITY");
        break;
        //その他
      default : 
        if(entity.type!="BULLET"){
        }
        Drawer.addContainer(entity.sprite,"ENTITY");
    }
  }
  
  static ri(entity){
    return this.effectList.indexOf(entity);
  }

  /*Entityをリストから削除する*/
  static removeEntity(entity){

    switch(entity.type){
      //プレイヤー
      case ENTITY.PLAYER :
        this.player = null;
        Drawer.removeContainer(entity.sprite,"ENTITY");
        break;
        //敵
      case ENTITY.ENEMY :
        let i = this.enemyList.indexOf(entity);
        this.enemyList.splice(i,1);
        Drawer.removeContainer(entity.sprite,"ENTITY");
        break;
        //エフェクト
      case ENTITY.EFFECT :
        let m = this.effectList.indexOf(entity);
        this.effectList.splice(m,1);
        Drawer.removeContainer(entity.sprite,"FORE");
        break;
        //壁
      case ENTITY.WALL :
        let j = this.wallList.indexOf(entity);
        this.wallList.splice(j,1);
        Drawer.removeContainer(entity.sprite,"ENTITY");
        break;
        //その他
      default :
        if( entity.type!=ENTITY.BULLET){
          console.warn(entity);
        }
        Drawer.removeContainer(entity.sprite,"ENTITY");
        break;
    }
    let k = this.entityList.indexOf(entity);
    this.entityList.splice(k,1);
  }
  /*Entityの更新*/
  static Update(){
    for(let l of this.entityList){
      l.Update(); 
    }
  }
}
