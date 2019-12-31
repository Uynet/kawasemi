import EntityManager from "../Stage/entityManager.js";
import UIManager from "../UI/uiManager.js";
import Scene from "./scene.js";
import Audio from "../audio.js";
import Input from "../input.js";
import MapData from "../Stage/mapData.js";
import Game from "../game.js";

export default class MainScene extends Scene {
  constructor() {
    super();
    this.name = "main";
    this.frame = 0;
  }
  Init() {
    MapData.DeleteStage();
    UIManager.Clean();
    UIManager.SetStage();
    UIManager.PopStage();
    Audio.StopBGM();
    MapData.CreateStage(Game.stage, "ENTER");
  }
  Update() {
    if (this.frame > 50) {
      EntityManager.Update();
      UIManager.Update();

      /*ポーズ状態に遷移*/
      if (isDebugMode && Input.isKeyClick(KEY.ESC)) {
        UIManager.SetMenu();
        Game.scene.PushSubState("PAUSE");
      }
    }
    this.frame++;
  }
}
