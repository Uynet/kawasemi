import Art from "./art.js";
import Audio from "./audio.js";
import Drawer from "./drawer.js";
import EventManager from "./Event/eventmanager.js";
import StartGameEvent from "./Event/startGameEvent.js";
import StartStageEvent from "./Event/startStageEvent.js";
import Input from "./input.js";
import Param from "./param.js";
import DistanceField from "./Stage/distanceField.js";
import EntityManager from "./Stage/entityManager.js";
import Pool from "./Stage/pool.js";
import Timer from "./timer.js";
import UIManager from "./UI/uiManager.js";
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
    /*audioとartはinitしない*/
    Pipeline.InitializeStaticClasses();

    /*initialize Game state*/
    //現在のステージ番号
    if (isDebugMode) Game.stage = debugOption.entryStage;
    else Game.stage = 1;
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
  static UpdatePause() {
    UIManager.Update();
  }
  static Update() {
    EventManager.Update();
    Game.state.getState().Update(); // update current scene
    /*描画*/
    Drawer.Renderer.render(Drawer.Stage);
    Audio.Update();
    Timer.Update();
    requestAnimationFrame(Game.Update);
  }
}
