import UIComponent from "../../uiComponent.js";
import ShopBG from "./shopBG.js";
import Drawer from "../../../drawer.js";
import Audio from "../../../audio.js";
import ShopCarousel from "./shopCarousel.js";
import ShopMessage from "./shopMessage.js";

const gameSreensize = Drawer.GetGameScreenSize();

export default class Shop2 extends UIComponent{
    constructor(shopData){
        super(vec0());
        Audio.PlaySE("coin2", -0.6, 0.6);
        Audio.PlaySE("stageChange", -0.6, 1.5);
        this.type = "SHOP";
        this.sprite = new PIXI.Sprite();
        this.size = gameSreensize;
        this.stetes = {focused:null}
        this.shopData = shopData;

        this.render();
    }
    onKeyClick(keyCode){
       if(!this.states.focused)return;
       this.states.focused.onKeyClick(keyCode);
    }
    onSelect(){
        console.log("selected");
    }
    render(){
       this.addChild(new ShopBG());
       const shopCarousel = new ShopCarousel(this.shopData);
       shopCarousel.setProps({onSelect : this.onSelect});
       this.setState({focused:shopCarousel});
       this.addChild(shopCarousel);

       const message = new ShopMessage();
       this.addChild(message);
    }
    Update(){
        this.children.forEach(ui=>ui.Update());
    }
}