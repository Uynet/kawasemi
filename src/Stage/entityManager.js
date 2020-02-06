import Drawer from "../drawer.js";
import Collision from "../Collision/collision.js";

export default class EntityManager {
  static Init() {
    this.entityList = []; //全Entityのリスト
    this.enemyList = []; //敵のリスト(moverList?)
    this.wallList = []; //壁のリスト
    this.player; //プレイヤーのインスタンス
    this.updaterList = []; //更新が必要なEntity
    this.colliderList = [];

    this.entityIndex = 0;
  }
  static SortWallList() {
    //比較関数
    let compare = (w1, w2) => {
      if (w1.pos.y > w2.pos.y) return 1;
      else if (w1.pos.y < w2.pos.y) return -1;
      else return 0;
    };
    this.wallList.sort(compare);
  }

  /*Entityをリストに登録*/
  static addEntity(entity) {
    //各entityの参照を保持する
    this.entityList[this.entityIndex] = entity;
    this.entityIndex++;
    //更新が必要なEntityのみリストに追加
    switch (entity.type) {
      case ENTITY.MOVER:
        if (entity.name == "spilit") {
          this.colliderList.push(entity);
        }
        break;
      case ENTITY.PLAYER:
        this.colliderList.push(entity);
        this.player = entity;
        break;
      case ENTITY.ENEMY:
        this.colliderList.push(entity);
        this.enemyList.push(entity);
        break;
      case ENTITY.WALL:
        this.colliderList.push(entity);
        this.wallList.push(entity);
        break;
      default:
        console.warn(entity);
    }

    if (entity.isMultiple) Drawer.add(entity.container, entity.layer);
    else if (entity.isNoSprite);
    else Drawer.add(entity.sprite, entity.layer);
  }

  /*Entityをリストから削除する*/
  static removeEntity(entity) {
    let i;
    switch (entity.type) {
      case ENTITY.PLAYER:
        this.player = null;
        this.colliderList.remove(entity);
        break;
      case ENTITY.ENEMY:
        this.enemyList.remove(entity);
        this.colliderList.remove(entity);
        break;
      case ENTITY.WALL:
        this.wallList.remove(entity);
        this.colliderList.remove(entity);
        //this.SortWallList();
        break;
    }
    this.entityList.remove(entity);
    this.entityIndex--;

    if (entity.isMultiple) Drawer.remove(entity.container, entity.layer);
    else if (entity.isNoSprite /*Nothing to do*/);
    else Drawer.remove(entity.sprite, entity.layer);
  }

  /*指定したnameを持つentityを取得する
  未発見ならばnull、見つかれば配列で返す
  */
  static Find(name) {
    let matched = [];
    this.entityList.forEach(e => {
      if (e.name == name) matched.push(e);
    });
    if (matched.length == 0) return null;
    return matched;
  }
  static Collision() {
    const list = EntityManager.colliderList;
    const len = list.length;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const e1 = list[i];
        const e2 = list[j];
        if (
          e1.name != "player" &&
          e1.name != "spilit" &&
          e2.name != "player" &&
          e2.name != "spilit"
        )
          continue;
        if (e1.name == "needle" || e2.name == "needle") continue;

        // 法線だけが反対になる
        const c1 = Collision.on(e1, e2);
        if (c1.isHit) {
          const c2 = c1;
          c2.n = scala(-1, c2.n);
          e1.OnCollision(c1, e2);
          e2.OnCollision(c2, e1);
        }
      }
    }
  }
  /*Entityの更新*/
  static Update() {
    for (let i = 0; i < this.entityIndex; i++) {
      let l = this.entityList[i];
      if (l.isUpdater) l.Update();
    }
    EntityManager.Collision();
  }
  /*Entityの更新(Tiltle用)*/
  static UpdateTitle() {
    for (let i = 0; i < this.entityIndex; i++) {
      let l = this.entityList[i];
      if (l.name != "player" && l.isUpdater) l.Update();
    }
  }
  /*メッセージイベント中にアニメーションだけ行う*/
  static Animation() {
    for (let i = 0; i < this.entityIndex; i++) {
      let l = this.entityList[i];
      //playerはアニメーションのみ
      if (l.type == ENTITY.PLAYER) {
        l.Animation();
      }
      //看板は読めるようにする
      if (l.name == "signboard") {
        l.Update();
      }
    }
  }
}
