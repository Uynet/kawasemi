/*state : */
export default class Scene{
  static Init(){
    this.state = STATE.STAGE;
  }
  static ChangeState(newState){
    this.state = newState;
  }

}
