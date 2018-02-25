'use strict'
import Drawer from '../drawer.js';
import Target from '../Entity/Effect/target.js';
import Timer from '../timer.js';
import Art from '../art.js';
/*エンティティマネージャ*/
export default class EntityManager{
  static Init(){
    this.entityList = [];//全Entityのリスト
    this.enemyList = [];//敵のリスト
    this.wallList = [];//壁のリスト
    this.player;//プレイヤーのインスタンス
    this.effectList = [];//本当はいらないけど何故か消えないバグがあるから..
    this.updaterList = [];//更新が必要なEntity
  }
  /*Entityをリストに登録*/
  static addEntity(entity){
    //各entityの参照を保持する
    this.entityList.push(entity); 
    //更新が必要なEntityのみリストに追加
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
        if(entity.isMultiple){
        //複数スプライトを持つ
          this.effectList.push(entity);
          for(let i=0 ;i < entity.sprites.length ; i++){
            Drawer.addContainer(entity.sprites[i],"FORE");
          }
        }else if(entity.isNoSprite){
        //何も持たない
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
      case ENTITY.BACK :
        //背景Entityであり背景ではない
        Drawer.addContainer(entity.sprite,"BACK");
        break;
      case ENTITY.BG :
        //真の背景
        Drawer.addContainer(entity.sprite,"BG");
        break;
        //弾丸
      case ENTITY.BULLET :
          Drawer.addContainer(entity.sprite,"ENTITY");
          break;
        //その他
      default : 
        Drawer.addContainer(entity.sprite,"ENTITY");
    }
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
        if(entity.isMultiple){
        //複数スプライトを持つオブジェクトの処理
          for(let j = 0;j<entity.sprites.length;j++){
            console.assert(entity.sprites[j] != undefined);
            Drawer.removeContainer(entity.sprites[j],"FORE");
          }
        }else if(entity.isNoSprite){
          //何もスプライトを持たない
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
      case ENTITY.BACK :
        //背景entity
        Drawer.removeContainer(entity.sprite,"BACK");
        break;
      case ENTITY.BG :
        //真の背景
        Drawer.removeContainer(entity.sprite,"BG");
        break;
      case ENTITY.BULLET :
        Drawer.removeContainer(entity.sprite,"ENTITY");
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
      if(l.isUpdater) l.Update(); 
    }
  }
  /*メッセージイベント中にアニメーションだけ行う*/
  static Animation(){
    for(let l of this.entityList){
      //playerはアニメーションのみ
      if(l.type == ENTITY.PLAYER){
        l.Animation(); 
      }
      //看板は読めるようにする
      if(l.name == "signboard") {
        l.Update(); 
      }
    }
  }
}
