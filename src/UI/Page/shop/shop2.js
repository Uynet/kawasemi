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
import ShopConfirmWindow from "./shopConfirmWindow.js";

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
        this.parameterLabel.onFocus(shopcarousel);
        this.nameLabel.onFocus(shopcarousel);
    }
    closeShop(){
        this.Remove();
        Audio.PlaySE("empty", -0.6, 0.8);
        Game.state.transit("main");
    }
    buy(){
        console.log("まいどあり～")
    }
    onSelect(){
        Audio.PlaySE("coin1");
        this.setState({focused:this.selector});
        this.selector.onSelect();
        this.message.onSelect();
    }
    onDeselect(){
        console.log(this.shopCarousel)
        this.setState({focused:this.shopCarousel});
        this.message.onFocus(this.shopCarousel);
    }
    render(){
       this.addChild(new ShopBG());

       this.parameterLabel= new ParameterLabel();
       this.addChild(this.parameterLabel);

       this.nameLabel= new NameLabel();
       this.addChild(this.nameLabel);

       this.message = new ShopMessage();

       this.shopCarousel = new ShopCarousel(this.shopData);
       this.shopCarousel.parent = this;
       this.shopCarousel.focus();
       this.setState({focused:this.shopCarousel});
       this.addChild(this.shopCarousel);

       this.addChild(this.message);

       this.selector = new ShopConfirmWindow();
       this.selector.parent = this;
       this.addChild(this.selector);
    }
    Update(){
        this.children.forEach(ui=>ui.Update());
    }
}