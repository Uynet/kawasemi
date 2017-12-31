/*singleton*/
class Keyboard{
  constructor(){
    this.key;
    /*statemant as singleton*/
    if(typeof Keyboard.instance === "object"){
      return Keyboard.instance;
    }
    Keyboard.instance = this;
    return this;
  }
}


/*receive input event*/
document.onkeydown = (e)=> {
  let keyboard = new Keyboard();
  keyboard.key = event.keyCode;
};
