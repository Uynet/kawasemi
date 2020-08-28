import Scene from "./scene.js";
import EntityManager from "../Stage/entityManager.js";

// 会話イベント用
export default class ScriptScene extends Scene{
  constructor() {
    super();
    this.name = "script";
  }
  setScript(script){
    this.script = script;
  }
  Init() {
    this.frame = 0;
  }
  Update() {
    EntityManager.Animation();
    this.script.Update();
    this.frame++;
  }
}