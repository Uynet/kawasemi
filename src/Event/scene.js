import UIManager from '../UI/uiManager.js';
import EntityManager from '../Stage/entityManager.js';
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
    this.substate = ["DEFAULT"];
  }

  ChangeState(oldState,newState){
    //UIのクリア
    UIManager.Clean(); 
    switch(newState){
      /*ゲーム画面用 UIの作成*/
      case "TITLE" : UIManager.SetTitle(); break;
      case "STAGE" : UIManager.SetStage(); break;
    }
    cl(EntityManager.player);
    this.state = newState;
  }

  PushSubState(sub){
    this.substate.push(sub);
  }
  PopSubState(){
    this.substate.pop();
  }
}
