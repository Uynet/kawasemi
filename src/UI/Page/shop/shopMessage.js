import UIComponent from "../../uiComponent.js";
import UIManager from "../../uiManager.js";
import Text from "../../text.js";
import UI from "../../ui.js";
import Art from "../../../art.js";

export default class ShopMessage extends UIComponent{ 
    constructor(){
        super(vec0());
        this.RenderText("test");
        this.text;
    }
    CloseText(){
        if(this.text)this.removeChild(this.text);
        if(this.frame) this.removeChild(this.frame);
    }
    RenderText(content) {
        this.CloseText()

        const POSITION_TEXT = vec2(26,164);
        const POSITION_FRAME= vec2(12,156);

        const contentUI = new Text(POSITION_TEXT, content);
        this.text = contentUI;
        const frameUI = new UI(vec0());
        frameUI.sprite = Art.CreateSprite(Art.UIPattern.message.frame);
        frameUI.sprite.scale.x = 2.5;
        frameUI.sprite.scale.y = 1.6;
        frameUI.sprite.position = copy(POSITION_FRAME)
        this.frame = frameUI;

        this.addChild(frameUI);
        this.addChild(contentUI);
    }
    onFocus(shopcarousel){
        const data = shopcarousel.focusedItem.itemData;
        this.RenderText(data.description);
    }
    onSelect(){
        this.RenderText("購入します");
    }
    onBuyCancel(code){
        switch(code){
            case "NOMONEY" : this.RenderText("お金がない"); break;
            case "SOLDOUT" : this.RenderText("うりきれで～す"); break;
            default : console.error(code);
        }
    }
    Update(){
        this.children.forEach(u=>u.Update());
    }
}