import Art from "./art.js";
import Audio from "./audio.js";
import Drawer from "./drawer.js";
import EventManager from "./Event/eventmanager.js";
import Timer from "./timer.js";
import Pipeline from "./pipeline.js";
import { debugOption } from "./debug.js";

/* （＾・ω・＾✿） */
export default class Game {
  static Init() {
    Pipeline.InitializeStaticClasses();
    Game.stage = isDebugMode ? debugOption.entryStage : 1;
    Game.latestStage = isDebugMode ? 999 : 0; //クリアしたステージで最も番号が後のもの
    Game.nextStage = isDebugMode ? 999 : 201; //クリアしてないステージで最も番号が小さいもの
    Game.currentStageSet = 101; // 現在のstageSetの先頭stage
    Game.state = Pipeline.CreateGameState();
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
