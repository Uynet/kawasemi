import Input from "../input.js";
import Scene from "./scene.js";
import UIManager from "../UI/uiManager.js";
import EntityManager from "../Stage/entityManager.js";
import Game from "../game.js";

export default class MessageScene extends Scene {
  constructor() {
    super();
    this.name = "message";
  }
  Input() {
    if (Input.isKeyClick(KEY.C)) {
      Game.state.dispatch("closeMessage");
    }
  }
  Init() {
    UIManager.EnterShop();
  }
  Update() {
    EntityManager.Animation();
    UIManager.Update();
  }
}
