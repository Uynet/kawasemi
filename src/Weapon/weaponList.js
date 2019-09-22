import Art from "../art.js";
import Param from "../param.js";
import UI from "./ui.js";

//score Icon
const P_OFFSET = {
  x: 0,
  y: 16
};

export default class WeaponList extends UI {
  constructor(pos) {
    super(pos);
    /*基本情報*/
    this.isAlive = true; //消えたらfalse
    this.type = "WLIST";
    this.isMultiple = true;
    this.pos = pos;
    this.pattern = Art.UIPattern.bullet.pop;
    //スプライト
    this.spid = 0;
    this.container = new PIXI.Container();
    //icon
    this.Push();
  }
  Push() {
    let s;
    let wList = Object.keys(Param.player.havingWeaponList);
    wList = wList.filter(arr => {
      return Param.player.havingWeaponList[arr];
    });
    //渡されるposはbulletゲージの位置なので少しずらす
    this.pos = ADV(this.pos, P_OFFSET);
    //アイコンリストをぷっしゅ
    let p = CPV(this.pos);
    for (let w of wList) {
      s = Art.SpriteFactory(this.pattern[w.name]);
      s.position = p;
      this.container.addChild(s);
      p.x += 8;
    }
  }
  Update() {}
}
