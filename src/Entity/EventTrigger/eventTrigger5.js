import EventTrigger from "./eventTrigger.js";
import EntityManager from "../../Stage/entityManager.js";
import Event from "../../Event/event.js";
import UIManager from "../../UI/uiManager.js";
import KeyGuide1 from "../../UI/molecules/keyGuide1.js";

class TutorialEvent extends Event {
  constructor() {
    super(1);
    function* gen() {
      console.log("tutorial");
    }
    let itt = gen();
    this.func = itt;
  }
}

export default class EventTrigger5 extends EventTrigger {
  constructor(pos) {
    super(pos);
    this.name = "eventTrigger1";
    this.isActive = true;
  }
  OnCollision(collisionInfo, player) {
    if (this.isActive) UIManager.add(new KeyGuide1(vec2(100, 100)));
    EntityManager.Find(this.name).forEach(e => {
      e.isActive = false;
      e.Delete();
    });
  }
}
