import EntityManager from "../Stage/entityManager.js";
import UIManager from "../UI/uiManager.js";
import Scene from "./scene.js";
import Input from "../input.js";
import Game from "../game.js";

export default class MainScene extends Scene {
  constructor() {
    super();
    this.name = "main";
    this.frame = 0;
    this.messages = [];
  }
  Input() {
    if (isDebugMode && Input.isKeyClick(KEY.ESC)) {
      UIManager.SetMenu();
      Game.scene.PushSubState("PAUSE");
    }
    this.messages = EntityManager.Find("shop");
    if (EntityManager.player) {
      this.messages.forEach(e => {
        if (e.isCanRead()) {
          EntityManager.player.isCanRead = true;
          if (Input.isKeyClick(KEY.X)) {
            Game.state.dispatch("openMessage");
          }
        }
      });
    }
  }
  Init() {}
  Update() {
    if (this.frame++ > 50) {
      EntityManager.Update();
      UIManager.Update();
    }
  }
}
