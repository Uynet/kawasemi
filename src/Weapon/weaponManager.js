import Weapon1 from './weapon1.js';
import Weapon2 from './weapon2.js';

export default class WeaponManager{
  static Init(){
    /*singleton list*/
    /*武器のインスタンスを作成*/
    this.weaponList = [
      new Weapon1(),
      new Weapon2()
    ];
    /*selectBoxの選択*/
    this.select;
  }

  /*プレイヤーの参照を受け取って武器を変更*/
  static ChangeWeapon(player,name){
    switch (name){
      case "1":
        player.weapon = this.weaponList[0];
        break;
      case "2":
        player.weapon = this.weaponList[1];
        break;
      case "3":
        player.weapon = this.weaponList[2];
        break;
    }
  }


}
