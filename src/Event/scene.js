import UIManager from '../UI/uiManager.js';
/*state*/
export default class Scene{
  constructor(){
    this.state = STATE.INIT;
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
}
