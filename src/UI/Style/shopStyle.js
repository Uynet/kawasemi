import Drawer from "../../drawer.js";

const hilight=0xef1f6a
const main = 0x403080
const base = 0x100030
const accent= 0xf3b000

const gameSreensize = Drawer.GetGameScreenSize();

const shopStyle = {
  div:{
    margin : vec2(2),
    color:base
  },
  price:{
    margin : vec2(8),
    position : vec2(0.8,0),
    size   : vec2(0.2,0.2),
    color:main
  },
  list:{
    margin : vec2(8),
    size   : vec2(0.5,0.4),
    color:main
  },
  description:{
    position : vec2(0,0.5),
    margin: vec2(8,0),
    size   : vec2(1.0,0.2),
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

export {shopStyle}
