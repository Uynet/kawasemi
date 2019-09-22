import Audio from "../audio.js";
import Explosion1 from "../Entity/Effect/Explosion/explosion1.js";
import QuakeEvent from "../Event/quakeEvent.js";
import EntityManager from "../Stage/entityManager.js";
import Event from "./event.js";
import EventManager from "./eventmanager.js";

export default class OpenWallEvent extends Event {
  constructor() {
    super();
    function* gen() {
      //stage1で開く壁の為 だけ に 作られている!
      EntityManager.removeEntity(EntityManager.wallList[82]);
      EntityManager.removeEntity(EntityManager.wallList[80]);
      EntityManager.removeEntity(EntityManager.wallList[72]);
      EntityManager.removeEntity(EntityManager.wallList[67]);
      EntityManager.removeEntity(EntityManager.wallList[61]);
      EntityManager.removeEntity(EntityManager.wallList[56]);

      let p = {
        x: 160,
        y: 352
      };
      EntityManager.addEntity(new Explosion1(p));
      p.y -= 32;
      EntityManager.addEntity(new Explosion1(p));
      p.y -= 32;
      EntityManager.addEntity(new Explosion1(p));
      let e = new QuakeEvent(20, 0.9);
      EventManager.eventList.push(e);
      Audio.PlaySE("missileHit");
    }
    let itt = gen();
    this.func = itt;
  }
}
