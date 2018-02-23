import UIManager from '../UI/uiManager.js';
/*state*/
export default class Scene{
  constructor(){
    this.stack = [];
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

  /* 新しい状態をスタックにプッシュして遷移 */
  PushState(newState){
    this.stack.push(newState);
    this.state = newState();
  }
  /* 現在の状態を抜ける */
  PopState(){
    /*debug*/
    console.assert(this.stack.length > 0 );
    this.state = this.stack.pop();
  }
}
