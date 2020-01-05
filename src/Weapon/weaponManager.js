import Audio from "../audio.js";
import Param from "../param.js";
import UIManager from "../UI/uiManager.js";
import Weapon1 from "./weapon1.js";
import Weapon2 from "./weapon2.js";
import Weapon3 from "./weapon3.js";
import Weapon4 from "./weapon4.js";
import Weapon5 from "./weapon5.js";

export default class WeaponManager {
  static Init() {
    /*singleton list*/
    /*武器のインスタンスを作成*/
    this.weapons = {
      missile: new Weapon1(),
      laser: new Weapon2(),
      normal: new Weapon3(),
      weapon4: new Weapon4(),
      weapon5: new Weapon5()
    };
    /*selectBoxの選択*/
    this.select;
  }

  /*プレイヤーの参照を受け取って武器を変更*/
  static ChangeWeapon(player, name) {
    Audio.PlaySE("changeWeapon", 0);
    cl(UIManager.find("BULLET"));
    UIManager.find("BULLET")[0].ChangeWeapon(name);
    player.weapon = this.weapons[name];
    Param.player.equip = name;
  }
}
