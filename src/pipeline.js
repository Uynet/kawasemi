import StageData from "./Stage/stageData.js";
import UIManager from "./UI/uiManager.js";
import Drawer from "./drawer.js";
import Pool from "./Stage/pool.js";
import WeaponManager from "./Weapon/weaponManager.js";
import EventManager from "./Event/eventmanager.js";
import Param from "./param.js";
import DistanceField from "./Stage/distanceField.js";
import ChunkDetector from "./Stage/chnukDetector.js";

import LoadingScene from "./Scene/loadingScene.js";
import TitleScene from "./Scene/titleScene.js";
import MainScene from "./Scene/mainScene.js";
import MenuScene from "./Scene/menuScene.js";
import ShopScene from "./Scene/shopScene.js";
import SignboardScene from "./Scene/signboardScene.js";
import WorldMapScene from "./Scene/worldMapScene.js";
import TransitionScene from "./Scene/transitionScene.js";

import StateMachine from "./Scene/stateMachine.js";
import Timer from "./timer.js";
import EntityManager from "./Stage/entityManager.js";
import ScriptScene from "./Scene/scriptScene.js";
import Flags from "./Scene/Script/flags.js";

export default class Pipeline {
  static InitializeStaticClasses() {
    /*audioとartはinitしない*/
    Param.Init();
    Drawer.Init();
    EventManager.Init();
    WeaponManager.Init();
    EntityManager.Init();
    Pool.Init();
    Timer.Init();
    UIManager.Init();
    StageData.Init();
    DistanceField.Init();
    Flags.Init();
    ChunkDetector.Init();
  }
  static CreateGameState() {
    const scenes = [
      new LoadingScene(),
      new TitleScene(),
      new MainScene(),
      new ShopScene(),
      new SignboardScene(),
      new WorldMapScene(),
      new TransitionScene(),
      new MenuScene(),
      new ScriptScene()
    ];
    return new StateMachine(scenes);
  }
}
