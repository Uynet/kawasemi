import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import MapData from '../Stage/mapData.js';
import Game from '../Game.js';
import Timer from '../timer.js';
import Drawer from '../drawer.js';
import Art from '../art.js';

export default class GameOverEvent extends Event{
  //Gameのstateを遷移状態に移行
  constructor(){
    super(1);
    function* Posreset(){

      //画面遷移エフェクトの♢
      let frame = 0;//経過フレーム数 途中で0にしているので注意
      let spid = 0;//スプライト番号
      let pattern = Art.seqPattern;//パターン
      let seq = new Array(400);//各♢
      //♢を初期化して追加
      for(let i = 0; i < 400; i++) {
          let sp = Art.SpriteFactory(pattern[spid]);
          let y = Math.floor(i/20);
          let x = i%20;
          sp.position.x = x*16-8;
          sp.position.y = y*16-8;
          seq[i] = sp;
          Drawer.addContainer(sp,"FILTER");
      }
      /*フェードアウト*/
      while(frame < 50){
        spid = Math.min(Math.floor(frame/2),15);
        for(let i = 0; i < 400; i++) {
          seq[i].texture = pattern[spid];
        }
        frame++;
        yield;
      }
      /*ここでマップをロード*/
        Game.seq = true;

      /*ちょっと待つ*/
      frame = 0;
      while(frame < 20){
        frame++;
      }
      frame = 0;
      /*フェードin*/
      while(frame < 50){
        spid = 16 + Math.min(Math.floor(frame/2),15);
        for(let i = 0; i < 400; i++) {
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
    let itt = Posreset();
    this.func = itt;
  }

}
