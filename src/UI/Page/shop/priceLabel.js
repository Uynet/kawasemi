import UIComponent from "../../uiComponent.js";
import UIManager from "../../uiManager.js";
import Text from "../../text.js";
import UI from "../../ui.js";
import Art from "../../../art.js";

export default class PriceLabel extends UIComponent{ 
    constructor(){
        super(vec0());
        this.text;
    }
    RenderText(content) {
        this.children.forEach(u => u.Remove());

        const POSITION_TEXT = vec2(28,68);
        const style = { fontFamily: 'gkktt', fontSize: 50, fill: 0x000000 }
        const contentUI = new Text(POSITION_TEXT, content , style);
        this.text = contentUI;

        const digit = content.length;

        const BG = new UI(vec0());
        const rect = new PIXI.Graphics();
        this.color = 0xffa219;
        this.size = 16;
        const w = 6 + digit * 8;
        const h = 10;
        rect.beginFill(0xffd84d);
        rect.drawRect(POSITION_TEXT.x-2, POSITION_TEXT.y -2, w, h);
        rect.endFill();
        BG.sprite = rect;

        this.addChild(BG);
        this.addChild(contentUI);

        //this.sprite.rotation = -0.04;
    }
    onFocus(shopcarousel){
        const data = shopcarousel.focusedItem.itemData;
        this.RenderText(data.price + "円");
    }
}