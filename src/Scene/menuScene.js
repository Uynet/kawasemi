import UIManager from "../UI/uiManager.js";
import Scene from "./scene.js";
import Input from "../input.js";
import Game from "../game.js";
import Drawer from "../drawer.js";
import MenuPage from "../UI/Page/menuPage.js";
import EntityManager from "../Stage/entityManager.js";
import Timer from "../timer.js";

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
      Timer.timeScale = 1.0;
      Game.state.transit("main");

      player.ChangeWeapon(selectedWeaponName);
      Drawer.entityContainer.filters = [];
      Drawer.backContainer.filters = [];
      Drawer.foreContainer.filters = [];
      Drawer.backGroundContainer.filters = [];
    }
  }
  Init() {
    Drawer.entityContainer.filters = [Drawer.blurFilter];
    Drawer.backContainer.filters = [Drawer.blurFilter];
    Drawer.foreContainer.filters = [Drawer.blurFilter];
    Drawer.backGroundContainer.filters = [Drawer.blurFilter];
    this.frame = 0;
    UIManager.add(new MenuPage());
  }
  Update() {
    Timer.timeScale = 0.05;
    EntityManager.Update();
    UIManager.Update();
    this.frame++;
  }
}
