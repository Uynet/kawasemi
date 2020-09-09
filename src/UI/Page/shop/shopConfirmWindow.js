import UIComponent from "../../uiComponent.js";
import UIManager from "../../uiManager.js";
import Text from "../../text.js";
import UI from "../../ui.js";
import Art from "../../../art.js";
import Audio from "../../../audio.js";
import Event from "../../../Event/event.js";

const sustain = 10;
const POSITION_TEXT = vec2(202,124);
const POSITION_FRAME= vec2(185,118);

class Focus extends Event {
  constructor(ui,start,end) {
    super(1);
    let frame = 0;
    const ease = x => {
      return 1-Math.pow(1-x , 8);
    };
    function* gen() {
      while (frame <= sustain) {
        ui.sprite.position.x = lerp(end ,start, ease(frame/sustain))
        frame++;
        yield;
      }
    }
    this.func = gen();
  }
}

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
            const contentUI = new Text(p , e);
            this.text = contentUI;
            p.y += offsetY;
            items.push(contentUI);
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
            case KEY.C : this.deselect(); 
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
    focus(){
       Audio.PlaySE("clack2", -0.8, 1.0);

       //prev focused
       this.focusedItem.Animate(new Focus(this.focusedItem , POSITION_TEXT.x - 10 , POSITION_TEXT.x));

       this.itemLength = this.itemList.length;
       this.focusedItem = this.itemList[this.focusedPosition];

       //curret focused
       this.focusedItem.Animate(new Focus(this.focusedItem , POSITION_TEXT.x , POSITION_TEXT.x - 10));
    }
    select(){
       switch(this.focusedItem.str) {
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
        this.focus();
    }
    Update(){
        this.ExecuteEvent();
        this.children.forEach(u=>u.Update());
    }
}