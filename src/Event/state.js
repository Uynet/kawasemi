import UIManager from "../UI/uiManager.js";

/* 設計思想 */
/* */
export default class State {
  constructor() {
    console.error("このクラス使うな");
    this.state = STATE.INIT;
    this.substate = ["DEFAULT"];
  }

  ChangeState(newState) {
    //UIのクリア
    UIManager.Clean();
    switch (newState) {
      /*ゲーム画面用 UIの作成*/
      case "LOADING":
        UIManager.SetLoading();
        break;
      case "TITLE":
        UIManager.SetTitle();
        break;
      case "STAGE":
        UIManager.SetStage();
        break;
    }
    this.state = newState;
  }

  PushSubState(sub) {
    this.substate.push(sub);
  }
  PopSubState() {
    this.substate.pop();
  }
}
