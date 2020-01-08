import Event from "./event.js";

export default class StartGameEvent extends Event {
  constructor() {
    super(1);
    function* gen() {
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
