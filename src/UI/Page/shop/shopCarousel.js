import Art from "../../../art.js";
import UIComponent from "../../uiComponent.js";
import UI from "../../ui.js";
import UIManager from "../../uiManager.js";
import ShopIcon from "./shopIcon.js";
import Event from "../../../Event/event.js";
import Audio from "../../../audio.js";

class Scroll extends Event {
  constructor(ui) {
    super(1);
    const currentPos = copy(ui.sprite.position);
    let frame = 0;
    const amp = 0.4;
    const ease = x => {
      return 1-Math.pow(1-x , 8);
    };
    const sustain = 10;
    function* gen() {
      const start = currentPos.y;
      const end = 50 - 48* ui.focusedPosition;
      while (frame <= sustain) {
        ui.sprite.position.y = lerp(end ,start, ease(frame/sustain))

        frame++;
        yield;
      }
    }
    this.func = gen();
  }
}

class IconDeform extends Event {
  constructor(ui,start,end) {
    super(1)
    let frame = 0;
    const ease = x => {
      return 1-Math.pow(1-x , 8);
    };
    const sustain = 10;
    function* gen() {
      while (frame <= sustain) {
          let scale = lerp(end ,start, ease(frame/sustain));
            ui.sprite.anchor.set(0.5);
            ui.sprite.scale.set(scale);
            ui.sprite.alpha = 0.5 + 0.5*(scale-2)

        frame++;
        yield;
      }
    }
    this.func = gen();
  }
}

export default class shopCarousel extends UIComponent{
    /* props = {
        onSelect
        shopData
    } */
    constructor(shopData){
        super(vec2(40,150));
        this.focusedPosition = 0;
        this.shopData = shopData;
        this.itemList = this.createItems() ;
        this.focus();
        this.render();
    }
    createItems(){
        let items = [];
        let p= vec0();
        const offsetY = 48;
        for(let data in this.shopData){
            const icon = new ShopIcon(p);
            icon.sprite = Art.Sprite(Art.UIPattern.bullet.icon[data]);
            icon.sprite.position = p;
            icon.name = data;
            icon.itemData = this.shopData[data];
            p.y += offsetY;
            items.push(icon);
        }
        return items;
    }
    render(){
        this.itemList.forEach(e=>{
            this.addChild(e);
        })
    }
    focus(){
       Audio.PlaySE("clack2", -0.8, 1.0);
       if(this.parent)this.parent.onFocus(this);
       this.itemLength = this.itemList.length;
       this.focusedItem = this.itemList[this.focusedPosition];

       this.itemList.forEach(e=>{
           if(e == this.focusedItem)e.Animate(new IconDeform(e,2,3));
           else if(e == this.preFocusedItem)e.Animate(new IconDeform(e,3,2));
           else e.Animate(new IconDeform(e,2,2));
       })
       //set the focused item to the spesified screen pos 

       this.Animate(new Scroll(this));
    }
    onKeyClick(keyCodes){
        switch(keyCodes[0]){
            case KEY.X : this.select(); 
                break;
            case KEY.DOWN : 
            case KEY.RIGHT : this.moveDown();
                break;
            case KEY.UP : 
            case KEY.LEFT : this.moveUp();
        }
    }
    moveDown(){
        this.focusedPosition = Math.min(this.itemLength-1 , this.focusedPosition+1);
        this.focus();
    }
    moveUp(){
        this.focusedPosition = Math.max(0 , this.focusedPosition-1);
        this.focus();
    }
    select(){
       this.props.onSelect();
    }
    Update(){
        this.ExecuteEvent();
        this.itemList.forEach(e=>e.Update());
    }
}