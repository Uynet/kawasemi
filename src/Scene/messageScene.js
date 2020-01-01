import Input from "../input.js";
import Scene from "./scene.js";
import UIManager from "../UI/uiManager.js";
import EntityManager from "../Stage/entityManager.js";
import Game from "../game.js";

export default class MessageScene extends Scene {
  constructor() {
    super();
    this.name = "title";
  }
  Init() {
    UIManager.EnterShop();
  }
  Update() {
    EntityManager.Animation();
    UIManager.Update();
    if (Input.isKeyClick(KEY.X)) Game.state.dispatch("closeMessage");
  }
}
