import Scene from "./scene.js";

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
    this.script.Update();
    this.frame++;
  }
}