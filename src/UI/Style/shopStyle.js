//import Drawer from "../../drawer.js";
const hilight=0xef1f6a
const main = 0x403080
const base = 0x100030
const accent= 0xf3b000
//const gameSreensize = Drawer.GetGameScreenSize();
const gameSreensize = vec2(800/2,640/2);

const shopStyle = {
  div:{
    margin : vec2(2),
    color:base
  },
  price:{
    margin : vec2(8),
    position : vec2(0.75,0.5),
    size   : vec2(0.07,0.05),
    color:main
  },
  list:{
    position : vec2(0.3,0.3),
    size   : vec2(0.36,0.091),
    color:main
  },
  description:{
    position : vec2(0.0,0.5),
    margin: vec2(8,0),
    size   : vec2(0.7,0.2),
    color:main
  },
  keyGuide:{
    position : vec2(0.40,0.90),
    margin: vec2(8,0),
    size   : vec2(0.55,0.07),
    color:main
  },
  root:{
    margin : mul(vec2(0.05),gameSreensize),
    color:hilight 
  }
}
//export {shopStyle}
