import Scene from "./scene.js";
import EntityManager from "../Stage/entityManager.js";
import UIManager from "../UI/uiManager.js";

// 会話イベント用
export default class ScriptScene extends Scene{
  constructor() {
    super();
    this.name = "script";
  }
  setScript(script){
    this.script = script;
    this.script.Init();
  }
  Init() {
    this.frame = 0;
  }
  Update() {
    EntityManager.Update();
    UIManager.Update();
    this.script.Update();
    this.frame++;
  }
}