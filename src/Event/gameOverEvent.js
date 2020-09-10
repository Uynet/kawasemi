import Audio from "../audio.js";
import Game from "../game.js";
import Event from "./event.js";
import MapData from "../Stage/mapData.js";
import UIManager from "../UI/uiManager.js";
import Drawer from "../drawer.js";

export default class GameOverEvent extends Event {
  constructor() {
    super();
    function* gen() {
      Game.state.transit("transition");
      const transitionState = Game.state.getState();
      transitionState.onFadeInEnd = () => {
        if (Game.currentStageSet == 101) {
          return new Promise(resolve => {
            //チュートリアルの時は死んでもそこから
            Game.state.transit("main");
            MapData.DeleteStage();
            MapData.CreateStage(Game.stage, resolve);
          });
        } else {
          MapData.DeleteStage();
          UIManager.CleanBack();
          Drawer.SetMagnification(Drawer.defaultMagnification);
          Game.state.transit("worldMap");
        }
      };
      transitionState.onFadeOutStart = () => {};
      transitionState.onFadeOutEnd = () => {};

      Audio.PlaySE("stageChange", -0.7);

      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
