import EventTrigger from "./eventTrigger.js";
import EntityManager from "../../Stage/entityManager.js";
import StageSetClearEvent from "../../Event/stageSetClearEvent.js";
import EventManager from "../../Event/eventmanager.js";

export default class EventTrigger5 extends EventTrigger {
  constructor(pos) {
    super(pos);
    this.name = "eventTrigger5";
    this.isActive = true;
  }
  OnCollision(collisionInfo, player) {
    if (this.isActive) EventManager.Add(new StageSetClearEvent());
    EntityManager.Find(this.name).forEach(e => {
      e.isActive = false;
      e.Delete();
    });
  }
}
