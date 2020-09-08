
import UIComponent from "../../uiComponent.js";
import UIManager from "../../uiManager.js";
import Text from "../../text.js";
import UI from "../../ui.js";
import Art from "../../../art.js";

export default class ParameterLabel extends UIComponent{ 
    constructor(){
        super(vec0());
        this.text;
    }
    RenderText(data) {
        this.children.forEach(u => u.Remove());

        const dif = 14;
        const POSITION_TEXT_ATK = vec2(86,64);
        const POSITION_TEXT_COST = vec2(86,64 + dif);
        const POSITION_TEXT_AGI = vec2(86,64 + dif*2);

        const atk = new Text(POSITION_TEXT_ATK, "ATK : " + data.atk);
        const cost = new Text(POSITION_TEXT_COST, "COST: " + data.cost);
        const agi = new Text(POSITION_TEXT_AGI, "AGI: " + data.agi);

        this.addChild(atk);
        this.addChild(cost);
        this.addChild(agi);
    }
    onFocus(shopcarousel){
        const data = shopcarousel.focusedItem.itemData;
        this.RenderText(data);
    }
}