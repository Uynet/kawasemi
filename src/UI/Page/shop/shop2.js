import UIComponent from "../../uiComponent.js";
import ShopBG from "./shopBG.js";
import Drawer from "../../../drawer.js";
import Audio from "../../../audio.js";
import ShopCarousel from "./shopCarousel.js";
import ShopMessage from "./shopMessage.js";
import ParameterLabel from "./parameterLabel.js";
import NameLabel from "./nameLabel.js";
import Game from "../../../game.js";
import Key from "../../atoms/key.js";
import Input from "../../../input.js";

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
       if(keyCode == KEY.C){
            this.closeShop();
            return;
       }
       this.states.focused.onKeyClick(keyCode);
    }
    onFocus(shopcarousel){
        this.message.onFocus(shopcarousel);
        //this.parameterLabel.onFocus(shopcarousel);
        //this.nameLabel.onFocus(shopcarousel);
    }
    closeShop(){
        this.Remove();
        Audio.PlaySE("empty", -0.6, 0.8);
        Game.state.transit("main");
    }
    onSelect(){
    }
    render(){
       this.addChild(new ShopBG());
       const shopCarousel = new ShopCarousel(this.shopData);
       shopCarousel.setProps({onSelect : this.onSelect});
       shopCarousel.parent = this;

       this.message = new ShopMessage();
       this.shopCarousel = shopCarousel;
       this.setState({focused:shopCarousel});
       this.addChild(shopCarousel);

       this.addChild(this.message);

       /*
       this.parameterLabel= new ParameterLabel();
       this.addChild(this.parameterLabel);

       this.nameLabel= new NameLabel();
       this.addChild(this.nameLabel);
       this.parameterLabel= new ParameterLabel();
       */
    }
    Update(){
        this.children.forEach(ui=>ui.Update());
    }
}