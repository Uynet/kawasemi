import UIManager from '../UI/uiManager.js';
/*State 
const STATE = {
  INIT : "INIT",
  STAGE : {
    MES : "MES",
    PAUSE : "PAUSE",
    SEQ : "SEQ",
  },
  TITLE : "TITLE",
}
*/
export default class Scene{
  constructor(){
    this.state = STATE.INIT;
    this.substate = [];
  }

  ChangeState(oldState,newState){
    //UIのクリア
    UIManager.Clean(); 
    switch(newState){
      /*ゲーム画面用 UIの作成*/
      case "TITLE" : UIManager.SetTitle(); break;
      case "STAGE" : UIManager.SetStage(); break;
    }
    this.state = newState;
  }

  PushSubState(sub){
    this.substate.push(sub);
  }
  PopSubState(){
    this.substate.pop();
  }
}
