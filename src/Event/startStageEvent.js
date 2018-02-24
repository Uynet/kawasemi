import Event from './event.js';
import EntityManager from '../Stage/entityManager.js';
import Game from '../Game.js';
import EventManager from './eventmanager.js';
import MapData from '../Stage/mapData.js';
import Art from '../art.js';
import Drawer from '../drawer.js';

/*タイトル画面からゲーム開始画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
export default class StartStageEvent extends Event{
  constructor(){
    super(1);
    function* gen(){

      //note : Game.seqがtrueの間はEntityは更新されない

      //やっぱり画面移動中も敵動いてて欲しい...
      //Game.isSeq = true;
      Game.scene.PushSubState("SEQ");
      //画面遷移エフェクトの♢
      let frame = 0;//経過フレーム数 途中で0にしているので注意
      let spid = 0;//スプライト番号
      let pattern = Art.seqPattern;//パターン
      let seq = new Array(400);//各♢
      //♢を初期化して追加
      /*
      for(let i = 0; i < 400; i++) {
          let sp = Art.SpriteFactory(pattern[spid]);
          let y = Math.floor(i/20);
          let x = i%20;
          sp.position.x = x*16-8;
          sp.position.y = y*16-8;
          seq[i] = sp;
          Drawer.addContainer(sp,"FILTER");
      }
      */
      /*フェードアウト*/
      /*
      while(frame < 40){
        for(let i = 0; i < 400; i++) {
          //上から下へ
          spid = Math.max(0,Math.min(Math.floor(frame - i/8),15));
          seq[i].texture = pattern[spid];
        }
        frame++;
        yield;
      }
      */
      /*ここでマップをロード*/
      MapData.DeleteStage();
      MapData.CreateStage(Game.stage,"ENTER");

      /*マップデータを生成するのでちょっと待つ*/
      frame = 0;
      while(frame < 10){
        frame++;
        yield
      }
      Game.scene.ChangeState(STATE.TITLE,STATE.STAGE);
      frame = 0;
      /*フェードin*/
      /*
      while(frame < 40){
        Game.seq = false;
        for(let i = 0; i < 400; i++) {
          spid = 16 + Math.max(0,Math.min(Math.floor(frame -i/8),15));
          seq[i].texture = pattern[spid];
        }
        frame++;
        yield;
      }
      */
     /*
      for(let i = 0; i < 400; i++) {
        Drawer.removeContainer(seq[i],"FILTER");
      }
      */
      //Game.isSeq = false;
      Game.scene.PopSubState("SEQ");
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
