'use strict'
import Drawer from '../drawer.js';
import Target from '../Entity/Effect/target.js';
import Timer from '../timer.js';
/*エンティティマネージャ*/
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
        if(entity.name == "FontEffect"){
          this.effectList.push(entity);
          for(let i=0 ;i < entity.sprite.length ; i++){
            Drawer.addContainer(entity.sprite[i],"FORE");
          }
        }else{
          this.effectList.push(entity);
          Drawer.addContainer(entity.sprite,"ENTITY");
        }
        break;
        //壁
      case ENTITY.WALL :
        this.wallList.push(entity);
        Drawer.addContainer(entity.sprite,"ENTITY");
        break;
        //背景
      case ENTITY.BACK :
        //リストには追加してない
        Drawer.addContainer(entity.sprite,"BACK");
        break;
        //ゴール?
      case ENTITY.GOAL :
        Drawer.addContainer(entity.sprite,"ENTITY");
        break;
        //弾丸
        case ENTITY.BULLET :
          Drawer.addContainer(entity.sprite,"FORE");
          break;
          //その他
      default : 
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
        //複数スプライトを持つオブジェクトの処理
        if(entity.name == "FontEffect"){
          for(let j = 0;j<entity.sprite.length;j++){
            console.assert(entity.sprite[j] != undefined);
            Drawer.removeContainer(entity.sprite[j],"FORE");
          }
        }else{
          console.assert(entity.sprite != undefined);
          Drawer.removeContainer(entity.sprite,"ENTITY");
        }
        break;
        //壁
      case ENTITY.WALL :
        let j = this.wallList.indexOf(entity);
        this.wallList.splice(j,1);
        Drawer.removeContainer(entity.sprite,"ENTITY");
        break;
        //背景entity
      case ENTITY.BACK :
        Drawer.removeContainer(entity.sprite,"BACK");
        break;
 case ENTITY.BULLET :
   Drawer.removeContainer(entity.sprite,"FORE");
   break;
   //その他
      default :
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
