import EntityManager from "../Stage/entityManager.js";
import UIManager from "../UI/uiManager.js";
import Scene from "./scene.js";

export default class MainScene extends Scene {
  constructor() {
    super();
    this.name = "main";
    this.frame = 0;
    this.messages = [];
    this.keyListenners = [];
  }
  Init() {}
  Update() {
    EntityManager.Update();
    UIManager.Update();
  }
}
