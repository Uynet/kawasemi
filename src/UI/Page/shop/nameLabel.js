
import UIComponent from "../../uiComponent.js";
import Text from "../../text.js";
import UI from "../../ui.js";

export default class NameLabel extends UI{ 
    constructor(){
        super(vec0());
        this.text;
    }
    RenderText(data) {
        this.children.forEach(u => this.removeChild(u));

        const style = { fontFamily: 'gkktt', fontSize: 80, fill: 0xffffff }
        const POSITION_TEXT = vec2(86,60);

        this.addChild(new Text(POSITION_TEXT, data.name,style));
    }
    onFocus(shopcarousel){
        const data = shopcarousel.focusedItem.itemData;
        this.RenderText(data);
    }
}