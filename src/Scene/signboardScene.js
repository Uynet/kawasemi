import Scene from "./scene.js";
import UIManager from "../UI/uiManager.js";

export default class SignboardScene extends Scene {
  constructor() {
    super();
    this.name = "message";
  }
  Init() {
    this.frame = 0;
  }
  Update() {
    UIManager.Update();
    this.frame++;
  }
}
