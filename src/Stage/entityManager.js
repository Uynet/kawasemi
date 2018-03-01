'use strict'
import Drawer from '../drawer.js';
import Target from '../Entity/Effect/target.js';
import Timer from '../timer.js';
import Art from '../art.js';
import Stone from '../Entity/Effect/stone.js';
/*エンティティマネージャ*/
export default class EntityManager{
  static Init(){
    this.entityList = [];//全Entityのリスト
    this.enemyList = [];//敵のリスト(moverList?)
    this.wallList = [];//壁のリスト
    this.player;//プレイヤーのインスタンス
    this.updaterList = [];//更新が必要なEntity

    this.unusedStones = [];
    for(let i = 0;i<1000;i++){
      this.unusedStones.push(new Stone(VEC0(),VEC0()));
    }

    this.entityIndex = 0;
  }
  static GetStone(pos,vel){
    if(this.unusedStones.length>0){
      let s = this.unusedStones.pop();
      s.pos = pos;
      s.vel = vel;
      s.frame = 0;
      s.isNext = false;
      s.sprite.alpha = 1;
      s.sprite.scale.set(1);
      return s;
    }else{
      cl("unko");
    }
  }
  static RemoveStone(s){
    this.unusedStones.push(s);
    EntityManager.removeEntity(s);
  }
  /*Entityをリストに登録*/
  static addEntity(entity){
    //各entityの参照を保持する
    this.entityList[this.entityIndex] = entity; 
    this.entityIndex++;
    //更新が必要なEntityのみリストに追加
    switch(entity.type){
      case ENTITY.PLAYER : this.player = entity; break;
      case ENTITY.ENEMY : this.enemyList.push(entity); break;
      case ENTITY.WALL : this.wallList.push(entity); break;
    }

    if(entity.isMultiple) Drawer.addContainer(entity.container,entity.layer);
    else if(entity.isNoSprite);
    else Drawer.addContainer(entity.sprite,entity.layer);
  }

  /*Entityをリストから削除する*/
  static removeEntity(entity){
    switch(entity.type){
      case ENTITY.PLAYER : this.player = null; break;
      case ENTITY.ENEMY :
        let i = this.enemyList.indexOf(entity);
        this.enemyList.splice(i,1);
        break;
      case ENTITY.WALL :
        let j = this.wallList.indexOf(entity);
        this.wallList.splice(j,1);
        break;
    }
    let k = this.entityList.indexOf(entity);
    this.entityList.splice(k,1);
    this.entityIndex--;

    if(entity.isMultiple) Drawer.removeContainer(entity.container,entity.layer);
    else if(entity.isNoSprite)/*Nothing to do*/;
    else Drawer.removeContainer(entity.sprite,entity.layer);
  }
  /*Entityの更新*/
  static Update(){
    for(let i=0;i<this.entityIndex;i++){
      let l = this.entityList[i];
      if(l.isUpdater) l.Update(); 
    }
  }
  /*メッセージイベント中にアニメーションだけ行う*/
  static Animation(){
    for(let i=0;i<this.entityIndex;i++){
      let l = this.entityList[i];
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
