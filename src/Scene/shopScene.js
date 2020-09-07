import Scene from "./scene.js";
import UIManager from "../UI/uiManager.js";
import EntityManager from "../Stage/entityManager.js";
import Shop from "../UI/shop.js";
import Shop2 from "../UI/shop2.js";

export default class ShopScene extends Scene {
  constructor() {
    super();
    this.name = "shop";
  }
  Init() {
    UIManager.add(new Shop2());
  }
  Update() {
    EntityManager.Animation();
    UIManager.Update();
  }
}
