import Art from "../art.js";
import Font from "./font.js";
import Param from "../param.js";
import Gauge from "./gauge.js";

const POS_VALUE = {
  x: 22,
  y: 4
};
//HP Icon
const POS_ICON = {
  x: -16,
  y: 0
};
//weaponList
const POS_weaponList = {
  x: -12,
  y: 16
};
const POS_BAR = {
  x: -3.5,
  y: -7
};
class Shot {
  constructor(ui) {
    function* shot() {
      let timer = 3;
      while (timer > 0) {
        ui.sprite.position.x = ui.pos.x - (timer * timer) / 2;
        timer--;
        yield;
      }
      yield;
    }
    this.func = shot();
  }
  Do() {
    return this.func.next();
  }
}

export default class GaugeBullet extends Gauge {
  constructor(pos) {
    super(pos);
    this.eventList = [];
    /*基本情報*/
    this.type = "BULLET";
    this.name = "bullet";
    /*パラメータ*/
    this.maxGaugeValue = Param.player.maxBullet;
    this.color = 0xca5148;
    /*child*/
    this.outer = { pos: copy(pos) };
    this.bar = { pos: add(copy(pos), POS_BAR) };
    this.icon = { pos: add(pos, POS_ICON) };
    this.value = new Font(
      add(pos, POS_VALUE),
      this.maxGaugeValue + "",
      "BULLET"
    ); //数字

    /*スプライト*/
    this.sprite = new PIXI.Container();
    this.InitChildren();
  }
  InitWeaponList() {
    let s;
    let list = Object.keys(Param.player.havingWeaponList);
    list = list.filter(arr => {
      return Param.player.havingWeaponList[arr];
    });
  }
  InitChildren() {
    //outer
    this.CreateChild("outer"); //outer

    //bar
    let rect = new PIXI.Graphics();
    rect.beginFill(this.color);
    rect.drawRect(this.bar.pos.x, this.bar.pos.y, 62, 12);
    rect.endFill();
    this.barSprite = rect;
    this.barSprite.position = this.bar.pos;
    this.sprite.addChild(this.barSprite);
    //icon
    let equip = Param.player.equip;
    this.iconSprite = Art.CreateSprite(Art.UIPattern.bullet.icon[equip]);
    this.iconSprite.position = this.icon.pos;
    this.sprite.addChild(this.iconSprite);
    //value
    this.sprite.addChild(this.value.sprite);
    this.InitWeaponList();
  }
  Push(weaponName) {}
  ChangeWeapon(name) {
    //アイコンを武器に変更
    this.iconSprite.texture = Art.UIPattern.bullet.icon[name];
  }
  Shot() {
    this.eventList.push(new Shot(this));
  }
  Update() {
    this.sprite.position.x = this.pos.x;
    //elast
    for (let e of this.eventList) {
      if (e.Do().done) {
        this.eventList.remove(e);
      }
    }
  }
}
