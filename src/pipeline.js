import StageData from "./Stage/stageData.js";
import UIManager from "./UI/uiManager.js";
import Drawer from "./drawer.js";
import Pool from "./Stage/pool.js";
import WeaponManager from "./Weapon/weaponManager.js";
import EventManager from "./Event/eventmanager.js";
import Param from "./param.js";
import DistanceField from "./Stage/distanceField.js";
import Scene from "./Scene/scene.js";
import StateMachine from "./Scene/stateMachine.js";
import Timer from "./timer.js";
import EntityManager from "./Stage/entityManager.js";

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
  }
  static CreateGameStateMachine() {
    const loadingScene = new Scene();
    return new StateMachine();
  }
}
