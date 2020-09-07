import Art from "../../../art.js";
import UIComponent from "../../uiComponent.js";
import UI from "../../ui.js";
import UIManager from "../../uiManager.js";
import ShopIcon from "./shopIcon.js";

export default class shopCarousel extends UIComponent{
    /* props = {
        onSelect
        shopData
    } */
    constructor(shopData){
        super(vec0);
        this.focusedPosition = 0;
        this.shopData = shopData;
        this.itemList = this.createItems() ;
        this.focus();
        this.render();
    }
    createItems(){
        let items = [];
        let p= vec0();
        const offsetY = 16;
        for(let data in this.shopData){
            const icon = new ShopIcon(p);
            // icon.sprite = Art.Sprite(Art.UIPattern.bullet.icon[data]);
            icon.sprite = Art.Sprite(Art.UIPattern.bullet.icon.laser);
            icon.sprite.position = p;
            icon.name = data;
            p.y += offsetY;
            // const itemData = this.shopData[data];
            items.push(icon);
        }
        return items;
    }
    render(){
        this.itemList.forEach(e=>{
            UIManager.add(e);
        })
    }
    focus(){
       this.itemLength = this.itemList.length;
       this.focusedItem = this.itemList[this.focusedPosition];

       this.itemList.forEach(e=>{
          e.sprite.scale.set(1);
       })
       this.focusedItem.sprite.scale.set(1.6);
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
}