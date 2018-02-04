/*state*/
export default class Scene{
  constructor(){
    this.stack = [];
    this.state = STATE.STAGE;//;STATE.TITLE;
  }

  ChangeState(newState){
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
