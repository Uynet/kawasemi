import UIComponent from "../../uiComponent.js";
import UIManager from "../../uiManager.js";
import Text from "../../text.js";
import UI from "../../ui.js";
import Art from "../../../art.js";
import Audio from "../../../audio.js";
import Event from "../../../Event/event.js";
import shopSelectItem from "./shopSelectItem.js";

const POSITION_TEXT = vec2(192,124);
const POSITION_FRAME= vec2(185,118);


export default class ShopConfirmWindow extends UIComponent{ 
    constructor(){
        super(vec0());
        this.itemList = this.createItems();
        this.itemLength = this.itemList.length;
        this.focusedPosition = 0;
        this.focusedItem = this.itemList[this.focusedPosition];
    }
    createItems(){
        let items = [];
        let selects = ["はい","いいえ"];

        let p = copy(POSITION_TEXT);
        const offsetY = 14;

        selects.forEach(e=>{
            items.push( new shopSelectItem(p , e));
            p.y += offsetY;
        })
        return items;
    }
    render() {
        const frameUI = new UI(vec0());
        frameUI.sprite = Art.CreateSprite(Art.UIPattern.message.smallFrame);
        frameUI.sprite.position = copy(POSITION_FRAME)
        this.frame = frameUI;
        this.addChild(frameUI);

        this.itemList.forEach(e=>this.addChild(e));
    }
    onKeyClick(keyCodes){
        switch(keyCodes[0]){
            case KEY.X : this.select(); 
                break;
            case KEY.C : this.selectNo(); 
                break;
            case KEY.DOWN : 
            case KEY.RIGHT : this.moveDown();
                break;
            case KEY.UP : 
            case KEY.LEFT : this.moveUp();
        }

    }
    moveDown(){
        this.focusedPosition = (this.focusedPosition+1 )%this.itemLength;
        this.focus();
    }
    moveUp(){
        this.focusedPosition = (this.itemLength + this.focusedPosition-1) % this.itemLength;
        this.focus();
    }
    // only called when opened window
    initFocus(){
       this.itemLength = this.itemList.length;
       this.focusedItem = this.itemList[this.focusedPosition];
       this.focusedItem.onFocus();
    }
    focus(){
       Audio.PlaySE("clack2", -0.8, 1.0);

       //prev focused
       this.focusedItem.onDefocus();

       this.focusedItem = this.itemList[this.focusedPosition];

       //curret focused
       this.focusedItem.onFocus();
    }
    select(){
       switch(this.focusedItem.text) {
        case "はい" : this.selectYes();break;
        case "いいえ" : this.selectNo();break;
        default : console.error("p");
       }
    }
    selectYes(){
        Audio.PlaySE("itemGet", -0.3);

        this.parent.buy();
    }
    selectNo(){
        Audio.PlaySE("empty", -0.6, 0.8);

        this.parent.onDeselect();
    }
    onSelect(){
        this.render();
        this.initFocus();
    }
    Update(){
        this.ExecuteEvent();
        this.children.forEach(u=>u.Update());
    }
}