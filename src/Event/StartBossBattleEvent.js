import Audio from "../audio.js";
import Drawer from "../drawer.js";
import Timer from "../timer.js";
import StagePop from "../UI/stagePop.js";
import UIManager from "../UI/uiManager.js";
import Event from "./event.js";
import GaugeBossHP from "../UI/gaugeBossHP.js";

const POS_BossHP = vec2(4, 180); //BossHP
export default class StartBossBattleEvent extends Event {
  constructor(BGMTitle) {
    if (!BGMTitle) console.warn("タイトルを入れて");
    super();
    function* gen() {
      let p = {
        x: 96,
        y: 64
      };
      //Drawer.Stage.filters.push(Drawer.testFilter);
      UIManager.add(new GaugeBossHP(POS_BossHP)); //HP
      let timer = 0;
      let po = 300;
      //if (Audio.PlayingBGM.source !== null)
      Audio.PlayBGM(BGMTitle, 2.3);
      UIManager.add(new StagePop(p, "^   - どうくつ   ぼす -$", 7));
      while (timer < po) {
        Drawer.SetMagnification(3 - Math.pow(timer / po, 3));
        Timer.SetTimeScale(timer / po, 2);
        timer++;
        yield;
      }
      Timer.SetTimeScale(1);
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
