import Drawer from "../drawer.js";
import Collision from "../Collision/collision.js";

export default class EntityManager {
  static Init() {
    this.entityList = []; // ALL entities
    this.enemyList = []; // enemies
    this.moverList= []; // movable entites : need to dynamic stage load
    this.wallList = []; 
    this.player; 
    this.updaterList = []; //entities who need to update
    this.colliderList = [];

    this.entityIndex = 0;
  }

  static addEntity(entity) {
    this.entityList[this.entityIndex] = entity;
    this.entityIndex++;

    switch (entity.type) {
      case ENTITY.MOVER:
        this.moverList.push(entity);
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

  static removeEntity(entity) {
    let i;
    switch (entity.type) {
      case ENTITY.MOVER:
        this.moverList.remove(entity);
        break;
      case ENTITY.PLAYER:
        this.player = null;
        this.removeEntity(entity.spilit);
        this.colliderList.remove(entity);
        break;
      case ENTITY.ENEMY:
        this.enemyList.remove(entity);
        this.colliderList.remove(entity);
        break;
      case ENTITY.WALL:
        this.wallList.remove(entity);
        this.colliderList.remove(entity);
        break;
    }
    this.entityList.remove(entity);
    this.entityIndex--;

    if (entity.isMultiple) Drawer.remove(entity.container, entity.layer);
    else if (entity.isNoSprite /*Nothing to do*/);
    else Drawer.remove(entity.sprite, entity.layer);
  }

  /*
    get entities who has the specified name and return an array;
    this returns null when nobady has the name ;
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
        //if(e2.name=="wall")continue
        if (
          e1.name != "player" &&
          e1.name != "spilit" &&
          e2.name != "player" &&
          e2.name != "spilit"
        )
          continue;
        if (e1.name == "needle" || e2.name == "needle") continue;

        // revert normal 
        const c1 = Collision.on(e1, e2);
        const c2 = Collision.on(e2, e1);
        if (c1.isHit) {
          
          e1.OnCollision(c1, e2);
          e2.OnCollision(c2, e1);
        }
      }
    }
  }

  static Update() {
    for (let i = 0; i < this.entityIndex; i++) {
      let l = this.entityList[i];
      if (l.isUpdater) l.Update();
    }
    EntityManager.Collision();
  }

  static UpdateTitle() {
    for (let i = 0; i < this.entityIndex; i++) {
      let l = this.entityList[i];
      if (l.name != "player" && l.isUpdater) l.Update();
    }
  }
  /* only animate while in a event of message*/
  static Animation() {
    for (let i = 0; i < this.entityIndex; i++) {
      let l = this.entityList[i];
      //player only does animation.
      if (l.type == ENTITY.PLAYER) {
        l.Animation();
      }
      //signboards are readable.
      if (l.name == "signboard") {
        l.Update();
      }
    }
  }
}
