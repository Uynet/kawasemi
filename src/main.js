/*｡+☆.En†rypoinT.☆+｡*/
import Game from './game.js'; 

/*拡大方式をニアレストネイバーに*/
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const po = ()=>{
  Game.Load();
  let a = document.getElementById("po");
  a.innerHTML = "こんにちわ";
}
setTimeout(po,1000);


