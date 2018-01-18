import Timer from './timer.js';

//便利関数
export default class Util{
  static Init(){
    /* easing function 
     * d : 必要時間
     * b : 開始点
     * c : 移動量
     * type : 関数を選択 */
    this.ease = function*(d,b,c,type){
      let x = 0;
      let s = Timer.timer;//開始時点の時刻
        let f = Util.easefunc(type);
      while(x < 1){
        x = (Timer.timer - s)/d;
        yield b + c*f(x);
      }
      yield b + c;
    }
  }

  /*easing functionの連想配列的な*/
  /* out : easeout */
  static easefunc(type){
    switch(type){
      case "out" :
        return (x)=>{return Math.sqrt(x)};
        break;
      default :
        console.warn("easing function");
        break;
    }
  }

  static distance(p1,p2){
    return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
  }

  //ベクトルの正規化
  static nomalize(v){
    let a = Math.sqrt(v.x * v.x + v.y * v.y);
    v.x /= a;
    v.y /= a;
    return v;
  }

  //配列の最大値を取るインデックス番号を返す
  //最大値が複数あると一番最後の番号が帰ってくる
  static maxIndex(arr){
    let max = arr[0];
    let maxI = 0;
    for(let i = 1;i<arr.length;i++){
      if(max < arr[i]){
        max = arr[i];
        maxI = i;
      }
    }
    return maxI;
  }

  static advec(v1,v2){
    return {x:v1.x + v2.x ,y:v1.y + v2.y};
  }

  static quad(x){
    return x*x;
  }
}
