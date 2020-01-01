import Art from "./art.js";
import Audio from "./audio.js";
import Drawer from "./drawer.js";
import EventManager from "./Event/eventmanager.js";
import Input from "./input.js";
import Timer from "./timer.js";
import LoadingScene from "./scene/loadingScene.js";
import Pipeline from "./pipeline.js";

import { debugOption } from "./debug.js";

/* 
　このコードを読んでくれてる人へ

             もちもちねこをどうぞ 
                （＾・ω・＾✿）

*/
export default class Game {
  static Init() {
    Pipeline.InitializeStaticClasses();
    Game.stage = isDebugMode ? debugOption.entryStage : 1;
    Game.continuePoint = 1; //コンティニュー地点
    Game.state = Pipeline.CreateGameState();
    Game.scene = new LoadingScene();
    Game.Update();
  }
  static async Load() {
    await Art.LoadTexture();
    Audio.Load();
    Game.Init();
    Input.returnScroll(); //スクロール解除
  }
  static Update() {
    EventManager.Update();
    //cl(Game.state.getState().name);
    Game.state.getState().Input(); //controller
    Game.state.getState().Update(); // update current scene
    Drawer.Renderer.render(Drawer.Stage);
    Audio.Update();
    Timer.Update();
    requestAnimationFrame(Game.Update);
  }
}
