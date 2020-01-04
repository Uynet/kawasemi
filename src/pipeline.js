import StageData from "./Stage/stageData.js";
import UIManager from "./UI/uiManager.js";
import Drawer from "./drawer.js";
import Pool from "./Stage/pool.js";
import WeaponManager from "./Weapon/weaponManager.js";
import EventManager from "./Event/eventmanager.js";
import Param from "./param.js";
import DistanceField from "./Stage/distanceField.js";

import LoadingScene from "./Scene/loadingScene.js";
import TitleScene from "./Scene/titleScene.js";
import MainScene from "./Scene/mainScene.js";
import MessageScene from "./Scene/messageScene.js";

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
  static CreateGameState() {
    const loadingScene = new LoadingScene();
    const titleScene = new TitleScene();
    const mainScene = new MainScene();
    const messageScene = new MessageScene();

    const scenes = [loadingScene, titleScene, mainScene, messageScene];
    const reducerJSON = {
      loading: { loadComplete: titleScene },
      title: { onEnter: mainScene },
      main: { openMessage: messageScene },
      message: { closeMessage: mainScene }
    };
    //こうなってほしいな
    //const reducer = ParceReducer(reducerJSON);

    const reducer = (scene, action) => {
      if (scene.name == "loading")
        if (action == "loadComplete") return titleScene;
      if (scene.name == "title") if (action == "onEnter") return mainScene;
      if (scene.name == "main")
        if (action == "openMessage") return messageScene;
      if (scene.name == "message")
        if (action == "closeMessage") return mainScene;
      console.error("Invalid action:" + action);
      console.error(scene);
      return mainScene;
    };
    const initialState = loadingScene;
    return new StateMachine(scenes, reducer, initialState);
  }
}
