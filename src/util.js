import Timer from './timer.js';

//便利関数
export default class Util{
  static Init(){
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

  /*ベクトル系*/
  //ベクトルの正規化
  static nomalize(v){
    let a = Math.sqrt(v.x * v.x + v.y * v.y);
    v.x /= a;
    v.y /= a;
    return v;
  }
  //ベクトルの加算
  static advec(v1,v2){
    return {x:v1.x + v2.x ,y:v1.y + v2.y};
  }
  //-d ~ +d までの値を返す
  static Rand(d){
    return 2 * d * (Math.random()-0.5);
  }
  //-d ~ +d までの値を返す
  static Rand2D(d){
    let p = {
      x:this.Rand(d),
      y:this.Rand(d)
    }
    return p;
  }
  //0ベクトルを返す
  static Vec0(){
    let p = {
      x:0,
      y:0
    }
    return p;
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
  static minIndex(arr){
    let min = arr[0];
    let minI = 0;
    for(let i = 1;i<arr.length;i++){
      if(min > arr[i]){
        min = arr[i];
        minI = i;
      }
    }
    return minI;
  }


  static quad(x){
    return x*x;
  }

}
