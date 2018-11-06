export default class Ease{
  static pow(a){
    return t=>{
      return Math.exp(Math.log(a)*t);
    }
  }
}
