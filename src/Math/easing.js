export default class Ease{
  static linear(d,b,c){
    return (t)=>{

    }
  }
  //a^t
  static pow(a){
    return (t)=>{
      Math.exp(Math.log(a)*t);
    }
  }
}

/*
const e = ease.In.quad(10000, 0, 100); // 下に凸な二次関数
const e1 = ease.Inout.sine(2); // 三角関数
const e2 = new ease.Out(x => x - Math.sin(x*Math.PI)/Math.PI, 5) // よくわからん関数

// 使い方
// pをPIXIのオブジェクトとして以下のようにすると滑らかに動いたり
p.x = e.value
p.y = e2.value*100
