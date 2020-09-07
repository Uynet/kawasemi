import Scene from "./scene.js";
import UIManager from "../UI/uiManager.js";
import EntityManager from "../Stage/entityManager.js";
import Shop from "../UI/shop.js";
import Shop2 from "../UI/Page/shop/shop2.js";
import Input from "../input.js";
import Timer from "../timer.js";

export default class ShopScene extends Scene {
  constructor() {
    super();
    this.name = "shop";
    this.shop = null;
  }
  Init() {
    this.shop = null;
    const url = "src/UI/Page/shop/shopData.json";
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(shopData=> {
        if(this.shop!==null)return;
        this.shop = new Shop2(shopData);
        UIManager.add(this.shop);
      });
  }
  Input(){
    if(!this.shop)return;
    console.log(Input.isAnyKeyClick() +":"+ Timer.timer)
    if(Input.isAnyKeyClick()) this.shop.onKeyClick(Input.getClickedKeys());
  }
  Update() {
    EntityManager.Animation();
    UIManager.Update();
  }
}
