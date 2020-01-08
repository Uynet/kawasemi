import Art from "../art.js";
import Drawer from "../drawer.js";
import Event from "./event.js";

/*タイトル画面からゲーム開始画面に移行するイベント */
export default class FadeEvent extends Event {
  constructor(onFadeInEnd, onFadeOutStart, onFadeOutEnd) {
    super(); //どうでもいい
    function* FadeOut() {
      let pattern = Art.seqPattern;
      let seq = new Array(400);
      let spid = 0;
      let frame = 0;
      //♢を初期化して追加
      for (let i = 0; i < 400; i++) {
        let sp = Art.Sprite(pattern[spid]);
        let y = Math.floor(i / 20);
        let x = i % 20;
        sp.scale = vec2(2);
        sp.position.x = x * 16 - 24;
        sp.position.y = y * 16 - 24;
        seq[i] = sp;
        Drawer.add(sp, "FILTER");
      }
      while (frame < 40) {
        for (let i = 0; i < 400; i++) {
          //上から下へ
          spid = Math.max(0, Math.min(Math.floor(frame - i / 8), 15));
          seq[i].texture = pattern[spid];
        }
        frame++;
        yield;
      }

      onFadeInEnd();
      frame = 0;
      while (frame < 10) {
        frame++;
        yield;
      }
      onFadeOutStart();
      while (frame < 40) {
        for (let i = 0; i < 400; i++) {
          spid = 16 + Math.max(0, Math.min(Math.floor(frame - i / 8), 15));
          seq[i].texture = pattern[spid];
        }
        frame++;
        yield;
      }
      for (let i = 0; i < 400; i++) {
        Drawer.remove(seq[i], "FILTER");
      }
      onFadeOutEnd();
      yield;
    }

    let itt;
    itt = FadeOut();
    this.func = itt;
  }
}
