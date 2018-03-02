import Event from './event.js';
import EntityManager from '../Stage/entityManager.js';
import Game from '../game.js';
import EventManager from './eventmanager.js';
import MapData from '../Stage/mapData.js';
import Art from '../art.js';
import Drawer from '../drawer.js';

/*タイトル画面からゲーム開始画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
export default class FadeEvent extends Event{
  constructor(type){
    super();//どうでもいい
    function* FadeOut(){
      let pattern = Art.seqPattern;
      let seq = new Array(400);
      let spid = 0;
      let frame = 0;
      //♢を初期化して追加
      for(let i = 0; i < 400; i++) {
      let sp = Art.SpriteFactory(pattern[spid]);
      let y = Math.floor(i/20);
      let x = i%20;
      sp.scale = VECN(2);
      sp.position.x = x*16-24;
      sp.position.y = y*16-24;
      seq[i] = sp;
      Drawer.addContainer(sp,"FILTER");
    }
      /*フェードアウト*/
      while(frame < 40){
        for(let i = 0; i < 400; i++) {
          //上から下へ
          spid = Math.max(0,Math.min(Math.floor(frame - i/8),15));
          seq[i].texture = pattern[spid];
        }
        frame++;
        yield;
      }
      /*ここでマップをロード*/
      MapData.DeleteStage();
      MapData.CreateStage(Game.stage,"ENTER");

      /*マップデータを生成するのでちょっと待つ*/
      frame = 0;
      while(frame < 10){
        frame++;
        yield
      }
      /*フェードin*/
      Game.scene.PopSubState();
      while(frame < 40){
        for(let i = 0; i < 400; i++) {
          spid = 16 + Math.max(0,Math.min(Math.floor(frame -i/8),15));
          seq[i].texture = pattern[spid];
        }
        frame++;
        yield;
      }
      for(let i = 0; i < 400; i++) {
        Drawer.removeContainer(seq[i],"FILTER");
      }
      yield;
    }

    let itt;
    itt = FadeOut();
    this.func = itt;
  }
}
