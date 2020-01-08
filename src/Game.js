import Art from "./art.js";
import Audio from "./audio.js";
import Drawer from "./drawer.js";
import EventManager from "./Event/eventmanager.js";
import Timer from "./timer.js";
import LoadingScene from "./scene/loadingScene.js";
import Pipeline from "./pipeline.js";
import { debugOption } from "./debug.js";

/* （＾・ω・＾✿） */
export default class Game {
  static Init() {
    Pipeline.InitializeStaticClasses();
    Game.stage = isDebugMode ? debugOption.entryStage : 1;
    Game.latestStage = 102; // クリアしたステージで最も番号の後のもの
    Game.continuePoint = 1; //コンティニュー地点
    Game.state = Pipeline.CreateGameState();
    Game.scene = new LoadingScene();
    Game.Update();
  }
  static async Load() {
    await Art.LoadTexture();
    Audio.Load();
    Game.Init();
  }
  static Update() {
    EventManager.Update();
    Game.state.getState().Input(); //controller
    Game.state.getState().Update(); // current scene
    Drawer.Renderer.render(Drawer.Stage);
    Audio.Update();
    Timer.Update();
    requestAnimationFrame(Game.Update);
  }
}
