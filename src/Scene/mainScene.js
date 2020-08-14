import EntityManager from "../Stage/entityManager.js";
import UIManager from "../UI/uiManager.js";
import Scene from "./scene.js";
import Input from "../input.js";
import Game from "../game.js";
import ChunkDetector from "../Stage/chnukDetector.js";

export default class MainScene extends Scene {
  constructor() {
    super();
    this.name = "main";
    this.frame = 0;
    this.messages = [];
    this.keyListenners = [];
  }
  Input() {
    if (Input.isKeyClick(KEY.C) && EntityManager.player.isAlive) {
      Game.state.transit("menu");
    }
  }
  Init() {}
  Update() {
    ChunkDetector.Update();
    EntityManager.Update();
    UIManager.Update();
  }
}
