/*singleton*/
class Input{
  constructor(){
    this.inputedKeyList = [];
    for(let i = 0;i<256;i++){
      this.inputedKeyList[i] = false;
    }
    /*statemant as singleton*/
    //if(typeof Input.instance === "object"){
    //  return Input.instance;
    //}
    //Input.instance = this;
    //return this;
  }

  isKeyInput(key){
    return this.inputedKeyList[key];
  }
}

/*receive input event*/
$(document).on("keydown",(e)=> {
  input.inputedKeyList[event.keyCode] = true;
});
$(document).on("keyup",(e)=> {
  input.inputedKeyList[event.keyCode] = false;
});

