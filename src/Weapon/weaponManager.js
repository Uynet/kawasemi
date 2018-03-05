import Weapon1 from './weapon1.js';
import Weapon2 from './weapon2.js';
import Weapon3 from './weapon3.js';
import Param from '../param.js';
import UIManager from '../UI/uiManager.js';

export default class WeaponManager{
  static Init(){
    /*singleton list*/
    /*武器のインスタンスを作成*/
    this.weaponList = [
      new Weapon1(),
      new Weapon2(),
      new Weapon3()
    ];
    /*selectBoxの選択*/
    this.select;
  }

  /*プレイヤーの参照を受け取って武器を変更*/
  static ChangeWeapon(player,name){
    UIManager.bullet.ChangeWeapon(name);
    switch (name){
      case "missile":
        player.weapon = this.weaponList[0];
        break;
      case "laser":
        player.weapon = this.weaponList[1];
        break;
      case "3":
        player.weapon = this.weaponList[2];
        break;
    }
    Param.player.equip = name;
  }


}
