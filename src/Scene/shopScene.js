import Scene from "./scene.js";
import UIManager from "../UI/uiManager.js";
import EntityManager from "../Stage/entityManager.js";
import Shop from "../UI/shop.js";

export default class ShopScene extends Scene {
  constructor() {
    super();
    this.name = "shop";
  }
  Init() {
    UIManager.add(new Shop());
  }
  Update() {
    console.log("ya");
    EntityManager.Animation();
    UIManager.Update();
  }
}
