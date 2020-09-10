import UIComponent from "../../uiComponent.js";
import UIManager from "../../uiManager.js";
import Text from "../../text.js";
import UI from "../../ui.js";
import Art from "../../../art.js";
import EntityManager from "../../../Stage/entityManager.js";

export default class PriceLabel extends UIComponent{ 
    constructor(){
        super(vec0());
        this.text;
        this.price;
    }
    onBought(){
        this.RenderText(this.price);
    }
    RenderText(content) {
        const isBuyable = EntityManager.player.score >= this.price;

        const textColor = isBuyable ? 0x000000 : 0x444444;
        const BGColor = isBuyable ? 0xffd84d : 0x999999;

        this.children.forEach(u => u.Remove());

        const POSITION_TEXT = vec2(28,68);

        const style = { fontFamily: 'gkktt', fontSize: 50, fill: textColor }
        const contentUI = new Text(POSITION_TEXT, content , style);
        this.text = contentUI;

        const digit = content.length;

        const BG = new UI(vec0());
        const rect = new PIXI.Graphics();
        const w = 6 + digit * 8;
        const h = 10;
        rect.beginFill(BGColor);
        rect.drawRect(POSITION_TEXT.x-2, POSITION_TEXT.y -2, w, h);
        rect.endFill();
        BG.sprite = rect;

        this.addChild(BG);
        this.addChild(contentUI);

        //this.sprite.rotation = -0.04;
    }
    onFocus(shopcarousel){
        const data = shopcarousel.focusedItem.itemData;
        this.price = data.price;
        this.RenderText(data.price + "円");
    }
}