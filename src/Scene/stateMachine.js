export default class StateMachine {
  constructor(states) {
    this.states = states;
    this.state = states[0];
    this.state.Init();
    this.states.forEach(state => {
      state.stateMachine = this;
    });
  }
  transit(stateName) {
    this.state = this.states.filter(e => e.name == stateName)[0];
    if(!this.state)console.error("state not found:"+stateName);

    this.state.Init();
  }
  getState() {
    return this.state;
  }
}
