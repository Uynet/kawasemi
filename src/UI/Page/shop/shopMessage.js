import UIComponent from "../../uiComponent.js";
import UIManager from "../../uiManager.js";
import Text from "../../text.js";
import UI from "../../ui.js";
import Art from "../../../art.js";

export default class ShopMessage extends UIComponent{ 
    constructor(){
        super(vec0());
        this.RenderText();
    }
    RenderText() {
      const content = "test" 

      const POSITION_TEXT = vec2(56,174);
      const POSITION_FRAME= vec2(12,156);

      const contentUI = new Text(POSITION_TEXT, content);
      const frameUI = new UI(vec0());
      frameUI.sprite = Art.CreateSprite(Art.UIPattern.message.frame);
      frameUI.sprite.scale.x = 2.5;
      frameUI.sprite.scale.y = 1.6;
      frameUI.sprite.position = copy(POSITION_FRAME)

      this.addChild(frameUI);
      this.addChild(contentUI);
    }
}