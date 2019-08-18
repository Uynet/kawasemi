export default class Event {
  constructor(unko) {
    this.func;
    this.callback = [];
  }
  //このイベントがdoneした後に呼ばれるイベント
  AddCallback(event) {
    this.callback.push(event);
  }
  Do() {
    let itt = this.func.next();
    if (itt.done) {
      const c = this.callback.pop();
      if (c) {
        //cl("done:callback", c);
        this.func = c.func;
        itt = this.func.next();
      }
    }
    return itt;
  }
}
