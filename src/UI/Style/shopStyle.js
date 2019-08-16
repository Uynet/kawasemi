//import Drawer from "../../drawer.js";
const hilight=0xef1f6a
const main = 0x403080
const base = 0x100030
const accent= 0xf3b000
//const gameSreensize = Drawer.GetGameScreenSize();
const gameSreensize = vec2(800/2,640/2);

/*SYNTX
 * margin : 親コンポーネントからのマージン px単位
 * position :　コンポーネント内部における相対座標 比率単位 
 * size : 親コンポーネントに対する要素の大きさの比率　
 * color : コンポーネント背景色
 * popin : アニメーションpopinを指定
 */
const shopStyle = {
  div:{
    margin : vec2(8),
    color:base,
    popin:1
  },
  price:{
    //margin : vec2(8),
    position : vec2(0.38,0.17),
    //size   : vec2(0.07,0.05),
    //color:main
    popin:{delay:20}
  },
  list:{
    position : vec2(0.3,0.3),
    size   : vec2(0.36,0.091),
    //color:main
  },
  description:{
    position : vec2(0.0,0.5),
    margin: vec2(8,0),
    size   : vec2(1.0,0.3),
    color:main,
    popin:{delay:10,sus:30},
    blink:{delay:10,sus:20}
  },
  keyGuide:{
    position : vec2(0.40,0.90),
    margin: vec2(8,0),
    size   : vec2(0.55,0.07),
    color:main,
    blink:{delay:17},
    popin:{delay:17,sus:30}
  },
  root:{
    margin : mul(vec2(0.05),gameSreensize),
    color:hilight,
    popin:{delay:0}
  }
}
//export {shopStyle}
