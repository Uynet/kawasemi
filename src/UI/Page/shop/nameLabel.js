
import UIComponent from "../../uiComponent.js";
import Text from "../../text.js";
import UI from "../../ui.js";

export default class NameLabel extends UI{ 
    constructor(){
        super(vec0());
        this.text;
    }
    RenderText(data) {
        this.children.forEach(u => u.Remove());

        const POSITION_TEXT = vec2(86,48);

        this.addChild(new Text(POSITION_TEXT, data.name));
    }
    onFocus(shopcarousel){
        const data = shopcarousel.focusedItem.itemData;
        this.RenderText(data);
    }
}