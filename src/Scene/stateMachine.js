/*
interface :
    states = [q0,q1,q2];     状態集合
   reducer = (q,a)=>q2    状態遷移関数
*/

export default class StateMachine {
  constructor(states, reducer, initialState) {
    this.states = states;
    this.reducer = reducer;
    this.state = initialState;
    this.state.Init();
    this.states.forEach(state => {
      state.stateMachine = this;
    });
  }
  transit(stateName) {
    this.state = this.states.filter(e => e.name == stateName)[0];
    this.state.Init();
  }
  getState() {
    return this.state;
  }
}
