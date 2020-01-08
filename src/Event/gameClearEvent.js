import Audio from "../audio.js";
import Game from "../game.js";
import Param from "../param.js";
import EntityManager from "../Stage/entityManager.js";
import UIManager from "../UI/uiManager.js";
import Event from "./event.js";
import MapData from "../Stage/mapData.js";
import StagePage from "../UI/Page/stagePage.js";

export default class GameClearEvent extends Event {
  constructor() {
    super();
    function* gen() {
      //ステータス退避
      Param.player.status = {
        hp: EntityManager.player.hp,
        bullet: EntityManager.player.bullet
      };

      let frame = 0;
      Game.stage++;
      if (Game.stage == 11) {
        //Audio.isFadeout=true;
        Audio.StopBGM();
      }
      Audio.PlaySE("stageChange");
      UIManager.PopStage(Game.stage);

      Game.state.transit("transition");
      const transitionState = Game.state.getState();
      transitionState.onFadeInEnd = () => {
        MapData.DeleteStage();
        UIManager.Clean();
        MapData.CreateStage(Game.stage);
        UIManager.add(new StagePage());
      };
      transitionState.onFadeOutStart = () => {
        Game.state.transit("main");
      };
      while (frame < 50) {
        frame++;
        yield;
      }

      Game.continuePoint = 11;
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
