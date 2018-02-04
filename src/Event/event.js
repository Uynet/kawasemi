export default class Event{
  constructor(func,args){
    this.func = func;/*実行する関数*/
    this.args = args;/*引数の配列*/
  }
  Do(){
    //?
    return this.func.next();
  }
}
