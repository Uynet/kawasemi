/*
interface :
    states = [q0,q1,q2];                    状態集合
   reducer = (q,a)=>q2    状態遷移関数
*/

export default class StateMachine {
  constructor(states, reducer, initialState) {
    this.states = states; //状態集合
    this.reducer = reducer; //状態遷移関数
    this.state = initialState; //初期状態
  }
  dispatch(action) {
    this.state = this.reducer(this.state, action);
  }
  getState() {
    return this.state;
  }
}
