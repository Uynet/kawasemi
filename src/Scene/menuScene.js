import UIManager from "../UI/uiManager.js";
import Scene from "./scene.js";
import Input from "../input.js";
import Game from "../game.js";
import Drawer from "../drawer.js";
import MenuPage from "../UI/Page/menuPage.js";
import Entity from "../Entity/entity.js";
import EntityManager from "../Stage/entityManager.js";

export default class MenuScene extends Scene {
  constructor() {
    super();
    this.name = "menu";
    this.frame = 0;
    this.messages = [];
    this.keyListenners = [];
  }
  Input() {
    const player = EntityManager.player;
    if (this.frame != 0 && Input.isKeyClick(KEY.C) && player.isAlive) {
      const menuPage = UIManager.find("menuPage")[0];
      const selectedWeaponName = menuPage.selectedWeaponName;
      UIManager.remove(menuPage);
      Game.state.transit("main");

      player.ChangeWeapon(selectedWeaponName);
      Drawer.entityContainer.filters = [];
    }
  }
  Init() {
    Drawer.entityContainer.filters = [Drawer.blurFilter];
    this.frame = 0;
    UIManager.add(new MenuPage());
  }
  Update() {
    //EntityManager.Update();
    UIManager.Update();
    this.frame++;
  }
}
