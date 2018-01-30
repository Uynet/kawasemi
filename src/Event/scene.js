/*state*/
export default class Scene{
  static Init(){
    this.stack = [];
    this.state = STATE.TITLE;
  }

  static ChangeState(newState){
    this.state = newState;
  }

  /* 新しい状態をスタックにプッシュして遷移 */
  static PushState(newState){
    this.stack.push(newState);
    this.state = newState();
  }
  /* 現在の状態を抜ける */
  static PopState(){
    /*debug*/
    console.assert(this.stack.length > 0 );
    this.state = this.stack.pop();
  }
}
