import Drawer from '../drawer.js';
import Target from '../Entity/Effect/target.js';
import Timer from '../timer.js';
import Art from '../art.js';
import Stone from '../Entity/Effect/stone.js';
import Smoke from '../Entity/Effect/smoke.js';
/*エンティティマネージャ*/
export default class EntityManager{
  static Init(){
    this.entityList = [];//全Entityのリスト
    this.enemyList = [];//敵のリスト(moverList?)
    this.wallList = [];//壁のリスト
    this.player;//プレイヤーのインスタンス
    this.updaterList = [];//更新が必要なEntity

    this.entityIndex = 0;
  }
  static SortWallList(){
    //比較関数
    let compare = (w1,w2)=>{
      if(w1.pos.y > w2.pos.y)return 1
      else if(w1.pos.y < w2.pos.y) return -1;
      else return 0;
    }
    this.wallList.sort(compare);
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
        this.SortWallList();
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
